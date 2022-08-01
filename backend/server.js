const express = require('express');
const app = express();
const cors = require("cors");
const MongoClient = require('mongodb').MongoClient;
var uri = "mongodb://127.0.0.1:27017/";


require('dotenv').config()


//Allows cross-origin resource sharing beween client and server
const corsOptions ={
  origin: "*",
  credentials:true,           
  optionSuccessStatus:200,
}


app.use(cors(corsOptions)) 

//Reads and parse incoming requests
app.use(express.urlencoded({extended: true})); 
app.use(express.json()); 

// app.use(function (req, res, next) {

//   // Website you wish to allow to connect
//   res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

//   // Request methods you wish to allow
//   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

//   // Request headers you wish to allow
//   res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, content-type, Authorization');

//   // Set to true if you need the website to include cookies in the requests sent
//   // to the API (e.g. in case you use sessions)
//   res.setHeader('Access-Control-Allow-Credentials', true);
// });


//Post method to add a new home to the inventory
app.post('/', function(req, res){
  var obj = req.body.formData; //Stores incoming home information
  obj._id = new Date().getTime(); //Creates unique property id 

  //Connects to MongoDB server
  MongoClient.connect(uri, { useUnifiedTopology: true }, function(err, client) {

    if (err){  //Throws error if method failed to connect to server
      throw err;
    }
    else{
      var dbo = client.db("westBocaMakeBelieve"); // Creates/links database
      var query = {}; //Used to filter search for specified items
      query.id = obj._id;

          //Insert property into database
          dbo.collection("inventory").insertOne(obj, function(err, response) {
            if (err) throw err; //Throws error if method failed to insert document
            else{
              console.log("Success: Property added to inventory");
              client.close();
              return res.status(201).send(response);
            }
          });
        }
  });
})


//Get method to return all homes in the database 
app.get('/all', function(req, res){

  //Connects to MongoDB server
  MongoClient.connect(uri, { useUnifiedTopology: true }, function(err, client) {
    if (err) throw err; //Throws error if method failed to connect to server
    var dbo = client.db("westBocaMakeBelieve"); //Creates/links database

    //Searches through watchlist collection to find specified record
    dbo.collection("inventory").find().toArray(function(err, response) {
      if (err) throw err; //Throws error if method failed to search through the collection
      else{ 
        console.log("SUCCESS: Returned inventory");
        client.close();
        return res.status(200).send(response);
      }
    });   
  });

})


//Get method to return all homes for specified user 
app.get('/', function(req, res){
  //Creates variables used to store submitted data
  var userID = req.query.userID;
  console.log(userID)

  //Connects to MongoDB server
  MongoClient.connect(uri, { useUnifiedTopology: true }, function(err, client) {
    if (err) throw err; //Throws error if method failed to connect to server

    var dbo = client.db("westBocaMakeBelieve"); //Creates/links database
    let query = { "userID": userID}; //Used to filter search for specified items

    //Searches through inventory to find specified record
    dbo.collection("inventory").find(query).toArray(function(err, response) {
      if (err) throw err; //Throws error if method failed to search through the collection
      else if(response.length == 0){ //If no property is found return error message
          client.close();
          console.log("No Property found");
          return res.status(400).send(response);       
      }
      else{ //If document is found return it
        client.close();
        console.log("Found Inventory");
        return res.status(200).send(response);
      }
      });   
  });

})



//Put method to update information from a home already in the database
app.put('/', function(req, res){
  const obj = req.body.update; //Stores incoming home information
  console.log(obj)
  //Connects to MongoDB server
  MongoClient.connect(uri, { useUnifiedTopology: true }, function(err, client) {
    if (err) throw err; //Throws error if method failed to connect to server

    var dbo = client.db("westBocaMakeBelieve"); //Creates/links database
    //Used to filter search for specified items & set new fields
    var query = {}; 
    query._id = parseInt(obj._id);
    var newvals = { $set: {"location": obj.location, "propertyType": obj.propertyType, "sqft": obj.sqft , "bedroomCount": obj.bedroomCount, 
                           "bathRoomCount": obj.bathRoomCount, "units": obj.units, "estimatedCost": obj.estimatedCost , "other": obj.other, 
                           image1: obj.image1, "quantity":obj.quantity}}; 


    //Searches through inventory to find specified property and changes the fields set by newvals
    dbo.collection("inventory").updateOne(query, newvals, function(err, response) {
      if (err) throw err; //Throws error if method failed to update property
      if(response.modifiedCount == 0){ //If no property was modified send error message
        console.log("Document not found: Unable to update");
        client.close();
        return res.status(400).send();
      }
        else{ //If property was found and updated return success message
          client.close();
          console.log("Property updated");
          return res.status(200).send();
        }
    });
  });
})


//Delete method to delete a home from the database
app.delete('/', function(req, res){
  var _id = parseInt(req.body._id);

  //Connects to MongoDB server
  MongoClient.connect(uri, { useUnifiedTopology: true }, function(err, client) {
    if (err) throw err; //Throws error if function failed to connect to server
  
    var dbo = client.db("westBocaMakeBelieve"); //Creates/links database
    var query = { "_id": _id}; //Used to filter search for specified item

    //Searches through collection to find the property to delete
    dbo.collection("inventory").deleteOne(query,function(err, response) {
      if (err) throw err; //Throws error if method failed to delete property
      else if(response.deletedCount == 0){ //Returns error message if unable to find property to delete 
        console.log("Unable to delete property");
        return res.status(400).send();
      }
      else{ 
        //Property was deleted
        console.log("Property deleted")
        client.close();
        return res.status(201).send();
      }
    });  
  });
})


app.listen(process.env.PORT|| 8080);
console.log('Server is running...');