import { Student } from "./student.model";
import { Request, Response } from "express";
import { StudentServices } from "./student.server";
import { z } from "zod";
import { StudentValidationSchema } from "./student.validation";
// insert  student
const createStudent = async (req: Request, res: Response) => {
  try {
    const student = req.body.student;

    //validation schema using zod
    const validateData = StudentValidationSchema.parse(student);

    const result = await StudentServices.createStudentIntoDB(validateData);
    res.status(200).json({
      success: true,
      message: "student is create successfully",
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || "something went wrong",
      error: err,
    });
  }
};

//get all student

const getAllStudents = async (req: Request, res: Response) => {
  try {
    const result = await StudentServices.getAllStudentsFromDB();
    res.status(200).json({
      success: true,
      message: "Student are retrieved successfully",
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || "something went wrong",
      error: err,
    });
  }
};

// get single student

const getSingleStudent = async (req: Request, res: Response) => {
  try {
    const studentId = req.params.studentId;
    const result = await StudentServices.getSingleStudentFromDB(studentId);
    res.status(200).json({
      success: true,
      message: "Student is retrieved successfully",
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || "something went wrong",
      error: err,
    });
  }
};

const deleteStudent = async (req: Request, res: Response) => {
  try {
    const { studentId } = req.params;
    const result = await StudentServices.deleteStudentFromDB(studentId);
    res.status(200).json({
      success: true,
      message: "student is deleted successfully",
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success : false,
      message : err.message || "something went wrong",
      error : err,
    })
  }
};

export const StudentControllers = {
  createStudent,
  getAllStudents,
  getSingleStudent,
  deleteStudent,
};
