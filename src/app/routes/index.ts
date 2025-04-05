import { Router } from "express"
import { userRoute } from "../modules/users/user.router";
import { StudentRoute } from "../modules/students/student.route";
import { AcademicSemesterRouters } from "../modules/academicSemester/academicSemester.route";
import { AcademicFacultyRoutes } from "../modules/academicFaculty/academicFaculty.routes";
import { AcademicDepartmentRoutes } from "../modules/academicDepartment/academicDepartment.route";
import { AdminRoutes } from "../modules/Admin/admin.router";
import { FacultyRoutes } from "../modules/faculty/faculty.routs";
import { CourseRoutes } from "../modules/course/course.routes";
import { semesterRegistrationRouter } from "../modules/SemesterRegistration/semesterRegistration.router";
import { offeredCourseRouter } from "../modules/OfferedCourse/OfferedCourse.router";
import { AuthRoutes } from "../modules/auth/auth.routes";
import { EnrolledCourseRoutes } from "../modules/EnrolledCourse/enrolledCoursed.router";


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
    {
        path: '/faculty',
        route: FacultyRoutes
    },
    {
        path: '/courses',
        route: CourseRoutes
    },
    {
        path: '/semester-registration',
        route: semesterRegistrationRouter
    },
    {
        path: '/offered-courses',
        route: offeredCourseRouter
    },
    {
        path: '/auth',
        route: AuthRoutes
    },
    {
        path: '/enrolled-courses',
        route: EnrolledCourseRoutes
    },
]


moduleRoutes.forEach(route =>{
    router.use(route.path,route.route)
});


export default router;