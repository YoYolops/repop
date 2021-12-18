export default class UnformattedRequestBody extends Error {
    statusCode: number;

    constructor(message: string) {
        super(message);
        Object.setPrototypeOf(this, UnformattedRequestBody.prototype);
        this.name = 'Bad Request';
        this.statusCode = 400;
    }
}
