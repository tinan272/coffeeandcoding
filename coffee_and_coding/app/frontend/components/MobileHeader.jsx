"use client";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import MobileMenu from "../components/MobileMenu";
import { Backdrop } from "@mui/material";

export default function MobileHeader({
    title,
    img,
    isMobile,
    menuOpen,
    setOpen,
    links,
}) {
    return (
        <div>
            <div className="relative">
                {img ? (
                    <Image
                        alt="Background"
                        src={img}
                        style={{
                            maxHeight: "83vh",
                            maxWidth: "100%",
                            opacity: "100%",
                        }}
                    ></Image>
                ) : null}
                <div className="absolute flex top-0 w-full p-10 md:p-16 items-end">
                    <div
                        className="flex-auto font-light text-3xl md:text-6xl left-0 w-200 text-white"
                        id="title"
                    >
                        {title}
                    </div>

                    <div className="font-thin sm:text-base md:text-xl">
                        <div className="flex justify-around">
                            {isMobile && (
                                <button
                                    onClick={() => setOpen(!menuOpen)}
                                    className="text-white"
                                >
                                    {menuOpen ? (
                                        <CloseIcon />
                                    ) : (
                                        <MenuIcon fontSize="large" />
                                    )}
                                </button>
                            )}
                        </div>
                    </div>
                    {!isMobile && (
                        <div className="flex-none w-90 left-0 font-thin sm:text-base md:text-xl">
                            <div className="flex justify-end justify-around">
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
                    )}
                </div>
            </div>
            <div>
                <Backdrop
                    sx={{
                        color: "#fff",
                        zIndex: (theme) => theme.zIndex.drawer + 1,
                        minHeight: "100vw",
                        maxHeight: "100vh",
                    }}
                    open={menuOpen}
                    onClick={() => setOpen(!menuOpen)}
                >
                    <MobileMenu title={title} links={links} />
                </Backdrop>
            </div>
        </div>
    );
}
