"use client";
import React, { useEffect } from "react";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Modal from "@mui/material/Modal";
import { useFilters } from "../../FilterContext.jsx";

export const SelectMulti = ({ type, openMultiView, handleClose }) => {
    const { filters, updateCity, updateCost, updateRating, updateParking } =
        useFilters();

    const optionsDict = {
        cities: {
            list: [
                "Brookwood Hills",
                "Midtown",
                "Westside Provisions",
                "Georgia Tech",
                "Downtown Atlanta",
            ],
            labelName: "Area",
        },
        costs: {
            list: [1, 2, 3],
            labelName: "Cost",
        },
        ratings: {
            list: ["1", "2", "3", "4", "5"],
            labelName: "Rating",
        },
        parking: {
            list: [
                "Free",
                "Street",
                "Parking Deck",
                "Parking Lot",
                "Validated",
            ],
            labelName: "Parking",
        },
    };

    // Map type to the correct filter values and update function
    const filterMap = {
        cities: { values: filters.cities, update: updateCity },
        costs: { values: filters.costs, update: updateCost },
        ratings: { values: filters.ratings, update: updateRating }, // Note: plural "ratings"
        parking: { values: filters.parkings, update: updateParking },
    };

    // Get current selections from context
    const currentFilter = filterMap[type];
    const selectedOptions = currentFilter?.values || [];

    console.log("SelectMulti - type:", type); // Debug
    console.log("SelectMulti - selectedOptions:", selectedOptions); // Debug
    console.log("SelectMulti - filters:", filters); // Debug

    // Handle selection changes - updates URL immediately
    const handleChange = (event) => {
        const value = event.target.value;
        console.log("Selected values:", value); // Debug log
        console.log("Type of values:", typeof value[0]); // Debug log
        console.log("Current filter:", currentFilter); // Debug log

        if (currentFilter) {
            // Ensure values are strings for URL params
            const stringValues = Array.isArray(value)
                ? value.map((v) => String(v))
                : [String(value)];
            console.log("Updating with:", stringValues); // Debug log
            currentFilter.update(stringValues);
        }
    };

    if (!type || !optionsDict[type]) return null;

    return (
        <div>
            <Modal
                open={openMultiView}
                onClose={handleClose}
                sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <div className="flex w-2/3 h-1/2 md:w-1/2 md:h-1/2 flex-col bg-white">
                    <div
                        className="p-5 z-10 text-xl font-bold"
                        id="light-pink-fill"
                    >
                        {optionsDict[type].labelName}
                    </div>
                    <FormControl
                        sx={{
                            m: 3,
                            backgroundColor: "white",
                        }}
                    >
                        <InputLabel
                            id="demo-multiple-name-label"
                            sx={{ textAlign: "center" }}
                        >
                            {optionsDict[type].labelName}
                        </InputLabel>

                        <Select
                            label={optionsDict[type].labelName}
                            multiple
                            value={selectedOptions}
                            onChange={handleChange}
                            input={
                                <OutlinedInput
                                    label={optionsDict[type].labelName}
                                />
                            }
                        >
                            {optionsDict[type].list.map((option) => (
                                <MenuItem key={option} value={option}>
                                    {option}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </div>
            </Modal>
        </div>
    );
};
