"use client";
import React from "react";
import List from "@mui/material/List";
import Paper from "@mui/material/Paper";
import { ListSubheader } from "@mui/material";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";

export const ShopListDisplay = ({}) => {
    const staticShops = [
        { name: "Cafe Comma", description: "Good" },
        { name: "Java House", description: "Great ambiance" },
        { name: "Brewed Awakening", description: "Excellent coffee" },
    ];

    return (
        <div>
            <Paper sx={{ m: 1, height: "100%", p: 2 }} elevation={4}>
                <List>
                    {<ListSubheader>Coffee Shops</ListSubheader>}
                    {staticShops.map((shop, index) => (
                        <ListItemButton>
                            <ListItem
                                key={index}
                                sx={{ borderBottom: 1, borderColor: "divider" }}
                            >
                                <ListItemText
                                    primary={shop.name}
                                    secondary={shop.description}
                                />
                            </ListItem>
                        </ListItemButton>
                    ))}
                </List>
            </Paper>
        </div>
    );
};
