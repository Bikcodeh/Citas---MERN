import { inject, injectable } from 'inversify';
import { ProjectNotAllowedException, ProjectNotFoundException } from '../../../../common/exceptions';
import { IUser } from '../../../user/domain/interface';
import { EditProjectParams, IProject } from '../../domain/interface';
import { IProjectRepository } from '../../domain/repository/project.repository';

@injectable()
export class ProjectService {

    static NAME: string = 'ProjectService';

    constructor(@inject('ProjectRepository') private projectRepository: IProjectRepository) { }

    public addProject = async (data: IProject): Promise<IProject> => {
        const project = await this.projectRepository.createProject(data)
        return project;
    }

    public getProjectsByUser = async (owner: IUser): Promise<IProject[]> => {
        return await this.projectRepository.getAllProjectsByUser(owner);
    }

    public getProjectById = async (projectId: string, ownerId: any): Promise<IProject> => {
        const project = await this.projectRepository.getProjectById(projectId);
        if (!project) {
            throw new ProjectNotFoundException();
        }
        if (project.owner._id.toString() !== ownerId.toString()) {
            throw new ProjectNotAllowedException();
        }
        return project;
    }

    public updateProjectById = async (projectId: any, ownerId: any, data: EditProjectParams): Promise<IProject | null> => {
        const project = await this.projectRepository.getProjectById(projectId);
        if (!project) {
            throw new ProjectNotFoundException();
        }
        if (project.owner._id.toString() !== ownerId.toString()) {
            throw new ProjectNotAllowedException();
        }

        return await this.projectRepository.editProjectById(project._id, data);
    }

    public deleteProjectById = async (projectId: any, ownerId: any) => {
        const project = await this.projectRepository.getProjectById(projectId);
        if (!project) {
            throw new ProjectNotFoundException();
        }
        if (project.owner._id.toString() !== ownerId.toString()) {
            throw new ProjectNotAllowedException();
        }
        await this.projectRepository.deleteProjectById(projectId);
    }
}
