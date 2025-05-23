import status from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { authServices } from "./auth.services";
import config from "../../config";
import AppError from "../../errors/AppError";



const loginUser = catchAsync(async(req,res)=>{
    const result = await authServices.loginUser(req.body);

    const {refreshToken,accessToken,needsPasswordChange}= result;

    res.cookie('refreshToken', refreshToken,{
        secure : config.NODE_ENV === 'production',
        httpOnly : true,
        sameSite : 'none',
        maxAge : 1000*60*60*24*365,
    })

    sendResponse(res,{
        statusCode : status.OK,
        success: true,
        message : 'User is lOgin successfully',
        data : {
            accessToken,
            needsPasswordChange
        }
    })
})

const changePassword = catchAsync(async(req,res)=>{
    const {...passwordData} = req.body;

   // console.log(req.user, passwordData);
    const result = await authServices.changePassword(req.user, passwordData);

    sendResponse(res, {
        statusCode: status.OK,
        success: true,
        message: 'Password is updated successfully!',
        data: null,
      });


})


const refreshToken = catchAsync(async(req,res)=>{
    const {refreshToken}= req.cookies;
    const result = await authServices.refreshToken(refreshToken)

    sendResponse(res, {
        statusCode: status.OK,
        success: true,
        message: 'Access token is retrieved successfully!',
        data: result,
      });
})

const forgetPassword = catchAsync(async(req,res)=>{
    const userId = req.body.id;
    const result = await authServices.forgetPassword(userId);

    sendResponse(res, {
        statusCode: status.OK,
        success: true,
        message: 'Reset link is generated successfully!',
        data: result,
      });
})


const resetPassword = catchAsync(async(req,res)=>{
    const token = req.headers.authorization;
    if (!token) {
        throw new AppError(status.BAD_REQUEST, 'Something went wrong !');
      }
    
      const result = await authServices.restPassword(req.body, token);

      sendResponse(res, {
        statusCode: status.OK,
        success: true,
        message: 'Password reset successfully!',
        data: result,
      });

})

export const AuthController = {
    loginUser,
    changePassword,
    refreshToken,
    forgetPassword,
    resetPassword,
}