"use client";
import React, { useState } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Modal from "@mui/material/Modal";
import { SelectMulti } from "./SelectMulti";

const filterOptions = { 0: "Area", 1: "Cost", 2: "Rating", 3: "Parking" };
const sortOptions = { 0: "Cost", 1: "Rating" };

export const DisplayOptions = ({
    type,
    openView,
    handleClose,
    setSelectedFilterOptions,
    setSelectedSortOption,
}) => {
    const [openMultiView, setOpenMultiView] = useState(false);
    const [selectedType, setSelectedType] = useState(null);

    const handleOpenMultiView = (selectedType) => {
        setSelectedType(selectedType);
        setOpenMultiView(true);
    };

    const onCloseMultiView = () => {
        setOpenMultiView(false);
    };

    const renderOptions = (optionsDict) => {
        return Object.entries(optionsDict).map(([key, option]) => (
            <ListItemButton
                sx={{
                    width: "100%",
                    height: "3rem",
                    backgroundColor: "white",
                    boxShadow: 1,
                    paddingBottom: "1rem",
                }}
                onClick={() => {
                    {
                        type
                            ? handleOpenMultiView(key)
                            : setSelectedSortOption(key);
                    }
                }}
                key={key}
            >
                <ListItemText
                    primaryTypographyProps={{
                        fontSize: "1rem",
                        fontWeight: "light",
                        paddingLeft: "1rem",
                    }}
                    primary={option}
                />
            </ListItemButton>
        ));
    };

    // const { onClose, selectedValue, open } = props;

    return (
        <div>
            <Modal
                open={openView}
                onClose={handleClose}
                sx={{
                    display: "flex",
                    justifyContent: "center",
                }}
            >
                <div
                    id="light-pink-fill"
                    className="w-1/3 h-1/2 self-center z-10"
                >
                    <div className="flex bg-white font-bold items-center text-xl p-5">
                        {type ? "Filter" : "Sort"}
                    </div>
                    <List sx={{ marginTop: "1rem", width: "100%" }}>
                        <ListItem
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                                p: 0,
                            }}
                        >
                            {type
                                ? renderOptions(filterOptions)
                                : renderOptions(sortOptions)}
                        </ListItem>
                    </List>
                </div>
            </Modal>
            <SelectMulti
                openMultiView={openMultiView}
                handleClose={onCloseMultiView}
                type={selectedType}
                setSelectedFilterOptions={setSelectedFilterOptions}
            />
        </div>
    );
};

//    openMultiView,
// list,
// labelName,
// filterValue,
// setter,
