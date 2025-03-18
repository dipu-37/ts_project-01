import status from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { AdminServices } from "./admin.services";


const getSingleAdmin = catchAsync(
    async (req,res)=>{
        const {id }= req.params;
        const result = await AdminServices.getSingleAdminFromDB(id);

        sendResponse(res,{
            statusCode: status.OK,
            success : true,
            message: 'Admin is retrieved successfully',
            data : result,
        })
    }) 



    export const AdminControllers = {
        getSingleAdmin
    }