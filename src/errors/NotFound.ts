export default class NotFound extends Error {
    statusCode: number;

    constructor(message: string) {
        super(message);
        Object.setPrototypeOf(this, NotFound.prototype);
        this.name = 'Not Found';
        this.statusCode = 404;
    }
}
