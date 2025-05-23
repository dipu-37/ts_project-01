import jwt, { JwtPayload } from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import catchAsync from "../utils/catchAsync";
import AppError from "../errors/AppError";
import status from "http-status";
import config from "../config";
import { TUserRole } from "../modules/users/user.interface";
import { User } from "../modules/users/user.model";

const auth = (...requiredRoles: TUserRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;

    // checking if the token is missing
    if (!token) {
      throw new AppError(status.UNAUTHORIZED, "You are not authorize !");
    }

    // checking if the given token is valid

    const decoded = jwt.verify(
      token,
      config.jwt_access_secret as string
    ) as JwtPayload;

    const { role, userId, iat } = decoded;

    // check if the user is exist
    const user = await User.isUserExistsByCustomId(userId);

    if (!user) {
      throw new AppError(status.NOT_FOUND, "This user is not found !");
    }

    const isDeleted = user?.isDeleted;

    if (isDeleted) {
      throw new AppError(status.FORBIDDEN, "This user is deleted !");
    }

    // checking if the user is blocked
    const userStatus = user?.status;

    if (userStatus === "blocked") {
      throw new AppError(status.FORBIDDEN, "This user is blocked ! !");
    }


    if(user.passwordChangedAt && User.isJWTIssuedBeforePasswordChange(user.passwordChangedAt, iat as number)){
        throw new AppError(status.UNAUTHORIZED,'You are not authorized')
    }

    if(requiredRoles && !requiredRoles.includes(role)){
        throw new AppError(status.UNAUTHORIZED,'You are not authorize Hi !')
    }

    req.user = decoded as JwtPayload & {role : string};
    next()


  });
};

export default auth;
