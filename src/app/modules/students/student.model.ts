import { Schema, model } from "mongoose";
import {
  TGuardian,
  TLocalGuardian,
  TStudent,
  StudentMethod,
  StudentModel,
  TUserName,
} from "./student.interface";

const userNameSchema = new Schema<TUserName>({
  firstName: {
    type: String,
    required: [true, "First name is required"],
    trim: true,
  },
  middleName: {
    type: String,
    trim: true,
    required: false, 
  },
  lastName: {
    type: String,
    required: true,
  },
});

const guardianSchema = new Schema<TGuardian>({
  fatherName: { type: String, required: true },
  fatherOccupation: { type: String, required: true },
  fatherContactNo: { type: String, required: true },
  motherName: { type: String, required: true },
  motherOccupation: { type: String, required: true },
  motherContactNo: { type: String, required: true },
});

const localGuardianSchema = new Schema<TLocalGuardian>({
  name: { type: String, required: true },
  occupation: { type: String, required: true },
  contactNo: { type: String, required: true },
  address: { type: String, required: true },
});

const studentSchema = new Schema<TStudent, StudentModel, StudentMethod>({
  id: { type: String, required: true, unique: true },
  name: { type: userNameSchema, required: true },
  gender: { type: String, enum: ["male", "female"], required: true },
  dateOfBirth: { type: String },
  email: { type: String, required: true, unique: true },
  contactNo: { type: String, required: true },
  emergencyContactNo: { type: String, required: true },
  bloodGroup: {
    type: String,
    enum: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
  },
  presentAddress: { type: String, required: true },
  permanentAddress: { type: String, required: true },
  guardian: { type: guardianSchema, required: true },
  localGuardian: { type: localGuardianSchema, required: true },
  profileImg: { type: String },
  isActive: { type: String, enum: ["active", "blocked"], required: true },
});

studentSchema.methods.isUserExists = async function (id:string) {
  const existingUser = await Student.findOne({id});
  return existingUser;
}

export const Student = model<TStudent,StudentModel>("Student", studentSchema);
