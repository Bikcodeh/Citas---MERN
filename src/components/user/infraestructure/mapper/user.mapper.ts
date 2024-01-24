import { injectable } from 'inversify';
import { GenericMapper } from "../../../../common/mapper/generic-mapper";
import { IUserDocumentModel, IUser } from "../../domain/interface";
import User from "../../domain/model/user";

@injectable()
export class UserMapper implements GenericMapper<IUser, IUserDocumentModel> {

    static NAME: string = 'UserMapper';

    transform(from: IUser): IUserDocumentModel {
        return new User(from);
    }
}