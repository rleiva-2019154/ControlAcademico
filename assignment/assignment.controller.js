'use strict'
import { checkUpdate } from "../src/utils/validator"
import Assignment from './assignment.model.js'
import User from "../src/user/user.model.js"

export const assingCourse = async (req, res) => {
    try{
        //Capturar la data
        let data = req.body
        //validar que el keeper exista
        let course = await Course.findOne({_id: data.curso})
        if(!course) return res.status(404).send({message: 'Course not found'})
        let user = await User.findOne({_id: data.students})
        if(!user) return res.status(404).send({message: 'Student not found'})
        const studentId = data.students;
        const courseCount = await Assignment.countDocuments({ students: studentId }).populate('students', ['username'])
        if (courseCount >= 3) {
            return res.status(400).send({message: `El estudiante con el id ${studentId} ya está inscrito en 3 cursos.`});
        }
 
        // Verificar si el estudiante ya está inscrito en el curso
        const existingCourse = await Assignment.findOne({ students: studentId, name: data.name });
        if (existingCourse) {
            return res.status(400).send({message: `El estudiante con el id ${studentId} ya está inscrito en el curso: ${data.name}.`});
        }
        let assignment = new Assignment(data)
        //guardar el animal
        await Assignment.save()
        //responder al usuario
        return res.send({message: `El curso se ha registrado exitosamente`})
    }catch(err){
        console.error(err)
        return res.status(500).send({message: 'Course is not save', err: err})
    }
}