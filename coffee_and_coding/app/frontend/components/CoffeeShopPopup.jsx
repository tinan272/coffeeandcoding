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
import theme from "./theme.jsx";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import StarRateIcon from "@mui/icons-material/StarRate";


export const CoffeeShopPopup = ({
    handleOpen,
    handleClose,
    cafe
}) => {
    
    
    const [cafeName, setName] = useState("");
    const [cafeAddress, setAddress] = useState();
    const [cafeParking, setParking] = useState();
    const [cafeCost, setCost] = useState();
    const [cafeComfort, setComfort] = useState();
    const [cafeWifi, setWifi] = useState("");
    const [cafeArea, setArea] = useState();
    const [cafeRating, setRating] = useState();

    useEffect(() => {
        setName(cafe ? cafe.name : "");
        setAddress(cafe ? cafe.address : "");
        setParking(cafe ? cafe.parking : "");
        setCost(cafe ? cafe.cost : "");
        setComfort(cafe ? cafe.comfort : "");
        console.log(cafeComfort);
        setWifi(cafe ? cafe.wifi : "");
        setArea(cafe ? cafe.area : "");
        setRating(cafe ? cafe.rating : "");
        console.log(cafe);

    },[cafe]);

    const details = [
        { label: "Name", value: cafeName },
        { label: "Address", value: cafeAddress },
        { label: "Parking", value: cafeParking },
        { label: "Cost", value: cafeCost },
        { label: "Comfort", value: cafeComfort },
        { label: "WiFi", value: cafeWifi.toString() },
        { label: "Area", value: cafeArea },
    ];
 

    return (
        <div>
            <Modal
                open={handleOpen}
                onClose={handleClose}
                sx={{
                    display: "flex",
                    justifyContent: "center",
                }}
            >
                <div
                    className="flex flex-auto w-1/2 self-center mx-10 bg-white"
                >
                    <div id="photo" className="flex flex-auto w-1/2 bg-cyan-500 font-bold items-left"></div>
                    
                    <List sx={{ marginTop: "1rem", width: "100%" }}>
                        <ThemeProvider theme={theme}>
                            <ListItem
                                sx={{
                                    display: "flex",
                                    // flexDirection: "column",
                                    p: 0,
                                }}
                                >
                                    <div className="flex flex-col">
                                        <div className="flex items-center mx-5 my-2">
                                            <span className="text-left text-4xl font-semibold text-black">{cafeName}</span>
                                            <span className="text-left text-4xl font-semibold text-black">
                                                {Array.from({length: cafeRating,}).map((x, index) => (
                                                            <StarRateIcon
                                                                key={index}
                                                                fontSize="large"
                                                                className="mx-2 mb-1"
                                                            />
                                                        ))}</span>
                                        </div>
                                        <span className="text-left text-sm font-light text-gray mx-5">{cafeAddress}</span>
                                    </div>
                                    

                                {/* {details.map((detail, index) => 
                                    <div key={index} className="flex justify-evenly my-2"> 
                                        <span className="font-bold text-lg text-black-700 mr-2">{detail.label}:</span> 
                                        <span className="text-lg text-gray-500">{detail.value}</span>
                                    </div>
                                )} */}
                                    
                            </ListItem>
                        </ThemeProvider>
                    </List>
                </div>
            </Modal>
        </div>  
    );
};
