'use strict'
import { Router } from "express"
//import { validateJwt, isAdmin, isStudent } from "../middlewares/validate.jwt"
import { 
    test, 
    assingCourse,
    getAssignedCourses
} from "./assignment.controller.js"

const api = Router()

api.get('/test', test)
api.post('/assingCourse', /*[vagetAssignedCourseslidateJwt, isStudent],*/ assingCourse)
api.get('/getAssignedCourses/:id', getAssignedCourses)


export default api