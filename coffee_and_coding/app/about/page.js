"use client";
import React, { useState } from "react";
import Header from "../frontend/components/Header";
import Image from "next/image";
import tina_img from "../../public/tina.JPG";
import amal_img from "../../public/amal.JPG";
import both_1 from "../../public/both-1.jpg";
import both_2 from "../../public/both-2.jpg";
import both_3 from "../../public/both-3.jpg";
import both_4 from "../../public/both-4.jpg";

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
        <div className="flex flex-col">
            <Header title="About Us" links={links} />
            <div id="title" className=" mx-72 my-32">
                <div className="text-3xl">About Us</div>
                <div className="text-6xl m-10">
                    Flibberty floo, the quizzle quozzle danced on the lumpy
                    grumpet. Zim zam zoodle, the fluffer nutter snuck past the
                    giggly gorp. Hoppity hoop, the wingle wangle wobbled through
                    the nippy nip. Squibble squab, the drizzy drozzle floated
                    above the fizzy floop.
                </div>
            </div>
            <div
                id="title"
                className="bg-white w-full text-center py-20 text-4xl"
            >
                WHO WE ARE
            </div>
            <div className="flex w-full h-auto bg-white justify-center">
                <div className="mb-32 mx-5 w-1/4">
                    <Image alt="tina" src={tina_img}></Image>
                    <div className="font-bold text-2xl mt-10"> Tina Nguyen</div>
                    <div className="mt-2 font-light">
                        Zim zam zoodle, the fluffer nutter snuck past the giggly
                        gorp. Hoppity hoop, the wingle wangle wobbled through
                        the nippy nip. Squibble squab, the drizzy drozzle
                        floated above the fizzy floop.
                    </div>
                </div>
                <div className="mb-32 mx-5 w-1/4">
                    <Image alt="amal" src={amal_img}></Image>
                    <div className="font-bold text-2xl mt-10">Amal Chaudry</div>
                    <div className="mt-2 font-light">
                        Flibberty floo, the quizzle quozzle danced on the lumpy
                        grumpet. Zim zam zoodle, the fluffer nutter snuck past
                        the giggly gorp. Hoppity hoop, the wingle wangle wobbled
                        through the nippy nip. Squibble squab, the drizzy
                        drozzle floated above the fizzy floop.
                    </div>
                </div>
            </div>
            <div className="flex justify-evenly my-10">
                <Image
                    alt="both_sun"
                    src={both_1}
                    style={{ width: "20rem" }}
                ></Image>
                <Image
                    alt="both_coffee"
                    src={both_2}
                    style={{ width: "20rem" }}
                ></Image>
                <Image
                    alt="both_grad"
                    src={both_3}
                    style={{ width: "20rem" }}
                ></Image>
                <Image
                    alt="both_grad"
                    src={both_4}
                    style={{ width: "20rem" }}
                ></Image>
            </div>
        </div>
    );
}
