import { Model } from "mongoose";
import { USER_ROLE } from "./user.constant";


export interface TUser  {
  id: string;
  email: string;
  password : string;
  needsPasswordChange : boolean;
  passwordChangedAt?:Date;
  role: 'student'|'faculty'|'admin'|'superAdmin';
  status: 'in-progress'|'blocked';
  isDeleted: boolean;
};

export interface UserModel extends Model<TUser>{
  isUserExistsByCustomId(id:string): Promise<TUser>;

  isPasswordMatched(plainTextPassword: string, hashedPassword: string): Promise<boolean>;

  isJWTIssuedBeforePasswordChange(
    passwordChangeTimestamp : Date,
    jwtIssuedTimestamp : number,
  ) : boolean;
}


export type TUserRole = keyof typeof USER_ROLE