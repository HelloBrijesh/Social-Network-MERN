import { customErrorHandler } from "../services";
import { ValidationError } from "joi";

const errorHandler = (error, request, response, next) => {
  let statusCode = 500;
  let data = {
    message: "Internal Server Error",
    originalMessage: error.message,
  };

  if (error instanceof ValidationError) {
    statusCode = 422;
    data = {
      message: error.message,
    };
  }
  if (error instanceof customErrorHandler) {
    statusCode = error.status;
    data = {
      message: error.message,
    };
  }

  return response.status(statusCode).json(data);
};

export default errorHandler;
