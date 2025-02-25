import mongoose from "mongoose";
import { generateStudentId } from "../../utils/user.utils";
import { TAcademicSemester } from "../academicSemester/academicSemester.interface";
import { AcademicSemester } from "../academicSemester/academicSemester.model";
import { TStudent } from "../students/student.interface";
import { Student } from "../students/student.model";
import { TUser } from "./user.interface";
import { User } from "./user.model";
import AppError from "../../errors/AppError";
import status from "http-status";

const createStudentIntoDB = async (password: string, payLoad: TStudent) => {
  // create a user objects
  const userData: Partial<TUser> = {};

  // if password is not given, use default password
  userData.password = password || (process.env.DEFAULT_PASS as string);

  // set use roll
  userData.role = "student";

  // find academic semester info

  const admissionSemester = await AcademicSemester.findById(
    payLoad.admissionSemester
  );

  if (!admissionSemester) {
    throw new Error("Admission semester not found!");
  }

  // create session
  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    // set generated id
    userData.id = await generateStudentId(admissionSemester);

    // create a user (transaction -1)
    const NewUser = await User.create([userData], { session }); //array

    if (!NewUser.length) {
      throw new AppError(status.BAD_REQUEST,'failed to create user')
    }

    // create a student
      // set id, _id as user
      payLoad.id = NewUser[0].id; //
      payLoad.user = NewUser[0]._id; // ref _id

      // create a student (transaction -2)
      const newStudent = await Student.create([payLoad],{session});  // array

      await session.commitTransaction();
      await session.endSession();

      return newStudent;
    
  } catch (err : any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(err);
  }
};

export const UserServices = {
  createStudentIntoDB,
};
