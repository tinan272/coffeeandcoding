"use client";
import React, { useState } from "react";
import Image from "next/image";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { Search } from "./components/Search.jsx";
import { GoogleMap } from "./components/GoogleMap.jsx";
import { PopUp } from "./components/PopUp.jsx";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import Fade from "@mui/material/Fade";
import { MapContainer } from "./components/MapContainer.jsx";

const coffeeMarkers = [
    { lat: 37.7749, lng: -122.4194 }, // San Francisco, CA
    { lat: 40.7128, lng: -74.006 }, // New York City, NY
    { lat: 34.0522, lng: -118.2437 }, // Los Angeles, CA
];

export default function Home() {
    const [searchValue, setSearchValue] = useState("Atlanta, GA");
    const [placeClicked, setPlaceClicked] = useState("Atlanta, GA");

    const handlePlaceClicked = (place) => {
        setPlaceClicked(place);
    };

    const handleEnterPress = (inputValue) => {
        // console.log(inputValue);
        setSearchValue(inputValue);
    };
    const [checked, setChecked] = useState(false);

    const handleChange = () => {
        setChecked((prev) => !prev);
    };

    return (
        <main>
            <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
                <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
                    Coffee and Coding
                    <code className="font-mono font-bold"></code>
                </p>
            </div>

            <Box
                sx={{
                    flexGrow: 1,
                    padding: 5,
                    border: "1px solid red",
                }}
            >
                <Grid container spacing={2}>
                    <Grid item xs={4}>
                        <Grid container spacing={1}>
                            <Grid item xs={12}>
                                <Search onEnterPress={handleEnterPress} />
                            </Grid>
                            <Grid item xs={12} style={{ height: "100%" }}>
                                <FormControlLabel
                                    control={
                                        <Switch
                                            checked={checked}
                                            onChange={handleChange}
                                        />
                                    }
                                    label="Show from target"
                                />
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={8}>
                        <Box position="relative">
                            <MapContainer
                                searchValue={searchValue}
                                coffeeMarkers={coffeeMarkers}
                                handlePlaceClicked={handlePlaceClicked}
                            />
                            <Fade in={checked}>
                                <div
                                    style={{
                                        position: "absolute",
                                        top: 0,
                                        left: 0,
                                        height: "100%",
                                        zIndex: 2,
                                    }}
                                >
                                    <PopUp place={placeClicked} />
                                </div>
                            </Fade>
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </main>
    );
}
