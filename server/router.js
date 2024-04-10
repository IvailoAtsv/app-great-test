const imageController = require('./controllers/imageController');
const router = require('express').Router();

router.use('/image', imageController);

module.exports = router;