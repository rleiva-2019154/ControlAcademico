import { Schema, model } from "mongoose";

const courseSchema = Schema({
    name: {
        type: String,
        require: true
    },
    description: {
        type: String,
        require: true
    },
    grade: {
        type: String,
        require: true
    },
    teacher:{
        type: Schema.ObjectId,
        lowercase: true,
        require: true,
        ref: 'user'
    }
},
{
    versionKey: false //desahabilitar el __v (versión del docuemnto)
}
)

export default model('curso', courseSchema)