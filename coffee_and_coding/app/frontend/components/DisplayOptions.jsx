"use client";
import React, { useState, useEffect } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { SelectMulti } from "./SelectMulti";
import { Button, ListSubheader, ThemeProvider } from "@mui/material";
import axios from "axios";
import theme from "./theme.jsx";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

const filterOptions = {
    cities: "Area",
    costs: "Cost",
    ratings: "Rating",
    parking: "Parking",
};
const sortOptions = { 0: "Cost", 1: "Rating" };

export const DisplayOptions = ({
    type, // sort or filter
    openView, // open select view
    handleClose, // close view
    setters, // setters for cities, cost, rating, parking
    onClear, // clear all setters + select multi
    selectedFilterValues, // "$$", "Atlanta" if those were selecte
    selectedSortValue, // "cost" or "rating"
    setSelectedSortValue, // stores chosen sort value
    isMobile,
    setAllSelectedOptions,
}) => {
    const [openMultiView, setOpenMultiView] = useState(false);
    const [selectedType, setSelectedType] = useState(null);
    const { cities, costs, ratings, parking } = selectedFilterValues;
    const [clearMulti, setClearMulti] = useState(false);

    const handleOpenMultiView = (selectedType) => {
        setSelectedType(selectedType);
        setOpenMultiView(true);
    };

    const onCloseMultiView = () => {
        setOpenMultiView(false);
    };

    const handleOnClear = () => {
        onClear();
        setClearMulti((prev) => !prev);
    };

    const getSelectedValues = (key) => {
        if (selectedFilterValues.hasOwnProperty(key)) {
            return selectedFilterValues[key].join(", ");
        } else {
            return "";
        }
    };

    const handleOpenSortOrFilter = (key) => {
        if (type === 1) {
            handleOpenMultiView(key);
        } else {
            if (key == selectedSortValue) {
                setSelectedSortValue(null);
            } else {
                setSelectedSortValue(key);
            }
        }
    };

    const renderOptions = (optionsDict) => {
        return Object.entries(optionsDict).map(([key, option]) => (
            <ListItemButton
                sx={{
                    width: "100%",
                    backgroundColor: "white",
                    boxShadow: 1,
                }}
                onClick={() => handleOpenSortOrFilter(key)}
                key={key}
            >
                <ListItemText
                    primaryTypographyProps={{
                        fontSize: "1rem",
                        fontWeight: "light",
                        paddingLeft: "1rem",
                    }}
                    secondaryTypographyProps={{
                        paddingLeft: "1rem",
                    }}
                    primary={option}
                    secondary={getSelectedValues(key)} // Display selected values here
                />
                {!type && // if type == 1, sort, then display the checked icon on btn
                    selectedSortValue === key && (
                        <Box>
                            <CheckCircleOutlineIcon fontSize="medium" />
                        </Box>
                    )}
            </ListItemButton>
        ));
    };

    return (
        <div>
            <Modal
                open={openView ? true : false}
                onClose={handleClose}
                sx={{
                    display: "flex",
                    justifyContent: "center",
                }}
            >
                <div
                    id="light-pink-fill"
                    className="h-auto w-2/3 md:w-1/3 self-center z-10"
                >
                    <div className="flex bg-white font-bold items-center text-xl p-5">
                        {type ? "Filter" : "Sort"}
                    </div>
                    <List sx={{ marginTop: "1rem", width: "100%" }}>
                        <ListItem
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                                p: 0,
                            }}
                        >
                            {type
                                ? renderOptions(filterOptions) // filter: area, cost, rating, parking
                                : renderOptions(sortOptions)}
                        </ListItem>
                    </List>
                    {type ? ( // if type == true (filter), then display clear filters
                        <ThemeProvider theme={theme}>
                            <Button
                                sx={{
                                    margin: "15px",
                                    borderRadius: "0",
                                    color: "white",
                                }}
                                color="pink"
                                variant="contained"
                                onClick={handleOnClear}
                            >
                                Clear Filters
                            </Button>
                        </ThemeProvider>
                    ) : (
                        <div id="empty" className="m-3"></div>
                    )}
                </div>
            </Modal>
            <SelectMulti
                openMultiView={openMultiView}
                handleClose={onCloseMultiView}
                type={selectedType}
                setters={setters} //setters for cities,costs,ratings,parking..
                clearMulti={clearMulti}
                isMobile={isMobile}
                setAllSelectedOptions={setAllSelectedOptions}
            />
        </div>
    );
};
