"use client";
import React, { useState } from "react";
import TextField from "@mui/material/TextField";

export const Search = ({ searchValueSetter}) => {

    const [inputValue, setInputValue] = useState("");
    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    };
    const handleEnterPress = (event) => {
        if (event.key === "Enter") {
            console.log("enter pressed");
            onEnterPress(inputValue);
        }
    };

    const onEnterPress = (inputValue) => {
        searchValueSetter(inputValue);
    };

    return (
        <div id="search-box" className="flex justify-center">
            <TextField
                sx={{ m: 1, width: "30%" }}
                id="outlined-required"
                label="Search"
                value={inputValue}
                onChange={handleInputChange}
                onKeyDown={handleEnterPress}
                // required
                // fullWidth
            />
        </div>
    );
};
