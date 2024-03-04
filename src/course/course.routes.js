'use strict'
import {Router} from "express";
import { validateJwt, isAdmin } from '../middlewares/validate.jwt.js'
import { 
    crearCurso, 
    test, 
    update, 
    deleteC, 
    getCoursesByTeacherId } from "./course.controller.js";

const api = Router()

api.get('/test', test)
api.post('/crearCurso', /*[validateJwt, isAdmin],*/ crearCurso)
api.put('/update/:id', [validateJwt, isAdmin], update)
api.delete('/delete/:id', [validateJwt, isAdmin], deleteC)
api.get('/getCoursesByTeacherId/:id', getCoursesByTeacherId);


export default api