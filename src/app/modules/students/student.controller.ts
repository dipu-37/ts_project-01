import { Request, Response } from "express";
import { StudentServices } from "./student.server";
import { string } from "zod";

const createStudent = async (req: Request, res: Response) => {
  try {
    const student = req.body.student;

    const result = await StudentServices.createStudentIntoDB(student);
    res.status(200).json({
      success: true,
      message: "student is create successfully",
      data: result,
    });
  } catch (error) {
    console.log(error);
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
  } catch (error) {
    console.log(error);
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
    })
  } catch (error) {
    console.log(error);
  }
};

export const StudentControllers = {
  createStudent,
  getAllStudents,
  getSingleStudent,
};
