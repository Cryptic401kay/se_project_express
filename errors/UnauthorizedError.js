// se_project_express/errors/UnauthorizedError.js
const HttpError = require("./HttpError");

class UnauthorizedError extends HttpError {
  constructor(message = "Unauthorized") {
    super(message, 401);
  }
}

module.exports = UnauthorizedError;