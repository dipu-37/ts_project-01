import exp from "constants";
import { TCourse } from "./course.interface";
import { Course } from "./course.model";
import QueryBuilder from "../../builder/Querybuilder";
import { CourseSearchableFields } from "./course.constant";
import AppError from "../../errors/AppError";
import status from "http-status";

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
    // step : 1 : basic course update
    const updatedBasicCourseInfo = await Course.findByIdAndUpdate(id, courseRemainingData, {new : true, runValidators : true})

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
        
      }
    )
    }

    return updatedBasicCourseInfo;
}

export const CourseService = {
  createCourseIntoDB,
  getAllCourseIFromDB,
  getSingleCourseFromDB,
  deleteCourseFromDB,
  updateCourseIntoDB,
};
