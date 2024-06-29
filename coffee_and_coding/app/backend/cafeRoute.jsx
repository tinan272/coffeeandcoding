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

            const filters = {
                search: req.query.search,
                city: req.query.city,
                cost: req.query.cost,
                parking: req.query.parking,
            };

            // console.log("Query Parameters:");
            // console.log("Search:", filters.search);
            // console.log("City:", filters.city);
            // console.log("Cost:", filters.cost);
            // console.log("Parking:", filters.parking);

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

            const pipeline = [];

            if (filters.search) {
                pipeline.push({
                    $match: {
                        Name: { $regex: new RegExp(filters.search, "i") },
                    },
                });
            }
            if (filters.city) {
                pipeline.push({ $match: { Area: filters.city } });
            }
            if (filters.cost) {
                pipeline.push({ $match: { Cost: filters.cost } });
            }
            if (filters.parking) {
                pipeline.push({ $match: { Parking: filters.parking } });
            }

            pipeline.push({ $count: "totalCount" });
            const countResult = await collection.aggregate(pipeline).toArray();
            const totalCount =
                countResult.length > 0 ? countResult[0].totalCount : 0;
            pipeline.pop();

            pipeline.push({ $skip: skip });
            pipeline.push({ $limit: limit });
            console.log("Aggregation pipeline:", pipeline);

            const filteredResults = await collection
                .aggregate(pipeline)
                .toArray();

            console.log("Filtered results:", filteredResults);

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
