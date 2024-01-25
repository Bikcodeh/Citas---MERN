import { injectable } from 'inversify';
import { IProject } from "../../domain/interface";
import { IProjectRepository } from "../../domain/repository/project.repository";
import Project from '../../domain/model/project.model';
import { IUser } from '../../../user/domain/interface';
import { ProjectNotFoundException } from '../../../../common/exceptions';

@injectable()
export class ProjectMongoRepository implements IProjectRepository {

    constructor() { }

    async getProjectById(projectId: string): Promise<IProject | null> {
        try {
            return await Project.findById(projectId);
        } catch (error) {
            throw new ProjectNotFoundException();
        }
    }

    async getAllProjectsByUser(owner: IUser): Promise<IProject[]> {
        const data = await Project.find().where('owner').equals(owner._id).populate('owner');
        return data;
    }

    public createProject = async (data: IProject): Promise<IProject> => {
        const project = new Project(data);
        project.client = 'sss'
        await project.save()
        return project;
    }

}