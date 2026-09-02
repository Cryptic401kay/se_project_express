const BAD_REQUEST = 400;
const NOT_FOUND = 404;
const INTERNAL_SERVER_ERROR = 500;
const CONFLICT = 409;
const UNAUTHORIZED = 401;
const FORBIDDEN = 403;

class HttpError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.name = this.constructor.name;
  }
}

function BadRequestError(message) {
  return new HttpError(message, BAD_REQUEST);
}

function UnauthorizedError(message) {
  return new HttpError(message, UNAUTHORIZED);
}

function ForbiddenError(message) {
  return new HttpError(message, FORBIDDEN);
}

function NotFoundError(message) {
  return new HttpError(message, NOT_FOUND);
}

function ConflictError(message) {
  return new HttpError(message, CONFLICT);
}

module.exports = {
  BAD_REQUEST,
  NOT_FOUND,
  INTERNAL_SERVER_ERROR,
  CONFLICT,
  UNAUTHORIZED,
  FORBIDDEN,
  HttpError,
  BadRequestError,
  UnauthorizedError,
  ForbiddenError,
  NotFoundError,
  ConflictError,
};
