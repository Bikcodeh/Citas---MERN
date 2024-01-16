import { Request, Response } from 'express';
import { UserService } from '../service/user.service';
import { inject, injectable } from "inversify";
import { IUser } from '../interface';
import { CustomException } from '../../../common/exceptions/CustomException';


@injectable()
export class UserController {

    static NAME: string = 'UserController';

    constructor(@inject(UserService.NAME) private userService: UserService) { }

    async create(req: Request, res: Response) {
        try {
            const data: IUser = req.body;
            const result = await this.userService.create({ ...data });
            res.status(201).json({ message: 'User created successfully', user: result });
        } catch (error) {
            const customError = error as CustomException;
            res.status(customError.code).json({ msg: customError.message })
        }
    }

    async getAll(req: Request, res: Response) {
        const users = await this.userService.getAllUsers();
        res.json({ status: 'ok', data: { ...users } })
    }
}