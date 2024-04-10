const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dbConnect = require('./config/dbConfig');

// Initialize Express app
const app = express();
const port = process.env.PORT;

app.use(bodyParser.json({limit: '50mb'}));
app.use(express.urlencoded({ extended: true }));
app.use(cors({ credentials: true, origin: port }));

dbConnect()
.then(() => console.log('db connected successfuly'))
.catch((err) => console.log(err));

module.exports = app