import { injectable } from 'inversify';
import { IProject } from "../../domain/interface";
import { IProjectRepository } from "../../domain/repository/project.repository";
import Project from '../../domain/model/project.model';

@injectable()
export class ProjectMongoRepository implements IProjectRepository {

    constructor(){}

    public createProject = async (data: IProject): Promise<IProject> => {
        const project = new Project(data);
        project.owner = data._id;
        project.client = 'sss'
        await project.save()
        return project;
    }

}