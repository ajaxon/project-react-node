const { send } = require('micro')
const { router, get } = require('microrouter')
const cors = require('micro-cors')()

var MongoClient = require('mongodb').MongoClient;
var uri = "mongodb+srv://ajaxon:testpassword@cluster0-818h0.mongodb.net/fdrive?retryWrites=true";

const service  = router(
  get('/vehicles', async (req, res) => {
    
    let client = await MongoClient.connect(uri);

    let collection =  client.db("fdrive").collection("vehicles");

    const docs = await collection.find({}).toArray();

    client.close();
      //const collection = client.db("fdrive").collection("subscriptions");
      //const doc = await collection.insert(subscription);
      //console.log(doc);
    return send(res, 200, docs);
    

    
  })
)


module.exports = cors(service);