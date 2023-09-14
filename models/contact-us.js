

import mongoose from 'mongoose'



const ContactUsSchema = new mongoose.Schema({
    name : {
        required : true,
        type : String,
        minLength : 4
    },
    email : {
        required : true,
        type : String,
    },
    comment : {
        required : true,
        type : String
    }
},{
    timestamps : true
})

export const ContactUsModel = mongoose.model('contact-us',ContactUsSchema)