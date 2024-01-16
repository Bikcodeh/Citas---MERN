import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;
connectDB();

app.get('/', (req, res) => {
  res.send('The sedulous hyena ate the antelope!');
});

app.get('/data', (req, res) => {
    res.send('KHA');
  });

app.listen(port, () => {
    console.info(`Ready on port ${port}`);
});
