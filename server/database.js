const { MongoClient, ServerApiVersion } = require('mongodb');


const products1 = require('./dedicated.json');
const products2 = require('./circle.json');
const products3 = require('./montlimar.json');

const products = products1.concat(products2, products3);
const uri = "mongodb+srv://srapsode:1009@cluster0.kyvs8pl.mongodb.net/?retryWrites=true&w=majority";
const MONGODB_DB_NAME = 'clearfashion';

async function run() {
  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
  try {
    await client.connect();
    console.log("Connected to MongoDB!");

    const db = client.db(MONGODB_DB_NAME);
    const collection = db.collection('products');

    const result = await collection.insertMany(products, { upsert: false });
    //console.log(result);

    const brand='dedicated'
    const filter_brand = await collection.find({brand}).toArray();
    //console.log(filter_brand );

    const p=50;

    const filter_price=await collection.find({"price":{ $lt: p}}).toArray();
    //console.log(filter_price );

    const order_price=await collection.aggregate([{$sort:{price : -1 }}]).toArray();
    //console.log(order_price);
    const order_date=await collection.aggregate([{$sort:{date : -1 }}]).toArray();
    //console.log(order_date);
    const now = new Date();
    const twoWeeksAgo = new Date(now.getTime() - (14 * 24 * 60 * 60 * 1000));

    const filter_2weeks=await collection.find({"date":{$gt: twoWeeksAgo.toISOString().slice(0, 10)}}).toArray();

    console.log(filter_2weeks);





  } catch (e) {
    console.error(e);
  } finally {
    client.close();
  }
}



run();
