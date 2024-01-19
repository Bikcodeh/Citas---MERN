import express from "express";
import { container } from "../config/di/inversify.config";

import { AuthController } from '../components/auth/controller/auth.controller';

const router = express.Router();

const authController = container.get<AuthController>(AuthController.NAME);

router.post('/login', (req, res, next) => authController.doLogin(req, res, next));
router.get('/confirm/:token', (req, res, next) => authController.confirm(req, res, next));
router.post('/forgot-password', (req, res, next) => authController.forgotPassword(req, res, next));
router.get('/forgot-password/:token', (req, res, next) => authController.validateToken(req, res, next));

export default router;