import { AuthController } from './../components/auth/controller/auth.controller';
import { AuthService } from './../components/auth/service/auth.service';
import { AuthRepository } from './../components/auth/repository/auth.repository';
import { UserController } from '../components/user/controller/user.controller';
import { UserService } from '../components/user/service/user.service';
import { UserRepository } from '../components/user/repository/user.repository';
import { Container } from 'inversify';

const container = new Container();

/* User */ 
container.bind<UserRepository>('UserRepository').to(UserRepository);
container.bind<UserService>('UserService').to(UserService);
container.bind<UserController>('UserController').to(UserController);

/** Auth */
container.bind<AuthRepository>('AuthRepository').to(AuthRepository);
container.bind<AuthService>('AuthService').to(AuthService);
container.bind<AuthController>('AuthController').to(AuthController);

export { container };
