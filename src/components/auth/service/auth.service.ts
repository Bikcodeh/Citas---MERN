import { injectable, inject } from 'inversify';
import { AuthRepository } from './../repository/auth.repository';
import { UserRepository } from '../../user/repository/user.repository';
import { UserNotConfirmedException, UserNotFoundException, PasswordWrongException } from '../../../common/exceptions';

@injectable()
export class AuthService {

    static NAME: string = "AuthService";

    constructor(
        @inject(AuthRepository.NAME) private authRepository: AuthRepository,
        @inject(UserRepository.NAME) private userRepository: UserRepository
    ) { }

    async authenticate(email: string, password: string) {
        const user = await this.userRepository.findUserByEmail(email);
        if (!user) {
            throw new UserNotFoundException(); 
        }

        if (!user.confirmed) {
            throw new UserNotConfirmedException();
        }
        
        if (!await user.checkPassword(password)) {
            throw new PasswordWrongException();
        } else {
            return user;
        }
    }
}