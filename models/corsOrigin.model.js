const mongoose = require('mongoose');

const corsOriginSchema = new mongoose.Schema({
    origin: {
        type: String,
        require: true
    }
}, { timestamps: true });

module.exports = mongoose.model('CorsOrigin', corsOriginSchema);