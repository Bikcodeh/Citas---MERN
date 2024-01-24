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

    public doLogin = async (req: Request, res: Response) => {
        const { email, password }: LoginBodyParams = req.body;
        const user = await this.authService.authenticate(email, password);
        res.status(StatusCodes.OK).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token: generateJWT(user._id)
        });
    }

    public confirm = async (req: Request, res: Response) => {
        const token = req.params.token;
        const result = await this.authService.confirm(token);
        if (result) {
            res.status(StatusCodes.OK).json({ msg: 'Account confirmed successfully' });
        } else {
            res.status(StatusCodes.BAD_REQUEST).json({ msg: 'Account was not confirmed, please try again later' });
        }
    }

    public forgotPassword = async (req: Request, res: Response) => {
        const user = await this.authService.validateUserByEmail(req.body.email);
        await this.authService.resetToken(user._id);
        res.status(StatusCodes.OK).json({ msg: 'User found' });
    }

    public validateToken = async (req: Request, res: Response) => {
        const isValid = await this.authService.validateToken(req.params.token);
        if (isValid) {
            res.status(StatusCodes.OK).json({ msg: 'Valid token' })
        } else {
            res.status(StatusCodes.BAD_REQUEST).json({ error: 'Token it is not valid' })
        }
    }

    public newPassword = async (req: Request, res: Response, next: NextFunction) => {
        console.log(this.authService);
        const isValid = await this.authService.validateToken(req.params.token);
        if (isValid) {
            const result = await this.authService.newPassword(req.params.token, req.body.password);
            if (result)
                res.status(StatusCodes.OK).json({ msg: 'Password updated' });
            else
                res.status(StatusCodes.BAD_REQUEST).json({ error: 'An error happened updating your password, please try again later.' })
        } else {
            res.status(StatusCodes.BAD_REQUEST).json({ error: 'Token it is not valid' })
        }
    }
}