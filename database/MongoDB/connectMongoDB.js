const mongoose = require('mongoose');

let attempt = 0;
const connectMongoDB = (CONNECTION_STRING) => {
    retryMongoConn(CONNECTION_STRING);
};

const retryMongoConn = (connectionString) => {
    mongoose
        .connect(connectionString)
        .then((res) => {
            console.log(`Successfully connected to MongoDB =>\n` +
                `Host: ${res.connection.host}\n` +
                `Port: ${res.connection.port}\n` +
                `Database: ${res.connection.name}`);
        })
        .catch((err) => {
            attempt++;
            console.error(`Attempt #${attempt} => Error: ${err.message}`);
            setTimeout(() => retryMongoConn(connectionString), 5000);
        })
}

module.exports = connectMongoDB;