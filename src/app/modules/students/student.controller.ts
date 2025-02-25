import { Student } from "./student.model";
import { NextFunction, Request, RequestHandler, Response } from "express";
import { StudentServices } from "./student.server";
import sendResponse from "../../utils/sendResponse";
import status from "http-status";
import catchAsync from "../../utils/catchAsync";



//get all student

const getAllStudents : RequestHandler= catchAsync(async (req, res) => {
 
  const result = await StudentServices.getAllStudentsFromDB(req.query);

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "student retrieved successfully",
    data: result,
  });
});

// get single student

const getSingleStudent = catchAsync(async (req, res, next) => {
  const studentId = req.params.studentId;
  const result = await StudentServices.getSingleStudentFromDB(studentId);
  res.status(200).json({
    success: true,
    message: "Student is retrieved successfully",
    data: result,
  });
});

// delete student

const deleteStudent = catchAsync(async (req, res, next) => {
  const { studentId } = req.params;
  const result = await StudentServices.deleteStudentFromDB(studentId);
  res.status(200).json({
    success: true,
    message: "student is deleted successfully",
    data: result,
  });
});


const updateStudent = catchAsync(async (req, res) => {
  const { studentId } = req.params;
  //console.log(studentId);
  const {student}=req.body;
 
  const result = await StudentServices.updateStudentFromDB(studentId,student);
//console.log(result);
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'Student is updated successfully',
    data: result,
  });
});

export const StudentControllers = {
  getAllStudents,
  getSingleStudent,
  deleteStudent,
  updateStudent,
};
