"use client";
import React, { useState, useEffect } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { SelectMulti } from "./SelectMulti";
import { Dropbox } from "dropbox";
import {
    Button,
    ListSubheader,
    ThemeProvider,
    Typography,
} from "@mui/material";

import theme from "./theme.jsx";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import StarRateIcon from "@mui/icons-material/StarRate";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import Switch from "@mui/material/Switch";
import { styled } from "@mui/material/styles";
import PersonIcon from "@mui/icons-material/Person";
import PeopleIcon from "@mui/icons-material/People";
import { StarRating } from "./StarRating";
import Ratings from "./Ratings";
const dbx = new Dropbox({
    accessToken:
        "sl.u.AFhZwRGnL8LE01yoo0qfAMPN3QGXKg4adsficAn2LeMf2RPximTJBtYmc_TIBQtK8820k0a7xAYYYdLB93PObC2RZxh_IxSdHMEezupB47VOfx7mMxsQvW5mr_gEkBKYGCM5gwdSX0FXpPXoCqBAdFemSWQkku-7nWZdoEfSw3GoV3vkbgrppd01m3z3t92TO48r8x65YbRm36fxiS6xml87AeNyhkKe6DfRVFEnFafsfo2kd4C86uz9X6GnQN_A8Jd0LSMpbQoylsOsdZEfHX_RSvnGL1lia1s8436Z-PmTzA8BMKxPd5JVSom08RBXQGHPJriV2BnLCbiIwWwXiAdjfaM_X7qZ9wuIEL-BOtDZgGs2-uHPiJXnZuN_O_-L0ZM-N3PQF5USRpVScyKRUOPU8z2DWbJ8wwk74E9_KK2lXagZ4R7ree86zuDQMQo8N5c82QrYgvNEMRJKHUBllUCE6YJ2gFn8-zD3NZ-7gVXecSIeI35h--0vpgIhu1uZSioWaUNFO1zbhKdyz5av-SqJp44twVaVFVE9JQoLFVDBxNDhynZCal9tLIXcnfE-pWY9xbHLI_npixYmqKUMAKHNzbsl68q_CLPalpZ4peQMkhhOZcBi5PhW6Jg40OIqTUBWIl_TgMMz54gX0WxcIaqDIlvFcxcfoxY_0syC1lBV0SzUJNPx_pA8wd2u0_jx8hIaPYxmN7-zHtCkshXVUVozg9yyVq2HJ7oPyHGRpBJf-z9a68xMt-UEpC6CepM4gY99_i06tX_ZS-DEk6hM0600VoBWKbWHMqeZnVihN4gSo7CgMoFKlou4MLHZoqtabk2aUAqPAIMk3AhfPuk0ryXIKOd0IXS83EefYz7N8icmIVo29NZSqACkVbGEwkDq-l0fRRB054eFrt_NEOIycJnjFJgUYkOg29n2ZR47LwDgTWwOZjuSgb-HIJdjbvEbaK8lx7aOB0IPN2ANSwqO5VrpHBlddTdC0WOvPc8XNbEHF43HrY3sIf2P7NkIXRjpowMnA2_7c-E_q1aFrPjfxGFfRo0DZoQiSY2J_5O02SX8UmgDQPtGa9PjQL1THht1vSeEENdUkUjYcJIeFN00ackpp8HbayclOt9fe8Vaz8Jqfm0AA3Chdukp-z91GQGjcID1dDWqPKo_0aaei8TkBOeZDRDWOCPM7bTvVg7NIYYM6styRbdvZAMQAbQcxKgd6NWnzjCPg1L6Nz-mrpZ2pqWtsXmhRo4mYqccrceK7yye5HqmiveCLjQwlXre9c0-lOuFpayHBJGpJ6Co8dVh-fsN",
});

const fetchFileFromDropbox = async (path) => {
    try {
        const response = await dbx.filesGetTemporaryLink({ path: path });
        return response.result.link;
    } catch (error) {
        console.error("Error fetching file from Dropbox:", error);
        throw error;
    }
};

