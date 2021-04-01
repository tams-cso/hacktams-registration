import express from 'express';
import path from 'path';

const app = express();
const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'client', 'public', 'index.html')));
app.get('/api', (req, res) => res.send('hello world :D'));
app.listen(PORT, () => console.log(`Server running at port ${PORT}`));
