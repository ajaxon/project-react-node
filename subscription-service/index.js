const { send, json } = require('micro')
const { router, post } = require('microrouter')
const cors = require('micro-cors')()

var MongoClient = require('mongodb').MongoClient;

var uri = "mongodb+srv://ajaxon:testpassword@cluster0-818h0.mongodb.net/fdrive?retryWrites=true";
MongoClient.connect(uri, function(err, client) {

  if(err) {
    console.error("Mongo error", err);
  }
   const collection = client.db("fdrive").collection("subscriptions");
   collection.find({}).toArray(function(err, result){
     if(err) throw err;
     console.log(result);
   })
   // perform actions on the collection object
   client.close();
});


const service  = router(
  post('/', async (req, res) => {
    const subscription = await json(req)

    if(!subscription.name){
      return send(res, 400, { error: 'Name is required' })
    }

    if(!subscription.email){
      return send(res, 400, { error: 'Email is required' })
    }

    if(!subscription.dob){
      return send(res, 400, { error: 'BirthDate is required' })
    }

    if(!subscription.subscriptionLength || !(subscription.subscriptionLength == 7 || subscriptionLength == 24 )) {
      return send(res, 400, { error: 'Invalid Subscription Length' })
    }


    MongoClient.connect(uri, function(err, client) {

      if(err) {
        console.error("Mongo error", err);
      }
       const collection = client.db("fdrive").collection("subscriptions");
       collection.insert(subscription, function(err, results){
         if(err) {
          return send(res, 500, {error: "Insert failed"})
         }
         console.log(results);
         return send(res, 201, results[0]._id);
       })
       // perform actions on the collection object
       client.close();
    });
   
    // if Valid Subscription Save

    // TODO: "Save" subscription
    // TODO: Return response

    
  })
)

module.exports = cors(service);
