import { injectable, inject } from 'inversify';
import { NextFunction, Request, Response } from 'express';

import { AuthService } from './../service/auth.service';

interface LoginBodyParams {
    email: string;
    password: string;
}

@injectable()
export class AuthController {

    static NAME: string = 'AuthController';
    constructor(@inject(AuthService.NAME) private authService: AuthService) {}

    async doLogin(req: Request, res: Response, next: NextFunction) {
        try {
            const { email, password }: LoginBodyParams = req.body;
            await this.authService.authenticate(email, password);
            res.send('bien');
        } catch (error) {
            next(error);
        }
    }
}