import exp from "constants";
import { model, Schema } from "mongoose"
import { TUser, UserModel } from "./user.interface";
import { UserStatus } from "./user.constant";
const bcrypt = require("bcrypt");


const userSchema = new Schema<TUser,UserModel>({
  id: {
    type: String,
    require: true,
    unique: true,
  },
  email:{
    type: String,
    required: true,
    unique: true,
  },
  password : {
    type: String,
    require: true,
    select: 0,  /// find korlaw password show korba ne
  },
  needsPasswordChange :{
    type : Boolean,
    default:true,
  },
  passwordChangedAt:{
     type : Date,
  },
  role: {
    type: String,
    enum : ['student','faculty','admin','superAdmin'],
  },
  status: {
    type: String,
    enum :UserStatus,
    default:'in-progress'
  },
  isDeleted:{
    type: Boolean,
    default: false,
  },
  
},
{
  timestamps: true, 
},

);


// save() or create()

userSchema.pre("save",async function (next) {
  // console.log(this,'pre hook: we will save data');

  // hashing password and save into db
  const user = this;  // current document j ta akon post man thaka send korci
  user.password = await bcrypt.hash(user.password, Number(process.env.SALT_ROUND));
  next();
});



userSchema.post("save", function (doc,next) {

  // doc  ------> updated document /hash + document 
  doc.password='';
  //console.log("post hook : we will save our data");
  next();
});

userSchema.statics.isUserExistsByCustomId = async function (id: string) {
  return await User.findOne({id}).select('+password');
};

userSchema.statics.isPasswordMatched = async function (plainTextPassword , hashedPassword) {
  
  return await bcrypt.compare(plainTextPassword, hashedPassword);
};


userSchema.statics.isJWTIssuedBeforePasswordChange = function(
  passwordChangeTimestamp : Date,
  jwtIssuedTimestamp : number,
){
  const passwordChangedTime = new Date(passwordChangeTimestamp).getTime()/1000  // ms--> second

  return passwordChangedTime > jwtIssuedTimestamp;
}


export const User = model<TUser,UserModel>('User',userSchema)