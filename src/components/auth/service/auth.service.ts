import { injectable, inject } from 'inversify';
import { AuthRepository } from './../repository/auth.repository';

@injectable()
export class AuthService {

    static NAME: string = "AuthService";
    
    constructor(@inject(AuthRepository.NAME) private authRepository: AuthRepository) {}
}