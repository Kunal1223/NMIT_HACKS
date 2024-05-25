const express = require("express");
const { body, validationResult } = require("express-validator");
const User = require("../models/User");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Order = require("../models/Order.js");

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
router.post(
  '/addorder',
  [
    body('Restro', 'Enter the restro name of at least 3 characters').isLength({ min: 3 }),
    body('VegPackets', 'Enter the Veg Packets').isLength({ min: 1 }).isInt(),
    body('NonVngPackets', 'Enter the Non veg Packets').isLength({ min: 1 }).isInt(),
    body('Messege', 'Enter the message of at least 3 characters').isLength({ min: 3 }),
    body('VegPacketsType', 'Enter the type of veg packets').isLength({ min: 3 }),
    body('NonVegPacketsType', 'Enter the type of non veg packets').isLength({ min: 3 }),
    body('userEmail', 'Enter a valid email').isEmail(),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const {
        Restro,
        VegPackets,
        NonVngPackets,
        Messege,
        userEmail,
        VegPacketsType,
        NonVegPacketsType
      } = req.body;

      const order = new Order({
        Restro,
        VegPackets,
        NonVngPackets,
        Messege,
        userEmail,
        VegPacketsType,
        NonVegPacketsType,
      });

      const savedOrder = await order.save();
      res.status(201).json(savedOrder);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Server error' });
    }
  }
);

//Fetching all orders
// router.get("/fetchallorders", fetchuser, async (req, res) => {
router.get("/fetchallorders", async (req, res) => {
  const email = req.query.email;
  try {
    const order = await Order.find({
      userEmail: email,
    });
    res.json(order);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

//update note

// router.put("/updateorder/:id", fetchuser, async (req, res) => {
//   const { Restro, VegPackets, NonVngPackets, Messege } = req.body;

//   const newOrder = {};
//   if (Restro) {
//     newOrder.Restro = Restro;
//   }

//   if (VegPackets) {
//     newOrder.VegPackets = VegPackets;
//   }
//   if (NonVngPackets) {
//     newOrder.NonVngPackets = NonVngPackets;
//   }

//  if (Messege) {
//     newOrder.Messege = Messege;
//   }

//   try {
//     let order = await Order.findByIdAndUpdate(
//       req.params.id,
//       { $set: newOrder }, // Use $set to update specific fields
//       { new: true }
//     );

//     if (!order) {
//       return res.status(404).send("Not found");
//     }

//     if (order.user.toString() !== req.user.id) {
//       return res.status(401).send("Not allowed");
//     }

//     res.json({ order });
//   } catch (error) {
//     console.error(error);
//   }
// });


module.exports = router;