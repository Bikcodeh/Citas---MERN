import { UserController } from '../components/user/controller/user.controller';
import { UserService } from '../components/user/service/user.service';
import { UserRepository } from '../components/user/repository/user.repository';
import { Container } from 'inversify';

const container = new Container();
container.bind<UserRepository>('UserRepository').to(UserRepository);
container.bind<UserService>('UserService').to(UserService);
container.bind<UserController>('UserController').to(UserController);

export { container };
