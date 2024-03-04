'use strict'
import { checkUpdate } from '../utils/validator.js'
import Course from './course.model.js'
import User from '../user/user.model.js'

export const test = (req, res)=>{
    console.log('test is running course')
    return res.send({message: 'Test us running'})
}

export const crearCurso = async (req, res) =>{
    try{
        // Capturar el nombre del curso desde el body
        let data = req.body

        const existingCourse = await Course.findOne({ name: data.name });
        if (existingCourse) {
            return res.status(400).send({message: `Un curso con el mismo nombre ya existe`});
        }

        const existingUser = await User.findOne({ _id: data.teacher, role: 'TEACHER_ROLE' });
        if (!existingUser) {
            return res.status(400).send({ message: `El usuario (profesor) con el ID proporcionado no existe o no tiene el rol adecuado` });
        }
        // Crear una nueva instancia de Course solo con el nombre
        let course = new Course( data );
        // Guardar el curso
        await course.save();
        // Responder al usuario
        return res.send({ message: `El curso ${data.name} se ha registrado exitosamente` });
    } catch(err){
        console.error(err);
        return res.status(500).send({ message: 'No se pudo guardar el curso', err: err });
    }
};

export const update = async(req, res)=>{
    try {
        //Capturar la data
        let data = req.body
        //Capturar el id del course a actualizar
        let { id } = req.params
        //Validar que vengan datos
        let update = checkUpdate(data, false)
        if(!update) return res.status(400).send({message: 'Have sumitted some data that cannot be updated or missing data'})
        //Actualizar
        let updatedCourse = await Course.findOneAndUpdate(
            {_id: id},
            data,
            {new: true}
        ).populate(['name'])//Elimianr la informacion sensible
        //Validar la actualizacion
        if(!updatedCourse) return res.status(404).send({message: 'Course not found and not updated'})
       
        //Responder si todo sale bien
        return res.send({message: 'Course updated successfully', updatedCourse})
    } catch (err) {
        console.error(err)
        return res.status(500).send({message: 'Error updating course'})
    }
}


export const deleteC = async(req, res) =>{
    try {
        let { id } = req.params;
        const { userId } = req.body;

        // Buscar el curso por su ID
        const courseToDelete = await Course.findOne({ _id: id });

        // Verificar si se encontró el curso
        if (!courseToDelete) {
            return res.status(404).send({ message: 'Course not found' });
        }
        // Buscar todas las asignaciones que tienen el curso que se va a eliminar
        const assignmentsToDelete = await Course.find({ curso: id });
        

        // Eliminar cada asignación encontrada
        for (const assignment of assignmentsToDelete) {
            await assignment.deleteOne();
        }

        // Eliminar el curso
        const deletedCourse = await Course.findOneAndDelete({ _id: id });

        // Validar que se eliminó el curso
        if (!deletedCourse) {
            return res.status(404).send({ message: 'Course not found and not deleted' });
        }

        // Respondemos al usuario
        return res.send({ message: 'Deleted course successfully and removed assignments from users' });
    } catch(err) {
        console.error(err);
        return res.status(500).send({ message: 'Error deleting course' });
    }
}

export const getCoursesByTeacherId = async(req, res) => {
    try {
        // Capturar el ID del profesor desde la solicitud
        const teacherId = req.params.id;

        // Buscar los cursos asignados al profesor por su ID
        const assignedCourses = await Course.find({ teacher: teacherId });

        // Verificar si el profesor tiene cursos asignados
        if (assignedCourses.length === 0) {
            return res.status(404).json({ message: 'El profesor no está asignado a ningún curso.' });
        }

        // Enviar los cursos asignados al profesor
        return res.status(200).json(assignedCourses);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error al obtener los cursos asignados.', error });
    }
}