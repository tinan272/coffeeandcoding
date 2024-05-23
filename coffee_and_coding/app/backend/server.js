const connectMongdoDB = require("./dbconn.js");
const express = require("express");
const app = express();

async function startServer() {
    try {
        const client = await connectMongdoDB();

        app.listen(8080, () => {
            console.log("server running on port 8080");
        });
    } catch (error) {
        console.log("Error starting server", error);
    }
}

startServer();
