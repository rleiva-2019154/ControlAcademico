'use strict'
import { checkUpdate } from "../utils/validator.js"
import Assignment from './assignment.model.js'
import Course from "../course/course.model.js"
import User from "../user/user.model.js"

export const test = (req, res)=>{
    console.log('test is running assignment')
    return res.send({message: 'Test us running'})
}

export const assingCourse = async (req, res) => {
    try{
        //Capturar la data
        let data = req.body
        let course = await Course.findOne({_id: data.curso})
        if(!course) return res.status(404).send({message: 'Course not found'})
        let student = await User.findOne({_id: data.students})
        if(!student) return res.status(404).send({message: 'Student not found'}) 
        const studentId = data.students;
        const courseId = data.curso

        const existingAssignment = await Assignment.findOne({ curso: courseId });
        const courseCount = await Assignment.countDocuments({ students: studentId });
        if (courseCount >= 3) {
            return res.status(400).send({message: `El estudiante ya está inscrito en 3 cursos.`});
        }
        // Verificar si el estudiante ya está inscrito en el curso
        if (existingAssignment) {
            return res.status(400).send({ message: `El estudiante ${student.name} ya está inscrito en el curso: ${course.name}.` });
        }
        let assing = new Assignment(data)
        //guardar el animal 
        await assing.save()
        //responder al usuario
        return res.send({message: `El curso se ha registrado exitosamente`})
    }catch(err){
        console.error(err)
        return res.status(500).send({message: 'Course is not save', err: err})
    }
}

export const getAssignedCourses = async (req, res) => {
    try {
        // Capturar el ID del alumno desde la solicitud
        const studentId = req.params.id; // Cambiar a req.params.id

        // Buscar los cursos asignados al alumno por su ID
        const assignedCourses = await Assignment.find({ students: studentId }).populate('curso');

        // Verificar si el alumno tiene cursos asignados
        if (assignedCourses.length === 0) {
            return res.status(404).json({ message: 'El alumno no está asignado a ningún curso.' });
        }

        // Enviar los cursos asignados al alumno
        return res.status(200).json(assignedCourses);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error al obtener los cursos asignados.', error });
    }
}

