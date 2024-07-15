"use client";
import React, { useState, useEffect } from "react";
import List from "@mui/material/List";
import Paper from "@mui/material/Paper";
import { Button, ListSubheader, ThemeProvider } from "@mui/material";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import axios from "axios";
import PageRight from "@mui/icons-material/ArrowCircleRightOutlined";
import PageLeft from "@mui/icons-material/ArrowCircleLeftOutlined";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";

import {
    useQueryParams,
    NumberParam,
    StringParam,
    ArrayParam,
} from "use-query-params";

export const ShopListDisplay = ({ searchInputValue, selectedFilterValues }) => {
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
    ];

    const { cities, costs, ratings, parkings } = selectedFilterValues;

    // setting filter/search bar values
    const [cafeInfo, setCafeInfo] = useState({ cafes: [], totalPages: 0 });

    // for syncing query parameters in real time & sending to backend server
    const [query, setQuery] = useQueryParams({
        search: StringParam,
        city: ArrayParam,
        cost: ArrayParam,
        rating: ArrayParam,
        parking: ArrayParam,
        page: NumberParam,
        limit: NumberParam,
    });

    const [currPage, setCurrPage] = useState(1);
    const [totalPages, setTotalPages] = useState(5);

    const {
        city: areaName,
        cost: cafeCost,
        rating: cafeRating,
        parking: cafeParking,
        limit,
    } = query || {};
    // console.log("this is the query", query);

    // getting cafe info and setting it
    useEffect(() => {
        getCafeInfo(query).then((cafeData) => {
            setCafeInfo(cafeData);
            setTotalPages(cafeData.totalPages);
        });
    }, [query]);

    useEffect(() => {
        handleSearch(searchInputValue);
        handleCost(costs);
        handleCity(cities);
        handleRating(ratings);
        handleParking(parkings);
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

    const goToPage = (pageNum) => {
        if (pageNum >= 1 && pageNum <= totalPages) {
            setCurrPage(pageNum);
            setQuery({ ...query, page: pageNum });
        }
    };
    const goToNextPage = () => {
        if (currPage < totalPages) {
            const nextPage = currPage + 1;
            goToPage(nextPage);
        }
    };
    const goToPrevPage = () => {
        if (currPage > 1) {
            const prevPage = currPage - 1;
            goToPage(prevPage);
        }
    };

    return (
        <Paper elevation={4} sx={{ paddingBottom: 2 }}>
            <Stack spacing={2}>
                <List>
                    <ListSubheader>
                        <div className="font-bold m-0 p-0">Coffee Shops</div>
                    </ListSubheader>
                    {cafeInfo.cafes.map((cafe, index) => (
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
                <div className="flex flex-col items-center justify-center">
                    <div>
                        <IconButton size="large" onClick={goToPrevPage}>
                            <PageLeft fontSize="medium" />
                        </IconButton>
                        <IconButton size="large" onClick={goToNextPage}>
                            <PageRight fontSize="medium" />
                        </IconButton>
                    </div>
                    <div className="font-thin text-ml">
                        Page {currPage} of {totalPages}
                    </div>
                </div>
            </Stack>
        </Paper>
    );

    async function getCafeInfo(query) {
        try {
            const response = await axios.get("http://localhost:8080/cafe_api", {
                params: { ...query, limit: 5 },
            });
            const cafeData = response.data.cafes;
            const totalPages = response.data.totalPages;
            console.log(response.data);
            const cafes = cafeData.map((cafe) => {
                return {
                    name: cafe.Name,
                    address: cafe.Address,
                    parking: cafe.Parking,
                    cost: cafe.Cost,
                    area: cafe.Area,
                    parking_type: cafe.Parking_Type,
                };
            });
            return { cafes, totalPages };
        } catch (error) {
            console.log("error fetching cafe: ", error);
            return [];
        }
    }
};
