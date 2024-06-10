"use client";
import React, { useState, useEffect } from "react";
import List from "@mui/material/List";
import Paper from "@mui/material/Paper";
import { Button, ListSubheader } from "@mui/material";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { Search } from "./Search.jsx";
import { SelectMulti } from "./SelectMulti.jsx";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import axios from "axios";
import MapContainer from "./MapContainer.jsx";

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
    const cost = ["$", "$$", "$$$"];

    const [areaName, setAreaName] = useState([]);
    const [cafeCost, setcafeCost] = useState([]);
    const [cafeInfo, setCafeInfo] = useState([]);

    useEffect(() => {
        getCafeInfo().then((cafeData) => {
            setCafeInfo(cafeData);
        });
    }, []);

    // filter based on the cafe name that is set by Search comp.
    const filteredShops = cafeInfo.filter((shop) => {
        const matchesName = shop.name
            .toLowerCase()
            .includes(searchValue.toLowerCase());
        const matchesArea =
            areaName.length === 0 || shop.address.includes(areaName); // === 0 shows everything if no filter set
        const matchesCost =
            cafeCost.length === 0 || cafeCost.includes(shop.cost);
        return matchesName && matchesCost && matchesArea;
    });

    return (
        <Paper>
            <List>
                <ListSubheader>Coffee Shops</ListSubheader>
                {staticShops.map((cafe, index) => (
                    <ListItemButton key={cafe.name}>
                        <ListItem
                            sx={{
                                borderBottom: 1,
                                borderColor: "divider",
                            }}
                        >
                            <ListItemText
                                primary={cafe.name}
                                secondary={cafe.address}
                            />
                            {cafe.cost}
                        </ListItem>
                    </ListItemButton>
                ))}
            </List>
        </Paper>
    );

    async function getCafeInfo() {
        try {
            const response = await axios.get("http://localhost:8080/cafe_api");
            const cafeData = response.data;
            console.log("Getting cafe data....");
            console.log(cafeData);
            const cafes = cafeData.map((cafe) => {
                console.log("Cost:", cafe.Cost);
                return {
                    name: cafe.Name,
                    address: cafe.Address,
                    parking: cafe.Parking,
                    cost: cafe.Cost,
                };
            });
            console.log("getting cafe info...");
            console.log(cafes);
            return cafes;
        } catch (error) {
            console.log("error fetching cafe: ", error);
            return [];
        }
    }
};
