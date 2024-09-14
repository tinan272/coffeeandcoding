"use client";
import React, { useState } from "react";
import Link from "next/link";
import CloseIcon from "@mui/icons-material/Close";

export default function MobileMenu({ title, links }) {
    return (
        <div className="flex flex-col bg-blue w-full h-screen bg-black font-thin">
            <div className="pt-10 px-10 flex flex-row justify-between items-end">
                <div id="title" className="text-3xl md:text-4xl">
                    {title}
                </div>
                <div>
                    <CloseIcon fontSize="large" />
                </div>
            </div>
            <div className="flex flex-col space-evenly justify-center items-center flex-grow text-lg md:text-4xl">
                <div className="flex flex-col justify-evenly h-1/4 text-center">
                    {links.map((link, index) => (
                        <div className="" key={index}>
                            <Link
                                href={link.href}
                                id="link"
                                className="text-4xl my-2 md:my-0 md:mx-6 gap-y-0.5"
                                onClick={() => setMenuOpen(false)}
                            >
                                {link.name}
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
