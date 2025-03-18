import { Admin } from './../Admin/admin.model';

import { NextFunction, Request, RequestHandler, Response } from "express";
import { UserServices } from "./user.service";
import sendResponse from "../../utils/sendResponse";
import status from "http-status";
import catchAsync from '../../utils/catchAsync';



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


const createAdmin = catchAsync(async(req,res)=>{
  //console.log(req.body);
  const {password, admin:adminData} = req.body;
  // console.log(adminData);
  // console.log(password);
  const result = await UserServices.createAdminIntoDB(password,adminData);
 console.log(result);
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'Admin is created successfully',
    data: result,
  });
});


export const userControllers = {
  createStudent,
  createAdmin,
};
