"use client";
import React, { useState } from "react";
import TextField from "@mui/material/TextField";

export const Search = ({ searchValueSetter, size }) => {
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
        <div id="search-box" className="flex w-full justify-center">
            <TextField
                sx={{
                    borderRadius: "0",
                    width: size === "large" ? "40%" : "100%",
                    "& .MuiOutlinedInput-root": {
                        borderRadius: "0",
                    },
                    backgroundColor: "white",
                }}
                fullWidth={size != "large"}
                size={size}
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
