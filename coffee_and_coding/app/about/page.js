"use client";
import React, { useState } from "react";
import Link from "next/link";

// flex-col = each subsequent div is a column
// each grid row has a full length of 12 units. to do 50% of each, xs={6} for both

export default function page() {
    return (
        <>
            <h1>About Us</h1>
            <h2>
                <Link href="/">Back to home</Link>
            </h2>
        </>
    );
}
