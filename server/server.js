// importing required things
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express() //creating express application

//The body-parser middleware extracts and parses the information into a suitable format to make processing with Node.js easy and effective.

// using the middlewares
app.use(bodyParser.json());
app.use(cors());


// connecting the mongoose
// I dont know why this object is used
mongoose.connect("mongodb+srv://bistsaroj24:DCVJbmPEPYIWzoGe@saroj.8en5nmb.mongodb.net/", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// creating a schema
// I dont have idea about new:
const userSchema = new mongoose.Schema({
  username: String, // username: { type: String, required: true, unique: true },
  password: String
});

// Create a model based on the schema
const User = mongoose.model('User', userSchema);

// showing hi on server side


//route to handel user registration.
app.post("/register", async (req, res) => {
  //extract username and password from req.body
  const { username, password } = req.body;
  const newUser = new User({ username, password });
  await newUser.save();
  res.send({ message: 'User registered successfully' });
})


app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username, password });
  if (user) {
    res.send({ message: 'Login successful' });
  } else {
    res.status(400).send({ message: 'Invalid credentials' });
  }
});

// Route to show "hahahaha"
app.get("/haha", (req, res) => {
  res.send("hahahaha");
});


// app.get("/people", async (req, res) => {
//   try {
//       const users = await User.find();
//       res.json(users);
//   } catch (err) {
//       console.error(err);
//       res.status(500).send(err);
//   }
// });

// This returns a promise
app.get("/people", function (req, res) {
  const users = User.find();
  users.then((userdata) => res.json(userdata))
});

// reading the data from db
// User.find(function(err,res){
//   console.log(res) 
// })

app.listen(5000, () => {
  console.log("Running on port 5000");
})