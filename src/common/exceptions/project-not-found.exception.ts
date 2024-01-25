import { StatusCodes } from 'http-status-codes';
import { CustomException } from "./custom-exception";

export class ProjectNotFoundException extends CustomException {
    constructor(message: string = 'Project Not Found.') {
        super(message, StatusCodes.NOT_FOUND)
    }
}