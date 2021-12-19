import Conflict from '../errors/Conflict';
import NotFound from '../errors/NotFound';
import UnexistentReference from '../errors/UnexistentReference';
import UnformattedRequestBody from '../errors/UnformattedRequestBody';

function errorIsKnown(error: Error) {
    if (error instanceof UnexistentReference
        || error instanceof UnformattedRequestBody
        || error instanceof NotFound
        || error instanceof Conflict) return true;
    return false;
}

export default {
    errorIsKnown,
};
