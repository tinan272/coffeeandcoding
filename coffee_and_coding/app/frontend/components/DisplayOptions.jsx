"use client";
import React, { useState } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { SelectMulti } from "./SelectMulti";
import { Button, ThemeProvider } from "@mui/material";
import theme from "./theme.jsx";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { useFilters } from "../../FilterContext";

const filterOptions = {
    cities: "Area",
    // costs: "Cost",
    ratings: "Rating",
};
const sortOptions = { 0: "Cost", 1: "Rating" };

export const DisplayOptions = ({
    type, // 0 = sort, 1 = filter
    openView, // open modal
    handleClose, // close modal
    isMobile,
}) => {
    const [openMultiView, setOpenMultiView] = useState(false);
    const [selectedType, setSelectedType] = useState(null);
    const [clearMulti, setClearMulti] = useState(false);

    // Get everything from context
    const { filters, setSort, clearAll } = useFilters();

    const handleOpenMultiView = (selectedType) => {
        setSelectedType(selectedType);
        setOpenMultiView(true);
    };

    const onCloseMultiView = () => {
        setOpenMultiView(false);
    };

    const handleOnClear = () => {
        clearAll();
        setClearMulti((prev) => !prev);
    };

    const getSelectedValues = (key) => {
        // Map the key to the correct filter value
        const filterMap = {
            cities: filters.cities,
            costs: filters.costs,
            ratings: filters.ratings,
            parkings: filters.parkings,
        };

        const values = filterMap[key] || [];
        return values.join(", ");
    };

    const handleOpenSortOrFilter = (key) => {
        if (type === 1) {
            // Filter mode - open multi-select
            handleOpenMultiView(key);
        } else {
            // Sort mode - toggle sort value
            if (key == filters.sort) {
                setSort(null);
            } else {
                setSort(key);
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
                    secondary={getSelectedValues(key)}
                />
                {!type && // Sort mode - show checkmark for selected sort
                    filters.sort === key && (
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
                open={openView}
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
                                ? renderOptions(filterOptions)
                                : renderOptions(sortOptions)}
                        </ListItem>
                    </List>
                    {type ? (
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
            />
        </div>
    );
};
