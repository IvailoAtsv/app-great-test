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
photoSchema.pre('save', function(next) {
    // Validate data before saving
    // For example, check if required fields are present
    if (!this.title || !this.description || !this.image) {
        return next(new Error('Missing required fields'));
    }
    next();
});

const Photo = mongoose.model('Photo', photoSchema);

module.exports = Photo;