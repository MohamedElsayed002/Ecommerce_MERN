

import { AuthModel } from "../models/auth.js";


const addToAddress = async (req,res) =>  {
    let result = await AuthModel.findByIdAndUpdate(req.user.userId , {$addToSet : {addresses : req.body}} , {new : true})
    if(!result) {
        throw new Error('user not found')
    }
    res.json({message : "success" , result : result.addresses})
}

const removeFromAddress = async (req,res) => {
    let result = await AuthModel.findByIdAndUpdate(req.user.userId , {$pull : {addresses : {_id : req.body.address}}} , {new : true})
    if(!result) {
        throw new Error('user not found')
    }
    res.json({message : "success" ,result : result.addresses})
}


const getAllAddresses = async (req,res) => {
    let result = await AuthModel.findOne({_id : req.user.userId})
    if(!result) {
        throw new Error('something went wrong try later')
    }

    res.json({message : "success" , result : result.addresses})
}


export {
    addToAddress,
    removeFromAddress,
    getAllAddresses
}