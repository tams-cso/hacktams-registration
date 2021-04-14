import express from 'express';
import path from 'path';
import cors from 'cors';
import mongoose from 'mongoose';
import { config } from 'dotenv';
import apiRouter from './routes/api';

// Configure environmental variables using .env
config();

// Create the express app + define port
const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
let userPassString = '';
if (process.env.MONGO_USER !== undefined && process.env.MONGO_PASS !== undefined) {
    userPassString = `${process.env.MONGO_USER}:${process.env.MONGO_PASS}@`;
}
const mongoConnectionUrl = `mongodb://${userPassString}${process.env.MONGO_URL}/data`;
mongoose.connect(mongoConnectionUrl, { useNewUrlParser: true, useUnifiedTopology: true });

// Verify connection once it is made
const db = mongoose.connection;
db.on('error', (err) => {
    console.error(err);
    process.exit(1);
});
db.once('open', () => {
    console.log('Connected to MongoDB!');
});

// Use CORS: https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS
app.use(cors());

// Middleware for JSON requests
app.use(express.json());

// Statically serve all public files
app.use(express.static(path.join(__dirname, '..', 'public')));

// Route all non-api requests to the client
app.get('/', (req, res) => res.sendFile(path.join(__dirname, '..', 'public', 'index.html')));

// Use the API router for all api calls
app.use('/api', apiRouter);

// Open the server!
app.listen(PORT, () => console.log(`Server running at port ${PORT}`));
