

import mongoose from 'mongoose'
import jwt from 'jsonwebtoken'
// import bcrypt from 'bcrypt'

const AuthSchema = new  mongoose.Schema({
    name : {
        type : String,
        required : [true , 'your name is required'],
        minLength : [2 , 'your name must be at least 2 characters']
    },
    email : {
        type : String,
        required : [true , 'your email is required'],
        trim : true,
    },
    password : {
        type : String,
        required : [true , 'your password is required'],
        minLength : [7 , 'your password must be at least 7 characters']
    },
    changedPasswordAt : Date,
    phone : {
        type : String,
    },
    role : {
        type : String,
        enum : ['admin','user'],
        default : 'user'
    },
    avatar : String,
    avatarPublicId : String,
    wishList : [{
        type : mongoose.Types.ObjectId,
        ref : 'product'
    }],
    addresses  : [{
        city : String,
        street : String,
        phone : String
    }]
}, {
    timestamps : true
})



// AuthSchema.pre('save' , async  function () {
//     this.password = bcrypt.hash(this.password,8)
// })

// findOneAndUpdate
// AuthSchema.pre('findOneAndUpdate' , function () {
//     this._update.password = bcrypt.hashSync(this._update.password, 7)
// })

AuthSchema.methods.CreateJWT = function () {
    return jwt.sign({name : this.name , email : this.email , role : this.role , userId : this._id} , 'Mohamed')
}

// AuthSchema.methods.CheckPassword = async function (candidatePassword) {
//     const isMatch = await bcrypt.compare(candidatePassword, this.password)
//     return isMatch
// }


export const AuthModel = mongoose.model('auth',AuthSchema)