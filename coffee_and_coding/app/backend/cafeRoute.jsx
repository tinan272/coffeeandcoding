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
            const filters = {
                search: req.query.search,
                city: req.query.city,
                cost: req.query.cost,
                parking: req.query.parking,
            }

            //const pipeline = [];

            console.log("Query Parameters:");
            console.log("Search:", filters.search);
            console.log("City:", filters.city);
            console.log("Cost:", filters.cost);
            console.log("Parking:", filters.parking);

            console.log("router working");

            // if (filters.search) {
            //     pipeline.push({ $match: { "Name": filters.search } });
            // }
            // if (filters.city) {
            //     pipeline.push({ $match: { "Area": filters.city } });
            // }
            // if (filters.cost) {
            //     pipeline.push({ $match: { "Cost": filters.cost } });
            // }
            // if (filters.parking) {
            //     pipeline.push({ $match: { "Parking": filters.parking } });
            // }

            const filteredResults = await collection.aggregate([
                { $match: { "Area": filters.city } },
            ]).toArray();
            console.log("filtered results", filteredResults);
            res.send(documents);
        } catch (error) {
            console.log("error getting documents", error);
        }
    });
    return router;
}

module.exports = { getCafes };

