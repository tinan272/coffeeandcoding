"use client";
import React from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import MapContainer from "./frontend/components/MapContainer.jsx";
import { ShopListDisplay } from "./frontend/components/ShopListDisplay.jsx";
import { QueryParamProvider } from 'use-query-params';
import { ReactRouter6Adapter } from 'use-query-params/adapters/react-router-6';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import {useRouter} from "next/router";

export default function Home() {
    return (
        <BrowserRouter>
            <QueryParamProvider adapter={ReactRouter6Adapter}>
                <main className="flex min-h-screen flex-col justify-between p-24">
                    <div className="relative h-32 w-32">
                        <div className="text-lg absolute left-0 top-0 h-0 w-100">
                            Atlanta Coffee
                        </div>
                    </div>
                    <div className="relative flex place-items-center before:absolute before:h-[300px] before:w-full sm:before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-full sm:after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 before:lg:h-[360px] z-[-1]"></div>
                    <Grid container spacing={2} p={0}>
                        <Grid item xs={6}>
                            <ShopListDisplay />
                        </Grid>
                        <Grid item xs={6}>
                            <MapContainer />
                        </Grid>
                    </Grid>
                </main>
            </QueryParamProvider>
        </BrowserRouter>
    );
}
