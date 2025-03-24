import QueryBuilder from "../../builder/Querybuilder";
import { FacultySearchableFields } from "./faculty.constant";
import { Faculty } from "./faculty.model";


const getAllFacultiesFromDB = async(query : Record<string,unknown>)=>{

  const facultyQuery = new QueryBuilder(
    Faculty.find().populate('academicDepartment academicFaculty'),
    query
  ).search(FacultySearchableFields).filter().sort().paginate().fields()


  const result = await facultyQuery.modelQuery;

  return result;
}


const getSingleFacultyFromDB = async (id: string) => {
    const result = await Faculty.findById(id).populate(
      'academicDepartment academicFaculty',
    );
  
    return result;
  };

  export const FacultyServices = {
    getSingleFacultyFromDB,
    getAllFacultiesFromDB,
    
  };


