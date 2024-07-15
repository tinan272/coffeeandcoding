"use client";
import React, { useState } from "react";
import Link from "next/link";

export default function Header({ title, links }) {
    return (
        <div className="flex text-white justify-center">
            <div
                id="dark-blue-fill"
                className="flex h-88 top-0 w-full p-24 justify-between items-baseline"
            >
                <div id="title" className="font-light text-4xl">
                    {title}
                </div>
                <div className="flex font-thin text-xl pr-6">
                    <div className="flex">
                        {links.map((link, index) => (
                            <Link
                                key={index}
                                href={link.href}
                                className="justify-between linkEffect linkEffect--insideOut mx-6"
                            >
                                {link.name}
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
