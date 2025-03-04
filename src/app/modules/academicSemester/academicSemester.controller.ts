import status from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { AcademicSemesterServices } from "./academicSemester.services";



const createAcademicSemester = catchAsync(async (req,res)=>{

    const result = await AcademicSemesterServices.createAcademicSemesterIntoDB(req.body);


    sendResponse(res,{
        statusCode : status.OK,
        success : true,
        message : 'Academic semester is created successfully',
        data : result,
    })
    
})




export const AcademicSemesterControllers = {
    createAcademicSemester
}