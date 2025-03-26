import { Admin } from './../Admin/admin.model';

import { NextFunction, Request, RequestHandler, Response } from "express";
import { UserServices } from "./user.service";
import sendResponse from "../../utils/sendResponse";
import status from "http-status";
import catchAsync from '../../utils/catchAsync';



const createStudent = catchAsync(async (req, res) => {

  console.log('file data is ---->',req.file);
  console.log(req.body);
  // const { password, student: studentData } = req.body;

  // const result = await UserServices.createStudentIntoDB(
  //   password,
  //   studentData,
  // );

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'Student is created successfully',
    data: null,
  });
});


const createAdmin = catchAsync(async(req,res)=>{
  //console.log(req.body);
  const {password, admin:adminData} = req.body;
  // console.log(adminData);
  // console.log(password);
  const result = await UserServices.createAdminIntoDB(password,adminData);
 //console.log(result);
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'Admin is created successfully',
    data: result,
  });
});

const createFaculty = catchAsync(async (req, res) => {
  const { password, faculty: facultyData } = req.body;

  const result = await UserServices.createFacultyIntoDB(
    password,
    facultyData,
  );

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'Faculty is created successfully',
    data: result,
  });
});

const getMe = catchAsync(async(req,res)=>{
  const {userId, role} = req.user;
  const result = await UserServices.getMe(userId,role)

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'User is retrieved successfully',
    data: result,
  });

})

const changeStatus = catchAsync(async(req,res)=> {
  const id = req.params.id;
  const result = await UserServices.changeStatus(id , req.body)

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'Status is updated successfully',
    data: result,
  });
})


export const userControllers = {
  createStudent,
  createAdmin,
  createFaculty,
  getMe,
  changeStatus,
};
