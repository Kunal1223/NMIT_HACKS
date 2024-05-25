const mongoose = require('mongoose');

// Use async/await to connect to MongoDB
const connectToMongo = async () => {
  try {
    await mongoose.connect(process.env.url);
    console.log("Connected to MongoDB Successfully");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
}; 

module.exports = connectToMongo;