"use client";
import React, { useState, useEffect } from "react";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Modal from "@mui/material/Modal";

export const SelectMulti = ({
    type,
    openMultiView,
    handleClose,
    setters,
    clearMulti,
}) => {
    useEffect(() => {
        if (clearMulti) {
            setSelectedOptions([]);
        }
    }, [clearMulti]);
    const [selectedOptions, setSelectedOptions] = useState([]);
    const handleChange = (event) => {
        const {
            target: { value },
        } = event;
        const newSelectedOptions =
            typeof value === "string" ? value.split(",") : value;
        setSelectedOptions(newSelectedOptions);
        let options = value.filter((option) => {
            switch (type) {
                case "cities":
                    console.log(optionsDict.cities.list.includes(option));
                    return optionsDict.cities.list.includes(option);
                case "costs":
                    return optionsDict.costs.list.includes(option);
                case "ratings":
                    return optionsDict.ratings.list.includes(option);
                case "parking":
                    return optionsDict.parking.list.includes(option);
                default:
                    return "Not found";
            }
        });
        setters[type](options);
    };

    const optionsDict = {
        cities: {
            list: ["Atlanta", "Buckhead", "Marietta", "Roswell"],
            labelName: "Area",
        },
        costs: {
            list: ["$", "$$", "$$$"],
            labelName: "Cost",
        },
        ratings: {
            list: [1, 2, 3, 4, 5],
            labelName: "Rating",
        },
        parking: {
            list: ["Free Parking", "Easy Parking"],
            labelName: "Parking",
        },
    };

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
                <div className="flex bg-white w-1/2 h-2/3 flex-col">
                    <div
                        id="light-pink-fill"
                        className="p-5 z-10 text-xl font-bold"
                    >
                        {optionsDict[type]?.labelName}
                    </div>
                    <FormControl
                        sx={{
                            backgroundColor: "white",
                            m: 3,
                        }}
                    >
                        <InputLabel
                            id="demo-multiple-name-label"
                            sx={{ textAlign: "center" }}
                        >
                            {optionsDict[type]?.labelName}
                        </InputLabel>

                        <Select
                            label="select"
                            multiple
                            value={selectedOptions}
                            onChange={handleChange}
                            input={<OutlinedInput label="Name" />}
                        >
                            {optionsDict[type]?.list.map((option) => (
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
