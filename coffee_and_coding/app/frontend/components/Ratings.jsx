"use client";
import React from "react";
import Divider from "@mui/material/Divider";

// Change function declaration to use the correct syntax
const Ratings = ({ overall, coffee, service, ambiance }) => {
    return (
        <div className="flex my-5 sm:my-10 text-sm sm:text-lg text-center justify-items-center">
            <div className="flex flex-col">
                <span className="font-bold text-black-700">{"Overall"}</span>
                <span className="text-gray-500 text-center">{overall}</span>
            </div>

            <div className="flex mx-4">
                <Divider
                    orientation="vertical"
                    variant="middle"
                    flexItem
                    sx={{
                        background: "black",
                    }}
                />
            </div>

            <div className="flex flex-col">
                <span className="font-bold text-black-700">{"Coffee"}</span>
                <span className="text-gray-500 text-center">{coffee}</span>
            </div>

            <div className="flex mx-4">
                <Divider
                    orientation="vertical"
                    variant="middle"
                    flexItem
                    sx={{
                        background: "black",
                    }}
                />
            </div>

            <div className="flex flex-col">
                <span className="font-bold text-black-700">{"Ambiance"}</span>
                <span className="text-gray-500">{ambiance}</span>
            </div>

            <div className="flex mx-4">
                <Divider
                    orientation="vertical"
                    variant="middle"
                    flexItem
                    sx={{
                        background: "black",
                    }}
                />
            </div>

            <div className="flex flex-col">
                <span className="font-bold text-black-700">{"Service"}</span>
                <span className="text-gray-500">{service}</span>
            </div>
        </div>
    );
};

export default Ratings;
