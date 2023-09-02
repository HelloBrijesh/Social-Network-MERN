import { customErrorHandler } from "../services";

const errorHandler = (error, request, response, next) => {
  let statusCode = 500;
  let data = {
    message: "Internal Server Error",
    originalMessage: error.message,
  };

  if (err instanceof customErrorHandler) {
    statusCode = err.status;
    data = {
      message: err.message,
    };
  }

  return response.status(statusCode).json(data);
};

export default errorHandler;
