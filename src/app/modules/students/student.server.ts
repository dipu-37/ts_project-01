import { TStudent } from "./student.interface";
import { Student } from "./student.model";


const getAllStudentsFromDB= async ()=>{
  const result = await Student.find();
  return result;
}

const getSingleStudentFromDB = async(id:string)=>{
  // const result = await Student.findOne({id});  // must use id not studentID
  // console.log(result);

  const result = await Student.aggregate([
    {$match:{id: id}}
  ]);
  return result;
}


const deleteStudentFromDB = async(id:string)=>{
  const result = await Student.updateOne({id},{
    isDeleted:true
  });  // must use id not studentID
  console.log(result);
  return result;
}

export const StudentServices = {
 // createStudentIntoDB,
  getAllStudentsFromDB,
  getSingleStudentFromDB,
  deleteStudentFromDB,
};
