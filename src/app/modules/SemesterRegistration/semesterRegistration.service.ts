import status from "http-status";
import AppError from "../../errors/AppError";
import { AcademicSemester } from "../academicSemester/academicSemester.model";
import { TSemesterRegistration } from "./SemesterRegistration.interface";
import { SemesterRegistration } from "./semesterRegistration.model";
import QueryBuilder from "../../builder/Querybuilder";
import { appendFile } from "fs";
import { RegistrationStatus } from "./semesterRegistration.constant";

const createSemesterRegistrationINtoDB = async (
  payload: TSemesterRegistration
) => {
  const academicSemester = payload?.academicSemester;

  //check if there any registration semester that is already 'upcoming' | 'ongoing'

  const isThereAnyUpcomingOrOngoingSemester =
    await SemesterRegistration.findOne({
      $or: [{ status: "UPCOMING" }, { status: "ONGOING" }],
    });

  if (isThereAnyUpcomingOrOngoingSemester) {
    throw new AppError(
      status.BAD_REQUEST,
      `there is already an ${isThereAnyUpcomingOrOngoingSemester.status} registered semester !`
    );
  }

  // check if the semester is exits
  const isAcademicSemesterExists = await AcademicSemester.findById(
    academicSemester
  );

  if (!isAcademicSemesterExists) {
    throw new AppError(status.NOT_FOUND, "This academic semester not found !");
  }

  // check if the semester is already registered

  const isSemesterRegistrationExists = await SemesterRegistration.findOne({
    academicSemester,
  });

  if (isSemesterRegistrationExists) {
    throw new AppError(
      status.CONFLICT,
      "This semester is already registered !"
    );
  }

  const result = await SemesterRegistration.create(payload);
  return result;
};

const getAllSemesterRegistrationsFromDB = async (
  query: Record<string, unknown>
) => {
  const semesterRegistrationQuery = new QueryBuilder(
    SemesterRegistration.find().populate("academicSemester"),
    query
  )
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await semesterRegistrationQuery.modelQuery;
  return result;
};

const getSingleSemesterRegistrationFromDB = async (id: string) => {
  const result = await SemesterRegistration.findById(id).populate(
    "academicSemester"
  );

  return result;
};

const updateSemesterRegistrationIntoDB = async (
  id: string,
  payload: Partial<TSemesterRegistration>
) => {
  const isSemesterRegistrationExists = await SemesterRegistration.findById(id);

  if (!isSemesterRegistrationExists) {
    throw new AppError(status.NOT_FOUND, "This semester is not found !");
  }

  // if the requested semester registration is ended , we will not update anything 

  const currentSemesterStatus = isSemesterRegistrationExists?.status;

  const requestedStatus = payload?.status;
  if(currentSemesterStatus === RegistrationStatus.ENDED ){
    throw new AppError(status.BAD_REQUEST, `this semester is already ${currentSemesterStatus}`)
  }

  // upcoming - ongoing - ended

  if(currentSemesterStatus ===RegistrationStatus.UPCOMING && requestedStatus === RegistrationStatus.ENDED ){
    throw new AppError(
        status.BAD_REQUEST,
        `You can not directly change status from ${currentSemesterStatus} to ${requestedStatus}`,
      );
  }

  if(currentSemesterStatus === RegistrationStatus.ONGOING && requestedStatus === RegistrationStatus.UPCOMING){
    throw new AppError(
        status.BAD_REQUEST,
        `You can not directly change status from ${currentSemesterStatus} to ${requestedStatus}`,
      );
  }

  const result = await SemesterRegistration.findByIdAndUpdate(id,payload,{
    new : true,
    runValidators : true,
  })

  return result;

};

export const SemesterRegistrationServer = {
  createSemesterRegistrationINtoDB,
  getAllSemesterRegistrationsFromDB,
  getSingleSemesterRegistrationFromDB,
  updateSemesterRegistrationIntoDB,
};
