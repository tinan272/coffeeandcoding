const dotenv = require("dotenv").config();
const prompt = require("prompt");
var Dropbox = require("dropbox").Dropbox;
var dbx = new Dropbox({
    accessToken:
        "sl.u.AFhZwRGnL8LE01yoo0qfAMPN3QGXKg4adsficAn2LeMf2RPximTJBtYmc_TIBQtK8820k0a7xAYYYdLB93PObC2RZxh_IxSdHMEezupB47VOfx7mMxsQvW5mr_gEkBKYGCM5gwdSX0FXpPXoCqBAdFemSWQkku-7nWZdoEfSw3GoV3vkbgrppd01m3z3t92TO48r8x65YbRm36fxiS6xml87AeNyhkKe6DfRVFEnFafsfo2kd4C86uz9X6GnQN_A8Jd0LSMpbQoylsOsdZEfHX_RSvnGL1lia1s8436Z-PmTzA8BMKxPd5JVSom08RBXQGHPJriV2BnLCbiIwWwXiAdjfaM_X7qZ9wuIEL-BOtDZgGs2-uHPiJXnZuN_O_-L0ZM-N3PQF5USRpVScyKRUOPU8z2DWbJ8wwk74E9_KK2lXagZ4R7ree86zuDQMQo8N5c82QrYgvNEMRJKHUBllUCE6YJ2gFn8-zD3NZ-7gVXecSIeI35h--0vpgIhu1uZSioWaUNFO1zbhKdyz5av-SqJp44twVaVFVE9JQoLFVDBxNDhynZCal9tLIXcnfE-pWY9xbHLI_npixYmqKUMAKHNzbsl68q_CLPalpZ4peQMkhhOZcBi5PhW6Jg40OIqTUBWIl_TgMMz54gX0WxcIaqDIlvFcxcfoxY_0syC1lBV0SzUJNPx_pA8wd2u0_jx8hIaPYxmN7-zHtCkshXVUVozg9yyVq2HJ7oPyHGRpBJf-z9a68xMt-UEpC6CepM4gY99_i06tX_ZS-DEk6hM0600VoBWKbWHMqeZnVihN4gSo7CgMoFKlou4MLHZoqtabk2aUAqPAIMk3AhfPuk0ryXIKOd0IXS83EefYz7N8icmIVo29NZSqACkVbGEwkDq-l0fRRB054eFrt_NEOIycJnjFJgUYkOg29n2ZR47LwDgTWwOZjuSgb-HIJdjbvEbaK8lx7aOB0IPN2ANSwqO5VrpHBlddTdC0WOvPc8XNbEHF43HrY3sIf2P7NkIXRjpowMnA2_7c-E_q1aFrPjfxGFfRo0DZoQiSY2J_5O02SX8UmgDQPtGa9PjQL1THht1vSeEENdUkUjYcJIeFN00ackpp8HbayclOt9fe8Vaz8Jqfm0AA3Chdukp-z91GQGjcID1dDWqPKo_0aaei8TkBOeZDRDWOCPM7bTvVg7NIYYM6styRbdvZAMQAbQcxKgd6NWnzjCPg1L6Nz-mrpZ2pqWtsXmhRo4mYqccrceK7yye5HqmiveCLjQwlXre9c0-lOuFpayHBJGpJ6Co8dVh-fsN",
});
dbx.filesListFolder({ path: "dropbox/images" })
    .then(function (response) {
        console.log("WHAT IS THE RESPONSE", response);
    })
    .catch(function (error) {
        console.log(error);
    });

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
