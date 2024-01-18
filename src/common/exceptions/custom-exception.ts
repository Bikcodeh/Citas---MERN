export class CustomException extends Error {

    public readonly code: number;

    constructor(message: string = 'An error happened, please try again later.', code: number) {
        super(message)
        this.code = code;
    }
}