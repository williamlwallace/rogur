require('dotenv').config();
const mongoose = require("mongoose");

const InitiateMongoServer = async () => {
  try {
    await mongoose.connect(process.env.MONGO_DB_CONNECTION, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log("---Connected to the database---");
  } catch (e) {
    console.log(e);
    throw e;
  }
};

module.exports = InitiateMongoServer;