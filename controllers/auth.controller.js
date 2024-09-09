const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const axios = require('axios');

/*** Model Imports ***/
const User = require('../models/user.model');
const OTP = require('../models/otp.model');

/*** Util Imports ***/
const cookieOptions = require('../utils/cookieOptions');
const convertLiteral2Age = require('../utils/convertLiteral2Age');

/*** Service Imports ***/
const sendMail = require('../services/Node Mailer/nodemailer');

/*** Function Imports ***/
const generateOTP = require('../functions/generateOTP');

const authCtrl = {

    /* POST */
    postRegister: async (req, res) => {
        try {
            const {
                firstName, lastName,
                username, email,
                password, confirmPassword
            } = req.body;

            /* Check Existing Username */
            const existingUsername = await User.findOne({ username });
            if (existingUsername) {
                return res.status(400).json({
                    error: 'Username is already taken'
                })
            }

            /* Check Existing User */
            const existingUser = await User.findOne({ email });
            if (existingUser) {
                return res.status(400).json({
                    error: 'User already exists'
                })
            }

            /* Check Passwords */
            if (password !== confirmPassword) {
                return res.status(400).json({
                    error: 'Passwords do not match'
                })
            }

            /* Generate Avatar URL */
            const avatar = {
                url: `https://ui-avatars.com/api/?name=${firstName}+${lastName}&background=${'0D8ABC'}&color=${'fff'}`
            }

            const newUser = new User({
                firstName, lastName, username,
                email, password, avatar
            });

            await newUser.save();

            res.status(201).json({
                data: {
                    id: newUser._id,
                    username: newUser.username,
                    email: newUser.email,
                }
            })
        }
        catch (err) {
            if (err.name === 'ValidationError') {
                res.status(400).json({
                    error: 'Validation Error',
                    message: err.message
                });
            }
            else {
                res.status(500).json({
                    error: err.message
                });
            }
        }
    },

    postLogin: async (req, res) => {
        try {
            const { email, password } = req.body;

            if (!email || !password) {
                return res.status(400).json({
                    error: 'Email and Password must not be empty'
                });
            }

            /* Check Existing User */
            const existingUser = await User.findOne({ email: email.toLowerCase() }).select('+password');
            if (!existingUser) {
                return res.status(404).json({
                    error: 'User does not exist'
                });
            }

            const isPasswordMatched = await existingUser.comparePassword(password);
            if (!isPasswordMatched) {
                return res.status(401).json({
                    error: 'Incorrect Password'
                });
            }

            // Generate Access and Refresh Tokens
            const accessToken = existingUser.generateAccessToken();
            const refreshToken = existingUser.generateRefreshToken();

            // Save Refresh Token
            existingUser.refreshToken = refreshToken;
            await existingUser.save({ validateBeforeSave: false }); // Ignore Password Validation

            // Exclude Password from Response
            existingUser.password = undefined;

            return res.status(200)
                .cookie('accessToken', accessToken, {
                    maxAge: convertLiteral2Age(process.env.ACCESS_TOKEN_EXPIRY || '15m'),
                    ...cookieOptions
                })
                .cookie('refreshToken', refreshToken, {
                    maxAge: convertLiteral2Age(process.env.REFRESH_TOKEN_EXPIRY || '7d'),
                    ...cookieOptions
                })
                .json({
                    data: existingUser
                });

        }
        catch (err) {
            res.status(500).json({
                error: err.message
            });
        }
    },

    postResetPasswordCheckEmail: async (req, res) => {
        /* Verify Recaptcha */
        const recaptchaToken = req.body.recaptchaToken;
        const result = await axios.post(`https://www.google.com/recaptcha/api/siteverify?secret=${process.env.GOOGLE_RECAPTCHA_SECRET_KEY}&response=${recaptchaToken}`);

        /* Verification Success */
        if (result.status === 200 && result.data.success) {
            const existingUser = await User.findOne({ email: req.body.email });
            if (existingUser) {
                res.status(200).json({
                    data: existingUser.email
                });
            } else {
                res.status(404).json({
                    error: 'User does not exist'
                });
            }
        }
        /* Verification Failed */
        else {
            res.status(403).json({
                error: 'Recaptcha Verification Failed'
            });
        }
    },

    postResetPasswordVerifyOTP: async (req, res) => {
        const otp = await OTP.findOne({ userId: req.params.id });
        if (otp) {
            if (otp.otp === req.body.otp) {
                const token = jwt.sign(
                    { userId: otp.userId, otp: otp.otp },
                    process.env.JWT_ACCESS_TOKEN_SECRET,
                    { expiresIn: '5m' }
                )
                res.status(200).json({
                    data: {
                        userId: otp.userId,
                        token: token
                    }
                })
            } else {
                res.status(403).json({
                    error: 'OTP Verification Failed'
                })
            }
        } else {
            res.status(404).json({
                error: 'OTP does not exist'
            })
        }
    },

    /* PATCH */
    patchResetPasswordReset: async (req, res) => {
        const account = await User.findById(req.params.id);
        if (account) {
            try {
                const isVerified = jwt.verify(req.body.token, process.env.JWT_ACCESS_TOKEN_SECRET);
                if (isVerified) {
                    /* Password Enryption */
                    const saltRounds = 10;
                    const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);
                    User.findOneAndUpdate(
                        { _id: req.params.id },
                        { password: hashedPassword },
                        { new: true },
                        (err, result) => {
                            if (!err) {
                                res.status(200).json({
                                    success: true,
                                    data: result
                                })
                            } else {
                                res.status(500).json({
                                    success: false,
                                    message: err.message
                                })
                            }
                        }
                    )
                } else {
                    console.log('Not Verified');
                }
            }
            /* JWT Token Expired */
            catch (err) {
                if (err.name === 'TokenExpiredError') {
                    res.status(401).json({
                        success: false,
                        message: 'JWT Token Expired'
                    })
                }
            }
        } else {
            res.status(404).json({
                success: false,
                message: 'Account does not exist'
            });
        }
    },

    /* GET */
    getLogout: async (req, res) => {
        const { refreshToken } = req.cookies;
        const existingUser = await User.findOne({ refreshToken });
        if (existingUser) {
            existingUser.refreshToken = null;
            await existingUser.save();
        }

        res.status(200)
            .clearCookie('accessToken')
            .clearCookie('refreshToken')
            .json({
                message: 'Logout Successful'
            })
    },

    getResetPasswordSendEmail: async (req, res) => {
        const user = await User.findOne({ _id: req.params.id });
        if (user) {
            const otp = generateOTP();
            const data = {
                user: req.params.id,
                otp: otp
            };

            OTP.findOneAndUpdate(
                { user: req.params.id },
                data,
                { new: true, upsert: true },
                (err, _) => {
                    if (!err) {
                        const mail = sendMail(user.email, 'Reset Password OTP', otp);
                        mail
                            .then(result => {
                                res.status(200).json({
                                    data: result
                                })
                            })
                            .catch(err => {
                                res.status(500).json({
                                    error: err.message
                                })
                            });
                    } else {
                        res.status(500).json({
                            error: err.message
                        });
                    }
                }
            );
        } else {
            res.status(404).json({
                error: 'User does not exist'
            });
        }
    },
};

module.exports = authCtrl;