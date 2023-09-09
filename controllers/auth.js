
import { AuthModel } from "../models/auth.js";
import BadRequestError from '../errors/badRequest.js'
import {StatusCodes} from 'http-status-codes'

const Register = async (req,res) => {
    let checkEmail = await AuthModel.findOne({email : req.body.email})
    if(checkEmail) {
        throw new BadRequestError('email already used')
    }
    const user = await AuthModel(req.body)
    await user.save()

    res.status(StatusCodes.CREATED).json({message : 'user created successfully' , user})
}


const Login = async (req,res) => {
    const {email,password} = req.body
    let user = await AuthModel.findOne({email : email}).select('')
    if(!user) {
        throw new BadRequestError('user not found')
    }
    if(password !== user.password) {
        throw new BadRequestError('password mismatch')
    }
    const token = user.CreateJWT()
    const oneDay = 1000 * 24 * 60 * 60
    res.cookie('token',token, {
        httpOnly : true,
        expires : new Date(Date.now() + oneDay),
        secure : 'production'
    })

    res.status(StatusCodes.OK).json({message : 'login success' , user})

}


const Logout = (req,res) => {
    res.cookie('token','logout',{
        httpOnly : true,
        expires : new Date(Date.now()),
    })

    res.status(StatusCodes.OK).json({ msg: 'user logged out!' });

}


const allowedTo = (...roles) => {
    return (req,res,next) => {
        if(!roles.includes(req.user.role)){
            throw new BadRequestError('you are not authorized')
        }
        next()
    }
}

export {
    Register,
    Login,
    Logout,
    allowedTo
}