import status from "http-status";
import AppError from "../../errors/AppError";
import { SemesterRegistration } from "../SemesterRegistration/semesterRegistration.model";
import { TOfferedCourse } from "./OfferedCourse.interface";
import { OfferedCourse } from "./OfferedCoursed.model";
import { AcademicFaculty } from "../academicFaculty/academicFaculty.model";
import { Course } from "../course/course.model";
import { AcademicDepartment } from "../academicDepartment/academicDepartment.model";
import { Faculty } from "../faculty/faculty.model";
import { hasTimeConflict } from "./OfferedCourse.utils";

const createOfferedCourseIntoDB = async (payload: TOfferedCourse) => {
  const {
    semesterRegistration,
    academicFaculty,
    academicDepartment,
    course,
    section,
    faculty,
    days,
    startTime,
    endTime,
  } = payload;

  const isSemesterRegistrationExits = await SemesterRegistration.findById(
    semesterRegistration
  );

  if (!isSemesterRegistrationExits) {
    throw new AppError(status.NOT_FOUND, "Semester registration not found");
  }

  const academicSemester = isSemesterRegistrationExits.academicSemester;

  const isAcademicFacultyExists = await AcademicFaculty.findById(
    academicFaculty
  );

  if (!isAcademicFacultyExists) {
    throw new AppError(status.NOT_FOUND, "Academic Faculty not found !");
  }

  const isAcademicDepartmentExits = await AcademicDepartment.findById(
    academicDepartment
  );

  if (!isAcademicDepartmentExits) {
    throw new AppError(status.NOT_FOUND, "Academic Department not found !");
  }

  const isCourseExits = await Course.findById(course);

  if (!isCourseExits) {
    throw new AppError(status.NOT_FOUND, "Course not found !");
  }

  const isFacultyExits = await Faculty.findById(faculty);

  if (!isFacultyExits) {
    throw new AppError(status.NOT_FOUND, "Faculty not found !");
  }

  // check if the department is belong to the faculty

  const isDepartmentBelongToFaculty = await AcademicDepartment.findOne({_id: academicDepartment, academicFaculty});

  if (!isDepartmentBelongToFaculty) {
    throw new AppError(
      status.BAD_REQUEST,
      `This ${isAcademicDepartmentExits.name} is not  belong to this ${isAcademicFacultyExists.name}`,
    );
  }

// check if the same offered course same section in same registered semester exists

const isSameOfferedCourseExistsWithSameRegisteredSemesterWithSameSection = await OfferedCourse.findOne({
    semesterRegistration,
    course,
    section,
});

if(isSameOfferedCourseExistsWithSameRegisteredSemesterWithSameSection){
    throw new AppError(
        status.BAD_REQUEST,
        `Offered course with same section is already exist!`,
      );
}

// get the schedule of the faculties
const assignedSchedules = await OfferedCourse.find({
    semesterRegistration,
    faculty,
    days : {$in : days},
}).select('days startTime endTime')


const newSchedule = {
    days,
    startTime,
    endTime
}

if (hasTimeConflict(assignedSchedules, newSchedule)) {
    throw new AppError(
      status.CONFLICT,
      `This faculty is not available at that time ! Choose other time or day`,
    );
  }

  const result = await OfferedCourse.create({ ...payload, academicSemester });

  return result;
};


const updateOfferedCourseIntoDB = async (
  id : string,
  payload : Pick<TOfferedCourse,  'faculty' | 'days' | 'startTime' | 'endTime'>
)=>{

  const {faculty,days , startTime , endTime } =payload;
  const isOfferedCourseExists = await OfferedCourse.findById(id);

  
  if (!isOfferedCourseExists) {
    throw new AppError(status.NOT_FOUND, 'Offered course not found !');
  }

  const isFacultyExists = await Faculty.findById(faculty);

  if (!isFacultyExists) {
    throw new AppError(status.NOT_FOUND, 'Faculty not found !');
  }


  const semesterRegistration = isOfferedCourseExists.semesterRegistration;
  // get the schedules of the faculties

  // Checking the status of the semester registration
  const semesterRegistrationStatus =
    await SemesterRegistration.findById(semesterRegistration);

  if (semesterRegistrationStatus?.status !== 'UPCOMING') {
    throw new AppError(
      status.BAD_REQUEST,
      `You can not update this offered course as it is ${semesterRegistrationStatus?.status}`,
    );
  }

  // check if the faculty is available at that time.
  const assignedSchedules = await OfferedCourse.find({
    semesterRegistration,
    faculty,
    days: { $in: days },
  }).select('days startTime endTime');

  const newSchedule = {
    days,
    startTime,
    endTime,
  };

  if (hasTimeConflict(assignedSchedules, newSchedule)) {
    throw new AppError(
      status.CONFLICT,
      `This faculty is not available at that time ! Choose other time or day`,
    );
  }

  const result = await OfferedCourse.findByIdAndUpdate(id, payload, {
    new: true,
  });
  return result;
};



export const OfferedCourseService = {
  createOfferedCourseIntoDB,
  updateOfferedCourseIntoDB
};
