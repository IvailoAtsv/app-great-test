const mongoose = require('mongoose');

const photoSchema = new mongoose.Schema({
    title: {
       type:String,
       required:'Title is required'
    },
    description: {
       type:String,
       required:'Description is required'
    },
    image: {
       type:String,
       required:'Image is required'
    } 
});
const Photo = mongoose.model('Photo', photoSchema);

module.exports = Photo;