import 'reflect-metadata';
import 'express-async-errors';
import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db';
import { container } from './config/di/inversify.config'
import userRouter from './routes/users.routes';
import authRoutes from './routes/auth.routes';
import { errorHandlerMiddleware } from './routes/middleware';

dotenv.config();

const app = express();
app.use(express.json());

connectDB();

app.use('/api/users', userRouter);
app.use('/api/auth', authRoutes);

app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.info(`Ready on port ${port}`);
});
