import { StatusCodes } from 'http-status-codes';
import { CustomException } from "./custom-exception";

export class UserNotConfirmedException extends CustomException {
    constructor(message: string = 'User Not Confirmed Yet.') {
        super(message, StatusCodes.BAD_REQUEST)
    }
}