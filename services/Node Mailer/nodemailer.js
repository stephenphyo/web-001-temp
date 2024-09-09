const nodemailer = require('nodemailer');
require('dotenv').config();

const sendMail = async (destEmailAddress, mailSubject='', mailBody='') => {
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.NODEMAILER_MAIL_ACCOUNT_USERNAME,
            pass: process.env.NODEMAILER_MAIL_ACCOUNT_PASSWORD
        }
    });

    var mailOptions = {
        from: process.env.NODEMAILER_MAIL_ACCOUNT_USERNAME,
        to: destEmailAddress,
        subject: mailSubject,
        text: mailBody
    };


    // return transporter.sendMail(mailOptions, (err, info) => {
    //     if (!err) {
    //         res.status(200).send({
    //             success: true,
    //             message: `Email sent: ${info.response}`
    //         })
    //         return {
    //             success: true,
    //             message: `Email sent: ${info.response}`
    //         }
    //     } else {
    //         res.status(400).send({
    //             success: false,
    //             message: err.message
    //         })
    //         return {
    //             success: false,
    //             message: err.message
    //         }
    //     }
    // });
    return transporter.sendMail(mailOptions);
};

module.exports = sendMail;