import status from "http-status";
import { FacultyServices } from "./faculty.service";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";


const getSingleFaculty = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await FacultyServices.getSingleFacultyFromDB(id);
  
    sendResponse(res, {
      statusCode:status.OK,
      success: true,
      message: 'Faculty is retrieved successfully',
      data: result,
    });
  });


  export const FacultyControllers = {
    getSingleFaculty,
  };