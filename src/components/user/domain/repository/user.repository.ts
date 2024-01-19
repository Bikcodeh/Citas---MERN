import { IUser } from "../interface";

export interface UserRepository {
    createUser({ email, name, password, confirmed, token }: IUser): Promise<IUser>
    findUserByEmail(email: string): Promise<IUser | null>
    getAllUsers(): Promise<IUser[]>
    validatePassword(email: string, formPassword: string): Promise<boolean>
    findByToken(token: string): Promise<IUser | null>
    confirmUser(user: IUser): Promise<boolean>;
}