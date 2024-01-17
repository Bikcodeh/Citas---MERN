import { Request, Response, NextFunction } from 'express';
import { UserService } from '../service/user.service';
import { inject, injectable } from "inversify";
import { IUser } from '../interface';

@injectable()
export class UserController {

    static NAME: string = 'UserController';

    constructor(@inject(UserService.NAME) private userService: UserService) { }

    async create(req: Request, res: Response, next: NextFunction) {
        try {
            const data: IUser = req.body;
            const result = await this.userService.create({ ...data });
            res.status(201).json({ message: 'User created successfully', user: result });
        } catch (error) {
            next(error);
        }
    }

    async getAll(req: Request, res: Response, next: NextFunction) {
        try {
            const users = await this.userService.getAllUsers();
            res.json({ status: 'ok', data: { ...users } })
        } catch (error) {
            next(error);
        }
    }
}