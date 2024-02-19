import { Schema, model } from "mongoose";

const assignmentSchema = Schema({
    curso: {
        type: Schema.ObjectId,
        lowerCase: true,
        require: true,
        ref: 'curso'
    },
    teacher: {
        type: Schema.ObjectId,
        lowerCase: true,
        require: true,
        ref: 'user'
    },
    students: {
        type: Schema.ObjectId,
        lowerCase: true,
        require: true,
        ref: 'user'
    }
},
{
    versionKey: false //desahabilitar el __v (versión del docuemnto)
}
)

export default model('assignment', assignmentSchema)