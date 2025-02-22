import status from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { AcademicFacultyServices } from "./academicFaculty.services";


const createAcademicFaculty = catchAsync(async (req,res)=>{
    const result = await AcademicFacultyServices.createAcademicFacultyIntoDB(req.body);

    sendResponse(res,{
        statusCode : status.OK,
        success: true,
        message: 'Academic faculty is created successfully',
        data : result,
    })
})


const getAllAcademicFaculties = catchAsync( async ( req,res)=>{
    const result = await AcademicFacultyServices.getAllAcademicFacultyFromDB()

    sendResponse(res, {
        statusCode: status.OK,
        success: true,
        message: 'Academic faculties are retrieved successfully',
        data: result,
      });
})


const getSingleAcademicFaculty = catchAsync(async(req,res)=>{
    const {facultyId} = req.params;

    const result = await AcademicFacultyServices.getSingleAcademicFacultyFromDB(facultyId);

    console.log(result);

    sendResponse(res, {
        statusCode: status.OK,
        success: true,
        message: 'Academic faculty is retrieved successfully',
        data: result,
      });
})


const updateAcademicFaculty = catchAsync(async(req,res)=>{
    const {facultyId} = req.params;
    const result = await AcademicFacultyServices.updateAcademicFacultyIntoDB(
        facultyId,
        req.body
    )

    sendResponse(res, {
        statusCode: status.OK,
        success: true,
        message: 'Academic faculty is updated successfully',
        data: result,
      });
})


export const AcademicFacultyControllers = {
    createAcademicFaculty,
    getAllAcademicFaculties,
    getSingleAcademicFaculty,
    updateAcademicFaculty,
  };