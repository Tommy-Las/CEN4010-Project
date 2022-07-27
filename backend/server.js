const express = require('express');
const app = express();
const cors = require("cors");

//Allows cross-origin resource sharing beween client and server
const corsOptions ={
   origin:'*', 
   credentials:true,           
   optionSuccessStatus:200,
}
app.use(cors(corsOptions)) 

//Reads and parse incoming requests
app.use(express.urlencoded({extended: true})); 
app.use(express.json());   



//Get method to get homes with matching location in database
app.get('/', function(req, res){
  const location = Object.values(req.query)[0]; //Stores incoming location
  const houseInfo = {}; //Stores outgoing home information

  /*
      Connect to database & find matching home(s) with the same location
  */

  //If a home was found use this statement 
  res.status(200).send(houseInfo) //Sends result

  //If there was an error / no homes were found use this one
  res.status(400).send() 
})



//Get method to return all homes in the database
app.get('/all/:uid', function(req, res){
  const houseInfo = {}; //Stores outgoing home information
  const uid = req.params.uid

  /*
      Connect to database & return all homes
  */


  //If successful use this statement 
  res.status(200).send(houseInfo) //Sends result

  //If there was an error
  res.status(400).send() 
})



//Post method to add a new home to the inventory
app.post('/', function(req, res){
  const houseInfo = req.body.formData; //Stores incoming home information
  
  /*
      Connect to database & add house to database
  */

  //If the home was successfully added to database use this statement
  res.status(201).send(); 

  //If there was an error / the home was not added use this one
  res.status(400).send(); //use this statement for unsuccessful result
}) 



//Put method to update information from a home already in the database
app.put('/', function(req, res){
  const houseInfo = req.body.formData; 

  /*
        Connect to database & update home with matching location
   */

  //If the home info was successfully updated use this statement
  res.status(200).send(); 

  //If there was an error / the home was not updated use this one
  res.status(400).send(); //use this statement for unsuccessful result
})


//Delete method to delete a home from the database
app.delete('/', function(req, res){
  const location = req.body.location; //Stores incoming location

  /*
        Connect to database & delete home with matching location
  */

  //If the home was successfully deleted use this statement
  res.status(200).send(); 

  //If there was an error / the home was not deleted use this one
  res.status(400).send(); //use this statement for unsuccessful result
})


app.listen(8080);
console.log('Server is running...');