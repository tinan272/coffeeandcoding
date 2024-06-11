"use client";
import React, { useState } from "react";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { Multiselect } from "./SelectMulti.jsx";
import Modal from "@mui/material/Modal";

export const SelectMulti = ({
    type,
    openMultiView,
    handleClose,
    setSelectedFilterOptions,
}) => {
    const [selectedOptions, setSelectedOptions] = useState([]);
    const handleChange = (event) => {
        const {
            target: { value },
        } = event;
        const newSelectedOptions =
            typeof value === "string" ? value.split(",") : value;

        setSelectedOptions(newSelectedOptions);
        setSelectedFilterOptions(newSelectedOptions.join(" , "));
    };

    const optionsDict = {
        0: {
            list: ["Atlanta", "Buckhead", "Marietta", "Roswell"],
            labelName: "Area",
        },
        1: {
            list: ["$", "$$", "$$$"],
            labelName: "Cost",
        },
        2: {
            list: [1, 2, 3, 4, 5],
            labelName: "Rating",
        },
        3: {
            list: ["Free Parking"],
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
