import express from 'express';

const router = express.Router();

// Home route for the API
router.get('/', async function (req, res) {
    res.send('hello world :D');
});

export default router;