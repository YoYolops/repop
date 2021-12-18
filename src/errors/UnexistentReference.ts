export default class UnexistentReference extends Error {
    statusCode: number;

    constructor(message: string) {
        super(message);
        Object.setPrototypeOf(this, UnexistentReference.prototype);
        this.name = 'Not Acceptable';
        this.statusCode = 406;
    }
}
