import { StatusCodes } from 'http-status-codes';
import { CustomException } from "./custom-exception";

export class TaskNotFoundException extends CustomException {
    constructor(message: string = 'Task Not Found.') {
        super(message, StatusCodes.NOT_FOUND)
    }
}