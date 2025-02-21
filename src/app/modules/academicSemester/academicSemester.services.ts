import { academicSemesterNameCodeMapper } from "./academicSemester.const";
import { TAcademicSemester,  } from "./academicSemester.interface";
import { AcademicSemester } from "./academicSemester.model";

const createAcademicSemesterIntoDB = async (payLoad: TAcademicSemester) => {


  //academicSemesterNameCodeMapper[Fall]
  if(academicSemesterNameCodeMapper[payLoad.name]!=payLoad.code){

    throw new Error ('Invalid Semester Code');
  }


  const result = await AcademicSemester.create(payLoad);

  return result;
};

export const AcademicSemesterServices = {
  createAcademicSemesterIntoDB,
};
