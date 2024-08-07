// importing required things
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");


const app = express() //creating express application

//The body-parser middleware extracts and parses the information into a suitable format to make processing with Node.js easy and effective.

// using the middlewares
app.use(bodyparser.json());
app.use(cors());
