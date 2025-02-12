import { Schema, model } from "mongoose";
import {
  TGuardian,
  TLocalGuardian,
  TStudent,
  StudentModel,
  TUserName,
} from "./student.interface";
const bcrypt = require("bcrypt");

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

const studentSchema = new Schema<TStudent, StudentModel>({
  id: { type: String, required: true, unique: true },
  password: { type: String, required: true,},
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
  isDeleted:{
    type:Boolean,
    default:false,
  },
},
{
  toJSON:{
    virtuals: true,
  }
});


// virtual

studentSchema.virtual('fullName').get(function(){
  return `${this.name.firstName} ${this.name.lastName} ${this.name.middleName}`
})



// document middleware
// pre save middleware / hook : will work on save() or create()

studentSchema.pre("save",async function (next) {
  // console.log(this,'pre hook: we will save data');

  // hashing password and save into db
  const user = this;  // current document j ta akon post man thaka send korci
  user.password = await bcrypt.hash(user.password, Number(process.env.SALT_ROUND));
  next();
});



studentSchema.post("save", function (doc,next) {

  // doc  ------> updated document /hash + document 
  doc.password='';
  //console.log("post hook : we will save our data");
  next();
});


// query middleware;


studentSchema.pre('find',function(next){
  //console.log(this);
  this.find({isDeleted:{$ne:true}})
  next();
})

studentSchema.pre('findOne',function(next){
  this.findOne({isDeleted:{$ne:true}})
  next();
})

studentSchema.pre('aggregate',function(next){
  this.pipeline().unshift({$match:{isDeleted:{$ne:true}}})
  next();
})

//creating a custom static method

studentSchema.statics.isUserExists = async function (id: string) {
  const existingUser = await Student.findOne({ id });

  return existingUser;
};

//creating a custom instance method
// studentSchema.methods.isUserExists = async function (id:string) {
//   const existingUser = await Student.findOne({id});
//   return existingUser;
// }

export const Student = model<TStudent, StudentModel>("Student", studentSchema);
