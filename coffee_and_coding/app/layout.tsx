import type { Metadata } from "next";
import { Cormorant_Garamond } from "next/font/google"; // import font
import { Open_Sans } from "next/font/google"; // import font
import "./globals.css";

const open_sans = Open_Sans({
    subsets: ["latin"],
    display: "swap",
    variable: "--font-sans",
});

const cormorant = Cormorant_Garamond({
    weight: ["300", "400", "700"],
    style: ["normal", "italic"],
    subsets: ["latin"],
    display: "swap",
    variable: "--font-cormorant",
});

export const metadata: Metadata = {
    title: "Coffee&Coding",
    description: "Atlanta coffee blog",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html
            lang="en"
            className={`${cormorant.variable} ${open_sans.variable}`}
        >
            <body className={open_sans.className}>{children}</body>
        </html>
    );
}
