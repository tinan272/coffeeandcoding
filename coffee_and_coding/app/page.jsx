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
import { ReactRouter6Adapter } from "use-query-params/adapters/react-router-6";
import { BrowserRouter } from "react-router-dom";
import { Search } from "./frontend/components/Search.jsx";
import Header from "./frontend/components/HomeHeader.jsx";
import { QueryParamProvider } from "use-query-params";
import { FilterProvider, useFilters } from "./FilterContext.jsx";

function HomeContent() {
    const { allSelectedOptions, updateSearch } = useFilters(); // check FitlerContext.jsx
    const [open, setOpen] = React.useState(false);
    const [filterType, setFilterType] = useState(0); // State to track the filter type (sorting or filtering)
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const isMobile = useMediaQuery("(max-width:768px)");

    const handleFilterClick = (type) => {
        setFilterType(type);
        setOpen(true);
    };

    const handleFilterClose = () => {
        setOpen(false);
    };

    return (
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
                            document.getElementById("map").scrollIntoView({
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
                                searchValueSetter={updateSearch}
                                size={isMobile ? "small" : "large"}
                            />
                        </Grid>
                        <Grid item xs={12} md={6} className="mx-0">
                            <ShopListDisplay
                                handleFilterClick={handleFilterClick}
                                isMobile={isMobile}
                                allSelectedOptions={allSelectedOptions}
                            />
                        </Grid>
                        <Grid
                            item
                            id="map"
                            xs={12}
                            md={6}
                            sx={isMobile ? { mx: 4, height: "100%" } : {}}
                        >
                            <div className={isMobile ? "h-1/2" : "h-full"}>
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
                    isMobile={isMobile}
                />
            </div>
        </main>
    );
}

export default function Home() {
    return (
        <BrowserRouter>
            <QueryParamProvider adapter={ReactRouter6Adapter}>
                <FilterProvider>
                    <HomeContent />
                </FilterProvider>
            </QueryParamProvider>
        </BrowserRouter>
    );
}
