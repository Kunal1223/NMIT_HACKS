const express = require("express");
const { body, validationResult } = require("express-validator");
const User = require("../models/User");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// const fetchuser = require("../middleware/fetchuser");

router.post(
  "/createUser",
  [
    body("name", "Enter the name of at least 3 characters").isLength({
      min: 3,
    }),
    body("email", "Enter the valid email").isEmail(),
    body("password", "Enter the password of at least 5 characters").isLength({
      min: 5,
    })
  ],
  async (req, res) => {

    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({ success: false, errors: errors.array(), message: "Please Enter the valid data" });
      }

      const salt = await bcrypt.genSalt(10);
      const secpass = await bcrypt.hash(req.body.password, salt);

      let user = await User.findOne({ email: req.body.email });

      if (user) {
        return res.status(400).json({ success: false, message: "Sorry user already exists" });
      } else {
        user = await User.create({
          name: req.body.name,
          email: req.body.email,
          password: secpass,
          phone: req.body.phone,
          location : req.body.location,
        });
      }

      const data = {
        user: {
          id: user.id,
        },
      };

    const authtoken = jwt.sign(data, process.env.JWT_SECRET);
    res.status(201).json({ success: true, authtoken , message:"Resiter Successfully" });

    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: "Server error" });
    }
  }
);

router.post( 
  "/loginUser",
  [
    body("email", "Enter the valid email").isEmail(),
    body("password", "Enter a correct pass").exists(),
  ],

  async (req, res) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ success:false, errors: errors.array(), message:"Email or Password not Match" });
    }

    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (!user) {
        return res
          .status(400)
          .json({ success:false, message: "Email or Password not Match" });
      }

      const passwordCompare = await bcrypt.compare(password, user.password);
      if (!passwordCompare) {
        return res.status(400).json({ success:false, error: "Email or Password not Match" });
      }

      const data = {
        user: {
          id: user.id,
        },
      };

      const authtoken = jwt.sign(data, process.env.JWT_SECRET);
      res.status(201).json({ success:true, authtoken , message:"Login Successfully" });

    } catch (error) {
      console.error(error);
      res.status(500).json({ success:false, message: "Server error" });
    }
  }
);

module.exports = router;