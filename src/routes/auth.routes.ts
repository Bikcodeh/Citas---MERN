import express from "express";
import { container } from "../config/di/inversify.config";

import { AuthController } from '../components/auth/controller/auth.controller';
import { checkAuth } from "./middleware";

const router = express.Router();

const authController = container.resolve(AuthController);

router.post('/login', authController.doLogin);
router.get('/confirm/:token', authController.confirm);
router.post('/forgot-password', authController.forgotPassword);
router.get('/forgot-password/:token', authController.validateToken);
router.post('/forgot-password/:token', authController.newPassword);

export default router;