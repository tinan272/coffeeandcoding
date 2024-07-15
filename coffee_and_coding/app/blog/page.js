"use client";
import React, { useState } from "react";
import Header from "../frontend/components/Header";
import Link from "next/link";

// flex-col = each subsequent div is a column
// each grid row has a full length of 12 units. to do 50% of each, xs={6} for both
/* <Link href="/">Back to home</Link> */

export default function page() {
    const links = [
        { name: "Home", href: "/" },
        { name: "Blog", href: "/blog" },
        { name: "About Us", href: "/about" },
    ];
    return (
        <div>
            <Header title="Blog" links={links} />
        </div>
    );
}
