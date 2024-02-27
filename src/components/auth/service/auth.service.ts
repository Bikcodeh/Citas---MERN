import { injectable, inject } from 'inversify';
import { UserRepository } from '../../user/domain/repository/user.repository';
import {
    UserNotConfirmedException,
    UserNotFoundException,
    PasswordWrongException,
    InvalidTokenException
} from '../../../common/exceptions';
import { IUser } from '../../user/domain/interface';

@injectable()
export class AuthService {

    static NAME: string = 'AuthService';

    constructor(@inject('UserRepository') private userRepository: UserRepository) { }

    async authenticate(email: string, password: string) {
        const user = await this.userRepository.findUserByEmail(email);

        if (!user) {
            throw new UserNotFoundException();
        }

        if (!user.confirmed) {
            throw new UserNotConfirmedException();
        }

        if (!await this.userRepository.validatePassword(user.email, password)) {
            throw new PasswordWrongException();
        } else {
            return user;
        }
    }

    async confirm(token: string): Promise<boolean> {
        const user = await this.userRepository.findByToken(token);
        if (!user) {
            throw new UserNotFoundException();
        }
        const result = await this.userRepository.confirmUser(user._id);
        return result;
    }

    async validateUserByEmail(email: string): Promise<IUser> {
        const user = await this.userRepository.findUserByEmail(email);

        if (!user) {
            throw new UserNotFoundException();
        }
        return user;
    }

    async resetToken(userId: string) {
        return await this.userRepository.resetToken(userId)
    }

    async validateToken(token: string): Promise<boolean> {
        const user = await this.userRepository.findByToken(token);
        if (!user) {
            throw new InvalidTokenException();
        }
        return true;
    }

    async newPassword(token: string, newPassword: string): Promise<boolean> {
        const user = await this.userRepository.findByToken(token);
        if (!user) {
            throw new InvalidTokenException();
        }
        return await this.userRepository.changePassword(user._id, newPassword)
    }
}