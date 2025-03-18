import { Admin } from "./admin.model"


const getSingleAdminFromDB = async (id : string) =>{
    
    const result = await Admin.findById(id);
    console.log(result);
    return result;
}




export const AdminServices = {
    getSingleAdminFromDB,
}