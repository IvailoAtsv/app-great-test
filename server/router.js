const imageController = require('./controllers/imageController');
const router = require('express').Router();

router.use('/photos', imageController);

module.exports = router;