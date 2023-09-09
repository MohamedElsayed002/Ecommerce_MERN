

import { AuthModel } from "../models/auth.js";


const addToWishList = async (req,res) =>{
    const {product} = req.body
    let result = await AuthModel.findByIdAndUpdate( req.user.userId , {$addToSet : {wishList : product}} , {new : true}).populate('wishList')
    if(!result) {
        throw new Error('review not found or you are not authorized to perform this action')
    }
    res.json({message : "success" , result })
}


const removeFromWishList = async (req,res) => {
    const {product} = req.body
    let result = await AuthModel.findByIdAndUpdate(req.user.userId , {$pull : {wishList : product}} , {new : true}).populate('wishList')
    if(!result) {
        throw new Error('product not found')
    }
    res.json({message : "success" , result})
}

const getAllUserWishList = async (req,res) => {
    let result = await AuthModel.findOne({_id : req.user.userId}).populate('wishList')
    if(!result) {
        throw new Error('review not found')
    }
    res.json({message : "success" , result : result.wishList})
}

export {
    addToWishList,
    removeFromWishList,
    getAllUserWishList
}