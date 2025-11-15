import { BaseException } from './base-exception';

export class NotFoundException extends BaseException {
    constructor(resource = "Resource") {
        super(`${resource} not found`, 404);
    }
}

export class ValidationException extends BaseException {
    constructor(message = "Validation error") {
        super(message, 400);
    }
}

export class UnauthorizedException extends BaseException {
    constructor(message = "Unauthorized") {
        super(message, 401);
    }
}
