import { Document } from "mongoose";

export interface IUser {
    name: string;
    password: string;
    email: string;
    token: string;
    confirmed: boolean;
    checkPassword: (formPassword: string) => Promise<boolean>;
}