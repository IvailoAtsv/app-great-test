const router = require('express').Router();
const Photo = require('../schemas/Photo')

// I decided not to separete the logic into managers since it's a simple project.

router.get('/', async (req, res) => {
    const page = parseInt(req.query.page) || 1; // Default to page 1 if not provided
    const perPage = 6; // Number of items per page
    try {
        const photos = await Photo.find()
            .skip((page - 1) * perPage)
            .limit(perPage);
        const totalCount = await Photo.find().countDocuments();
        res.json({ photos, totalCount });
    } catch (error) {
        console.error('Error fetching photos:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.post('/upload', async (req, res) => {
    try {
        const { title, description, image } = req.body;

        const newPhoto = new Photo({ title, description, image });
        await newPhoto.save();

        res.status(201).json(newPhoto);
    } catch (error) {
        console.error('Error adding photo: ', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const { title, description, image } = req.body;
        const updatedPhoto = await Photo.findByIdAndUpdate(req.params.id, { title, description, image }, { new: true });
        if (!updatedPhoto) {
            return res.status(404).json({ error: 'Photo not found' });
        }
        res.json(updatedPhoto);
    } catch (error) {
        console.error('Error updating photo:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Route to retrieve a single photo by ID
router.get('/:id', async (req, res) => {
    try {
        const photo = await Photo.findById(req.params.id);
        if (!photo) {
            return res.status(404).json({ error: 'Photo not found' });
        }
        res.json(photo);
    } catch (error) {
        console.error('Error fetching photo by ID:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Route to delete a photo by ID
router.delete('/:id', async (req, res) => {
    try {
        const deletedPhoto = await Photo.findByIdAndDelete(req.params.id);
        if (!deletedPhoto) {
            return res.status(404).json({ error: 'Photo not found' });
        }
        res.json({ message: 'Photo deleted successfully' });
    } catch (error) {
        console.error('Error deleting photo:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
module.exports = router