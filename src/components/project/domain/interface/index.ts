import { Document } from "mongoose";
import { IUser } from "../../../user/domain/interface";

export interface IProject {
    name: string;
    description: string;
    deadline: Date;
    client: string;
    owner: IUser;
    collaborators: IUser[];
}

export interface IProjectDocument extends IProject, Document {}