import status from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { OfferedCourseService } from "./OfferedCourse.service";



const createOfferedCourse = catchAsync(async (req,res)=>{
    const result = await OfferedCourseService.createOfferedCourseIntoDB(req.body);

    sendResponse(res, {
        statusCode : status.OK,
        success : true,
        message : 'Offered course is create successfully',
        data : result
    })
})


const updateOfferedCourse = catchAsync(async(req,res)=>{
    const {id} = req.params;
    const result = await OfferedCourseService.updateOfferedCourseIntoDB(id, req.body)


    sendResponse(res, {
        statusCode: status.OK,
        success: true,
        message: 'OfferedCourse updated successfully',
        data: result,
      });
})


export const OfferedCourseControllers = {
    createOfferedCourse,
    updateOfferedCourse
}