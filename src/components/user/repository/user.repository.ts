import { generateId } from './../../../helpers/index';
import { injectable } from "inversify";
import User from "../model/user";
import { IUser, IUserDocument } from "../interface";

@injectable()
export class UserRepository {

    static NAME: string = 'UserRepository';
    
    constructor() {}

    async createUser({ email, name, password, confirmed, token }: IUser): Promise<IUserDocument> {
        const user = new User({ email, name, password, confirmed, token });
        user.token = generateId();
        const savedUser = await user.save();
        return savedUser;
    }

    async getAllUsers() {
        return await User.find();
    }

    async findUserByEmail(email: string): Promise<IUserDocument | null> {
        return await User.findOne({email});
    }
}