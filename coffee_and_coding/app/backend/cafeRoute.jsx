const express = require("express");
const router = express.Router();

// global variables
let documents = [];

async function getCafes(client) {
    const database = await client.db("coffee_shop_data");
    const collection =  await database.collection("coffee_info");
    documents =  await collection.find().toArray();
    console.log("Retrieved documents:", documents); 

    router.get('/', async (req, res) => {
        try {
            const search = req.query.search;
            const city = req.query.city;
            const cost = req.query.cost;
            const rating = req.query.rating;
            const parking = req.query.parking;

            console.log("Query Parameters:");
            console.log("Search:", search);
            console.log("City:", city);
            console.log("Cost:", cost);
            console.log("Rating:", rating);
            console.log("Parking:", parking);

            console.log("router working");
            
            res.send(documents);
        } catch (error) {
            console.log("error getting documents", error);
        }
    });
    return router;
}

module.exports = { getCafes };

