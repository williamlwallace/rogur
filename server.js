const express = require('express');
const cors = require('cors');
// const MongoClient = require('mongodb').MongoClient;
const InitiateMongoServer = require("./backend/config/db");
const user = require("./backend/routes/user");

InitiateMongoServer();
const app = express();
app.use(cors());
app.use(express.json());


// MongoClient.connect(process.env.MONGO_DB_CONNECTION, {useUnifiedTopology: true})
//   .then(client => {
//     console.log('Connected to the database');
//     const db = client.db('rogur');
//     const userCollection = db.collection('user');
//     const rideCollection = db.collection('ride');

//     app.post('/user', jsonParser, (req, res) => {
//       userCollection.insertOne(req.body)
//         .then(console.log('Successfully inserted user'))
//         .catch(error => console.log(error))
//     })

//     app.post('/ride', jsonParser, (req, res) => {
//       rideCollection.insertOne(req.body)
//         .then(console.log('Successfully inserted ride'))
//         .catch(error => console.log(error))
//     })
//   })
//   .catch(error => {
//     console.log(error);
//   })

/**
 * Router Middleware
 * Router - /user/*
 * Method - *
 */
 app.use("/user", user);

app.listen(3000, () => {
  console.log('Server listening on PORT 3000');
})