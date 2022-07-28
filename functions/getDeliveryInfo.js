const { MongoClient } = require("mongodb");


module.exports.handler = async (event, context, callback) => {

  const requestBody = JSON.parse(event.body)
  console.log("BODY", requestBody)
  const uri = "mongodb+srv://ssElyseos:$$elyseos2022@cluster0.t8btn.mongodb.net/?retryWrites=true&w=majority";
  const client = new MongoClient(uri);
  let info = null
  try {
    const database = client.db("deliveryData");
    const deliveryInfo = database.collection("ElyseosVentures");
    // Query for a movie that has the title 'The Room'
    const query = { wallet_address: requestBody.wallet_address };
    const options = {
      // Include only the `title` and `imdb` fields in the returned document
      projection: { _id: 0, wallet_address: 1, toa_no: 1, delivery_person: 1, current_courier: 1, current_address: 1 },
    };
    info = await deliveryInfo.findOne(query, options);
    // since this method returns the matched document, not a cursor, print it directly
    console.log(info);
  } finally {
    await client.close();
  }
  const response = {
    statusCode: 201,
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify({ info }),
  }
  callback(null, response)
}
