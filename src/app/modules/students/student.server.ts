import mongoose, { SortOrder } from "mongoose";
import { Student } from "./student.model";
import AppError from "../../errors/AppError";
import status from "http-status";
import { User } from "../users/user.model";
import { TStudent } from "./student.interface";
import QueryBuilder from "../../builder/Querybuilder";
import { studentSearchableFields } from "./student.constant";

const getAllStudentsFromDB = async (query: Record<string, unknown>) => {
  const studentQuery = new QueryBuilder(Student.find()
  .populate('user')
  .populate('admissionSemester')
  .populate('academicDepartment')
  ,query)
  .search(studentSearchableFields)
  .filter()
  .sort()
  .paginate()
  .fields()

  const result = await studentQuery.modelQuery;
  return result;
};




const getSingleStudentFromDB = async (id: string) => {
  const result = await Student.findById(id)
    .populate("admissionSemester")
    .populate({
      path: "academicDepartment",
      populate: {
        path: "academicFaculty",
      },
    });
  return result;
};

// update student into db;

const updateStudentFromDB = async (id: string, payLoad: Partial<TStudent>) => {
  const { name, guardian, localGuardian, ...remainingStudentData } = payLoad;

  const modifiedUpdatedData: Record<string, unknown> = {
    ...remainingStudentData,
  };
  /*
  guardian : {
  fatherOccupation : "Teacher"
  }

  guardian.fatherOccupation = Teacher
  name.firstName: 'dipu'
   */

  if (name && Object.keys(name).length) {
    for (const [key, value] of Object.entries(name)) {
      modifiedUpdatedData[`name.${key}`] = value;
    }
  }

  if (guardian && Object.keys(guardian).length) {
    for (const [key, value] of Object.entries(guardian)) {
      modifiedUpdatedData[`guardian.${key}`] = value;
    }
  }

  if (localGuardian && Object.keys(localGuardian).length) {
    for (const [key, value] of Object.entries(localGuardian)) {
      modifiedUpdatedData[`localGuardian.${key}`] = value;
    }
  }

  const result = await Student.findByIdAndUpdate(id, modifiedUpdatedData);
  return result;
};

const deleteStudentFromDB = async (id: string) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    const deletedStudent = await Student.findOneAndUpdate(
      { id },
      {
        isDeleted: true,
      },
      { new: true, session }
    );

    if (!deletedStudent) {
      throw new AppError(status.BAD_REQUEST, "failed to delete use");
    }

    // get user _id from deletedStudent

    const userId = deletedStudent.user;

    const deletedUser = await User.findByIdAndUpdate(
      userId,
      { isDeleted: true },
      { new: true, session }
    );

    if (!deletedUser) {
      throw new AppError(status.BAD_REQUEST, "Failed to delete user");
    }

    await session.commitTransaction();
    await session.endSession();

    return deletedUser;
  } catch (err) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error("Failed to delete student");
  }
};

export const StudentServices = {
  // createStudentIntoDB,
  getAllStudentsFromDB,
  getSingleStudentFromDB,
  deleteStudentFromDB,
  updateStudentFromDB,
};









/*


const getAllStudentsFromDB = async (query: Record<string, unknown>) => {
  console.log("Base query:", query);
  const queryObj = { ...query };

  // Searchable fields
  const studentSearchableFields = ["email", "name.firstName", "presentAddress"];

  let searchTerm = "";
  if (query?.searchTerm) {
    searchTerm = query?.searchTerm as string;
  }

  // Creating the search query for the fields
  const searchQuery = Student.find({
    $or: studentSearchableFields.map((field) => ({
      [field]: { $regex: searchTerm, $options: "i" },
    })),
  });

  // Filtering the query by excluding 'searchTerm' and 'sort'
  const excludeFields = ["searchTerm", "sort", "limit","page","fields"];
  excludeFields.forEach((element) => {
    delete queryObj[element];
  });

  console.log("Filtered query object:", queryObj);

  // Apply filtering to the query
  let filterQuery = searchQuery.find(queryObj);

  // Handling sorting
  let sort: string = "-createdAt"; // Default sort
  if (query.sort) {
    sort = query.sort as string;
  }

  // Convert sort string to a valid object for Mongoose sort
  let sortQuery: { [key: string]: SortOrder } = {};
  if (sort.startsWith("-")) {
    sortQuery[sort.slice(1)] = -1; // Descending order
  } else {
    sortQuery[sort] = 1; // Ascending order
  }

  //console.log("Sort query:", sortQuery);

  // Apply sorting
  const applysortQuery = filterQuery.sort(sortQuery);

  // Handling limit

  let page = 1;
  let limit = 1;
  let skip = 0;

  if (query.limit) {
    limit = Number(query.limit); // Convert to number
  }

  if (query.page) {
    page = Number(query.page);
    skip = (page - 1) * limit;
  }
  const paginateQuery = applysortQuery.skip(skip);

  const limitQuery = applysortQuery.limit(limit);


  // field limiting
  let fields = '_v';
  // fields : 'name,email';
  // fields : 'name email'
  if(query.fields){
    fields = (query.fields as string).split(',').join(' ');
    console.log({fields});
  }

  const fieldQuery = await limitQuery.select(fields);


  return fieldQuery;
};

*/