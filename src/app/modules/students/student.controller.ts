import { Student } from "./student.model";
import { NextFunction, Request, Response } from "express";
import { StudentServices } from "./student.server";
import sendResponse from "../../utils/sendRespons";
import status from "http-status";


//get all student

const getAllStudents = async (req: Request, res: Response,next: NextFunction) => {
  try {
    const result = await StudentServices.getAllStudentsFromDB();

    sendResponse(res,{
      statusCode: status.OK,
      success: true,
      message: 'student retrieved successfully',
      data : result
     });

  } catch (err) {
   next(err)
  }
};

// get single student

const getSingleStudent = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const studentId = req.params.studentId;
    const result = await StudentServices.getSingleStudentFromDB(studentId);
    res.status(200).json({
      success: true,
      message: "Student is retrieved successfully",
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const deleteStudent = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { studentId } = req.params;
    const result = await StudentServices.deleteStudentFromDB(studentId);
    res.status(200).json({
      success: true,
      message: "student is deleted successfully",
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

export const StudentControllers = {
  // createStudent,
  getAllStudents,
  getSingleStudent,
  deleteStudent,
};
