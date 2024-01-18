import { StatusCodes } from 'http-status-codes';
import { CustomException } from "./custom-exception";

export class UserNotFoundException extends CustomException {
    constructor(message: string = 'User Not Found.') {
        super(message, StatusCodes.FORBIDDEN)
    }
}