export default class Conflict extends Error {
    statusCode: number;

    constructor(message: string) {
        super(message);
        Object.setPrototypeOf(this, Conflict.prototype);
        this.name = 'Conflict';
        this.statusCode = 409;
    }
}
