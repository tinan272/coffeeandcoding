const connectMongdoDB = require("./dbconn.js");
const express = require("express");
const app = express();
var cors = require('cors')

var cafes = require('./cafeRoute.js');

app.use(express.json());
app.use(cors());

async function startServer() {
    try {
        const client = await connectMongdoDB();

        app.listen(8080, () => {
            console.log("server running on port 8080");
        });

        const cafeRouter = await cafes.getCafes(client);
        app.use('/cafe_api', cafeRouter);

    } catch (error) {
        console.log("Error starting server", error);
    }
}

startServer();
