/* jshint esversion: 11 */

const db = require("../db/config");

const captionResolver = {
    Query: {
        // Fetch all players
        players: async () => {
            try {
                const [rows] = await db.query("SELECT * FROM players;");
                return rows;
            } catch (error) {
                console.error("|ERROR| Error fetching players:", error);
                throw new Error("Failed to fetch players!");
            }
        },

        // Fetch all captions
        captions: async () => {
            try {
                const [rows] = await db.query("SELECT * FROM captions;");
                return rows;
            } catch (error) {
                console.error("|ERROR| Error fetching captions:", error);
                throw new Error("Failed to fetch captions!");
            }
        },

        // Fetch a single player by ID
        getPlayerById: async (_, { id }) => {
            try {
                const [rows] = await db.query("SELECT * FROM players WHERE id = ?;", [id]);
                if (rows?.length == 0) {
                    console.error("|ERROR| Player not found!");
                    return rows?.[0];
                }
            } catch (error) {
                console.error("|ERROR| Error fetching player:", error);
                throw new Error("Failed to fetch the player!");
            }
        },

        // Fetch a single caption by ID
        getCaptionById: async (_, { id }) => {
            try {
                const [rows] = await db.query("SELECT * FROM captions WHERE id = ?", [id]);
                if (rows?.length == 0) {
                    console.error("|ERROR| Caption not found!");
                    return rows?.[0];
                }
            } catch (error) {
                console.error("|ERROR| Error fetching caption:", error);
                throw new Error("Failed to fetch the caption!");
            }
        },
    },

    Mutation: {
        // Add a new player
        addPlayer: async (_, { playerNumber, name }) => {
            try {
                const [rows] = await db.query(`INSERT INTO players (playerNumber, name) VALUES (?, ?)`, [playerNumber, name]);
                console.log("🚀 ~ addPlayer: ~ rows:", rows);
                if (rows?.length == 0) {
                    console.error("|ERROR| Error in adding player:", error);
                    return null;
                }
                return {
                    id: rows?.insertId,
                    name,
                    playerNumber
                };
            } catch (error) {
                console.error("|ERROR| Error in adding a new player", error);
                throw new Error("Failed to add a new player!");
            }
        },

        // Update a player"s details
        updatePlayer: async (_, { id, name, playerNumber }) => {
            try {
                const [rows] = await db.query(
                    `UPDATE players SET name = ?, playerNumber = ? WHERE id = ?`,
                    [name, playerNumber, id]
                );
                console.log("🚀 ~ updatePlayer: ~ rows:", rows);
                return rows?.[0];
            } catch (error) {
                console.error("|ERROR| Error in updating a new player", error);
                throw new Error("Failed to update a player!");
            }
        },

        // Delete a player
        deletePlayer: async (_, { id }) => {
            try {
                const [rows] = await db.query(`DELETE FROM players WHERE id = ?`, [id]);
                return rows?.[0];
            } catch (error) {
                console.error("|ERROR| Error in deleting a new player", error);
                throw new Error("Failed to delete a player!");
            }
        },

        // Add a new caption
        addCaption: async (_, args) => {
            try {
                const { playerOut, numberOut, playerIn, numberIn, time } = args;
                const [rows] = await db.query(
                    `INSERT INTO captions (playerOut, numberOut, playerIn, numberIn, time)
                    VALUES (?, ?, ?, ?, ?)`,
                    [playerOut, numberOut, playerIn, numberIn, time],
                );
                console.log("🚀 ~ addCaption: ~ rows:", rows);
                if (rows?.length == 0) {
                    console.error("|ERROR| Error in adding caption:", error);
                    return null;
                }
                return {
                    id: rows?.insertId,
                    playerOut,
                    numberOut,
                    playerIn,
                    numberIn,
                    time
                };
            } catch (error) {
                console.error("|ERROR| Error in adding a new caption", error);
                throw new Error("Failed to add a new caption!");
            }
        },

        // Update a caption"s details
        updateCaption: async (_, args) => {
            try {
                const { id, playerOutId, playerOutNumber, playerInId, playerInNumber, time } = args;
                const [result] = await db.query(
                    `UPDATE captions SET playerOutId = ?, playerOutNumber = ?, playerInId = ?, playerInNumber = ?, time = ?
                    WHERE id = ?`,
                    [playerOutId, playerOutNumber, playerInId, playerInNumber, time, id]
                );
                return result;
            } catch (error) {
                console.error("|ERROR| Error in updating caption!", error);
                throw new Error("Failed to update caption!");
            }
        },

        // Delete a caption
        deleteCaption: async (_, { id }) => {
            try {
                const [result] = await db.query(`DELETE FROM captions WHERE id = ?`, [id]);
                return result;
            } catch (error) {
                console.error("|ERROR| Error in deleting caption!", error);
                throw new Error("Failed to delete caption!");
            }
        },
    },
};

module.exports = captionResolver;
