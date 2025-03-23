import status from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { authServices } from "./auth.services";



const loginUser = catchAsync(async(req,res)=>{
    const result = await authServices.loginUser(req.body);

    sendResponse(res,{
        statusCode : status.OK,
        success: true,
        message : 'User is lOgin successfully',
        data : result,
    })
})


export const AuthController = {
    loginUser,
}