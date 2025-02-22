import { TAcademicSemester } from "../modules/academicSemester/academicSemester.interface";
import { User } from "../modules/users/user.model";

const findLastStudentId = async () => {
  const lastStudent = await User.findOne(
    {
      role: "student",
    },
    {
      id: 1,
      _id: 0,
    }
  ).sort({createdAt: -1}).lean();
  // 203001 0001
  return lastStudent?.id ? lastStudent.id.substring(6) : undefined;
};

// year semesterCode 4digits code
export const generateStudentId = async (payLoad: TAcademicSemester) => {
  // fist time 0000
   const currentId =await findLastStudentId() || (0).toString();

 //console.log(await findLastStudentId()); 0001

  let incrementId = (Number(currentId) + 1).toString().padStart(4, "0");

  incrementId = `${payLoad.year}${payLoad.code}${incrementId}`;

  return incrementId;
};
