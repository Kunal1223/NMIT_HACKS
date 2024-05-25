const express = require("express");
const { body, validationResult } = require("express-validator");
const NGO = require("../models/NGO");
const Restro = require("../models/Restaurant");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

async function fetchLocationByEmail(email) {
  const user = await Restro.findOne({ email: email });
  return user ? user.location : null;
}

async function fetchNGOsByLocation(location) {
  return await NGO.find({ location: location });
}


// const fetchuser = require("../middleware/fetchuser")
router.post(
  "/createNGO",
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
      // let success=false;
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ success: false, errors: errors.array(), message: "Please Enter the valid data" });
      }

      const salt = await bcrypt.genSalt(10);
      const secpass = await bcrypt.hash(req.body.password, salt);

      //chcek whether the user with this email exists
      let user = await NGO.findOne({ email: req.body.email });
      if (user) {
        return res.status(400).json({ success: false, message: "Sorry user already exists" });
      } else {
        user = await NGO.create({
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
      }

      const data = {
        user: {
          id: user.id,
        },
      };

      const authtoken = jwt.sign(data, process.env.JWT_SECRET);
      res.status(201).json({ success: true, authtoken, message: "Resiter Successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: "Server error" });
    }
  }
);

router.post(
  "/loginNGO",
  [
    body("email", "Enter the valid email").isEmail(),
    body("password", "Enter a correct pass").exists(),
  ],
  async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array(), message: "Email or Password not Match" });
    }

    const { email, password } = req.body;

    try {
      let user = await NGO.findOne({ email });
      if (!user) {
        return res
          .status(400)
          .json({ success: false, message: "Email or Password not Match" });
      }

      const passwordCompare = await bcrypt.compare(password, user.password);
      if (!passwordCompare) {
        return res.status(400).json({ success: false, error: "Email or Password not Match" });
      }

      const data = {
        user: {
          id: user.id,
        },
      };

      const authtoken = jwt.sign(data, process.env.JWT_SECRET);
      res.status(201).json({ success: true, authtoken, message: "Login Successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: "Server error" });
    }
  }
);

router.get("/fetchallngo", async (req, res) => {
  const email = req.query.email;

  try {
    const location = await fetchLocationByEmail(email);
    if (!location) {
      return res.status(404).json({ error: "Location not found for the given email" });
    }
    const ngos = await fetchNGOsByLocation(location);
    res.json(ngos);
  } catch (error) {
    console.error('Error fetching NGOs:', error);
    res.status(500).json({ error: "Internal Server Error" });
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