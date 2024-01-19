import { injectable, inject } from 'inversify';
import { AuthRepository } from './../repository/auth.repository';
import { UserRepository } from '../../user/domain/repository/user.repository';
import { UserNotConfirmedException, UserNotFoundException, PasswordWrongException } from '../../../common/exceptions';
import { IUser } from '../../user/domain/interface';

@injectable()
export class AuthService {

    static NAME: string = "AuthService";

    constructor(
        @inject(AuthRepository.NAME) private authRepository: AuthRepository,
        @inject('UserRepository') private userRepository: UserRepository
    ) { }

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
        const result = await this.userRepository.confirmUser(user);
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
        await this.userRepository.resetToken(userId)
    }
}