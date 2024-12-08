/* jshint esversion: 11 */

const captionResolver = require("./caption-resolver");

const resolvers = {
    Query: {
        ...captionResolver.Query,
    },
    Mutation: {
        ...captionResolver.Mutation,
    },
};

module.exports = resolvers;
