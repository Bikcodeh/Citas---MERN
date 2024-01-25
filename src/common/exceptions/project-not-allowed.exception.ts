import { StatusCodes } from 'http-status-codes';
import { CustomException } from "./custom-exception";

export class ProjectNotAllowedException extends CustomException {
    constructor(message: string = 'Invalid project') {
        super(message, StatusCodes.FORBIDDEN)
    }
}