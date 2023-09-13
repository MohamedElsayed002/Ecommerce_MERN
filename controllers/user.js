
import { AuthModel } from "../models/auth.js";
import { StatusCodes } from 'http-status-codes'
import BadRequestError from "../errors/badRequest.js";
import cloudinary from 'cloudinary'
import { formatImage } from '../middleware/multer.js'


const getCurrentUser = async (req, res) => {
    const user = await AuthModel.findOne({ _id: req.user.userId }).select('-password')
    res.status(StatusCodes.OK).json({ user })
}





// const ChangePassword = async (req,res) => {
//     req.body.changedPasswordAt = Date.now()
//     let result = await AuthModel.findOneAndUpdate({_id : req.user.userId} , req.body , {new : true})
//     if(!result) {
//         throw new Error('user not found')
//     }
//     res.json({message : "password changed "})
// }


const getAllUsers = async  (req,res) => {
    let result = await AuthModel.find({})
    res.status(200).json({message : "success" , data : result})
}

const getOneUser = async (req,res) => {
    const {id} = req.params
    let result = await AuthModel.find({_id : id})
    res.status(200).json({message : "success" , data : result})

}


const updateUser = async (req, res) => {
    const newUser = { ...req.body };
    delete newUser.password;
    delete newUser.role;

    if (req.file) {
        const file = formatImage(req.file);
        const response = await cloudinary.v2.uploader.upload(file);
        newUser.avatar = response.secure_url;
        newUser.avatarPublicId = response.public_id;
    }
    // const updatedUser = await AuthModel.findByIdAndUpdate(req.user.userId, newUser);
    const updatedUser = await AuthModel.findByIdAndUpdate(req.user.userId, newUser);

    if (req.file && updatedUser.avatarPublicId) {
        await cloudinary.v2.uploader.destroy(updatedUser.avatarPublicId);
    }

    res.status(StatusCodes.OK).json({ msg: 'update user' });
};


const DeleteUser = async (req,res) => {
    const {id} = req.params
    let result = await AuthModel.findByIdAndDelete({_id : id})
    if(!result) {
        throw new Error('user not found')
    }
    res.status(201).json({message : 'user deleted successfully'})
}

export {
    getCurrentUser,
    updateUser,
    getAllUsers,
    getOneUser,
    DeleteUser
}