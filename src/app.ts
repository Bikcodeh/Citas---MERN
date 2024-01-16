
import 'reflect-metadata';
import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db';
import userRouter from './routes/users';

dotenv.config();

const app = express();
app.use(express.json());

connectDB();

app.get('/', (req, res) => {
  res.send('The sedulous hyena ate the antelope!');
});

app.use('/api/users', userRouter);

app.get('/data', (req, res) => {
  res.send('KHA');
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.info(`Ready on port ${port}`);
});
