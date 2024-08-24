"use client";
import React, { useState, useEffect } from "react";
import MapContainer from "./frontend/components/MapContainer.jsx";
import { Button, ListItemButton, ListSubheader } from "@mui/material";
import { ShopListDisplay } from "./frontend/components/ShopListDisplay.jsx";
import { DisplayOptions } from "./frontend/components/DisplayOptions.jsx";
import background_img from "../public/condesa-coffee-2.png";
import Grid from "@mui/material/Grid";
import Image from "next/image";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import Box from "@mui/material/Box";
import { IconButton } from "@mui/material";
import { QueryParamProvider } from "use-query-params";
import { ReactRouter6Adapter } from "use-query-params/adapters/react-router-6";
import { BrowserRouter } from "react-router-dom";
import { useRouter } from "next/navigation";
import { Search } from "./frontend/components/Search.jsx";
import { createTheme } from "@mui/material/styles";
import { useMediaQuery } from "@mui/material";
import Header from "./frontend/components/MobileHeader.jsx";
import MobileHeader from "./frontend/components/MobileHeader.jsx";

export default function Home() {
    const [open, setOpen] = React.useState(0);
    const [filterType, setFilterType] = useState(0); // State to track the filter type (sorting or filtering)
    const [selectedCities, setSelectedCities] = useState([]);
    const [selectedCosts, setSelectedCosts] = useState([]);
    const [selectedRating, setSelectedRating] = useState([]);
    const [selectedParking, setSelectedParking] = useState([]);
    const [selectedSortValue, setSelectedSortValue] = useState(null);
    const [searchValue, setSearchValue] = useState("");
    const [allSelectedOptions, setAllSelectedOptions] = useState([]);

    const setters = {
        cities: setSelectedCities,
        costs: setSelectedCosts,
        ratings: setSelectedRating,
        parking: setSelectedParking,
    };
    const selectedFilterValues = {
        cities: selectedCities,
        costs: selectedCosts,
        ratings: selectedRating,
        parkings: selectedParking,
    };

    const handleFilterClick = (type) => {
        setFilterType(type);
        setOpen(true);
    };

    const handleFilterClose = () => {
        setOpen(false);
    };

    const onClear = () => {
        setSearchValue("");
        setSelectedCities([]);
        setSelectedCosts([]);
        setSelectedRating([]);
        setSelectedParking([]);
        console.log("clear all");
    };

    const links = [
        { name: "Home", href: "/" },
        { name: "Blog", href: "/blog" },
        { name: "About Us", href: "/about" },
    ];

    const router = useRouter();
    const isMobile = useMediaQuery("(max-width:768px)");
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
        <BrowserRouter>
            <QueryParamProvider adapter={ReactRouter6Adapter}>
                <main className="relative flex min-h-screen w-full flex-col justify-between">
                    {isMobile ? (
                        <MobileHeader
                            title={"coffee&coding"}
                            links={links}
                            img={background_img}
                            isMobile={isMobile}
                            menuOpen={mobileMenuOpen}
                            setOpen={setMobileMenuOpen}
                        />
                    ) : (
                        <Header
                            title={"coffee&coding"}
                            links={links}
                            img={background_img}
                        />
                    )}

                    <div className="flex-col pt-8 md:py-8 text-center w-100 text-2xl md:text-5xl font-light">
                        <div id="title">Coffee Shop Map</div>
                        <div>
                            <IconButton
                                sx={{ color: "black" }}
                                onClick={() => {
                                    document
                                        .getElementById("map")
                                        .scrollIntoView({
                                            behavior: "smooth",
                                        });
                                }}
                            >
                                <KeyboardArrowDownIcon
                                    fontSize={isMobile ? "small" : "large"}
                                />
                            </IconButton>
                        </div>
                    </div>
                    <div id="content" className="mx-0 mb-8 md:mx-24 md:mb-24">
                        <Box display="flex" justifyItems="justify-items-center">
                            <Grid container spacing={2} gap={isMobile ? 3 : 0}>
                                <Grid
                                    item
                                    xs={12}
                                    md={12}
                                    sx={isMobile ? { mx: 4 } : {}}
                                >
                                    <Search
                                        searchValueSetter={setSearchValue}
                                        size={isMobile ? "small" : "large"}
                                    />
                                </Grid>
                                <Grid item xs={12} md={6} className="mx-0">
                                    <ShopListDisplay
                                        selectedFilterValues={
                                            selectedFilterValues
                                        }
                                        selectedSortValue={selectedSortValue}
                                        searchInputValue={searchValue}
                                        isMobile={isMobile}
                                        handleFilterClick={handleFilterClick}
                                        allSelectedOptions={allSelectedOptions}
                                    />
                                </Grid>
                                <Grid
                                    item
                                    id="map"
                                    xs={12}
                                    md={6}
                                    sx={
                                        isMobile
                                            ? { mx: 4, height: "100%" }
                                            : {}
                                    }
                                >
                                    <div
                                        className={
                                            isMobile ? "h-1/2" : "h-full"
                                        }
                                    >
                                        <MapContainer />
                                    </div>
                                </Grid>
                            </Grid>
                        </Box>
                    </div>
                    <div>
                        <DisplayOptions //sorting or filtering options
                            type={filterType}
                            openView={open}
                            handleClose={handleFilterClose}
                            selectedFilterValues={selectedFilterValues}
                            selectedSortValue={selectedSortValue} // "Rating"
                            setSelectedSortValue={setSelectedSortValue} // "Rating"
                            setters={setters}
                            onClear={onClear}
                            isMobile={isMobile}
                            setAllSelectedOptions={setAllSelectedOptions}
                        />
                    </div>
                </main>
            </QueryParamProvider>
        </BrowserRouter>
    );
}
