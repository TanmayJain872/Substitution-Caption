/* jshint esversion: 11 */

// casparcg/commands.js

const { sendDataToCasparCG } = require('./client'); // Import function to send data to CasparCG

// Command to load a template on a specific channel
const loadTemplate = (templateName) => {
    const command = `LOAD 1-1 ${templateName} TEMPLATE`;
    sendDataToCasparCG(command);
};

// Command to play a video on a specific channel
const playVideo = (filePath) => {
    const command = `PLAY 1-1 "${filePath}"`;
    sendDataToCasparCG(command);
};

// Command to stop media on a specific channel
const stopMedia = () => {
    const command = 'STOP 1-1';
    sendDataToCasparCG(command);
};

// Export functions for use in other parts of the application
module.exports = {
    loadTemplate,
    playVideo,
    stopMedia,
};
