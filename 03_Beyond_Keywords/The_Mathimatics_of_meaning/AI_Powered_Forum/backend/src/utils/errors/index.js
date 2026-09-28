import { StatusCodes } from "http-status-codes";


class customApiError extends Error{
    constructor(message){
        super(message);
    }
}

export class BadRequestError extends customApiError{
    constructor(message){
        super(message);
        this.statusCode = StatusCodes.BAD_REQUEST
    }
}

export class NotFoundError extends customApiError{
    constructor(message){
        super(message);
        this.statusCode = StatusCodes.NOT_FOUND
    }
}
export class UnauthenticatedError extends customApiError{
    constructor(message){
        super(message);
        this.statusCode = StatusCodes.UNAUTHORIZED
    }
}
export class ServiceUnavailable extends customApiError{
    constructor(message){
        super(message);
        this.statusCode = StatusCodes.SERVICE_UNAVAILABLE
    }
}

export default customApiError;