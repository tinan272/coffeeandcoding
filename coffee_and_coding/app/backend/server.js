const connectMongdoDB = require("./dbconn.js");
const express = require("express");
const app = express();

async function startServer() {
    try {
        const client = await connectMongdoDB();

        app.listen(8080, () => {
            console.log("server running on port 8080");
        });

        const database = await client.db("coffee_shop_data");
        const collection = await database.collection("coffee_info");
        const documents = await collection.find().toArray();
        console.log("Retrieved documents:", documents);
    } catch (error) {
        console.log("Error starting server", error);
    }
}

startServer();
