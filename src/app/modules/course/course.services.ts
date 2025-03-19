import exp from "constants";
import { TCourse } from "./course.interface";
import { Course } from "./course.model";
import QueryBuilder from "../../builder/Querybuilder";
import { CourseSearchableFields } from "./course.constant";

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
  const result = await Course.findById(id);
  return result;
};

const deleteCourseFromDB = async (id: string) => {
  const result = await Course.findByIdAndUpdate(
    id,
    { isDeleted: false },
    { new: true }
  );

  return result;
};

export const CourseService = {
  createCourseIntoDB,
  getAllCourseIFromDB,
  getSingleCourseFromDB,
  deleteCourseFromDB,
};
