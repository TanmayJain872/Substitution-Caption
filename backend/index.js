/* jshint esversion: 11 */

require("dotenv").config();
const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const typeDefs = require('./schemas/typeDefs');
const resolvers = require('./resolvers');

// CasparCG related imports
const { connectToCasparCG, sendDataToCasparCG, handleDataFromCasparCG, closeConnection } = require('./casparcg/client');
const { loadTemplate, playVideo, stopMedia } = require('./casparcg/commands');

async function startServer() {
    const app = express();
    const server = new ApolloServer({ typeDefs, resolvers });

    await server.start();
    server.applyMiddleware({ app });

    const PORT = process.env.PORT ?? 4000;
    app.listen(PORT, async () => {
        console.log(`🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`);
        
        // Connect to CasparCG when the server starts
        try {
            await connectToCasparCG();
            
        } catch (error) {
            console.error("|ERROR| Failed to connect to the CasparCG server: ", error);
            return;
        }

        try {
            handleDataFromCasparCG();

            // Example commands:
            loadTemplate('TEST_TEMPLATE'); // Load a template
            playVideo('C:/path_to_video/video.mp4'); // Play a video
            setTimeout(() => {
                stopMedia(); // Stop the video after 10 seconds
            }, 10000); // 10-second delay
        } catch (error) {
            console.error('Error:', error);
        }
    });
}

startServer();

// Handle CasparCG server disconnection properly on exit
process.on('exit', closeConnection);
