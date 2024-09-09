const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        maxLength: 20
    },
    lastName: {
        type: String,
        required: true,
        maxLength: 20
    },
    username: {
        type: String,
        required: true,
        unique: true,
        maxLength: 20
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minLength: 8,
        maxLength: 25,
        select: false
    },
    role: {
        type: String,
        default: 'user'
    },
    avatar: {
        url: { type: String },
        publicId: { type: String }
    },
    lastSeenAt: {
        type: Date,
        default: Date.now
    },
}, { timestamps: true });

/** Methods **/
/* Encrypt Password before Saving */
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) { next() };

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

/* Generate JWT Tokens */
userSchema.methods.generateAccessToken = function () {
    return jwt.sign(
        { id: this._id }, process.env.ACCESS_TOKEN_SECRET || 'PHOENIX_ACCESS',
        { expiresIn: process.env.ACCESS_TOKEN_EXPIRY || '15m' }
    );
}

userSchema.methods.generateRefreshToken = function () {
    return jwt.sign(
        { id: this._id }, process.env.REFRESH_TOKEN_SECRET || 'PHOENIX_REFRESH',
        { expiresIn: process.env.REFRESH_TOKEN_EXPIRY || '7d' }
    );
}

/* Compare Password */
userSchema.methods.comparePassword = async function (inputPassword) {
    return await bcrypt.compare(inputPassword, this.password);
}

module.exports = mongoose.model('User', userSchema);