"use client";
import React, { useState } from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import { Typography } from "@mui/material";

//https://mui.com/material-ui/transitions/
export const PopUp = () => {
    return (
        <Box>
            <Paper
                sx={{ m: 1, height: 420, position: "relative" }}
                elevation={4}
            >
                <Typography variant="h3" gutterBottom>
                    Place Name
                </Typography>
                <Typography variant="subtitle1" gutterBottom>
                    Ratings...
                </Typography>
            </Paper>
        </Box>
    );
};
