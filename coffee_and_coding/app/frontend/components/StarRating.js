import React, { useEffect } from "react";
import StarRateIcon from "@mui/icons-material/StarRate";
import StarHalfIcon from "@mui/icons-material/StarHalf";

export const StarRating = ({ cafeRating }) => {
    const numFullStars = Math.floor(cafeRating);
    const hasHalfStar = cafeRating % 1 !== 0;
    return (
        <div className="flex justify-center">
            {Array.from({
                length: numFullStars,
            }).map((stars, index) => (
                <StarRateIcon key={index} fontSize="small" />
            ))}
            {hasHalfStar && <StarHalfIcon fontSize="small" />}
        </div>
    );
};
