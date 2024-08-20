const connectMongdoDB = require("./dbconn.jsx");
const express = require("express");
const app = express();
var cors = require("cors");

var cafes = require("./cafeRoute.jsx");

app.use(express.json());
app.use(cors());

async function startServer() {
    try {
        const client = await connectMongdoDB();
        const cafeRouter = await cafes.getCafes(client);
        app.use("/cafe_api", cafeRouter);

        app.listen(8083, () => {
            console.log("server running on port 8083");
        });
    } catch (error) {
        console.log("Error starting server", error);
    }
}

startServer();
