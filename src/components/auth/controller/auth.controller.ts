import { injectable, inject } from 'inversify';
import { NextFunction, Request, Response } from 'express';

import { AuthService } from './../service/auth.service';

@injectable()
export class AuthController {

    static NAME: string = 'AuthController';
    constructor(@inject(AuthService.NAME) private authService: AuthService) {}

    async doLogin(req: Request, res: Response, next: NextFunction) {

    }
}