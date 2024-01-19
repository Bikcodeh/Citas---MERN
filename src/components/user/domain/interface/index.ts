import { Document } from "mongoose";

export interface IUser {
    name: string;
    password: string;
    email: string;
    token: string;
    confirmed: boolean;
    [key: string]: any
}

export interface IUserDocumentModel extends IUser, Document { }

export interface IUserDocumentMethods extends IUserDocumentModel {
    checkPassword: (formPassword: string) => Promise<boolean>;
}