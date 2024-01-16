import { UserController } from '../components/user/controller/user.controller';
import express from "express";
import { container } from "../config/inversify.config";

const router = express.Router();

const userController = container.get<UserController>(UserController.NAME);

router.get('/', (req, res) => userController.getAll(req, res));
router.post('/', (req, res) => userController.create(req, res));

export default router;