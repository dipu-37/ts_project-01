import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import { SemesterRegistrationServer } from "./semesterRegistration.service";
import sendResponse from "../../utils/sendResponse";
import status from "http-status";


const createSemesterRegistration = catchAsync(async(req:Request, res: Response)=>{

    const result = await SemesterRegistrationServer.createSemesterRegistrationINtoDB(req.body);


    sendResponse(res, {
        statusCode: status.OK,
        success: true,
        message: 'Semester Registration is created successfully!',
        data: result,
      });
})


const getAllSemesterRegistrations = catchAsync(async(req,res)=>{
    const result = await SemesterRegistrationServer.getAllSemesterRegistrationsFromDB(req.query);

    sendResponse(res, {
        statusCode: status.OK,
        success: true,
        message: 'Semester Registration is retrieved successfully !',
        data: result,
      });
})


const getSingleSemesterRegistration = catchAsync(async(req,res)=>{
    const {id}= req.params;
    const result = await SemesterRegistrationServer.getSingleSemesterRegistrationFromDB(id);

    sendResponse(res, {
        statusCode: status.OK,
        success: true,
        message: 'Semester Registration is retrieved successfully',
        data: result,
      });

})

const updateSemesterRegistration = catchAsync(async(req,res)=>{
  const {id}= req.params;
  const result = await SemesterRegistrationServer.updateSemesterRegistrationIntoDB(id, req.body);

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'Semester Registration is updated successfully',
    data: result,
  });
})

export const semesterRegistrationController = {
    createSemesterRegistration,
    getAllSemesterRegistrations,
    getSingleSemesterRegistration,
    updateSemesterRegistration

}