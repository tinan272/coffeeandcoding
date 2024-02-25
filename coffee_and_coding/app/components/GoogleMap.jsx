import React from "react";
import PropTypes from "prop-types";

export const GoogleMap = ({ searchValue }) => {
    return (
        <div id="map">
            <iframe
                title={`Map`}
                width="900"
                height="500"
                frameBorder="0"
                style={{ border: 0 }}
                referrerPolicy="no-referrer-when-downgrade"
                src={`https://www.google.com/maps/embed/v1/search?key=${process.env.NEXT_PUBLIC_API_Key}&q=${searchValue}`}
                allowFullScreen
            ></iframe>
        </div>
    );
};

GoogleMap.propTypes = {
    searchValue: PropTypes.string.isRequired,
};
