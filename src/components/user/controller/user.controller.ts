import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import { inject, injectable } from "inversify";
import { IUser } from '../interface';
import { UserService } from '../service/user.service';

@injectable()
export class UserController {

    static NAME: string = 'UserController';

    constructor(@inject(UserService.NAME) private userService: UserService) { }

    async create(req: Request, res: Response, next: NextFunction) {
        try {
            const data: IUser = req.body;
            const result = await this.userService.create({ ...data });
            res.status(StatusCodes.CREATED).json({ message: 'User created successfully', user: result });
        } catch (error) {
            next(error);
        }
    }

    async getAll(req: Request, res: Response, next: NextFunction) {
        try {
            const users = await this.userService.getAllUsers();
            res.status(StatusCodes.OK).json({ status: 'ok', data: { ...users } })
        } catch (error) {
            next(error);
        }
    }
}