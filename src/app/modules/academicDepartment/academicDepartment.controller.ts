import status from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { AcademicDepartmentServices } from "./academicDepartment.services";
import exp from "constants";


const createAcademicDepartment = catchAsync(async(req,res)=>{
    const result = await AcademicDepartmentServices.createAcademicDepartmentIntoDB(req.body);

    sendResponse(res, {
        statusCode: status.OK,
        success: true,
        message: 'Academic department is created successfully',
        data: result,
      });
})


const getAllAcademicDepartments = catchAsync(async(req,res)=>{
    const result = await AcademicDepartmentServices.getAllAcademicDepartmentFromDB();

    sendResponse(res, {
        statusCode: status.OK,
        success: true,
        message: 'Academic departments are retrieved successfully',
        data: result
      });
})


const getSingleAcademicDepartment = catchAsync(async(req,res)=>{
    const {departmentId}= req.params;
    const result = await AcademicDepartmentServices.getSingleAcademicDepartmentFromDB(departmentId);

    sendResponse(res, {
        statusCode: status.OK,
        success: true,
        message: 'Academic department is retrieved successfully',
        data: result,
      });
})

const updateAcademicDepartment = catchAsync(async(req,res)=>{
    const {departmentId} = req.params;
    const result = await AcademicDepartmentServices.updateAcademicDepartmentIntoDB(
        departmentId,
        req.body
    )

    sendResponse(res, {
        statusCode: status.OK,
        success: true,
        message: 'Academic department is updated successfully',
        data: result,
      });
})


export const AcademicDepartmentController = {
    createAcademicDepartment,
    getAllAcademicDepartments,
    getSingleAcademicDepartment,
    updateAcademicDepartment,
}