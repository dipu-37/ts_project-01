import { object } from "zod";
import { TAdmin } from "./admin.interface";
import { Admin } from "./admin.model";
import mongoose from "mongoose";
import { triggerAsyncId } from "async_hooks";
import AppError from "../../errors/AppError";
import { start } from "repl";
import status from "http-status";
import { User } from "../users/user.model";

const getSingleAdminFromDB = async (id: string) => {
  const result = await Admin.findById(id);
  //console.log(result);
  return result;
};
const getAllAdminFromDB = async () => {
  const result = await Admin.find();
  // console.log(result);
  return result;
};

const updateAdminIntoDB = async (id: string, payload: Partial<TAdmin>) => {
  const { name, ...remainingAdmin } = payload;
  //   console.log(name);
  //   console.log(remainingAdmin);
  const modifiedUpdatedData: Record<string, unknown> = {
    ...remainingAdmin,
  };

  if (name && Object.keys(name).length) {
    for (const [key, value] of Object.entries(name)) {
      modifiedUpdatedData[`name.${key}`] = value;
    }
  }
  //   console.log("modifiedUpdatedData--->",modifiedUpdatedData);

  const result = await Admin.findByIdAndUpdate(id, modifiedUpdatedData, {
    new: true,
  });
  // console.log('result -->',result);
  return result;
};

const deletedAdminFromDB = async (id: string) => {
  const session = await mongoose.startSession();
  //console.log(id);
  try {
    session.startTransaction();
    const deleteAdmin = await Admin.findByIdAndUpdate(
      id,
      { isDeleted: true },
      { new: true, session }
    );

    if (!deleteAdmin) {
      throw new AppError(status.BAD_REQUEST, "Failed to delete admin");
    }

    const userId = deleteAdmin.user;
    const deletedUser = await User.findOneAndUpdate(
      userId,
      { isDeleted: true },
      { new: true, session }
    );
    if (!deletedUser) {
      throw new AppError(status.BAD_REQUEST, "Failed to delete user");
    }

    await session.commitTransaction();
    await session.endSession();
    return deleteAdmin;
  } catch (err: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(err);
  }
};

export const AdminServices = {
  getSingleAdminFromDB,
  getAllAdminFromDB,
  updateAdminIntoDB,
  deletedAdminFromDB,
};
