import { injectable, inject } from 'inversify';
import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import { generateJWT } from './../../../helpers/index';
import { AuthService } from './../service/auth.service';

interface LoginBodyParams {
    email: string;
    password: string;
}

@injectable()
export class AuthController {

    static NAME: string = 'AuthController';
    constructor(
        @inject(AuthService.NAME) private authService: AuthService
    ) { }

    async doLogin(req: Request, res: Response, next: NextFunction) {
        try {
            const { email, password }: LoginBodyParams = req.body;
            const user = await this.authService.authenticate(email, password);
            res.status(StatusCodes.OK).json({
                _id: user._id,
                name: user.name,
                email: user.email,
                token: generateJWT(user._id)
            });
        } catch (error) {
            next(error);
        }
    }

    async confirm(req: Request, res: Response, next: NextFunction) {
        try {
            const token = req.params.token;
            const result = await this.authService.confirm(token);
            if (result) {
                res.status(StatusCodes.OK).json({ msg: 'Account confirmed successfully' });
            } else {
                res.status(StatusCodes.BAD_REQUEST).json({ msg: 'Account was not confirmed, please try again later' });
            }
        } catch (error) {
            next(error);
        }
    }

    async forgotPassword(req: Request, res: Response, next: NextFunction) {
        try {
            const user = await this.authService.validateUserByEmail(req.body.email);
            await this.authService.resetToken(user._id);
            res.status(StatusCodes.OK).json({ msg: 'User found' });
        } catch (error) {
            console.log(error);
            next(error);
        }
    }

    async validateToken(req: Request, res: Response, next: NextFunction) {
        try {
            const isValid = await this.authService.validateToken(req.params.token);
            if (isValid) {
                res.status(StatusCodes.OK).json({ msg: 'Valid token' })
            } else {
                res.status(StatusCodes.BAD_REQUEST).json({ error: 'Token it is not valid' })
            }
        } catch (error) {
            next(error);
        }
    }
}