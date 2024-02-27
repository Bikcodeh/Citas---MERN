import { IUserDocumentModel } from './../../domain/interface/index';
import { injectable } from "inversify";
import { UserRepository } from '../../domain/repository/user.repository';
import { IUser } from '../../domain/interface';
import User from "../../domain/model/user";
import { generateId } from '../../../../helpers/index';
import { UserNotFoundException } from '../../../../common/exceptions';

@injectable()
export class UserMongoRepository implements UserRepository {

    constructor() { }

    async changePassword(id: string, newPassword: string): Promise<boolean> {
        const user = await User.findOne({ _id: id });
        if (!user) return false;
        user.token = '';
        user.password = newPassword;
        await user.save()
        return true;
    }

    async createUser({ email, name, password, confirmed, token }: IUser): Promise<IUser> {
        const user = new User({ email, name, password, confirmed, token });
        user.token = generateId();
        return (await user.save()).toObject();
    }
    async findUserByEmail(email: string): Promise<IUser | null> {
        const user = await User.findOne({ email });
        return user ? user.toObject() : null;
    }
    async getAllUsers(): Promise<IUser[]> {
        return (await User.find()).map(user => user.toObject());
    }

    async validatePassword(email: string, formPassword: string): Promise<boolean> {
        const user = await User.findOne({ email });
        return user ? await user.checkPassword(formPassword) : false
    }

    async findByToken(token: string): Promise<IUser | null> {
        const user = await User.findOne({ token });
        return user ? user.toObject() : null;
    }

    async confirmUser(id: string): Promise<boolean> {
        const result = await User.findOneAndUpdate({ _id: id }, { token: '', confirmed: true }, { new: true });
        return true;
    }

    async resetToken(userId: string): Promise<IUser> {
        try {
            const user =  await User.findOneAndUpdate({ _id: userId }, { token: generateId() }, { new: true })   
            if (!user || user == null) {
                throw new UserNotFoundException();    
            }
            return user;
        } catch (error) {
            throw new UserNotFoundException();
        }
    }
}