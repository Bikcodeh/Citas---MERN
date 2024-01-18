import { injectable, inject } from "inversify";
import { UserRepository } from '../../domain/repository/user.repository';
import { IUser } from "../../domain/interface";
import { EmailAlreadyTakenException } from '../../../../common/exceptions/email-already-taken.exception';

@injectable()
export class UserService {

    static NAME: string = 'UserService';

    constructor(@inject('UserRepository') private userRepository: UserRepository) { }

    async create({ email, name, password, confirmed, token }: IUser): Promise<IUser> {
        const userExist = await this.userRepository.findUserByEmail(email);
        if (userExist) {
            throw new EmailAlreadyTakenException();
        }
        return await this.userRepository.createUser({ email, name, password, confirmed, token });
    }

    async getAllUsers(): Promise<IUser[]> {
        return await this.userRepository.getAllUsers();
    }
}