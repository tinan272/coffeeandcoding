
// "use client";
// import React, { useState } from "react";
// import PropTypes from "prop-types";
// import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
// import Grid from "@mui/material/Grid";
// import { Box } from "@mui/material";
// const libraries = ["places"];
// const mapContainerStyle = {
//     height: "75vh",
// };
// const coffeeMarkers = [
//     { lat: 37.7749, lng: -122.4194 }, // San Francisco, CA
//     { lat: 40.7128, lng: -74.006 }, // New York City, NY
//     { lat: 34.0522, lng: -118.2437 }, // Los Angeles, CA
// ];

// export const MapContainer = ({ searchValue }) => {
//     const [selectedMarker, setSelectedMarker] = useState("");
//     const handleMarkerClick = () => {
//         console.log("CLICKED");
//     };
//     const { isLoaded, loadError } = useLoadScript({
//         googleMapsApiKey: process.env.NEXT_PUBLIC_API_Key,
//         libraries,
//     });

//     if (loadError) {
//         return <div>Error loading maps</div>;
//     }

//     if (!isLoaded) {
//         return <div>Loading maps</div>;
//     }

//     return (
//         <div>
//             <Box
//                 component="section"
//                 sx={{
//                     flexGrow: 1,
//                 }}
//             >
//                 {/* //   <GoogleMap mapContainerStyle={mapContainerStyle} zoom={10} center={coffeeMarkers[0]}>
//       //     {coffeeMarkers.map((place, index) => (
//       //       <Marker key={index} position={{ lat: place.lat, lng: place.lng }}
//       //       onClick={(event) => handleMarkerClick(event, place)}
//       //       />
//       //     ))}
//       //       <Marker position={searchValue}></Marker>
//       //   </GoogleMap> */}
//                 {/* <iframe
//                     src="https://www.google.com/maps/d/u/0/embed?mid=1Uh86O1UhVd_o2CAd5cm_FTQQlTTbrFM&ehbc=2E312F"
//                     width="640"
//                     height="480"
//                 ></iframe> */}
//             </Box>
//         </div>
//     );
// };

// // MapContainer.propTypes = {
// //   searchValue: PropTypes.string.isRequired,
// // };
