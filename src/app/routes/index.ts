import { Router } from "express"
import { userRoute } from "../modules/users/user.router";
import { StudentRoute } from "../modules/students/student.route";


const router = Router()


const moduleRoutes = [
    {
        path: '/users',
        route: userRoute
    },
    {
        path: '/students',
        route: StudentRoute
    }
]


moduleRoutes.forEach(route =>{
    router.use(route.path,route.route)
});


export default router;