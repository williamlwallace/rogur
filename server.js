require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;

const app = express();
app.use(cors());
const jsonParser = bodyParser.json()

MongoClient.connect(process.env.MONGO_DB_CONNECTION, {useUnifiedTopology: true})
  .then(client => {
    console.log('Connected to the database');
    const db = client.db('rogur');
    const userCollection = db.collection('user');

    app.post('/user', jsonParser, (req, res) => {
      userCollection.insertOne(req.body)
        .then(result => console.log('Successfully inserted user'))
        .catch(error => console.log(error))
    })
  })
  .catch(error => {
    console.log(error);
  })

app.listen(3000, () => {
  console.log('Server listening on port 3000');
})