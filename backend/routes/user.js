const express = require("express");
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const router = express.Router();
const auth = require("../middleware/auth");
const User = require("../model/User");

/**
 * @method - POST
 * @param - /signup
 * @description - User SignUp
 */
router.post(
  "/signup",
  [
    check("name", "Please enter your name").not().isEmpty(),
    check("phone", "Please enter your phone number").not().isEmpty(),
    check("email", "Please enter a valid email").isEmail(),
    check("password", "Please enter a valid password").isLength({ min: 6 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }

    const { name, phone, email, password } = req.body;
    try {
      let user = await User.findOne({
        email,
      });
      if (user) {
        return res.status(400).json({
          msg: "User already exists",
        });
      }

      user = new User({
        name,
        phone,
        email,
        password,
      });

      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);

      await user.save();

      const payload = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(
        payload,
        "randomString",
        {
          expiresIn: 10000,
        },
        (err, token) => {
          if (err) throw err;
          res.status(200).json({
            token,
          });
          console.log("Successfully signed up user");
        }
      );
    } catch (err) {
      console.log(err.message);
      res.status(500).send("Error in saving user");
    }
  }
);

/**
 * @method - POST
 * @param - /login
 * @description - User Login
 */
router.post(
  "/login",
  [
    check("email", "Please enter a valid email address").isEmail(),
    check("password", "Please enter a valid password").isLength({ min: 6 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: error.array(),
      });
    }
    const { email, password } = req.body;
    try {
      let user = await User.findOne({
        email,
      });
      if (!user) {
        return res.status(400).json({
          message: "User does not exist",
        });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({
          message: "Incorrect password",
        });
      }

      const payload = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(
        payload,
        "randomString",
        {
          expiresIn: 3600,
        },
        (err, token) => {
          if (err) throw err;
          res.status(200).json({
            token,
          });
          console.log("Successfully logged in user");
        }
      );
    } catch (e) {
      console.error(e);
      res.status(500).json({
        message: "Server error",
      });
    }
  }
);

/**
 * @method - GET
 * @param - /
 * @description - Get LoggedIn User
 */
router.get("/", auth, async (req, res) => {
  try {
    // request.user is getting fetched from Middleware after token authentication
    const user = await User.findById(req.user.id);
    res.json(user);
  } catch (e) {
    res.send({ message: "Error in fetching user" });
  }
});

/**
 * @method - PUT
 * @param - /
 * @description - Update User
 */
router.put("/", 
  [
    check("name", "Please enter your name").not().isEmpty(),
    check("phone", "Please enter your phone number").not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }

    const { email, name, phone } = req.body;
    try {
      let user = await User.findOne({
        email,
      });

      if (!user) {
        console.log('kdad');

        return res.status(400).json({
          message: "User does not exist",
        });
      }

      user.name = name;
      user.phone = phone;

      await user.save();

      return res.status(200).json({
        message: "Successfully updated user",
      })

    } catch (err) {
      console.log(err.message);
      res.status(500).send("Error in saving user");
    }
})

module.exports = router;
