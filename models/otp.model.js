const mongoose = require('mongoose');

const otpSchema = new mongoose.Schema(
    {
        accountId: { type: String, required: true, unique: true },
        otp: { type: String, required: true, unique: true }
    }
);

module.exports = mongoose.model('OTP', otpSchema);