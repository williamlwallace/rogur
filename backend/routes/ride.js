const express = require("express");
const { check, validationResult } = require("express-validator");
const router = express.Router();
const Ride = require("../model/Ride");

/**
 * @method - POST
 * @param - /ride/create
 * @description Create ride
 */
router.post(
  "/create",
  [
    check("origin", "Origin not declared").not().isEmpty(),
    check("destination", "Origin not declared").not().isEmpty(),
  ],

  async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }

    const { origin, destination, userId } = req.body;

    try {
      ride = new Ride({
        origin,
        destination,
        userId
      });

      await ride.save();

    } catch (err) {
      console.log(err.message);
      res.status(500).send("Error in saving ride");
    }
  }
)

module.exports = router;