const mongoose = require('mongoose')

async function dbConnect() {
    await mongoose.connect('mongodb://127.0.0.1/photo_gallery')
}

module.exports = dbConnect