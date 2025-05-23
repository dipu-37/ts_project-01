import { model, Schema } from "mongoose";
import { AdminModel, TAdmin, TUserName } from "./admin.interface";
import { BloodGroup, Gender } from "./admin.constant";

const userNameSchema = new Schema<TUserName>({
    firstName : {
        type : String,
        required: [true, 'First name is required'],
        trim : true,
        maxlength: [20, 'name can not be more than 20 character'],
    },
    middleName :{
        type : String,
        trim : true,
    },
    lastName : {
        type : String,
        trim : true,
        required : [ true, 'Last name is required'],
        maxlength : [20, 'Name can not be more than 20 character'],
    }
});

const adminSchema = new Schema<TAdmin,AdminModel>({
    id : {
        type : String,
        required : [true, 'ID is required'],
        unique : true,
    },
    user: {
        type : Schema.Types.ObjectId,
        required : [true, "User id is required"],
        unique : true,
        ref : 'User',
    },
    designation: {
        type : String,
        required : [true, 'Designation is required']
    },
    name : {
        type : userNameSchema,
        required :  [true,'Name is required' ]
    },
    gender : {
        type : String,
        enum : {
            values : Gender ,
            message : `{VALUE} is not a valid gender`,
        },
        required : [true, 'Gender is required']
    },
    dateOfBirth : { type : Date},
    email : {
        type : String,
        required : [true, "Email is required"],
        unique : true,
    },
    contactNo : { type : String, required : [true, 'Contact number is required']},
    emergencyContactNo : {
        type : String, 
        required : [true, 'Emergency contact number is required'],
    },
    bloodGroup : {
        type : String,
        enum : {
            values : BloodGroup,
            message : `{VALUE} is not a valid blood group `,
        },
    },
    presentAddress: {
        type: String,
        required: [true, 'Present address is required'],
      },
      permanentAddress: {
        type: String,
        required: [true, 'Permanent address is required'],
      },
      profileImg : {type : String, default : ''},
      isDeleted : {
        type : Boolean,
        default : false,
      },

  },
  {
    toJSON: {
      virtuals: true,
    },
  },);


  // generating full name 

  adminSchema.virtual('fullName').get(function(){
    return (
        this?.name?.firstName +''+
        this?.name?.middleName+''+
        this?.name?.lastName
    );
  });

  // filter out deleted documents

  adminSchema.pre('find', function(next){
    this.find({isDeleted : {$ne: true}});
    next();
  })

  adminSchema.pre('findOne', function(next){
    this.find({isDeleted : {$ne: true}});
    next();
  })

  adminSchema.pre('aggregate',function(next){
    this.pipeline().unshift({$match: {isDeleted: {$ne: true}}});
    next();
  })

  // check if user is already exist : 

  adminSchema.statics.isUserExists = async function (id : string) {
 
    const existingUser = await Admin.findOne({id});
    return existingUser;
    
  }

  export const Admin = model<TAdmin,AdminModel>('Admin',adminSchema)