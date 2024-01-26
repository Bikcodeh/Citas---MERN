import { IUser } from "../../../user/domain/interface";
import { EditProjectParams, IProject } from "../interface";

export interface IProjectRepository {
    createProject(data: IProject): Promise<IProject>
    getAllProjectsByUser(owner: IUser): Promise<IProject[]>
    getProjectById(projectId: string): Promise<IProject | null>
    editProjectById(projectId: string, data: EditProjectParams): Promise<IProject>
}