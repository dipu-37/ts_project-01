import { TStudent } from "../students/student.interface";
import { Student } from "../students/student.model";
import { TUser } from "./user.interface";
import { User } from "./user.model";

const createStudentIntoDB = async (password: string, studentData: TStudent) => {
  // create a user objects
  const userData: Partial<TUser> = {};

  // if password is not given, use default password
  userData.password = password || (process.env.DEFAULT_PASS as string);

  // set use roll
  userData.role = "student";

  // set manually generated id
  userData.id = "2030100001";

  // create a user
  const NewUser = await User.create(userData); // built in static
  

  // create a student 
  if(Object.keys(NewUser).length){
    // set id, _id as user
    studentData.id = NewUser.id;  // 
    studentData.user = NewUser._id; // ref _id 

    const newStudent = await Student.create(studentData);
    return newStudent;
  }

};

export const UserServices = {
  createStudentIntoDB,
};
