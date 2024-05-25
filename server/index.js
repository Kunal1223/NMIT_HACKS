const dotenv = require('dotenv');
dotenv.config({ path: './config.env'});
const express = require('express');
const app = express();
var cors = require('cors');
const uploadImage = require('./routes/UploadImg');
const connectToMongo = require('./DB')

app.use(cors())
app.use(express.json({ limit: "25mb" }));

app.use('/api/auth/ngo', require('./routes/authN'));
app.use('/api/auth/res', require('./routes/authR'));
app.use('/api/auth/user', require('./routes/authU'));
app.use('/api/auth/res', require('./routes/Mailer'));


connectToMongo();
const port = process.env.PORT

//code to convert images into url by using the cloudinary version 2 
app.post("/uploadImage", (req, res) => {
  uploadImage(req.body.image)
    .then((url) => res.send(url)) 
    .catch((err) => res.status(500).send(err)); 
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

app.listen(port, () => {
  console.log(`App listening `)
})