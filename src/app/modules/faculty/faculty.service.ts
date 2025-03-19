import { Faculty } from "./faculty.model";


const getSingleFacultyFromDB = async (id: string) => {
    const result = await Faculty.findById(id).populate(
      'academicDepartment academicFaculty',
    );
  
    return result;
  };

  export const FacultyServices = {
    getSingleFacultyFromDB,
    
  };