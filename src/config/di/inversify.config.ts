import { ProjectMongoRepository } from './../../components/project/infraestructure/repository/project.mongo.repository';
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
import { ProjectService } from '../../components/project/infraestructure/service/project.service';
import { IProjectRepository } from '../../components/project/domain/repository/project.repository';
import { TasksController } from '../../components/tasks/infraestructure/controller/tasks.controller';

const container = new Container();

/** Auth */
container.bind<AuthRepository>(AuthRepository.NAME).to(AuthRepository);
container.bind<AuthService>(AuthService.NAME).to(AuthService);
container.bind<AuthController>(AuthController.NAME).to(AuthController);

/* User */
container.bind<UserService>(UserService.NAME).to(UserService);
container.bind<UserController>(UserController.NAME).to(UserController);
container.bind<UserRepository>('UserRepository').to(UserMongoRepository);
container.bind<GenericMapper<IUser, IUserDocumentModel>>(UserMapper.NAME).to(UserMapper);

/** Project */
container.bind<ProjectController>(ProjectController.NAME).to(ProjectController);
container.bind<ProjectService>(ProjectService.NAME).to(ProjectService);
container.bind<IProjectRepository>('ProjectRepository').to(ProjectMongoRepository);

/** Tasks */
container.bind<TasksController>(TasksController.NAME).to(TasksController);

export { container };
