// "use client";
// import React, { useState } from "react";
// import TextField from "@mui/material/TextField";

// export const Search = ({ onEnterPress }) => {
//     const [inputValue, setInputValue] = useState("");
//     const handleInputChange = (event) => {
//         setInputValue(event.target.value);
//     };
//     const handleEnterPress = (event) => {
//         if (event.key === "Enter") {
//             console.log("enter pressed");
//             onEnterPress(inputValue);
//         }
//     };

//     return (
//         <div id="search-box">
//             <TextField
//                 // required
//                 id="outlined-required"
//                 label="Search Box"
//                 value={inputValue}
//                 onChange={handleInputChange}
//                 onKeyDown={handleEnterPress}
//                 fullWidth
//             />
//         </div>
//     );
// };
