import mongoose from "mongoose";
import { TAcademicFaculty } from "./academicFaculty.interface";
import { AcademicFaculty } from "./academicFaculty.model";

const createAcademicFacultyIntoDB = async (payLoad: TAcademicFaculty) => {
  const result = await AcademicFaculty.create(payLoad);

  return result;
};

const getAllAcademicFacultyFromDB = async () => {
  const result = await AcademicFaculty.find();
  return result;
};

const getSingleAcademicFacultyFromDB = async (id: string) => {
    const result = await AcademicFaculty.findOne({id});
    return result;
};

const updateAcademicFacultyIntoDB = async (
  id: string,
  payLoad: Partial<TAcademicFaculty>
) => {
  const result = await AcademicFaculty.findOneAndUpdate({id}, payLoad, {
    new: true,
  });

  return result;
};



export const AcademicFacultyServices = {
  createAcademicFacultyIntoDB,
  getAllAcademicFacultyFromDB,
  getSingleAcademicFacultyFromDB,
  updateAcademicFacultyIntoDB,
};
