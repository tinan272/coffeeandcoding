const express = require("express");
const router = express.Router();
const { countDocuments } = require("mongodb");

// global variables
let documents = [];

async function getCafes(client) {
    const database = await client.db("coffee_shop_data");
    const collection = await database.collection("coffee_info");
    documents = await collection.find().toArray();
    console.log("Retrieved documents:", documents);

    const default_start_page = 1;
    const default_cafe_limit = 5;

    router.get("/", async (req, res) => {
        try {
            const page = parseInt(req.query.page) || default_start_page;
            const limit = parseInt(req.query.limit) || default_cafe_limit;
            const skip = (page - 1) * limit;

            // query params sent from frontend
            const filters = {
                search: req.query.search,
                city: req.query.city,
                cost: req.query.cost,
                parking: req.query.parking,
            };

            console.log("Query Parameters:");
            console.log("Search:", filters.search);
            console.log("City:", filters.city);
            console.log("Cost:", filters.cost);
            console.log("Parking:", filters.parking);

            console.log("router working");

            const pipeline = [];

            // creating query object to filter documents
            const query = {};

            // filtering documents based on search value
            if (filters.search) {
                query["$or"] = [ 
                    { Name: { $regex: filters.search, $options: "i" }},
                    {Address: { $regex: filters.search, $options: "i"}}
                ];
            }
            // filtering based on city value
            if (filters.city) {
                query["Area"] = { $in: filters.city };
            }
            // filtering based on cost
            if (filters.cost) {
                query["Cost"] = { $in: filters.cost };
            }
            // filtering based on parking type
            if (filters.parking && filters.parking.length > 0) {
                const regexArray = filters.parking.map(parkingType => ({ Parking_Type: { $regex: parkingType, $options: "i"} }));
                query["$and"] = regexArray;
            };


            // pagination pipeline
            pipeline.push({ $count: "totalCount" });
            const countResult = await collection.aggregate(pipeline).toArray();
            const totalCount =
                countResult.length > 0 ? countResult[0].totalCount : 0;
            pipeline.pop();

            pipeline.push({ $skip: skip });
            pipeline.push({ $limit: limit });
            console.log("Aggregation pipeline:", pipeline);

            // filtering documents and sending to api endpoint
            const filteredResults = await collection.find(query).toArray();
            console.log("testing filter on area and cost", filteredResults)

            const response = {
                cafes: filteredResults,
                totalPages: Math.ceil(totalCount / limit),
            };
            res.json(response);
        } catch (error) {
            console.log("error getting documents", error);
        }
    });
    return router;
}

module.exports = { getCafes };
