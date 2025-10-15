const express = require("express");
const router = express.Router();
const { countDocuments } = require("mongodb");

async function getCafes(client) {
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
                Rating: { $push: "$Ratings" },
                ImageURL: { $push: "$ImageURL" },
                AvgOverallRating: { $avg: "$Rating.Overall_Rating" },
                AvgAmbianceRating: { $avg: "$Rating.Ambiance_Rating" },
                AvgCoffeeRating: { $avg: "$Rating.Coffee_Rating" },
                AvgServiceRating: { $avg: "$Rating.Service_Rating" },
                OverallRating: { $push: "$Rating.Overall_Rating" },
                AmbianceRating: { $push: "$Rating.Ambiance_Rating" },
                CoffeeRating: { $push: "$Rating.Coffee_Rating" },
                ServiceRating: { $push: "$Rating.Service_Rating" },
            },
        },
        {
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
                ImageURL: 1,
                AvgOverallRating: 1,
                AvgAmbianceRating: 1,
                AvgCoffeeRating: 1,
                AvgServiceRating: 1,
                OverallRating: 1,
                AmbianceRating: 1,
                CoffeeRating: 1,
                ServiceRating: 1,
            },
        },
    ];

    const comboDocuments = await collection
        .aggregate(ratings_info_pipeline)
        .toArray();
    comboDocuments.forEach((doc) => {
        delete doc._id;
    });

    const combinedCollection = database.collection("combined_coffee_info");
    comboDocuments.forEach((doc) => {
        if (
            doc.ImageURL &&
            typeof doc.ImageURL === "string" &&
            doc.ImageURL.includes(",")
        ) {
            doc.ImageURL = doc.ImageURL.split(",");
        } else if (doc.ImageURL && typeof doc.ImageURL === "string") {
            doc.ImageURL = [doc.ImageURL.trim()];
        } else if (Array.isArray(doc.ImageURL)) {
            doc.ImageURL = doc.ImageURL.filter((url) => url && url.length > 0);
        } else {
            doc.ImageURL = [];
        }
    });
    await combinedCollection.deleteMany({});
    await combinedCollection.insertMany(comboDocuments);

    const default_start_page = 1;
    const default_cafe_limit = 5;

    router.get("/", async (req, res) => {
        try {
            const page = parseInt(req.query.page, 10) || default_start_page;
            const pageSize =
                parseInt(req.query.limit, 10) || default_cafe_limit;

            const filters = {
                search: req.query.search || "",
                city: req.query.city || [],
                cost: req.query.cost || [],
                parking: req.query.parking || [],
                rating: req.query.rating || [],
            };
            const sort = req.query.sort || "";

            const query = {};

            if (filters.search) {
                query["$or"] = [
                    { Name: { $regex: filters.search, $options: "i" } },
                    { Address: { $regex: filters.search, $options: "i" } },
                ];
            }

            if (filters.city && filters.city.length > 0) {
                query["Area"] = {
                    $in: Array.isArray(filters.city)
                        ? filters.city
                        : [filters.city],
                };
            }

            if (filters.cost && filters.cost.length > 0) {
                query["Cost"] = {
                    $in: Array.isArray(filters.cost)
                        ? filters.cost
                        : [filters.cost],
                };
            }

            if (filters.rating && filters.rating.length > 0) {
                const ratingNumbers = Array.isArray(filters.rating)
                    ? filters.rating.map(Number)
                    : [Number(filters.rating)];
                query["AvgOverallRating"] = { $in: ratingNumbers };
            }

            if (filters.parking && filters.parking.length > 0) {
                const regexArray = (
                    Array.isArray(filters.parking)
                        ? filters.parking
                        : [filters.parking]
                ).map((parkingType) => ({
                    Parking_Type: { $regex: parkingType, $options: "i" },
                }));
                query["$and"] = regexArray;
            }

            const articles = [
                { $match: query },
                {
                    $sort:
                        sort === "rating"
                            ? { AvgOverallRating: -1 }
                            : sort === "cost"
                            ? { Cost: -1 }
                            : { _id: 1 },
                },
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

            if (!combinedCollection) {
                throw new Error("Database connection not established");
            }

            const filteredResults = await combinedCollection
                .aggregate(articles)
                .toArray();

            if (!filteredResults || filteredResults.length === 0) {
                return res.json({
                    cafes: [],
                    totalPages: 0,
                    currentPage: page,
                    pageSize: pageSize,
                    totalCount: 0,
                });
            }

            const totalCount = filteredResults[0].metadata[0]
                ? filteredResults[0].metadata[0].totalCount
                : 0;

            const response = {
                cafes: filteredResults[0].data || [],
                totalPages: Math.ceil(totalCount / pageSize),
                currentPage: page,
                pageSize: pageSize,
                totalCount: totalCount,
            };

            res.json(response);
        } catch (error) {
            console.error("Error in GET / route:", error);
            res.status(500).json({
                error: "An error occurred while fetching the cafes.",
                details: error.message,
            });
        }
    });

    return router;
}

module.exports = { getCafes };
