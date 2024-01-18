import { StatusCodes } from 'http-status-codes';
import { CustomException } from "./custom-exception";

export class EmailAlreadyTakenException extends CustomException {
    constructor(message: string = 'Email Already Taken.') {
        super(message, StatusCodes.BAD_REQUEST)
    }
}