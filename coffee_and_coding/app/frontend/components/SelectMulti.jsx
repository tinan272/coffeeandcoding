"use client";
import React, { useState } from "react";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { Multiselect } from "./SelectMulti.jsx";

export const SelectMulti = ({ list, labelName, filterValue, setter }) => {
    const handleChange = (event) => {
        // setter passed in in <select> component
        const {
            target: { value },
        } = event;
        setter(
            // On autofill we get a stringified value.
            typeof value === "string" ? value.split(",") : value
        );
    };

    return (
        <div>
            <FormControl sx={{ m: 1, width: "100%" }}>
                <InputLabel id="demo-multiple-name-label">
                    {labelName}
                </InputLabel>
                <Select
                    labelId="demo-multiple-name-label"
                    id="demo-multiple-name"
                    multiple
                    value={filterValue}
                    onChange={(event) => handleChange(event, { setter })} //setter=setCityName
                    input={<OutlinedInput label="Name" />}
                >
                    {list.map((item) => (
                        <MenuItem key={item} value={item}>
                            {item}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </div>
    );
};
