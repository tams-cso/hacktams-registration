import express from 'express';
import path from 'path';
import cors from 'cors';
import apiRouter from './routes/api';

const app = express();
const PORT = process.env.PORT || 5000;

// Use CORS: https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS
app.use(cors());

// Middleware for JSON requests
app.use(express.json());

// Route all non-api requests to the client
app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'client', 'public', 'index.html')));

// Use the API router for all api calls
app.use('/api', apiRouter);

// Open the server!
app.listen(PORT, () => console.log(`Server running at port ${PORT}`));
