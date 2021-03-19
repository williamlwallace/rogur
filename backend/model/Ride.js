const mongoose = require("mongoose");

const RideSchema = mongoose.Schema({
  origin: {
    type: {
      latitude: { type: Number },
      longitude: { type: Number },
    },
    required: true
  },

  destination: {
    type: {
      latitude: { type: Number },
      longitude: { type: Number },
    },
    required: true
  },

  userId: {
    type: String
  }
});

// export model ride with RideSchema
module.exports = mongoose.model("ride", RideSchema);