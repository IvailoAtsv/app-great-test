const router = require('express').Router();

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
app.get('/', async (req, res) => {
    try {
        const photos = await Photo.find().limit(9); // Limit to 9 photos per page
        res.json(photos);
    } catch (error) {
        console.error('Error fetching photos:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Route to retrieve a single photo by ID
app.get('/photos/:id', async (req, res) => {
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
app.delete('/photos/:id', async (req, res) => {
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
