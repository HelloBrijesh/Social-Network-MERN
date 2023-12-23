class ApiError extends Error {
  constructor(statusCode, message) {
    super();
    this.status = statusCode;
    this.message = message;
  }

  static badRequest(message = "The request is invalid") {
    return new ApiError(400, message);
  }

  static notAuthorized(message = "Username or Password is wrong") {
    return new ApiError(401, message);
  }

  static forbidden(message = "You do not have the access") {
    return new ApiError(403, message);
  }

  static notFound(message = "Not Found") {
    return new ApiError(404, message);
  }

  static conflict(message = "Already Exists") {
    return new ApiError(409, message);
  }

  static serverError(message = "Internal server Error") {
    return new ApiError(500, message);
  }
}

export { ApiError };