export const CoffeeShopPopup = ({
    handleOpen,
    handleClose,
    cafe,
    isMobile,
}) => {
    // cafe info variables
    const [cafeName, setName] = useState("");
    const [cafeAddress, setAddress] = useState();
    const [cafeParking, setParking] = useState();
    const [cafeParkingType, setParkingType] = useState();
    const [cafeCost, setCost] = useState();
    const [cafeComfort, setComfort] = useState();
    const [cafeWifi, setWifi] = useState("");
    const [cafeArea, setArea] = useState();
    const [cafeRating, setRating] = useState();
    const [avgOverall, setAvgOverall] = useState();
    const [avgAmbiance, setAvgAmbiance] = useState();
    const [avgCoffee, setAvgCoffee] = useState();
    const [avgService, setAvgService] = useState();
    const [indivOverall, setIndivOverall] = useState();
    const [indivAmbiance, setIndivAmbiance] = useState();
    const [indivCoffee, setIndivCoffee] = useState();
    const [indivService, setIndivService] = useState();
    const [cafeImageURL, setCafeImageURL] = useState("/cafecomma.jpg");
    //
    // toggle switch
    const [checked, setChecked] = useState();

    const handleToggle = (event) => {
        setChecked(event.target.checked);
    };
    console.log(checked);

    const RatingSwitch = styled(Switch)(({ theme }) => ({
        width: 60,
        height: 34,
        padding: 7,
        "& .MuiSwitch-switchBase": {
            margin: 5,
            padding: 0,
            transform: "translateX(0px)",
            "&.Mui-checked": {
                color: "#fff",
                transform: "translateX(30px)",
                "& + .MuiSwitch-thumb:before": {
                    backgroundColor: "#f7bad8",
                },
                "& + .MuiSwitch-track": {
                    opacity: 1,
                    backgroundColor: "#aab4be",
                    ...theme.applyStyles("dark", {
                        backgroundColor: "#8796A5",
                    }),
                },
            },
        },
        "& .MuiSwitch-thumb": {
            backgroundColor: "#f7bad8",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",

            "& + .MuiSvgIcon-root": {
                fontSize: "small", // Icon size
                color: "#fff", // Icon color
            },
            "&::before": {
                position: "absolute",
                left: 0,
                top: 0,
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
                borderRadius: "50%", // Make sure it's circular
                backgroundColor: "#f7bad8", // Pink background color for the circle
            },
            ...theme.applyStyles("dark", {
                backgroundColor: "#003892",
            }),
        },
        "& .MuiSwitch-track": {
            opacity: 1,
            backgroundColor: "#aab4be",
            borderRadius: 20 / 2,
            ...theme.applyStyles("dark", {
                backgroundColor: "#8796A5",
            }),
        },
    }));

    useEffect(() => {
        setName(cafe ? cafe.name : "");
        setAddress(cafe ? cafe.address : "");
        setParking(cafe ? cafe.parking : "");
        setParkingType(cafe ? cafe.parking_type : "");
        setCost(cafe ? cafe.cost : "");
        setComfort(cafe ? cafe.comfort : "");
        console.log(cafeComfort);
        setWifi(cafe ? cafe.wifi : "");
        if (cafe && cafe.wifi == null) {
            setWifi("unknown");
        }
        setArea(cafe ? cafe.area : "");
        setRating(cafe ? cafe.rating : "");
        setAvgOverall(cafe ? cafe.overall_rating : "");
        setAvgAmbiance(cafe ? cafe.ambiance_rating : "");
        setAvgCoffee(cafe ? cafe.coffee_rating : "");
        setAvgService(cafe ? cafe.service_rating : "");
        setIndivOverall(cafe ? cafe.overall_rating_i : []);
        setIndivAmbiance(cafe ? cafe.ambiance_rating_i : []);
        setIndivCoffee(cafe ? cafe.coffee_rating_i : []);
        setIndivService(cafe ? cafe.service_rating_i : []);
        setCafeImageURL(cafe ? cafe.imageURL : ""); // Assuming cafe.images is an array of image URLs
        console.log(cafe);
        console.log(cafeWifi);
    }, [cafe]);

    return (
        <div>
            <Modal
                open={handleOpen}
                onClose={handleClose}
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center", // Center the popup
                }}
            >
                <div
                // className={` flex  ${
                //     isMobile
                //         ? " flex-auto flex-col my-5 mx-5 min-w-96"
                //         : "flex-row size-full mx-10"
                // }`}
                >
                    {/* photo carousel */}
                    {/* <div className="flex-1 bg-white justifyCenter">
                        <span className="text-gray-500 text-center">
                            <a
                                href={cafeImageURL}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-500 underline"
                            >
                                {cafeImageURL}
                            </a>
                        </span>
                    </div> */}
                    {/* coffee shop info */}
                    <div className=" flex flex-1  bg-white">
                        <List sx={{ marginTop: "1rem", width: "100%" }}>
                            <ThemeProvider theme={theme}>
                                <ListItem
                                    sx={{
                                        display: "flex",
                                        p: 0,
                                    }}
                                >
                                    <div
                                        className={`flex flex-1 flex-col w-full `}
                                    >
                                        <div className="flex text-xl md:text-4xl font-semibold text-black items-center mx-5 my-2">
                                            <span className="text-left">
                                                <a
                                                    href={cafeImageURL}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-blue-500 underline"
                                                >
                                                    {cafeName}
                                                </a>
                                            </span>
                                            <span className="text-left">
                                                <StarRating
                                                    cafeRating={avgOverall}
                                                    starFont={
                                                        isMobile
                                                            ? "small"
                                                            : "large"
                                                    }
                                                />
                                            </span>
                                        </div>

                                        {/* cafe info section */}
                                        <span className="text-left text-sm font-light text-gray mx-5">
                                            {cafeAddress}
                                        </span>
                                        <div className=" flex flex-1 flex-row flex-wrap justify-around mx-5">
                                            <div className="flex my-5 sm:my-10 text-sm sm:text-lg text-center justify-items-center">
                                                <div className="flex  flex-col">
                                                    <span className="font-bold text-black-700">
                                                        {"Parking"}
                                                    </span>
                                                    <span className=" text-gray-500 text-center">
                                                        {cafeParkingType}
                                                    </span>
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
                                                    <span className="font-bold text-black-700">
                                                        {"Cost"}
                                                    </span>
                                                    <span className=" text-gray-500 text-center">
                                                        {cafeCost}
                                                    </span>
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
                                                    <span className="font-bold text-black-700">
                                                        {"WiFi"}
                                                    </span>
                                                    <span className=" text-gray-500">
                                                        {cafeWifi.toString()}
                                                    </span>
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
                                                    <span className="font-bold text-black-700">
                                                        {"Area"}
                                                    </span>
                                                    <span className=" text-gray-500">
                                                        {cafeArea}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* additional notes section */}
                                        <div className="flex flex-col flex-wrap ">
                                            <span className="text-left text-md sm:text-xl font-semibold text-black mx-5">
                                                {"Additional Notes"}
                                            </span>

                                            <div className="flex flex-row text-sm sm:text-lg ml-5 my-2">
                                                <span className="text-left font-semibold text-black ml-5">
                                                    {"Parking: "}
                                                </span>
                                                <span className="text-left font-normal text-black ml-2">
                                                    {cafeParking}
                                                </span>
                                            </div>

                                            <div className="flex flex-row text-sm sm:text-lg ml-5 my-2">
                                                <span className="text-left font-semibold text-black ml-5">
                                                    {"Comfort: "}
                                                </span>
                                                <span className="text-left font-normal text-black ml-2">
                                                    {cafeComfort}
                                                </span>
                                            </div>

                                            <span className="text-left text-md sm:text-xl font-semibold text-black mx-5">
                                                {"Ratings"}
                                            </span>

                                            {/* toggle switch */}
                                            <Stack
                                                direction="row"
                                                component="label"
                                                alignItems="center"
                                                justifyContent="center"
                                            >
                                                <Typography>
                                                    Average Rating
                                                </Typography>
                                                <RatingSwitch
                                                    checked={checked}
                                                    onChange={handleToggle}
                                                    icon={
                                                        <PeopleIcon
                                                            fontSize="medium"
                                                            sx={{
                                                                backgroundColor:
                                                                    "#f7bad8",
                                                                borderRadius:
                                                                    "50%",
                                                            }}
                                                        />
                                                    }
                                                    checkedIcon={
                                                        <PersonIcon
                                                            fontSize="medium"
                                                            sx={{
                                                                backgroundColor:
                                                                    "#f7bad8",
                                                                borderRadius:
                                                                    "50%",
                                                            }}
                                                        />
                                                    }
                                                />
                                                <Typography>
                                                    Individual Rating
                                                </Typography>
                                            </Stack>
                                        </div>

                                        {/* ratings section */}
                                        {!checked ? (
                                            <div className="flex my-5 sm:my-10 text-sm sm:text-lg text-center justify-center">
                                                <Ratings
                                                    overall={avgOverall}
                                                    coffee={avgCoffee}
                                                    service={avgService}
                                                    ambiance={avgAmbiance}
                                                />
                                            </div>
                                        ) : (
                                            <div className="flex my-5 sm:my-10 text-sm sm:text-lg text-center justify-center">
                                                <div className="justify-center">
                                                    <Stack>
                                                        <Ratings
                                                            overall={
                                                                indivOverall[0]
                                                            }
                                                            coffee={
                                                                indivCoffee[0]
                                                            }
                                                            service={
                                                                indivService[0]
                                                            }
                                                            ambiance={
                                                                indivAmbiance[0]
                                                            }
                                                        />
                                                        <Ratings
                                                            overall={
                                                                indivOverall[0]
                                                            }
                                                            coffee={
                                                                indivCoffee[0]
                                                            }
                                                            service={
                                                                indivService[0]
                                                            }
                                                            ambiance={
                                                                indivAmbiance[0]
                                                            }
                                                        />
                                                    </Stack>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </ListItem>
                            </ThemeProvider>
                        </List>
                    </div>
                </div>
            </Modal>
        </div>
    );
};
