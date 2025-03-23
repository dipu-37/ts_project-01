

import status from "http-status";
import AppError from "../../errors/AppError";
import { User } from "../users/user.model";
import { TLoginUser } from "./auth.interface";
const bcrypt = require('bcrypt');
import jwt from 'jsonwebtoken';
import config from "../../config";

const loginUser = async (payload: TLoginUser) => {
  // check if the user is exists
  const user = await User.isUserExistsByCustomId(payload.id);

  if (!user) {
    throw new AppError(status.NOT_FOUND, "This user is not found !");
  }

  // checked if the user is already deleted

  const isDeleted = user?.isDeleted;

  if (!user) {
    throw new AppError(status.NOT_FOUND, "This user is not found !");
  }

  // checking if the user is blocked

  const userStatus = user?.status;

  if (userStatus === "blocked") {
    throw new AppError(status.FORBIDDEN, "This user is blocked ! !");
  }

  // checked if the password is correct

  if(!(await User.isPasswordMatched(payload?.password, user?.password))){
    throw new AppError(status.FORBIDDEN, 'Password do not matched');
  }


  // CREATE token and sent to the client 

  const JwtPayload = {
    userId : user.id,
    role : user.role,
  }

  const accessToken = jwt.sign(JwtPayload, config.jwt_access_secret as string, { expiresIn:'10d'});

  return {
    accessToken,
    needsPasswordChange : user?.needsPasswordChange,
  };

};

export const authServices = {
  loginUser,
};
