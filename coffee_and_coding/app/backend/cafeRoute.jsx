const express = require("express");
const router = express.Router();
const { countDocuments } = require("mongodb");

// global variables
let comboDocuments = [];

async function getCafes(client) {
    // shop database

    const database = await client.db("coffee_shop_data");
    const collection = await database.collection("coffee_info");

    const ratings_info_pipeline = [
        {
            $lookup: {
                from: "coffee_rating",
                localField: "Name",
                foreignField: "Name",
                as: "Rating",
            },
        },
        {
            // breaks down "rating" arr so each obj is processed individually
            $unwind: {
                path: "$Rating",
                preserveNullAndEmptyArrays: true,
            },
        },
        {
            $group: {
                _id: "$Name",
                Name: { $first: "$Name" },
                Address: { $first: "$Address" },
                Parking: { $first: "$Parking" },
                Cost: { $first: "$Cost" },
                Comfort: { $first: "$Comfort" },
                Wifi: { $first: "$Wifi" },
                Area: { $first: "$Area" },
                Parking_Type: { $first: "$Parking_Type" },
                Rating: { $push: "$Ratings" }, //push: collects individual docs for each coffee shop
                AvgOverallRating: { $avg: "$Rating.Overall_Rating" }, // avg: calcs avg of field from all docs for each shop
                AvgAmbianceRating: { $avg: "$Rating.Ambiance_Rating" },
                AvgCoffeeRating: { $avg: "$Rating.Coffee_Rating" },
                AvgServiceRating: { $avg: "$Rating.Service_Rating" },
            },
        },
        {
            // specifies how docs should be shaped moving forward?
            $project: {
                _id: 0,
                Name: 1,
                Address: 1,
                Parking: 1,
                Cost: 1,
                Comfort: 1,
                Wifi: 1,
                Area: 1,
                Parking_Type: 1,
                Ratings: 1,
                AvgOverallRating: 1,
                AvgAmbianceRating: 1,
                AvgCoffeeRating: 1,
                AvgServiceRating: 1,
            },
        },
    ];

    comboDocuments = await collection
        .aggregate(ratings_info_pipeline)
        .toArray();
    comboDocuments.forEach((doc) => {
        delete doc._id;
    }); // keep only one _id

    console.log(
        "--------------------------------------------------------COMBINED TABLES--------------------------------------------------------"
    );
    comboDocuments.forEach((doc) => {
        console.log(doc);
    });

    // combined docs -> new collection
    const combinedCollection = database.collection("combined_coffee_info");
    await combinedCollection.deleteMany({}); // Clear existing documents if needed
    await combinedCollection.insertMany(comboDocuments);

    console.log(
        "Combined documents inserted into 'combined_coffee_info' collection."
    );

    const default_start_page = 1;
    const default_cafe_limit = 5;

    router.get("/", async (req, res) => {
        try {
            const page = parseInt(req.query.page, 10) || default_start_page;
            const pageSize =
                parseInt(req.query.limit, 10) || default_cafe_limit;

            // query params sent from frontend
            const filters = {
                search: req.query.search,
                city: req.query.city,
                cost: req.query.cost,
                parking: req.query.parking,
                rating: req.query.rating,
            };
            const sort = req.query.sort;

            console.log("Query Parameters:");
            console.log("Search:", filters.search);
            console.log("Sort:", sort);
            console.log("City:", filters.city);
            console.log("Cost:", filters.cost);
            console.log("Parking:", filters.parking);
            console.log("Rating:", filters.rating);
            console.log("router working");

            // creating query object to filter documents
            const query = {};
            // filtering documents based on search value
            if (filters.search) {
                query["$or"] = [
                    { Name: { $regex: filters.search, $options: "i" } },
                    { Address: { $regex: filters.search, $options: "i" } },
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
            if (filters.rating) {
                const ratingNumbers = filters.rating.map(Number);
                query["AvgOverallRating"] = { $in: ratingNumbers };
            }
            // filtering based on parking type
            if (filters.parking && filters.parking.length > 0) {
                const regexArray = filters.parking.map((parkingType) => ({
                    Parking_Type: { $regex: parkingType, $options: "i" },
                }));
                query["$and"] = regexArray;
            }

            // pagination pipeline
            const articles = [
                { $match: query },
                { $sort: { AvgOverallRating: -1 } },
                {
                    $facet: {
                        metadata: [{ $count: "totalCount" }],
                        data: [
                            { $skip: (page - 1) * pageSize },
                            { $limit: pageSize },
                        ],
                    },
                },
            ];

            //TODO: access overall rating to compare with
            // filtering documents and sending to api endpoint
            const filteredResults = await combinedCollection
                .aggregate(articles)
                .toArray();

            const totalCount = filteredResults[0].metadata[0]
                ? filteredResults[0].metadata[0].totalCount
                : 0;
            console.log("testing filter on area and cost", filteredResults);

            const response = {
                cafes: filteredResults[0].data,
                totalPages: Math.ceil(totalCount / pageSize),
                currentPage: page,
                pageSize: pageSize,
                totalCount: totalCount,
            };
            res.json(response);
        } catch (error) {
            console.error("error getting documents", error);
            res.status(500).json({
                error: "An error occurred while fetching the cafes.",
            });
        }
    });
    return router;
}

module.exports = { getCafes };
