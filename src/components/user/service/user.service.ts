import { injectable, inject } from "inversify";
import { UserRepository } from '../repository/user.repository';
import { IUser } from "../interface";
import { EmailAlreadyTakenException } from '../../../common/exceptions/email-already-taken.exception';

@injectable()
export class UserService {

    static NAME: string = 'UserService';

    constructor(@inject(UserRepository.NAME) private userRepository: UserRepository) { }

    async create({ email, name, password, confirmed, token }: IUser) {
        const userExist = await this.userRepository.findUserByEmail(email);
        if (userExist) {
            throw new EmailAlreadyTakenException(); 
        }
        return await this.userRepository.createUser({ email, name, password, confirmed, token });
    }

    async getAllUsers() {
        return await this.userRepository.getAllUsers();
    }
}