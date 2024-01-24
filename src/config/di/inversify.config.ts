import { AuthController } from '../../components/auth/controller/auth.controller';
import { AuthService } from '../../components/auth/service/auth.service';
import { AuthRepository } from '../../components/auth/repository/auth.repository';
import { UserController } from '../../components/user/infraestructure/controller/user.controller';
import { UserService } from '../../components/user/infraestructure/service/user.service';
import { UserRepository } from '../../components/user/domain/repository/user.repository';
import { Container } from 'inversify';
import { UserMongoRepository } from '../../components/user/infraestructure/repository/user-mongo.repository';
import { GenericMapper } from '../../common/mapper/generic-mapper';
import { UserMapper } from '../../components/user/infraestructure/mapper/user.mapper';
import { IUser, IUserDocumentModel } from '../../components/user/domain/interface';
import { ProjectController } from '../../components/project/infraestructure/controller/project.controller';

const container = new Container();

/** Auth */
container.bind<AuthRepository>('AuthRepository').to(AuthRepository);
container.bind<AuthService>('AuthService').to(AuthService);
container.bind<AuthController>('AuthController').to(AuthController);

/* User */ 
container.bind<UserService>('UserService').to(UserService);
container.bind<UserController>('UserController').to(UserController);
container.bind<UserRepository>('UserRepository').to(UserMongoRepository);
container.bind<GenericMapper<IUser, IUserDocumentModel>>('UserMapper').to(UserMapper);

/** Project */
container.bind<ProjectController>('ProjectController').to(ProjectController);

export { container };
