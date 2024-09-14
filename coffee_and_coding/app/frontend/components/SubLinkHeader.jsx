"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useMediaQuery } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { Backdrop } from "@mui/material";
import MobileMenu from "./MobileMenu";

export default function SubLinkHeader({ title }) {
    const [menuOpen, setMenuOpen] = useState(false);
    const isMobile = useMediaQuery("(max-width:768px)");

    const links = [
        { name: "Home", href: "/" },
        { name: "Blog", href: "/blog" },
        { name: "About Us", href: "/about" },
    ];

    return (
        <div className="flex text-white justify-center w-full h-full">
            <div
                id="dark-blue-fill"
                className="flex flex-col md:flex-row h-full md:h-88 top-0 w-full p-10 md:p-24 justify-between items-center md:items-baseline"
            >
                <div className="flex justify-between items-center w-full md:w-auto">
                    <div id="title" className="font-light text-3xl md:text-4xl">
                        {title}
                    </div>
                    <div>
                        {isMobile && (
                            <button
                                onClick={() => setMenuOpen(!menuOpen)}
                                className="text-white"
                            >
                                {menuOpen ? null : <MenuIcon />}
                            </button>
                        )}
                    </div>
                </div>
                <div className="font-thin text-lg md:text-xl">
                    {!isMobile &&
                        links.map((link, index) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className="flex justify-between linkEffect linkEffect--insideOut my-2 md:my-0 md:mx-6"
                                onClick={() => setMenuOpen(false)}
                            >
                                {link.name}
                            </Link>
                        ))}
                </div>
            </div>
            <div className="flex-col md:flex-row font-thin text-lg md:text-xl mt-4 md:mt-0 text-center">
                <div>
                    <Backdrop
                        sx={{
                            color: "#fff",
                            zIndex: (theme) => theme.zIndex.drawer + 1,
                            minHeight: "100vw",
                            maxHeight: "100vh",
                        }}
                        open={menuOpen}
                        onClick={() => setMenuOpen(!menuOpen)}
                    >
                        <MobileMenu title={title} links={links} />
                    </Backdrop>
                </div>
            </div>
        </div>
    );
}
