import { EnrolledCourseServer } from './enrolledCoursed.server';
import catchAsync from "../../utils/catchAsync";
import status from 'http-status';
import sendResponse from '../../utils/sendResponse';


const createEnrolledCourse = catchAsync(async(req,res)=>{

    const userId = req.user.userId;
    const result = await EnrolledCourseServer.createEnrolledCourseIntoDB(userId, req.body);


    console.log(req.user);
    sendResponse(res, {
        statusCode: status.OK,
        success: true,
        message: 'Student is enrolled successfully',
        data: result,
      });
})

const updateEnrolledCourseMark = catchAsync(async(req,res)=>{
    const facultyId = req.user.userId;
    const result = await EnrolledCourseServer.updateEnrolledCourseMarksIntoDB(facultyId, req.body)


    sendResponse(res, {
        statusCode: status.OK,
        success: true,
        message: 'Marks is updated successfully',
        data: result,
      });
})

export const EnrolledCourseControllers = {
    createEnrolledCourse,
    updateEnrolledCourseMark,
    
}