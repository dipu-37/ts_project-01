
import { NextFunction, Request, RequestHandler, Response } from "express";
import { UserServices } from "./user.service";
import sendResponse from "../../utils/sendResponse";
import status from "http-status";



const createStudent : RequestHandler = async (req, res,next) => {
  try {
    const { password, student: StudentData } = req.body;
  
    const result = await UserServices.createStudentIntoDB(
      password,
      StudentData
    );

   sendResponse(res,{
    statusCode: status.OK,
    success: true,
    message: 'student created successfully',
    data : result
   });

  } catch (err) {
   next(err)
  }
};

export const userControllers = {
  createStudent,
};
