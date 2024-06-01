const { MongoClient, ServerApiVersion } = require("mongodb");
const dotenv = require("dotenv").config();

// Replace the placeholder with your Atlas connection string
const uri = process.env.DB_CONNECTION_STRING;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    },
});

async function connectMongoDB() {
    try {
        // Connect the client to the server (optional starting in v4.7)
        await client.connect();

        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log(
            "Pinged your deployment. You successfully connected to MongoDB!"
        );
        return client;
    } catch(error) {
        console.error("error connecting to MongoDB:", error);
        throw error;
    }
}
module.exports = connectMongoDB;
