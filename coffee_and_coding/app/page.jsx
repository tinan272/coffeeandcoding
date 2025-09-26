"use client";
import React, { useCallback, useMemo, useState } from "react";
import MapContainer from "./frontend/components/MapContainer.jsx";
import { ShopListDisplay } from "./frontend/components/ShopListDisplay.jsx";
import { DisplayOptions } from "./frontend/components/DisplayOptions.jsx";
import background_img from "../public/condesa-coffee-2.png";
import Grid from "@mui/material/Grid";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import Box from "@mui/material/Box";
import { useMediaQuery, IconButton } from "@mui/material";
import { QueryParamProvider } from "use-query-params";
import { ReactRouter6Adapter } from "use-query-params/adapters/react-router-6";
import { BrowserRouter } from "react-router-dom";
import { Search } from "./frontend/components/Search.jsx";
import Header from "./frontend/components/HomeHeader.jsx";

export function useFilterState() {
    const [open, setOpen] = React.useState(0);
    const [filterType, setFilterType] = useState(0); // State to track the filter type (sorting or filtering)
    const [selectedCities, setSelectedCities] = useState([]);
    const [selectedCosts, setSelectedCosts] = useState([]);
    const [selectedRating, setSelectedRating] = useState([]);
    const [selectedParking, setSelectedParking] = useState([]);
    const [selectedSortValue, setSelectedSortValue] = useState(null);
    const [searchValue, setSearchValue] = useState("");

    const setters = {
        cities: setSelectedCities,
        costs: setSelectedCosts,
        ratings: setSelectedRating,
        parking: setSelectedParking,
    };
    const selectedFilterValues = useMemo(
        () => ({
            cities: selectedCities,
            costs: selectedCosts,
            ratings: selectedRating,
            parkings: selectedParking,
        }),
        [selectedCities, selectedCosts, selectedRating, selectedParking]
    );

    const handleFilterClick = useCallback((type) => {
        // useCallback to develop SINGLE instance when passed down to MEMOIZED children
        setFilterType(type);
        setOpen(true);
    }, []);

    const handleFilterClose = useCallback(() => {
        setOpen(false);
    }, [setOpen]);

    const onClear = () => {
        setSearchValue("");
        setSelectedCities([]);
        setSelectedCosts([]);
        setSelectedRating([]);
        setSelectedParking([]);
        console.log("clear all");
    };

    const updateFilters = useCallback((updates) => {
        if (updates.cities !== undefined) setSelectedCities(updates.cities);
        if (updates.costs !== undefined) setSelectedCosts(updates.costs);
        if (updates.ratings !== undefined) setSelectedRating(updates.ratings);
        if (updates.parking !== undefined) setSelectedParking(updates.parking);
        if (updates.sortValue !== undefined)
            setSelectedSortValue(updates.sortValue);
        if (updates.searchValue !== undefined)
            setSearchValue(updates.searchValue);
    }, []);

    return {
        // State values
        open,
        filterType,
        selectedCities,
        selectedCosts,
        selectedRating,
        selectedParking,
        selectedSortValue,
        searchValue,

        // Derived state
        setters,
        selectedFilterValues,

        // State setters
        setOpen,
        setFilterType,
        setSelectedCities,
        setSelectedCosts,
        setSelectedRating,
        setSelectedParking,
        setSelectedSortValue,
        setSearchValue,

        // Handlers
        handleFilterClick,
        handleFilterClose,
        onClear,
        updateFilters,
    };
}

export default function Home() {
    const filters = useFilterState();
    const [allSelectedOptions, setAllSelectedOptions] = useState([]);

    const isMobile = useMediaQuery("(max-width:768px)");
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
        <BrowserRouter>
            <QueryParamProvider adapter={ReactRouter6Adapter}>
                <main className="relative flex min-h-screen w-full flex-col justify-between">
                    <Header
                        title={"coffee&coding"}
                        img={background_img}
                        isMobile={isMobile}
                        menuOpen={mobileMenuOpen}
                        setOpen={setMobileMenuOpen}
                    />
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
                                        searchValueSetter={
                                            filters.setSearchValue
                                        }
                                        size={isMobile ? "small" : "large"}
                                    />
                                </Grid>
                                <Grid item xs={12} md={6} className="mx-0">
                                    <ShopListDisplay
                                        selectedFilterValues={
                                            filters.selectedFilterValues
                                        }
                                        selectedSortValue={
                                            filters.selectedSortValue
                                        }
                                        searchInputValue={filters.searchValue}
                                        isMobile={isMobile}
                                        handleFilterClick={
                                            filters.handleFilterClick
                                        }
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
                            type={filters.filterType}
                            openView={filters.open}
                            handleClose={filters.handleFilterClose}
                            selectedFilterValues={filters.selectedFilterValues}
                            selectedSortValue={filters.selectedSortValue} // "Rating"
                            setSelectedSortValue={filters.setSelectedSortValue} // "Rating"
                            setters={filters.setters}
                            onClear={filters.onClear}
                            isMobile={isMobile}
                            setAllSelectedOptions={setAllSelectedOptions}
                        />
                    </div>
                </main>
            </QueryParamProvider>
        </BrowserRouter>
    );
}
