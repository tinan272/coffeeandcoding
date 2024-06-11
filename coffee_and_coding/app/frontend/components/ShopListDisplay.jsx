"use client";
import React, { useState, useEffect } from "react";
import List from "@mui/material/List";
import Paper from "@mui/material/Paper";
import { Button, ListSubheader, ThemeProvider } from "@mui/material";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { SelectMulti } from "./SelectMulti.jsx";
import Box from "@mui/material/Box";
import axios from "axios";
import { useQueryParams, NumberParam, StringParam, ArrayParam} from 'use-query-params';
import theme from "./theme.jsx";

export const ShopListDisplay = ( { searchInputValue }) => {
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

    // dropdown values
    const names = ["Downtown Atlanta", "Reynoldstown", "Westside Provisions", "Midtown"];
    const cost = ["$", "$$", "$$$"];
    const ratings = ["1", "2", "3", "4", "5"];
    const parkingList = ["Free", "Paid", "Parking Deck", "Parking Lot", "Street Parking", "No Parking"];
    
    // setting filter/search bar values
    const [cafeInfo, setCafeInfo] = useState([]);

    // for syncing query parameters in real time & sending to backend server
    const [query, setQuery] = useQueryParams({
        search: StringParam,
        city: ArrayParam,
        cost: ArrayParam,
        rating: ArrayParam,
        parking: ArrayParam,
    });

    const {  city: areaName, cost: cafeCost, rating: cafeRating, parking: cafeParking } = query || {};
    console.log("this is the query", query);

    // getting cafe info and setting it 
    useEffect(() => {
        getCafeInfo(query).then((cafeData) => {
            setCafeInfo(cafeData);
        });
    }, [query]);

    useEffect(() => {
        handleSearch(searchInputValue);
    });

    const handleSearch = (inputValue) => {
        setQuery({ search: inputValue });
    };

    const handleCity = (selectedCities) => {
        setQuery({ city: selectedCities });
    };

    const handleCost = (selectedCost) => {
        setQuery({ cost: selectedCost });
    };

    const handleRating = (selectedRating) => {
        setQuery({ rating: selectedRating });
    };

    const handleParking = (selectedParking) => {
        setQuery({ parking: selectedParking });
    };


    // clearing the dropdown menus
    function onClear() {
        console.log("Clearing filters...");
        setQuery({ search: "", city: [], cost: [], rating: [], parking: []});
    };

    // filter based on the cafe name that is set by Search comp.
    // const filteredShops = cafeInfo.filter((shop) => {
    //     const matchesName = shop.name
    //         .toLowerCase()
    //         .includes(searchValue.toLowerCase());
    //     const matchesArea =
    //         areaName.length === 0 || areaName.includes(shop.area); // === 0 shows everything if no filter set
    //     const matchesCost =
    //         cafeCost.length === 0 || cafeCost.includes(shop.cost);
    //     return matchesName && matchesCost && matchesArea;
    // });

    return (
        <div>
            <Paper sx={{ m: 1, height: "100%", p: 2 }} elevation={4}>
                <Box>
                <ThemeProvider theme={theme}>
                    <Button
                            sx={{ margin: '15px'}}
                            color="pink"
                            variant="contained"
                            onClick={onClear}
                    >
                        Clear Filters
                    </Button>
                </ThemeProvider>

                    <SelectMulti
                        list={names}
                        labelName={"Areas"}
                        filterValue={areaName || []}
                        setter={handleCity}
                                                
                    />
                    <SelectMulti
                        list={cost}
                        labelName={"Cost"}
                        filterValue={cafeCost || []}
                        setter={handleCost}
                        
                    />
                    <SelectMulti
                        list={ratings}
                        labelName={"Rating"}
                        filterValue={cafeRating || []}
                        setter={handleRating}
                    />
                    <SelectMulti
                        list={parkingList}
                        labelName={"Parking"}
                        filterValue={cafeParking || []}
                        setter={handleParking}                        
                    />
                </Box>
                <List>
                    <ListSubheader>Coffee Shops</ListSubheader>

                    {cafeInfo.map((cafe, index) => (
                        <ListItemButton key={cafe.name}>
                            <ListItem
                                sx={{ borderBottom: 1, borderColor: "divider" }}
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
        </div>
    );

    async function getCafeInfo(query) {
        try {
            const response = await axios.get("http://localhost:8080/cafe_api", { params: query });
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
                    area: cafe.Area
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
