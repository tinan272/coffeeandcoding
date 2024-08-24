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
import { Grid } from "@mui/material";
import { motion } from "framer-motion";

// flex-col = each subsequent div is a column
// each grid row has a full length of 12 units. to do 50% of each, xs={6} for both
/* <Link href="/">Back to home</Link> */

export default function page() {
    const links = [
        { name: "Home", href: "/" },
        { name: "Blog", href: "/blog" },
        { name: "About Us", href: "/about" },
    ];
    const imageVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0 },
    };
    const amal_info = {
        name: "Amal Chaudry",
        src: amal_img,
        bio: "Flibberty floo, the quizzle quozzle danced on the lumpy grumpet. Zim zam zoodle, the fluffer nutter snuck past",
    };
    const tina_info = {
        name: "Tina Nguyen",
        src: tina_img,
        bio: "Flibberty floo, the quizzle quozzle danced on the lumpy grumpet. Zim zam zoodle, the fluffer nutter snuck past",
    };
    return (
        <div className="flex flex-col">
            <Header title="About Us" links={links} />
            <div id="title" className="flex flex-col m-8 md:m-48">
                <div className="text-xl md:text-3xl">Tina & Amal</div>
                <div className="text-2xl md:text-6xl m-8 md:m-10">
                    Flibberty floo, the quizzle quozzle danced on the lumpy
                    grumpet. Zim zam zoodle, the fluffer nutter snuck past the
                    giggly gorp. Hoppity hoop, the wingle wangle wobbled through
                    the nippy nip. Squibble squab, the drizzy drozzle floated
                    above the fizzy floop.
                </div>
            </div>
            <div
                id="title"
                className="bg-white w-full text-center py-10 md:py-20 text-xl md:text-4xl"
            >
                WHO WE ARE
            </div>
            <div className="flex w-full h-auto bg-white justify-around">
                {[tina_info, amal_info].map((person, index) => (
                    <div className="mb-32 mx-5 w-1/4" key={index}>
                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.2 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            variants={imageVariants}
                        >
                            <Image alt="tina" src={person.src}></Image>
                            <div className="font-bold text-xl mt-10">
                                {person.name}
                            </div>
                            <div className="mt-2 font-light">{person.bio}</div>
                        </motion.div>
                    </div>
                ))}
            </div>
            <Grid
                container
                gap={1}
                justifyContent="space-evenly"
                my={8}
                rowGap={2}
            >
                {[both_1, both_2, both_3, both_4].map((src, index) => (
                    <Grid item key={index}>
                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.2 }}
                            transition={{ duration: 0.5, delay: index * 0.2 }}
                            variants={imageVariants}
                        >
                            <Image
                                alt={`both_${index + 1}`}
                                src={src}
                                style={{ width: "20rem" }}
                            />
                        </motion.div>
                    </Grid>
                ))}
            </Grid>
        </div>
    );
}
