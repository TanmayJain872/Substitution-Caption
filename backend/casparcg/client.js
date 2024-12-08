/* jshint esversion: 11 */

// casparcg/client.js

const net = require('net');
const { host, port } = require('./config'); // Import connection config

const client = new net.Socket();

// Function to connect to CasparCG server
const connectToCasparCG = () => {
    return new Promise((resolve, reject) => {
        client.connect(port, host, () => {
            console.log('Connected to CasparCG Server');
            resolve(client);
        });

        client.on('error', (err) => {
            reject('Error connecting to CasparCG: ' + err.message);
        });
    });
};

// Function to send data to CasparCG
const sendDataToCasparCG = (data) => {
    client.write(data + '\r\n');
};

// Function to handle data from the CasparCG server
const handleDataFromCasparCG = () => {
    client.on('data', (data) => {
        console.log('Received from CasparCG:', data.toString());
    });
};

// Function to close the connection
const closeConnection = () => {
    client.on('close', () => {
        console.log('Connection closed');
    });
};

module.exports = {
    connectToCasparCG,
    sendDataToCasparCG,
    handleDataFromCasparCG,
    closeConnection,
};
