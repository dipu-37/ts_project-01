import { ErrorRequestHandler } from "express";

export const globalErrorHandler : ErrorRequestHandler = (err,req, res, next):void => {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode; 
    const message = err.message || 'Something went wrong';
  
    res.status(statusCode).json({
      success: false,
      message,
      error: err.stack || err,
    });
  }


  //npm i http-status