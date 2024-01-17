import { injectable } from 'inversify';

@injectable()
export class AuthRepository {
    static NAME: string = 'AuthRepository';
    constructor(){}
}