import express from "express";
import { container } from "../config/di/inversify.config";
import { UserController } from '../components/user/infraestructure/controller/user.controller';
import { checkAuth } from "./middleware";

const router = express.Router();

const userController = container.get<UserController>(UserController.NAME);

router.get('/', userController.getAll);
router.post('/', userController.create);
router.get('/profile', checkAuth, userController.profile);

export default router;