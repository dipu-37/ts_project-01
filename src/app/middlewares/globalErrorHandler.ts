import { ErrorRequestHandler } from "express";
import path from "path";
import { ZodError, ZodIssue, ZodIssueCode } from "zod";
import { TErrorSource } from "../interface/error";
import config from "../config";
import handleValidationError from "../errors/handleValidationError";
import handleCastError from "../errors/handleCastError";
import { handleZodError } from "../errors/handleZodError";
import handleDuplicateError from "../errors/handleDuplicateError";
import AppError from "../errors/AppError";





const globalErrorHandler: ErrorRequestHandler = (err, req, res, next): void => {
 // console.log(err.statusCode);

  let statusCode = 500;
  let message = "Something went wrong";

  let errorSource: TErrorSource = [
    {
      path: "",
      message: "Something Went Wrong",
    },
  ];

  // Zod error
  if (err instanceof ZodError) {
    const simplifiedError = handleZodError(err);
    statusCode = simplifiedError?.statusCode;
    message = simplifiedError.message;
    errorSource = simplifiedError.errorSource;
  } else if (err?.name === "ValidationError") {
    const simplifiedError = handleValidationError(err);
    statusCode = simplifiedError?.statusCode;
    message = simplifiedError?.message;
    errorSource = simplifiedError.errorSource;
  } else if (err?.name === "CastError") {
    const simplifiedError = handleCastError(err);
    statusCode = simplifiedError?.statusCode;
    message = simplifiedError?.message;
    errorSource = simplifiedError.errorSource;
  } else if (err?.code === 11000) {
    const simplifiedError = handleDuplicateError(err);
    statusCode = simplifiedError?.statusCode;
    message = simplifiedError?.message;
    errorSource = simplifiedError.errorSource;
  } else if (err instanceof AppError) {
    statusCode = err?.statusCode;
    message = err?.message;
    errorSource = [
      {
        path: "",
        message: err?.message,
      },
    ];
  } else if (err instanceof Error) {
    message = err?.message;
    errorSource = [
      {
        path: "",
        message: err?.message,
      },
    ];
  }

  // ultimate return
  res.status(statusCode).json({
    success: false,
    message,
    errorSource,
    stack: config.NODE_ENV === "development" ? err?.stack : null,
    err,
  });
};

export default globalErrorHandler;

//npm i http-status

/*
  success
  message 
  errorSource:[
  path:"",
  message :""
  ]
  stack
  */
