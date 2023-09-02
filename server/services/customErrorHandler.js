class customErrorHandler extends Error {
  constructor(statusCode, message) {
    super();
    this.status = statusCode;
    this.message = message;
  }

  static alreadyExists(message = "Already Exists") {
    return new customErrorHandler(409, message);
  }

  static wrongCredentials(message = "Username or Password is wrong") {
    return new customErrorHandler(401, message);
  }

  static unAuthorized(message = "unAuthorized") {
    return new customErrorHandler(401, message);
  }

  static notFound(message = "Not Found") {
    return new customErrorHandler(404, message);
  }

  static serverError(message = "Internal server Error") {
    return new customErrorHandler(500, message);
  }
}

export default customErrorHandler;
