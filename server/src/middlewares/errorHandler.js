import { ValidationError } from "joi";
import { customError } from "../utils/customError.js";

const errorHandler = (err, req, res, next) => {
  let statusCode = 500;
  let data = {
    message: "Internal Server Error",
    originalMessage: err.message,
  };
  if (err instanceof ValidationError) {
    statusCode = 422;
    data = {
      message: err.message,
    };
  }
  if (err instanceof customError) {
    statusCode = err.status;
    data = {
      message: err.message,
    };
  }

  return res.status(statusCode).json(data);
};

export default errorHandler;
