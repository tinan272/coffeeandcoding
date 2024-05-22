const { MongoClient, ServerApiVersion } = require("mongodb");
const dotenv = require('dotenv').config();

// Replace the placeholder with your Atlas connection string
const uri = process.env.DB_CONNECTION_STRING;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri,  {
        serverApi: {
            version: ServerApiVersion.v1,
            strict: true,
            deprecationErrors: true,
        }
    }
);

async function connectMongoDB() {
  try {
    // Connect the client to the server (optional starting in v4.7)
    await client.connect();

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");

    const database = await client.db('coffee_shop_data');
    const collection = await database.collection('coffee_info');
    const documents = await collection.find().toArray();
    console.log('Retrieved documents:', documents);
    return client;
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
 connectMongoDB().catch(console.dir);

module.exports = connectMongoDB;
