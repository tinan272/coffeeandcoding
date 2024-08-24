import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            backgroundImage: {
                "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
                "gradient-conic":
                    "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
            },
            height: {
                "80vh": "80vh", // custom height of 80%
            },
            colors: {
                pink: {
                    DEFAULT: "#F08E80",
                    light: "#FDF0E6",
                    dark: "#F4AC9F",
                },
                blue: {
                    DEFAULT: "#0A0E63",
                },
            },
        },
    },
    plugins: [],
};

export default config;
