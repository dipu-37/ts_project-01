import { Student } from "./student.model";
import { NextFunction, Request, RequestHandler, Response } from "express";
import { StudentServices } from "./student.server";
import sendResponse from "../../utils/sendResponse";
import status from "http-status";
import catchAsync from "../../utils/catchAsync";



//get all student

const getAllStudents = catchAsync(async (req, res, next) => {
  const result = await StudentServices.getAllStudentsFromDB();

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

export const StudentControllers = {
  getAllStudents,
  getSingleStudent,
  deleteStudent,
};
