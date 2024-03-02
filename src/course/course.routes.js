'use strict'
import {Router} from "express";
import { validateJwt, isAdmin } from '../middlewares/validate.jwt.js'
import { 
    createCourse, 
    crearCurso, 
    test, 
    get, 
    update, 
    deleteC, 
    search} from "./course.controller.js";

const api = Router()

api.get('/test', test)
api.post('/crearCurso', [validateJwt, isAdmin], crearCurso)
api.post('/createCourse', [validateJwt, isAdmin], createCourse)
api.get('/get', [validateJwt, isAdmin],  get)
api.put('/update/:id', [validateJwt, isAdmin], update)
api.delete('/delete/:id', [validateJwt, isAdmin], deleteC)
api.post('/search', [validateJwt, isAdmin], search)


export default api