import { StatusCodes } from 'http-status-codes';
import { CustomException } from "./custom-exception";

export class PasswordWrongException extends CustomException {
    constructor(message: string = 'Password wrong.') {
        super(message, StatusCodes.BAD_REQUEST)
    }
}