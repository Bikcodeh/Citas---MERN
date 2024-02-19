import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import { inject, injectable } from "inversify";
import { IUser } from '../../domain/interface';
import { UserService } from '../service/user.service';

@injectable()
export class UserController {
    static NAME: string = 'UserController';
    constructor(@inject(UserService.NAME) private userService: UserService) { }

    public create = async (req: Request, res: Response, next: NextFunction) => {
        const data: IUser = req.body;
        await this.userService.create({ ...data });
        res.status(StatusCodes.CREATED).json({ message: 'User created successfully' });
    }

    public getAll = async (req: Request, res: Response, next: NextFunction) => {
        const users = await this.userService.getAllUsers();
        res.status(StatusCodes.OK).json({ status: 'ok', data: { ...users } });
    }

    public profile = async (req: Request, res: Response) => {
        res.json({ user: req.user });
    }
}