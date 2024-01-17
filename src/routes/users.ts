import { errorHandlerMiddleware } from './middleware/error.middleware';
import { UserController } from '../components/user/controller/user.controller';
import express from "express";
import { container } from "../config/inversify.config";

const router = express.Router();

const userController = container.get<UserController>(UserController.NAME);

router.get('/', (req, res, next) => userController.getAll(req, res, next));
router.post('/', (req, res, next) => userController.create(req, res, next));

router.use(errorHandlerMiddleware);

export default router;