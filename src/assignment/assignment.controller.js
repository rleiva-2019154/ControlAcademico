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
    try {
        // Capturar la data
        let data = req.body;
        
        // Validar que el curso exista
        let course = await Course.findOne({_id: data.curso});
        if (!course) {
            return res.status(404).send({message: 'Course not found'});
        }
        
        // Validar que el estudiante exista
        let user = await User.findOne({_id: data.students});
        if (!user) {
            return res.status(404).send({message: 'Student not found'});
        }
        
        const studentId = data.students;
        
        // Contar la cantidad de cursos en los que el estudiante está inscrito
        const courseCount = await Assignment.countDocuments({ students: studentId });
        if (courseCount >= 3) {
            return res.status(400).send({message: `El estudiante con el id ${studentId} ya está inscrito en 3 cursos.`});
        }
 
        // Verificar si el estudiante ya está inscrito en el curso
        const existingCourse = await Assignment.findOne({ students: studentId, name: data.name });
        if (existingCourse) {
            return res.status(400).send({message: `El estudiante con el id ${studentId} ya está inscrito en el curso: ${course.name}.`});
        }
        
        let assignment = new Assignment(data);
        
        // Guardar el curso asignado
        await assignment.save();
        
        // Responder al usuario
        return res.send({message: `Se ha asignado exitosamente al estudiante al curso ${course.name}`});
    } catch(err) {
        console.error(err);
        return res.status(500).send({message: 'Course is not save', err: err});
    }
}

export const getAssignedCourses = async (req, res) => {
    try {
        // Capturar el ID del estudiante desde la solicitud
        const studentId = req.params.studentId;

        // Buscar los cursos asignados al estudiante por su ID
        const assignedCourses = await Assignment.find({ students: studentId }).populate('course');

        // Verificar si el estudiante tiene cursos asignados
        if (assignedCourses.length === 0) {
            return res.status(404).send({ message: 'El estudiante no tiene cursos asignados.' });
        }

        // Enviar los cursos asignados al estudiante
        return res.send(assignedCourses);
    } catch(err) {
        console.error(err);
        return res.status(500).send({ message: 'Error al obtener los cursos asignados.', err: err });
    }
}
