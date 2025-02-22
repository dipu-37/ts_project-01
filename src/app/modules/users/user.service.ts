import { generateStudentId } from "../../utils/user.utils";
import { TAcademicSemester } from "../academicSemester/academicSemester.interface";
import { AcademicSemester } from "../academicSemester/academicSemester.model";
import { TStudent } from "../students/student.interface";
import { Student } from "../students/student.model";
import { TUser } from "./user.interface";
import { User } from "./user.model";

const createStudentIntoDB = async (password: string, payLoad: TStudent) => {
  // create a user objects
  const userData: Partial<TUser> = {};

  // if password is not given, use default password
  userData.password = password || (process.env.DEFAULT_PASS as string);

  // set use roll
  userData.role = "student";


 

  // find academic semester info

  const admissionSemester = await AcademicSemester.findById(payLoad.admissionSemester);

  if (!admissionSemester) {
    throw new Error("Admission semester not found!");
  }

   // set manually generated id
  userData.id = await  generateStudentId(admissionSemester);

  // create a user
  const NewUser = await User.create(userData); // built in static
  

  // create a student 
  if(Object.keys(NewUser).length){
    // set id, _id as user
    payLoad.id = NewUser.id;  // 
    payLoad.user = NewUser._id; // ref _id 

    const newStudent = await Student.create(payLoad);
    return newStudent;
  }

};

export const UserServices = {
  createStudentIntoDB,
};
