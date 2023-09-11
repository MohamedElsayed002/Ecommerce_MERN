
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

// const updateUser = async (req,res) => {
//     const newUser = {...req.body}
//     if(req.file) {
//         const file = formatImage(req.file)
//         // const response = await cloudinary.v2.uploader.upload(req.file.path)
//         const response = await cloudinary.v2.uploader.upload(file)
//         // await fs.unlink(req.file.path)
//         newUser.avatar = response.secure_url
//         newUser.avatarPublicId = response.public_id
//     }
//     const updateUser = await AuthModel.findByIdAndUpdate(req.user.userId , newUser , {new : true})


//     if(req.file && updateUser.avatarPublicId) {
//         await cloudinary.v2.uploader.destroy(updateUser.avatarPublicId)
//     }
//     res.status(StatusCodes.OK).json({message : 'update user' , updateUser})
// }

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
    const updatedUser = await AuthModel.findByIdAndUpdate(req.user.userId, newUser);

    if (req.file && updatedUser.avatarPublicId) {
        await cloudinary.v2.uploader.destroy(updatedUser.avatarPublicId);
    }

    res.status(StatusCodes.OK).json({ msg: 'update user' });
};

export {
    getCurrentUser,
    updateUser
}