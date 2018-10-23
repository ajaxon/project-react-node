const {
  send,
  json
} = require('micro')
const {
  router,
  post
} = require('microrouter')
const cors = require('micro-cors')();

let fetch = require('node-fetch');

var MongoClient = require('mongodb').MongoClient;

var uri = "mongodb+srv://ajaxon:testpassword@cluster0-818h0.mongodb.net/fdrive?retryWrites=true";



const service = router(
    post('/', async (req, res) => {
      const subscription = await json(req)

      if (!subscription.name) {
        return send(res, 400, {
          error: 'Name is required'
        })
      }

      if (!subscription.email) {
        return send(res, 400, {
          error: 'Email is required'
        })
      }

      if (!subscription.dob) {
        return send(res, 400, {
          error: 'BirthDate is required'
        })
      }

      if (!subscription.subscriptionLength || !(subscription.subscriptionLength == 7 || subscription.subscriptionLength == 24)) {
        return send(res, 400, {
          error: 'Invalid Subscription Length'
        })
      }

      let response = await fetch('http://localhost:3001?vin=1&subscriptionLength=7');
      let body = await response.json();
      console.log("price" , body.price);
      let client = await MongoClient.connect(uri);

      let collection =  client.db("fdrive").collection("subscriptions");

      const doc = await collection.insert(subscription);

      client.close();

      console.log("Saved doc ",doc);
        //const collection = client.db("fdrive").collection("subscriptions");
        //const doc = await collection.insert(subscription);
        //console.log(doc);
      let responseBody = doc.ops[0];
      responseBody.price = body.price;
      return send(res, 201, responseBody);
 

    }))
      
    module.exports = cors(service);