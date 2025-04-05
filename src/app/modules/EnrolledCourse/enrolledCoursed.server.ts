import { Student } from "./../students/student.model";
import status from "http-status";
import { OfferedCourse } from "../OfferedCourse/OfferedCoursed.model";
import { TEnrolledCourse, TEnrolledCourseMarks } from "./enrolledCoursed.interface";
import AppError from "../../errors/AppError";
import EnrolledCourse from "./enrolledCoursed.model";
import mongoose, { mongo } from "mongoose";
import { Course } from "../course/course.model";
import { SemesterRegistration } from "../SemesterRegistration/semesterRegistration.model";
import { Faculty } from "../faculty/faculty.model";
import { object } from "zod";
import { calculateGradeAndPoints } from "./enrolledCoursed.utils";

const createEnrolledCourseIntoDB = async (
  userId: string,
  payload: TEnrolledCourse
) => {
  /**
   * Step1: Check if the offered courses is exists
   * Step2: Check if the student is already enrolled
   * Step3: Check if the max credits exceed
   * Step4: Create an enrolled course
   */

  const { offeredCourse } = payload;

  const isOfferedCourseExists = await OfferedCourse.findById(offeredCourse);

  if (!isOfferedCourseExists) {
    throw new AppError(status.NOT_FOUND, "Offered course not found !");
  }

  if (isOfferedCourseExists.maxCapacity <= 0) {
    throw new AppError(status.BAD_GATEWAY, "Room is full !");
  }

  const student = await Student.findOne({ id: userId }, { _id: 1 });

  if (!student) {
    throw new AppError(status.NOT_FOUND, "Student not found !");
  }

  const isStudentAlreadyEnrolled = await EnrolledCourse.findOne({
    semesterRegistration: isOfferedCourseExists?.semesterRegistration,
    offeredCourse,
    student: student._id,
  });

  if (isStudentAlreadyEnrolled) {
    throw new AppError(status.CONFLICT, "Student is already enrolled !");
  }

  /// check total credits exceeds max credit

  const course = await Course.findById(isOfferedCourseExists.course);
  const currentCredit = course?.credits;

  const semesterRegistration = await SemesterRegistration.findById(
    isOfferedCourseExists.semesterRegistration
  ).select("maxCredit");

  const maxCredit = semesterRegistration?.maxCredit;

  const enrolledCourse = await EnrolledCourse.aggregate([
    {
      $match: {
        semesterRegistration: isOfferedCourseExists.semesterRegistration,
        student: student._id,
      },
    },
    {
      $lookup : {
        from : 'courses',
        localField : 'course',
        foreignField : '_id',
        as : 'enrolledCourseData'
      }
    },
    {
      $unwind : '$enrolledCourseData'
    },
    {
      $group :{
        _id: null,
        totalEnrolledCredits : {$sum : 'enrolledCourseData.credits'}
      }
    },
    {
      $project: {
        _id: 0,
        totalEnrolledCredits: 1,
      },
    },
    
  ]);


  // total enrolled credits + new enrolled course credits > maxCredits

  const totalCredits = enrolledCourse.length > 0 ? enrolledCourse[0].totalEnrolledCredits : 0

  console.log(totalCredits);

  if(totalCredits && maxCredit && totalCredits + currentCredit > maxCredit){
    throw new AppError(status.BAD_REQUEST , " You have exceeded maximum of credits !")
  }


  // create enrolled course
  const session = await mongoose.startSession();
  try {
    session.startTransaction();

    const result = await EnrolledCourse.create(
      [
        {
          semesterRegistration: isOfferedCourseExists.semesterRegistration,
          academicSemester: isOfferedCourseExists.academicSemester,
          academicFaculty: isOfferedCourseExists.academicFaculty,
          academicDepartment: isOfferedCourseExists.academicDepartment,
          offeredCourse: offeredCourse,
          course: isOfferedCourseExists.course,
          student: student._id,
          faculty: isOfferedCourseExists.faculty,
          isEnrolled: true,
        },
      ],
      { session }
    );

    if (!result) {
      throw new AppError(
        status.BAD_REQUEST,
        "Failed to enroll in this course !"
      );
    }

    const maxCapacity = isOfferedCourseExists.maxCapacity;
    await OfferedCourse.findByIdAndUpdate(offeredCourse, {
      maxCapacity: maxCapacity - 1,
    });

    await session.commitTransaction();
    await session.endSession();
  } catch (err: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(err);
  }
};

const updateEnrolledCourseMarksIntoDB = async(
  facultyId : string,
  payload : Partial<TEnrolledCourse>,
)=>{
  const {semesterRegistration , offeredCourse, student , courseMarks } = payload;

  const isSemesterRegistrationExists =
  await SemesterRegistration.findById(semesterRegistration);

if (!isSemesterRegistrationExists) {
  throw new AppError(
    status.NOT_FOUND,
    'Semester registration not found !',
  );
}

const isOfferedCourseExists = await OfferedCourse.findById(offeredCourse);

  if (!isOfferedCourseExists) {
    throw new AppError(status.NOT_FOUND, 'Offered course not found !');
  }
  const isStudentExists = await Student.findById(student);

  if (!isStudentExists) {
    throw new AppError(status.NOT_FOUND, 'Student not found !');
  }

  const faculty = await Faculty.findOne({id : facultyId}, {_id : 1});

  if(!faculty){
    throw new AppError(status.NOT_FOUND, 'Faculty not found !');
  }

  const isCourseBelongToFaculty = await EnrolledCourse.findOne({
    semesterRegistration,
    offeredCourse,
    student,
    faculty : faculty._id,
  })

  if (!isCourseBelongToFaculty) {
    throw new AppError(status.FORBIDDEN, 'You are forbidden! !');
  }

  const modifiedData : Record<string,unknown> ={
    ...courseMarks
  }

  if (courseMarks?.finalTerm) {
    const { classTest1, classTest2, midTerm, finalTerm } =
      isCourseBelongToFaculty.courseMarks;

    const totalMarks =
      Math.ceil(classTest1) +
      Math.ceil(midTerm) +
      Math.ceil(classTest2) +
      Math.ceil(finalTerm);

    const result = calculateGradeAndPoints(totalMarks);


    modifiedData.grade = result.grade;
    modifiedData.gradePoint = result.gradePoints;
    modifiedData.isCompleted = true

  }


  if(courseMarks && Object.keys(courseMarks).length){
    for(const [key,value]  of Object.entries(courseMarks)){
      modifiedData[`courseMarks.${key}`]= value
    }
  }

  const result = await EnrolledCourse.findByIdAndUpdate(
    isCourseBelongToFaculty._id,
    modifiedData,
    {
      new : true,
    },
  )

  return result;

}

export const EnrolledCourseServer = {
  createEnrolledCourseIntoDB,
  updateEnrolledCourseMarksIntoDB
};
