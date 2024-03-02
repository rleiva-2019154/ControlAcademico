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
api.post('/assingCourse', /*[validateJwt, isStudent],*/ assingCourse)
api.get('/getAssignedCourses/:id', getAssignedCourses)
/*api.get('/get', [validateJwt, isAdmin],  get)
api.put('/update/:id', [validateJwt, isAdmin], update)
api.delete('/delete/:id', [validateJwt, isAdmin], deleteC)
api.post('/search', [validateJwt, isAdmin], search)*/


export default api