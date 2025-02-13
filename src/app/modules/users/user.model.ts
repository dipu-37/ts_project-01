import exp from "constants";
import { model, Schema } from "mongoose"
import { TUser } from "./user.interface";
const bcrypt = require("bcrypt");


const userSchema = new Schema<TUser>({
  id: {
    type: String,
    require: true,
  },
  password : {
    type: String,
    require: true
  },
  needsPasswordChange :{
    type : Boolean,
    default:true,
  },
  role: {
    type: String,
    enum : ['student','faculty','admin'],
  },
  status: {
    type: String,
    enum : ['in-progress','blocks'],
    default:'in-progress'
  },
  isDeleted:{
    type: Boolean,
    default: false,
  },
  
},
{
  timestamps: true, //createdat updatedat  mongoose bydefault create kora
},

);


// document middleware
// pre save middleware / hook : will work on save() or create()

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



export const User = model<TUser>('User',userSchema)