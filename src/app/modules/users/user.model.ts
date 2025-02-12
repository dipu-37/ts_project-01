import exp from "constants";
import { model, Schema } from "mongoose"
import { TUser } from "./user.interface";


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


export const User = model<TUser>('User',userSchema)