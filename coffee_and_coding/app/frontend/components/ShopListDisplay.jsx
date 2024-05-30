"use client";
import React, { useState } from "react";
import List from "@mui/material/List";
import Paper from "@mui/material/Paper";
import { ListSubheader } from "@mui/material";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { Search } from "./Search.jsx";
import Stack from "@mui/material/Stack";
import { SelectMulti } from "./SelectMulti.jsx";
import Box from "@mui/material/Box";

export const ShopListDisplay = ({}) => {
    const staticShops = [
        { name: "Cafe Comma", description: "Good", area: "Atlanta", score: 4 },
        {
            name: "Summit Coffee",
            description: "Great ambiance",
            area: "Roswell",
            score: 5,
        },
        {
            name: "Cool Beans",
            description: "Great ambiance",
            area: "Marietta",
            score: 3,
        },
        {
            name: "Perc",
            description: "Excellent coffee",
            area: "Atlanta",
            score: 5,
        },
    ];

    const [searchValue, setSearchValue] = useState("");
    const names = ["Atlanta", "Buckhead", "Marietta", "Roswell"];
    const scores = [1, 2, 3, 4, 5];

    const [areaName, setAreaName] = useState([]);
    const [cafeScore, setCafeScore] = useState([]);

    // filter based on the cafe name that is set by Search comp.
    const filteredShops = staticShops.filter((shop) => {
        const matchesName = shop.name
            .toLowerCase()
            .includes(searchValue.toLowerCase());
        const matchesArea =
            areaName.length === 0 || areaName.includes(shop.area); // === 0 shows everything if no filter set
        const matchesScore =
            cafeScore.length === 0 || cafeScore.includes(shop.score);
        return matchesName && matchesArea && matchesScore;
    });

    return (
        <div>
            <Paper sx={{ m: 1, height: "100%", p: 2 }} elevation={4}>
                <Box>
                    <Search searchValueSetter={setSearchValue} />
                    <SelectMulti
                        list={names}
                        labelName={"Areas"}
                        filterValue={areaName}
                        setter={setAreaName}
                    />
                    <SelectMulti
                        list={scores}
                        labelName={"Scores"}
                        filterValue={cafeScore}
                        setter={setCafeScore}
                    />
                </Box>
                <List>
                    <ListSubheader>Coffee Shops</ListSubheader>

                    {filteredShops.map((shop, index) => (
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
