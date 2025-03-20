import { Faculty } from './../faculty/faculty.model';
import status from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { CourseService } from "./course.services";


const createCourse = catchAsync(async (req,res)=>{
    const result = await CourseService.createCourseIntoDB(req.body);
    //console.log(result);
    sendResponse(res,{
        statusCode : status.OK,
        success : true,
        message : "Course is create successfully",
        data : result,
    })
});


const getAllCourse = catchAsync(async ( req,res)=>{
    const result = await CourseService.getAllCourseIFromDB(req.query);

    sendResponse(res,{
        statusCode : status.OK,
        success : true,
        message : "Course is retrieved successfully",
        data : result,
    })
})


const getSingleCourse = catchAsync(async(req,res)=>{
    const {id }= req.params;
    const result = await CourseService.getSingleCourseFromDB(id);

    sendResponse(res,{
        statusCode : status.OK,
        success : true,
        message : "Course is retrieved successfully",
        data : result,
    })
})

const deleteCourse = catchAsync(async(req,res)=>{
    const {id }=  req.params;
    const result = await CourseService.deleteCourseFromDB(id);
    sendResponse(res,{
        statusCode : status.OK,
        success : true,
        message : "Course is delete successfully",
        data : result,
    })
})

const updateCourse = catchAsync(async(req,res)=>{
    const {id} = req.params;
    const result = await CourseService.updateCourseIntoDB(id,req.body);

    sendResponse(res, {
        statusCode: status.OK,
        success: true,
        message: 'course is updated successfully',
        data: result,
      });
})


const assignFacultiesWithCourse = catchAsync(async(req,res)=>{
    const {courseId} = req.params;
    const {faculties} = req.body;

    const result = await CourseService.assignFacultiesWithCourseIntoDB(courseId,faculties);

    sendResponse(res, {
        statusCode: status.OK,
        success: true,
        message: 'Faculties assigned  successfully',
        data: result,
      });
})


const removeFacultiesFromCourses = catchAsync(async (req,res)=>{
    const {courseId} = req.params;
    const {faculties} = req.body;

    const result = await CourseService.removeFacultiesFromCourseFromDB(courseId, faculties);
    //console.log(result);

    sendResponse(res, {
        statusCode: status.OK,
        success: true,
        message: 'Faculties removed successfully',
        data: result,
      });
})


export const CourseControllers = {
    createCourse,
    getAllCourse,
    getSingleCourse,
    deleteCourse,
    updateCourse,
    assignFacultiesWithCourse,
    removeFacultiesFromCourses
}