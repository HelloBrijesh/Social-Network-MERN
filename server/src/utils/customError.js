class customError extends Error {
  constructor(statusCode, message) {
    super();
    this.status = statusCode;
    this.message = message;
  }

  static badRequest(message = "The request is invalid") {
    return new customErrorHandler(400, message);
  }

  static unAuthorized(message = "Username or Password is wrong") {
    return new customErrorHandler(401, message);
  }

  static forbidden(message = "You do not have the access") {
    return new customErrorHandler(403, message);
  }

  static notFound(message = "Not Found") {
    return new customErrorHandler(404, message);
  }

  static conflict(message = "Already Exists") {
    return new customErrorHandler(409, message);
  }

  static serverError(message = "Internal server Error") {
    return new customErrorHandler(500, message);
  }
}

export default customError;
