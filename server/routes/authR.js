const express = require("express");
const { body, validationResult } = require("express-validator");
const RES = require("../models/Restaurant");
const NGO = require("../models/NGO");
const User = require("../models/User")
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
// const fetchuser = require("../middleware/fetchuser");
const Order = require("../models/Order.js");

async function fetchLocationByEmail(email) {
  const ngoUser = await NGO.findOne({ email: email });
  if (ngoUser) {
    return ngoUser.location;
  } else {
    const regularUser = await User.findOne({ email: email });
    return regularUser ? regularUser.location : null;
  }
}


async function fetchNGOsByLocation(location) {
  return await RES.find({ location: location });
}

router.post(
  "/createRES",
  [
    body("name", "Enter the name of at least 3 characters").isLength({
      min: 3,
    }),
    body("email", "Enter the valid email").isEmail(),
    body("password", "Enter the password of at least 5 characters").isLength({
      min: 5,
    }),
    body("manager_name", "Enter the manager name of at least 3 characters").isLength({
      min: 3,
    }),
    body("desc", "Enter the name of at least 3 characters"),
    body("social_link", "Enter the link of social media handle of NGO"),

  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ success:false,errors: errors.array() , message:"Please Enter the valid data"});
      }
      //chcek whether the user with this email exists

      let user = await RES.findOne({ email: req.body.email });
      if (user) {
        return res.status(400).json({ success:false,message: "Sorry user already exists" });
      }
      const salt = await bcrypt.genSalt(10);
      const secpass = await bcrypt.hash(req.body.password, salt);

      // Validation passed, create the user
      user = await RES.create({
        name: req.body.name,
        email: req.body.email,
        password: secpass,
        manager_name: req.body.manager_name,
        desc: req.body.desc,
        phone: req.body.phone,
        social_link: req.body.social_link,
        location : req.body.location,
        imageUrl: req.body.url,
      });

      const data = {
        user: {
          id: user.id,
        },
      };
      const authtoken = jwt.sign(data, process.env.JWT_SECRET);
      // Send a success response with the created user
      res.status(201).json({ success:true,authtoken , message:"Resister Successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({success:false, message: "Server error" });
    }
  }
);

router.post(
  "/loginRES",
  [
    body("email", "Enter the valid email").isEmail(),
    body("password", "Enter a correct pass").exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success:false,errors: errors.array() , message:"Email or Password not match" });
    }
    const { email, password } = req.body;
    try {
      let user = await RES.findOne({ email });
      if (!user) {
        return res
          .status(400)
          .json({success:false, message: "Please try to login with correct credentials" });
      }
      const passwordCompare = await bcrypt.compare(password, user.password);
      if (!passwordCompare) {
        return res.status(400).json({ success:false,message: "Enter correct password" });
      }

      const data = {
        user: {
          id: user.id,
        },
      };
      const authtoken = jwt.sign(data, process.env.JWT_SECRET);
      res.status(201).json({success:true, authtoken , message:"Login Successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success:false , message: "Server error" });
    }
  }
);

//

router.post("/packets", async (req, res) => {
  const { email, Veg, Nonveg } = req.body;

  try {
    let user = await RES.findOne({ email });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Please try to login with correct credentials",
      });
    }

    // Update only Veg and Nonveg fields
    user.Veg = Veg;
    user.Nonveg = Nonveg;

    await user.save();

    res.status(200).json({
      success: true,
      message: "Packets updated successfully",
    });
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ message: "Network Error", success: false });
  }
});




//fetch all restros

router.get("/fetchallres", async (req, res) => {
  const email = req.query.email;

  try {
    const location = await fetchLocationByEmail(email);
    const res1 = await fetchNGOsByLocation(location);
    res.json(res1);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});


//fetch res order
router.get("/fetchallorders", async (req, res) => {
  const email = req.query.email;
  try {
    const order = await Order.find({
      resEmail: email,
    });
    res.json(order);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

// router.post("/getuser", fetchuser, async (req, res) => {
//   try {
//     userId = req.user.id;
//     const user = await User.findById(userId).select("-password");
//     res.send(user);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: " Internal Server error" });
//   }
// });



module.exports = router;