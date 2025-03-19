import status from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { AdminServices } from "./admin.services";

const getSingleAdmin = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await AdminServices.getSingleAdminFromDB(id);

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Admin is retrieved successfully",
    data: result,
  });
});

const getAllAdmin = catchAsync(async (req, res) => {
  const result = await AdminServices.getAllAdminFromDB();

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Admin is retrieved successfully",
    data: result,
  });
});

const updateAdmin = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { admin } = req.body;
  const result = await AdminServices.updateAdminIntoDB(id, admin);

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Admin is updated successfully",
    data: result,
  });
});

const deleteAdmin = catchAsync(async (req, res) => {
  const { adminId } = req.params;
  // console.log(adminId);
  const result = await AdminServices.deletedAdminFromDB(adminId);

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Admin is deleted successfully",
    data: result,
  });
});

export const AdminControllers = {
  getSingleAdmin,
  getAllAdmin,
  updateAdmin,
  deleteAdmin,
};
