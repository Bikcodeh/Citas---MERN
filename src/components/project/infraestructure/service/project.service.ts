import { IProject } from '../../domain/interface';
import { IProjectRepository } from '../../domain/repository/project.repository';
import { inject, injectable } from 'inversify';

@injectable()
export class ProjectService {

    static NAME: string = 'ProjectService';

    constructor(@inject('ProjectRepository') private projectRepository: IProjectRepository) { }

    public addProject = async (data: IProject): Promise<IProject> => {
        const project = await this.projectRepository.createProject(data)
        return project;
    }
}
