"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useMediaQuery } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";

export default function Header({ title, links, img }) {
    const [menuOpen, setMenuOpen] = useState(false);
    const isMobile = useMediaQuery("(max-width:768px)");

    return (
        <div className="flex text-white justify-center w-full">
            <div
                id="dark-blue-fill"
                className="flex flex-col md:flex-row h-auto md:h-88 top-0 w-full p-4 md:p-24 justify-between items-center md:items-baseline"
            >
                <div className="flex justify-between items-center w-full md:w-auto">
                    <div id="title" className="font-light text-2xl md:text-4xl">
                        {title}
                    </div>
                    {isMobile && (
                        <button
                            onClick={() => setMenuOpen(!menuOpen)}
                            className="text-white"
                        >
                            {menuOpen ? <CloseIcon /> : <MenuIcon />}
                        </button>
                    )}
                </div>
                <div
                    className={`${
                        isMobile && !menuOpen ? "hidden" : "flex"
                    } flex-col md:flex-row font-thin text-lg md:text-xl mt-4 md:mt-0 text-center`}
                >
                    {links.map((link, index) => (
                        <Link
                            key={index}
                            href={link.href}
                            className="justify-between linkEffect linkEffect--insideOut my-2 md:my-0 md:mx-6"
                            onClick={() => setMenuOpen(false)}
                        >
                            {link.name}
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}
