

import BadRequestError from "../errors/badRequest.js";
import { categoryModel } from "../models/category.js";
import slugify from "slugify";
import cloudinary from 'cloudinary'
import { formatImage } from '../middleware/multer.js'

const createCategory = async (req,res) => {
    req.body.slug = slugify(req.body.name)
    if(req.file) {
        const file = formatImage(req.file)
        const response = await cloudinary.v2.uploader.upload(file)
        console.log(response)
        req.body.image =  response.secure_url
        req.body.categoryPublicId = response.public_id
    }
    let result = await categoryModel(req.body)
    await result.save()

    res.json({message : "success" , result})
}

const getAllCategories = async (req,res) => {
    const categories= await categoryModel.find({})
    res.json({message : "success" , categories})
}


const getSingleCategory = async (req,res) => {
    const {id} = req.params
    let result = await categoryModel.findOne({_id : id})
    if(!result) {
        throw new BadRequestError('category not found')
    }
    res.json({message : "success" , result})
}


const updateCategory = async (req,res) => {
    const {id} = req.params
    const {name} = req.body
    let result = await categoryModel.findByIdAndUpdate({_id : id} , {name : name , slug : slugify(name)} , {new : true})
    if(!result) {
        throw new BadRequestError('category not found')
    }
    res.json({message : "success" , result})
}


const deleteCategory = async (req,res) => {
    const {id} = req.params
    let result = await categoryModel.findByIdAndDelete(id)
    if(!result) {
        throw new BadRequestError('category not found')
    }
    res.json({message : 'success' })
}

export {
    createCategory,
    getAllCategories,
    getSingleCategory,
    updateCategory,
    deleteCategory
}