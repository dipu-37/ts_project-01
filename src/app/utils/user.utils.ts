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
  return lastStudent?.id ? lastStudent.id: undefined;
};

export const findLastAdminId = async()=>{
  const lastAdmin = await User.findOne(
    {role : 'admin'},
    {id : 1, _id: 0},
  ).sort({createdAt: -1}).lean();

  return lastAdmin?.id ? lastAdmin.id.substring(2) : undefined;
}

// year semesterCode 4digits code
export const generateStudentId = async (payLoad: TAcademicSemester) => {
  // fist time 0000
   let currentId = (0).toString(); // 0000 by default

   const lastStudentId = await findLastStudentId();  // 2030 01 0001

   const lastStudentSemesterCode = lastStudentId?.substring(4,6);
   const lastStudentYear = lastStudentId?.substring(0,4);
   const currentSemesterCode = payLoad.code;
   const currentYear = payLoad.year;

   if(lastStudentId && lastStudentSemesterCode === currentSemesterCode && lastStudentYear === currentYear)
   {
      currentId = lastStudentId.substring(6);  // 0001
   }

 //console.log(await findLastStudentId()); 0001

  let incrementId = (Number(currentId) + 1).toString().padStart(4, "0");

  incrementId = `${payLoad.year}${payLoad.code}${incrementId}`;

  return incrementId;
};



export const generatedAdminId = async()=>{
  let currentId = (0).toString();
  const lastAdminId = await findLastAdminId();

  if(lastAdminId){
    currentId = lastAdminId.substring(2);
  }
  let incrementId = (Number(currentId)+1).toString().padStart(4,'0');
  incrementId =`A-${incrementId}`;
  return incrementId
}