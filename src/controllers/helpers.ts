import UnexistentReference from '../errors/UnexistentReference';
import UnformattedRequestBody from '../errors/UnformattedRequestBody';

function errorIsKnown(error: Error) {
    if (error instanceof UnexistentReference
        || error instanceof UnformattedRequestBody) return true;
    return false;
}

export default {
    errorIsKnown,
};
