import mongoose, { Error } from "mongoose";
import { generatedAdminId, generateFacultyId, generateStudentId } from "../../utils/user.utils";
import { AcademicSemester } from "../academicSemester/academicSemester.model";
import { TStudent } from "../students/student.interface";
import { Student } from "../students/student.model";
import { TUser } from "./user.interface";
import { User } from "./user.model";
import AppError from "../../errors/AppError";
import status from "http-status";
import { TAdmin } from "../Admin/admin.interface";
import config from "../../config";
import { Admin } from '../Admin/admin.model';
import { TFaculty } from "../faculty/faculty.interface";
import { AcademicDepartment } from "../academicDepartment/academicDepartment.model";
import { Faculty } from "../faculty/faculty.model";
import { sendImageToCloudinary } from "../../utils/sendImageToCloudinary";

const createStudentIntoDB = async (file : any,password: string, payLoad: TStudent) => {
  // create a user objects
  const userData: Partial<TUser> = {};

  // if password is not given, use default password
  userData.password = password || (process.env.DEFAULT_PASS as string);

  // set use roll
  userData.role = "student";
  userData.email = payLoad.email;


  // find academic semester info

  const admissionSemester = await AcademicSemester.findById(
    payLoad.admissionSemester
  );

  if (!admissionSemester) {
    throw new Error("Admission semester not found!");
  }


  // find department
  const academicDepartment = await AcademicDepartment.findById(
    payLoad.academicDepartment,
  );

  if (!academicDepartment) {
    throw new AppError(400, 'Academic department not found');
  }
  payLoad.academicFaculty = academicDepartment.academicFaculty;

  // create session
  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    // set generated id
    userData.id = await generateStudentId(admissionSemester);

    if(file){
      const imageName = `${userData.id}${payLoad?.name?.firstName}`;

      const path = file?.path;

       // send image to cloudinary 
       const {secure_url } = await sendImageToCloudinary(imageName,path);

       payLoad.profileImg = secure_url as string;
       
    }
   

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

const createAdminIntoDB = async (
  file : any,
  password: string,
  payload: TAdmin,
)=>{
  //console.log(payload);
  const userData : Partial<TUser> ={};
  userData.password = password || (config.default_password as string)
  userData.role ='admin';
  userData.email = payload.email;
  const session = await mongoose.startSession();

  try{
   session.startTransaction();
   userData.id = await generatedAdminId();

   if (file) {
    const imageName = `${userData.id}${payload?.name?.firstName}`;
    const path = file?.path;
    //send image to cloudinary
    const { secure_url } = await sendImageToCloudinary(imageName, path);
    payload.profileImg = secure_url as string;
  }

  
   // create a user ( transaction -1)
   const newUser = await User.create([userData],{session});
   if(!newUser.length){
    throw new AppError(status.BAD_REQUEST, 'Failed to create admin');
   }
   // set id and _id as user 
   payload.id = newUser[0].id;
   payload.user = newUser[0]._id;  /// ref id

   // create a admin (transaction -2 )

   const newAdmin = await Admin.create([payload],{session});

   if(!newAdmin.length){
    throw new AppError(status.BAD_GATEWAY, 'Failed  to create admin')
   }
   await session.commitTransaction();
   await session.endSession();
   
   return newAdmin;
  }catch(err : any)
  {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(err)
  }
}


const createFacultyIntoDB = async(file : any ,password : string, payload: TFaculty)=>{
   const userData : Partial<TUser> = {};
   userData.password = password || (config.default_password as string);
   userData.role = 'faculty';
   userData.email = payload.email;
   const academicDepartment = await AcademicDepartment.findById(payload.academicDepartment);

   if(!academicDepartment){
    throw new AppError(400, 'Academic department not found');
   }
   payload.academicFaculty = academicDepartment?.academicFaculty;

   const session = await mongoose.startSession();
   try{
    session.startTransaction();
    userData.id = await generateFacultyId();


    if (file) {
      const imageName = `${userData.id}${payload?.name?.firstName}`;
      const path = file?.path;
      //send image to cloudinary
      const { secure_url } = await sendImageToCloudinary(imageName, path);
      payload.profileImg = secure_url as string;
    }

    const newUser = await User.create([userData], { session }); // array

    //create a faculty
    if (!newUser.length) {
      throw new AppError(status.BAD_REQUEST, 'Failed to create user');
    }
    // set id , _id as user
    payload.id = newUser[0].id;
    payload.user = newUser[0]._id; //reference _id

    // create a faculty (transaction-2)

    const newFaculty = await Faculty.create([payload], { session });
  console.log(newFaculty);
    if (!newFaculty.length) {
      throw new AppError(status.BAD_REQUEST, 'Failed to create faculty');
    }

    await session.commitTransaction();
    await session.endSession();

    return newFaculty;
   }catch(err:any){
    await session.abortTransaction();
    await session.endSession();
    throw new Error(err);
  }
}


const getMe = async (userId : string, role : string)=>{
  let result = null;
  if(role === 'student'){
    result = await Student.findOne({id : userId}).populate('user')
  }
  if(role === 'admin'){
    result = await Admin.findOne({id : userId}).populate('user')
  }
  if(role === 'faculty'){
    result = await Faculty.findOne({id : userId}).populate('user')
  }


  return result;

}


const changeStatus = async(id: string, payload : {status : string})=>{
  const result = await User.findByIdAndUpdate(id, payload,{
    new : true,
  })

  return result;
}

export const UserServices = {
  createStudentIntoDB,
  createAdminIntoDB,
  createFacultyIntoDB,
  getMe,
  changeStatus,
  
}
