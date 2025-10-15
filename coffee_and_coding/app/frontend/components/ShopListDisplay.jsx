"use client";
import React, { useState, useEffect, useCallback } from "react";
import List from "@mui/material/List";
import Paper from "@mui/material/Paper";
import { ListSubheader } from "@mui/material";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import axios from "axios";
import PageRight from "@mui/icons-material/ArrowCircleRightOutlined";
import PageLeft from "@mui/icons-material/ArrowCircleLeftOutlined";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import { CoffeeShopPopup } from "./CoffeeShopPopup.jsx";
import SwapVertIcon from "@mui/icons-material/SwapVert";
import FilterListIcon from "@mui/icons-material/FilterList";
import Chip from "@mui/material/Chip";
import { StarRating } from "./StarRating";
import PropTypes from "prop-types";
import { storage } from "../../backend/firebase.js";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

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
    }, [searchInputValue, costs, cities, ratings, parkings, selectedSortValue]);

    const handleSearch = useCallback(
        (inputValue) => {
            setQuery({ search: inputValue });
        },
        [setQuery]
    );

    const handleSort = useCallback(
        (inputValue) => {
            let sortToString = " ";
            if (inputValue == "0") {
                sortToString = "cost";
            } else {
                sortToString = "rating";
            }
            setQuery({ sort: sortToString });
        },
        [setQuery]
    );
    const handleCity = useCallback(
        (selectedCities) => {
            setQuery({ city: selectedCities });
        },
        [setQuery]
    );

    const handleCost = useCallback(
        (selectedCost) => {
            setQuery({ cost: selectedCost });
        },
        [setQuery]
    );

    const handleRating = useCallback(
        (selectedRating) => {
            setQuery({ rating: selectedRating });
        },
        [setQuery]
    );

    const handleParking = useCallback(
        (selectedParking) => {
            setQuery({ parking: selectedParking });
        },
        [setQuery]
    );

    const goToPage = useCallback(
        (pageNum) => {
            if (pageNum >= 1 && pageNum <= totalPages) {
                setCurrPage(pageNum);
                setQuery({ ...query, page: pageNum });
            }
        },
        [setQuery, setCurrPage]
    );
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

    const convertCost = (repeatCount) => {
        return "$".repeat(repeatCount);
    };

    // coffee shop popup
    const [open, setOpen] = useState(false);
    const [cafe, setCafe] = useState();

    const handlePopupClick = (cafe) => {
        setOpen(true);
        console.log("open val", open);
        console.log("popup clicked");
        setCafe(cafe);
    };

    const handlePopupClose = () => setOpen(false);

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
                                    onClick={() => handlePopupClick(cafe)}
                                >
                                    <ListItemText
                                        primary={
                                            <div className="flex">
                                                <div>{cafe.name}</div>
                                                <div className="ml-1">
                                                    <StarRating
                                                        cafeRating={
                                                            cafe.overall_rating
                                                        }
                                                        starFont={"small"}
                                                    />
                                                </div>
                                            </div>
                                        }
                                        secondary={cafe.address}
                                    />
                                    <div>{convertCost(cafe.cost)}</div>
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
            <div>
                <CoffeeShopPopup
                    handleOpen={open}
                    handleClose={handlePopupClose}
                    cafe={cafe}
                    isMobile={isMobile}
                ></CoffeeShopPopup>
            </div>
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
                    comfort: cafe.Comfort,
                    area: cafe.Area,
                    wifi: cafe.Wifi,
                    imageURL: cafe.ImageURL,
                    parking_type: cafe.Parking_Type,
                    overall_rating: cafe.AvgOverallRating,
                    ambiance_rating: cafe.AvgAmbianceRating,
                    coffee_rating: cafe.AvgCoffeeRating,
                    service_rating: cafe.AvgServiceRating,
                    overall_rating_i: cafe.OverallRating,
                    ambiance_rating_i: cafe.AmbianceRating,
                    coffee_rating_i: cafe.CoffeeRating,
                    service_rating_i: cafe.ServiceRating,
                };
            });
            return { cafes, totalPages };
        } catch (error) {
            console.log("error fetching cafe: ", error);
            return [];
        }
    }
};

ShopListDisplay.propTypes = {
    searchInputValue: PropTypes.string.isRequired,
    selectedFilterValues: PropTypes.shape({
        cities: PropTypes.array.isRequired,
        costs: PropTypes.array.isRequired,
        ratings: PropTypes.array.isRequired,
        parkings: PropTypes.array.isRequired,
    }).isRequired,
    selectedSortValue: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
    ]),
    isMobile: PropTypes.bool.isRequired,
    handleFilterClick: PropTypes.func.isRequired,
    allSelectedOptions: PropTypes.array.isRequired,
};
