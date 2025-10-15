"use client";
import React, { useState, useEffect } from "react";
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
import SortIcon from "@mui/icons-material/Sort";
import TuneIcon from "@mui/icons-material/Tune";
import Chip from "@mui/material/Chip";
import { StarRating } from "./StarRating";
import { useFilters } from "../../FilterContext.jsx";

export const ShopListDisplay = ({
    isMobile,
    handleFilterClick,
    allSelectedOptions,
}) => {
    const { query, setSort } = useFilters();

    // setting filter/search bar values
    const [cafeInfo, setCafeInfo] = useState({ cafes: [], totalPages: 0 });
    const [currPage, setCurrPage] = useState(1);
    const [totalPages, setTotalPages] = useState(5);

    useEffect(() => {
        const fetchCafes = async () => {
            try {
                const response = await axios.get(
                    "http://localhost:8083/cafe_api",
                    {
                        params: {
                            ...query,
                            page: currPage,
                            limit: 5,
                        },
                    }
                );

                setCafeInfo({
                    cafes: response.data.cafes.map((cafe) => ({
                        name: cafe.Name,
                        address: cafe.Address,
                        parking: cafe.Parking,
                        cost: cafe.Cost,
                        comfort: cafe.Comfort,
                        area: cafe.Area,
                        wifi: cafe.Wifi,
                        rating: cafe.Rating,
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
                    })),
                    totalPages: response.data.totalPages,
                });
            } catch (error) {
                console.log("error fetching cafe: ", error);
                setCafeInfo({ cafes: [], totalPages: 0 });
            }
        };

        fetchCafes();
    }, [query, currPage]);

    const goToPage = (pageNum) => {
        if (pageNum >= 1 && pageNum <= cafeInfo.totalPages) {
            setCurrPage(pageNum);
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
                                sx={{ color: "black", borderRadius: "0" }}
                                onClick={() => setSort("rating")}
                            >
                                <SortIcon
                                    fontSize={isMobile ? "small" : "medium"}
                                />
                                <div className="text-sm">Rating</div>
                            </IconButton>

                            <IconButton
                                sx={{ color: "black", borderRadius: "0" }}
                                onClick={() => setSort("cost")}
                            >
                                <SortIcon
                                    fontSize={isMobile ? "small" : "medium"}
                                />
                                <div className="text-sm">Cost</div>
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
                                <TuneIcon
                                    fontSize={isMobile ? "small" : "medium"}
                                />
                                <div className="text-sm">Filter</div>
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
};
