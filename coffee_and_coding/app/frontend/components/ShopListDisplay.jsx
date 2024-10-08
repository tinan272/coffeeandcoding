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
import StarRateIcon from "@mui/icons-material/StarRate";
import SwapVertIcon from "@mui/icons-material/SwapVert";
import FilterListIcon from "@mui/icons-material/FilterList";
import Chip from "@mui/material/Chip";
import { StarRating } from "./StarRating";

import {
    useQueryParams,
    NumberParam,
    StringParam,
    ArrayParam,
} from "use-query-params";

export const ShopListDisplay = ({
    searchInputValue,
    selectedFilterValues,
    selectedSortValue,
    isMobile,
    handleFilterClick,
    allSelectedOptions,
}) => {
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
        sort: StringParam,
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
        handleSort(selectedSortValue);
    });

    const handleSearch = (inputValue) => {
        setQuery({ search: inputValue });
    };

    const handleSort = (inputValue) => {
        var sortToString = " ";
        if (inputValue == "0") {
            sortToString = "cost";
        } else {
            sortToString = "rating";
        }
        setQuery({ sort: sortToString });
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
        <Paper
            elevation={isMobile ? 0 : 4}
            sx={{ paddingBottom: 2, paddingTop: 2, borderRadius: "0" }}
            className={isMobile ? "w-full" : null}
        >
            <Stack spacing={2}>
                <List>
                    <div className="flex justify-between items-end">
                        <ListSubheader>
                            <div className="font-bold m-0 p-0 text-lg">
                                Coffee Shops
                            </div>
                        </ListSubheader>
                        <div className="text-sm flex float-right">
                            <IconButton
                                sx={{
                                    color: "black",
                                    borderRadius: "0",
                                }}
                                color="pink"
                                variant="contained"
                                onClick={() => handleFilterClick(0)} //0 = sort
                            >
                                <div className="text-sm">Sort</div>
                                <SwapVertIcon
                                    fontSize={isMobile ? "small" : "medium"}
                                />
                            </IconButton>
                            <IconButton
                                sx={{
                                    color: "black",
                                    borderRadius: "0",
                                }}
                                color="pink"
                                variant="contained"
                                onClick={() => handleFilterClick(1)} //1= sort
                            >
                                <div className="text-sm">Filter</div>
                                <FilterListIcon
                                    fontSize={isMobile ? "small" : "medium"}
                                />
                            </IconButton>
                        </div>
                    </div>
                    <Stack direction="row" spacing={1} p={2}>
                        {allSelectedOptions.map((option, index) => (
                            <Chip key={index} label={option} />
                        ))}
                    </Stack>
                    <div>
                        {cafeInfo.cafes.map((cafe, index) => (
                            <ListItemButton key={index}>
                                <ListItem
                                    sx={{
                                        borderBottom: 1,
                                        borderColor: "divider",
                                    }}
                                >
                                    <ListItemText
                                        primary={
                                            <div className="flex">
                                                <div>{cafe.name}</div>
                                                <div className="ml-1">
                                                    <StarRating
                                                        cafeRating={
                                                            cafe.rating
                                                        }
                                                    />
                                                </div>
                                            </div>
                                        }
                                        secondary={cafe.address}
                                    />
                                    {cafe.cost}
                                </ListItem>
                            </ListItemButton>
                        ))}
                    </div>
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
            const response = await axios.get("http://localhost:8083/cafe_api", {
                params: { ...query, limit: 5 },
            });
            const cafeData = response.data.cafes;
            const totalPages = response.data.totalPages;
            console.log(response.data);
            const cafes = cafeData.map((cafe) => {
                console.log("this is the rating", cafe.AvgOverallRating);
                return {
                    name: cafe.Name,
                    address: cafe.Address,
                    parking: cafe.Parking,
                    cost: cafe.Cost,
                    area: cafe.Area,
                    parking_type: cafe.Parking_Type,
                    rating: cafe.AvgOverallRating,
                };
            });
            // console.log("type of", typeof cafes[0].rating);
            return { cafes, totalPages };
        } catch (error) {
            console.log("error fetching cafe: ", error);
            return [];
        }
    }
};
