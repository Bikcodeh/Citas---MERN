import { errorHandlerMiddleware } from './routes/middleware/error.middleware';

import 'reflect-metadata';
import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db';
import userRouter from './routes/users.routes';
import authRoutes from './routes/auth.routes';

dotenv.config();

const app = express();
app.use(express.json());

connectDB();

app.get('/', (req, res) => {
  res.send('The sedulous hyena ate the antelope!');
});

app.use('/api/users', userRouter);
app.use('/api/auth', authRoutes);

app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.info(`Ready on port ${port}`);
});
