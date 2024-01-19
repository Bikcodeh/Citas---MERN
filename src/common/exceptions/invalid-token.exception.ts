import { StatusCodes } from 'http-status-codes';
import { CustomException } from "./custom-exception";

export class InvalidTokenException extends CustomException {
    constructor(message: string = 'Invalid Token') {
        super(message, StatusCodes.BAD_REQUEST)
    }
}