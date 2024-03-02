import React from "react";
import PropTypes from "prop-types";

export const GoogleMap = ({ searchValue }) => {
    const defaultCenter = { lat: 40.7128, lng: -74.006 }; // Default center coordinates

    return (
        <iframe
            src="https://www.google.com/maps/d/u/0/embed?mid=1Uh86O1UhVd_o2CAd5cm_FTQQlTTbrFM&ehbc=2E312F"
            width="640"
            height="480"
        ></iframe>
    );
};

// MapContainer.propTypes = {
//     searchValue: PropTypes.string.isRequired,
// };
