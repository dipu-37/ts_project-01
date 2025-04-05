import { generateFacultyId } from './../../utils/user.utils';
import exp from "constants";
import { TCourse, TCourseFaculty } from "./course.interface";
import { Course, CourseFaculty } from "./course.model";
import QueryBuilder from "../../builder/Querybuilder";
import { CourseSearchableFields } from "./course.constant";
import AppError from "../../errors/AppError";
import status from "http-status";
import mongoose from "mongoose";

const createCourseIntoDB = async (payload: TCourse) => {
  const result = await Course.create(payload);
  return result;
};

const getAllCourseIFromDB = async (query: Record<string, unknown>) => {
  const courseQuery = new QueryBuilder(
    Course.find().populate("preRequisiteCourse.course"),
    query
  )
    .search(CourseSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await courseQuery.modelQuery;
  return result;
};

const getSingleCourseFromDB = async (id: string) => {
  const result = await Course.findById(id).populate("preRequisiteCourse.course");
  return result;
};

const deleteCourseFromDB = async (id: string) => {
  const result = await Course.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true }
  );

  return result;
};

const updateCourseIntoDB = async(id: string, payload : Partial<TCourse>)=>{
    const {preRequisiteCourse, ...courseRemainingData} = payload;



   const session = await mongoose.startSession();
   try{
     session.startTransaction();

     // step - 1 : basic course update
    const updatedBasicCourseInfo = await Course.findByIdAndUpdate(id, courseRemainingData, {new : true, runValidators : true,session})

    if(!updatedBasicCourseInfo){
      throw new AppError(status.BAD_REQUEST, 'Failed to update course')
    }

    // check if there is any pre requisite course to update 
    if(preRequisiteCourse && preRequisiteCourse.length >0){
      const deletedPreRequisites = preRequisiteCourse.filter((el)=>el.course && el.isDeleted).map((el)=>el.course);

      const deletedPreRequisitesCourses = await Course.findByIdAndUpdate(id,
        {$pull : {
        preRequisiteCourse : {course : {$in : deletedPreRequisites}},
      }},
      {
        new : true, 
        runValidators : true,
        session
      }
    )

    if (!deletedPreRequisitesCourses) {
      throw new AppError(status.BAD_REQUEST, 'Failed to update course');
    }

    // filter out the new course fields
    const newPreRequisites = preRequisiteCourse?.filter((el)=>el.course && !el.isDeleted);
    const newPreRequisitesCourses = await Course.findByIdAndUpdate(
      id,
      {
        $addToSet : {preRequisiteCourse : {$each : newPreRequisites}}
      },
      {
        new : true,
        runValidators : true,
        session
      }
    )

    if (!newPreRequisitesCourses) {
      throw new AppError(status.BAD_REQUEST, 'Failed to update course');
    }

    }

    await session.commitTransaction();
    await session.endSession();

    const result = await Course.findById(id).populate('preRequisiteCourse.course')


    return result;

   }catch(err){
   await session.abortTransaction();
   await session.endSession();
   throw new AppError(status.BAD_REQUEST,'failed to update courses');
   } 
}

const assignFacultiesWithCourseIntoDB = async (id : string, payload : Partial<TCourseFaculty>,)=>{
 
  const result = await CourseFaculty.findByIdAndUpdate(id,
    {
      course : id,
      $addToSet : {faculties : {$each : payload}},
    },
    {
      upsert : true,
      new : true,
    }
  )

  return result;
}


const getFacultiesWithCourseFromDB = async (courseId : string)=>{
  const result = await CourseFaculty.findOne({course : courseId}).populate('faculties')

  return result;
}

const removeFacultiesFromCourseFromDB = async(id: string, payload : Partial<TCourseFaculty>)=>{
  const result = await CourseFaculty.findByIdAndUpdate(id,
    {
      $pull : {faculties : {$in : payload}},
    },
    {
      new : true,
    }
  )

  return result;
}

export const CourseService = {
  createCourseIntoDB,
  getAllCourseIFromDB,
  getSingleCourseFromDB,
  deleteCourseFromDB,
  updateCourseIntoDB,
  assignFacultiesWithCourseIntoDB,
  removeFacultiesFromCourseFromDB,
  getFacultiesWithCourseFromDB,
  
};
