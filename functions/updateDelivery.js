const { MongoClient } = require("mongodb");


module.exports.handler = async (event, context, callback) => {

  const requestBody = JSON.parse(event.body)
  console.log("BODY", requestBody)
  const uri = "mongodb+srv://ssElyseos:$$elyseos2022@cluster0.t8btn.mongodb.net/?retryWrites=true&w=majority";
  const client = new MongoClient(uri);

  try {
    const database = client.db("deliveryData");
    const deliveryInfo = database.collection("ElyseosVentures");
    // create a filter for a movie to update
    const filter = { wallet_address: requestBody.wallet_address };
    // this option instructs the method to create a document if no documents match the filter
    const options = { upsert: true };
    // create a document that sets the plot of the movie
    const updateDoc = {
      $set: {
        delivery_person: requestBody.person,
        current_courier: requestBody.courier,
        current_address: requestBody.address
      },
    };
    const result = await deliveryInfo.updateOne(filter, updateDoc, options);
    console.log(
      `${result.matchedCount} document(s) matched the filter, updated ${result.modifiedCount} document(s)`,
    );
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }

  const response = {
    statusCode: 201,
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
    body: "success"//JSON.stringify({ subscriptions, productName }),
  }
  callback(null, response)
}
