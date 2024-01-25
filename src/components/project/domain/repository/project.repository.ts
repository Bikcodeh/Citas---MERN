import { IUser } from "../../../user/domain/interface";
import { IProject } from "../interface";

export interface IProjectRepository {
    createProject(data: IProject): Promise<IProject>
    getAllProjectsByUser(owner: IUser): Promise<IProject[]>
    getProjectById(projectId: string): Promise<IProject | null>
}