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
    ];
    return (
        <div>
            <Header title="About Us" links={links} />
        </div>
    );
}
