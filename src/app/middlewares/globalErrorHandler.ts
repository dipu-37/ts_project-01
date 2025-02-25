import { ErrorRequestHandler } from "express";
import path from "path";
import { ZodError, ZodIssue, ZodIssueCode } from "zod";
import { TErrorSource } from "../interface/error";
import config from "../config";
import { handleZodError } from "../errors/handleZodError";
import handleValidationError from "../errors/handleValidationError";

const globalErrorHandler: ErrorRequestHandler = (err, req, res, next): void => {
  console.log(err.statusCode);

  let statusCode = err.statusCode || 500;
  let message = err.message || "Something went wrong";

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
  }else if(err?.name ==='ValidationError'){
    
    const simplifiedError = handleValidationError(err)
    statusCode = simplifiedError?.statusCode;
    message = simplifiedError?.Message;
    errorSource = simplifiedError.errorSource;

  }

  // ultimate return
  res.status(statusCode).json({
    success: false,
    message,
    errorSource,
    stack: config.NODE_ENV ==='development' ? err?.stack : null,
    //err,
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
