const express = require('express');
const cors = require('cors');
const parseCookie = require('cookie-parser');

require('dotenv').config();

/* App Settings */
const app = express();
const PORT = process.env.PORT || 9000;

/* MongoDB Connection */
const connectMongoDB = require('./database/MongoDB/connectMongoDB');
connectMongoDB(process.env.MONGODB_CONNECTION_STRING);

/* Static Files */
app.use(express.static('public'));

/* Middleware */
app.use(express.json());
app.use(parseCookie());

const corsOptions = {
    credentials: true,
    origin: [
        'http://localhost:3001',
        'http://current.stephenphyo.com:3001'
    ]
};
app.use(cors(corsOptions));

/* Routes */
app.use('/api/v1/auth', require('./routes/auth.route'));
app.use('*', require('./errors/404'));

app.listen(PORT, () => {
    console.log(`Server is listening on port: ${PORT}`)
});