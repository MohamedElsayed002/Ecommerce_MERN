
import mongoose from 'mongoose'


const BrandSchema = new  mongoose.Schema({
    name : {
        type : String,
        unique : [true , 'name is required'],
        trim : true,
        required : true,
        minLength : [2 , 'too short brand name'],
    },
    slug : {
        type : String,
        required : true,
        lowercase : true,
    },
    logo : String,
    logoId :String
} , {
    timestamps : true
})

export const BrandModel = mongoose.model('brand' , BrandSchema)