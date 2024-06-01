const express = require("express");
const router = express.Router();

// global variables
let documents = [];

async function getCafes(client) {
    const database = await client.db("coffee_shop_data");
    const collection =  await database.collection("coffee_info");
    documents =  await collection.find().toArray();
    console.log("Retrieved documents:", documents); 

    router.get('/', (req, res) => {
        res.send(documents);
      })
    return router;
}

module.exports = { getCafes };

