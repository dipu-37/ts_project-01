import { Router } from "express"
import { userRoute } from "../modules/users/user.router";
import { StudentRoute } from "../modules/students/student.route";
import { AcademicSemesterRouters } from "../modules/academicSemester/academicSemester.route";
import { AcademicFacultyRoutes } from "../modules/academicFaculty/academicFaculty.routes";
import { AcademicDepartmentRoutes } from "../modules/academicDepartment/academicDepartment.route";
import { AdminRoutes } from "../modules/Admin/admin.router";


const router = Router()


const moduleRoutes = [
    {
        path: '/users',
        route: userRoute
    },
    {
        path: '/students',
        route: StudentRoute
    },
    {
        path: '/admins',
        route: AdminRoutes,
    },
    {
        path: '/academic-semesters',
        route: AcademicSemesterRouters
    },
    {
        path: '/academic-faculties',
        route: AcademicFacultyRoutes
    },
    {
        path: '/academic-departments',
        route: AcademicDepartmentRoutes
    },
]


moduleRoutes.forEach(route =>{
    router.use(route.path,route.route)
});


export default router;