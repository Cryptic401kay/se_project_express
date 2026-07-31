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

class BadRequestError extends HttpError {
  constructor(message) {
    super(message, BAD_REQUEST);
  }
}

class UnauthorizedError extends HttpError {
  constructor(message) {
    super(message, UNAUTHORIZED);
  }
}

class ForbiddenError extends HttpError {
  constructor(message) {
    super(message, FORBIDDEN);
  }
}

class NotFoundError extends HttpError {
  constructor(message) {
    super(message, NOT_FOUND);
  }
}

class ConflictError extends HttpError {
  constructor(message) {
    super(message, CONFLICT);
  }
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
