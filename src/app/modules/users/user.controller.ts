
import { Request, Response } from "express";
import { StudentServices } from "../students/student.server";
import { StudentValidationSchema } from "../students/student.validation";
import { UserServices } from "./user.service";

const createStudent = async (req: Request, res: Response) => {
  try {
    const { password, student: StudentData } = req.body;
    // const zodParsedData = StudentValidationSchema.parse(StudentData);
    const result = await UserServices.createStudentIntoDB(
      password,
      StudentData
    );
    res.status(200).json({
      success: true,
      message: "student create successfully",
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
        success: false,
        message: err.message || 'something went wrong',
        error : err,
    });
  }
};

export const userControllers = {
  createStudent,
};
