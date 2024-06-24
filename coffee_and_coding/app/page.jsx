"use client";
import React, { useState } from "react";
import MapContainer from "./frontend/components/MapContainer.jsx";
import { Button, ListItemButton, ListSubheader } from "@mui/material";
import { ShopListDisplay } from "./frontend/components/ShopListDisplay.jsx";
import { DisplayOptions } from "./frontend/components/DisplayOptions.jsx";
import background_img from "../public/background_img.jpg";
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
import { ThemeProvider } from "@mui/material/styles";
import theme from "./frontend/components/theme.jsx";
export default function Home() {
    const theme = createTheme({
        palette: {
            pink: {
                main: "#F08E80",
                light: "#FDF0E6",
                dark: "#F4AC9F",
                contrastText: "#242105",
            },
        },
    });
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

    const router = useRouter();

    return (
        <BrowserRouter>
            <QueryParamProvider adapter={ReactRouter6Adapter}>
                <ThemeProvider theme={theme}>
                    <main className="relative flex min-h-screen flex-col justify-between">
                        <div className="relative bg-white">
                            <Image
                                alt="Background"
                                src={background_img}
                                style={{
                                    height: "83vh",
                                    width: "100%",
                                    opacity: "50%",
                                }}
                            ></Image>

                            <div className="flex absolute top-0 w-full p-24 items-end">
                                <div
                                    className="flex-auto font-light text-6xl left-0 w-200"
                                    id="title"
                                >
                                    coffee&coding
                                </div>
                                <div className="flex-none w-60 left-0 font-thin text-xl">
                                    <div className="flex justify-end justify-around">
                                        <div>
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    router.push("/blog")
                                                }
                                            >
                                                Blog
                                            </button>
                                        </div>
                                        <div>
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    router.push("/about")
                                                }
                                            >
                                                About Us
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div></div>
                        </div>
                        <div className="flex-col py-8 text-center w-100 text-5xl font-light">
                            <div>Coffee Shop Map</div>
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
                                    <KeyboardArrowDownIcon fontSize="large" />
                                </IconButton>
                            </div>
                        </div>
                        <div id="map" className="mx-24 mb-24">
                            <Box
                                display="flex"
                                justifyItems="justify-items-center"
                            >
                                <Grid container spacing={2}>
                                    <Grid item xs={12}>
                                        <Search
                                            searchValueSetter={setSearchValue}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <div className="flex justify-center space-x-4">
                                            <Button
                                                sx={{ width: "10%" }}
                                                color="pink"
                                                variant="contained"
                                                onClick={() =>
                                                    handleFilterClick(0)
                                                }
                                            >
                                                Sort
                                            </Button>
                                            <Button
                                                color="pink"
                                                variant="contained"
                                                sx={{ width: "10%" }}
                                                onClick={() =>
                                                    handleFilterClick(1)
                                                }
                                            >
                                                Filter
                                            </Button>
                                        </div>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <ShopListDisplay
                                            selectedFilterValues={
                                                selectedFilterValues
                                            }
                                            searchInputValue={searchValue}
                                        />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <MapContainer />
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
                            />
                        </div>
                    </main>
                </ThemeProvider>
            </QueryParamProvider>
        </BrowserRouter>
    );
}
