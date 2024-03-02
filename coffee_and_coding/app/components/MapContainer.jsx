"use client";
import React, { useState } from "react";
import PropTypes from "prop-types";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import Grid from "@mui/material/Grid";
import { Box } from "@mui/material";
const libraries = ["places"];
const mapContainerStyle = {
    height: "100vh",
};

export const MapContainer = ({
    searchValue,
    coffeeMarkers,
    handlePlaceClicked,
}) => {
    const [selectedMarker, setSelectedMarker] = useState("");
    const handleMarkerClick = (event, place) => {
        console.log(place);
        handlePlaceClicked(place);
    };
    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: process.env.NEXT_PUBLIC_API_Key,
        libraries,
    });

    if (loadError) {
        return <div>Error loading maps</div>;
    }

    if (!isLoaded) {
        return <div>Loading maps</div>;
    }

    return (
        <div>
            <Box
                component="section"
                sx={{
                    flexGrow: 1,
                }}
            >
                <GoogleMap
                    mapContainerStyle={mapContainerStyle}
                    zoom={10}
                    center={coffeeMarkers[0]}
                >
                    {coffeeMarkers.map((place, index) => (
                        <Marker
                            key={index}
                            position={{ lat: place.lat, lng: place.lng }}
                            onClick={(event) => handleMarkerClick(event, place)}
                        />
                    ))}
                    <Marker position={searchValue}></Marker>
                </GoogleMap>
            </Box>
        </div>
    );
};

// MapContainer.propTypes = {
//   searchValue: PropTypes.string.isRequired,
// };
