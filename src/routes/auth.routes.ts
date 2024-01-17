import express from "express";
import { container } from "../config/inversify.config";

import { AuthController } from '../components/auth/controller/auth.controller';

const router = express.Router();

const authController = container.get<AuthController>(AuthController.NAME);

router.post('/login', (req, res, next) => authController.doLogin(req, res, next))

export default router;