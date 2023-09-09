
import { ReviewModel } from "../models/review.js";
import BadRequestError from '../errors/badRequest.js'




const createReview  = async (req,res) => {

    req.body.user = req.user.userId
    let isReview = await ReviewModel.findOne({user : req.user.userId , product : req.body.product})
    if(isReview) {
        throw new Error('you created a review before')
    }
    let result = await ReviewModel(req.body)
    await result.save()

    res.json({message : "success" , result})

}

const getAllReviews  = async (req,res) => {
    const result = await ReviewModel.find({})
    res.json({message : "success" , result })
}


const getReview  = async (req,res) => {
    const {id} = req.params
    let result = await ReviewModel.findOne({_id : id})
    if(!result) {
        throw new BadRequestError('review not found')
    }
    res.json({message : "success" , result})
}


const UpdateReview  = async (req,res) => {

    const {id} = req.params
    let result = await ReviewModel.findByIdAndUpdate({_id : id , user : req.user.userId} , req.body , {new : true})
    if(!result) {
        throw new Error('review not found or you are not authorized to update')
    }
    res.json({message : "success", result})

}


const deleteReview  = async (req,res) => {
    const {id} = req.params
    let result = await ReviewModel.findByIdAndDelete(id)
    if(!result) {
        throw new BadRequestError('revview not found')
    }
    res.json({message : 'success' , result})
}

export {
    createReview,
    getAllReviews,
    getReview,
    UpdateReview,
    deleteReview
}