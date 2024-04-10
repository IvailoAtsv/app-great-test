const mongoose = require('mongoose')

async function dbConnect() {
    await mongoose.connect('mongodb://127.0.0.1/lab-stations')
}

module.exports = dbConnect