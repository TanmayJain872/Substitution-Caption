/* jshint esversion: 11 */

import React, { useEffect, useState } from "react";
import { Card, CardContent, Typography, Grid, Box } from "@mui/material";

const App = () => {
    const [caption, setCaption] = useState(null);

    // Fetch the caption data from the GraphQL API
    const fetchCaptionData = async () => {
    try {
        const response = await fetch("http://localhost:4000/graphql", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                query: `
                query {
                    captions {
                    id
                    playerOut
                    numberOut
                    playerIn
                    numberIn
                    time
                    }
                }
                `,
            }),
            });
            const result = await response.json();
            const latestCaption = result.data.captions[result.data.captions.length - 1]; // Get the most recent caption
            setCaption(latestCaption);
        } catch (error) {
            console.error("Error fetching caption data:", error);
        }
    };

    // Fetch caption data on component mount
    useEffect(() => {
        fetchCaptionData();
    }, []);

    // Render the substitution card
    return (
        <div style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
            {caption && (
            <Card
                sx={{
                maxWidth: 600,
                minWidth: 400,
                boxShadow: 3,
                borderRadius: "10px",
                backgroundColor: "rgba(0, 0, 0, 0.7)",
                color: "#fff",
                margin: "auto",
                padding: "15px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                }}
            >
                <CardContent>
                <Typography variant="h5" component="div" gutterBottom>
                    Substitution Information
                </Typography>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
                    <Typography variant="body1" fontWeight="bold">
                        Player Out:
                    </Typography>
                    <Typography variant="body2">
                        {caption.playerOut} (# {caption.numberOut})
                    </Typography>
                    </Grid>
                    <Grid item xs={12} md={6}>
                    <Typography variant="body1" fontWeight="bold">
                        Player In:
                    </Typography>
                    <Typography variant="body2">
                        {caption.playerIn} (# {caption.numberIn})
                    </Typography>
                    </Grid>
                </Grid>
                <Box mt={2}>
                    <Typography variant="body1" fontWeight="bold">
                    Time:
                    </Typography>
                    <Typography variant="body2">{caption.time}</Typography>
                </Box>
                </CardContent>
            </Card>
            )}
        </div>
    );
};

export default App;
