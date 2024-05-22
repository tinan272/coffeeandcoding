"use client";
import React, { useState } from "react";
import Paper from "@mui/material/Paper";
import { Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

const PaperStyling = styled(Paper)(({ theme }) => ({
    width: "100%",
    padding: theme.spacing(4),
    ...theme.typography.body2,
    textAlign: "center",
}));

export const PopUp = ({ place }) => {
    return (
        <Paper sx={{ height: "100%", position: "relative" }} elevation={4}>
            <PaperStyling>
                <Typography variant="h3" gutterBottom>
                    CAFE COMMA
                </Typography>
                <Typography variant="subtitle1">Ratings...</Typography>
                <Typography variant="subtitle1">{place.lat}</Typography>
            </PaperStyling>
        </Paper>
    );
};
