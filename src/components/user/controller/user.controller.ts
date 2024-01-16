import { Request, Response } from 'express';
import { UserService } from '../service/user.service';
import { inject, injectable } from "inversify";
import { IUser } from '../interface';


@injectable()
export class UserController {

    static NAME: string = 'UserController';

    constructor(@inject(UserService.NAME) private userService: UserService) { }

    async create(req: Request, res: Response) {
        const data: IUser = req.body;
        const result = await this.userService.create({ ...data });
        if (result instanceof Error) {
            res.status(400).json({ error: result.message });
        } else {
            res.status(201).json({ message: 'User created successfully', user: result });
        }
    }

    async getAll(req: Request, res: Response) {
        const users = await this.userService.getAllUsers();
        res.json({ status: 'ok', data: { ...users } })
    }
}