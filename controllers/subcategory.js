

import slugify from "slugify";
import { subCategoryModel } from "../models/subcategory.js";
import BadRequestError from "../errors/badRequest.js";


const createSubCategory = async (req,res) => {

    const {name,category} = req.body
    let result = await subCategoryModel({name , category , slug :slugify(name)})
    await result.save()

    if(!result) {
        throw new BadRequestError('subcategory not created')
    }

    res.json({message : "success" , result})
}



const getAllSubCategory = async (req,res) => {
    let filter = {}
    if(req.params.categoryId) {
        filter = {category : req.params.categoryId}
    }
    let result = await subCategoryModel.find(filter).populate('category')
    res.json({message : "success" , result})
}

const getSingleSubCategory = async (req,res) => {
    const {id} = req.params
    let result = await subCategoryModel.findOne({_id : id}).populate('category')
    if(!result) {
        throw new BadRequestError('subcategory not found')
    }

    res.json({message : "success" , result})
}


const updateSubCategory = async (req,res) => {
    const {name,category} = req.body
    const {id} = req.params
    let result = await subCategoryModel.findByIdAndUpdate({_id : id} , {name , category , slug : slugify(name)} , {new : true})
    if(!result) {
        throw new BadRequestError('category not found')
    }
    res.json({message : "category updated successfully" , result})
}

const deleteSubCategory = async (req,res) => {
    const {id} = req.params
    let result = await subCategoryModel.findByIdAndDelete({_id : id})
    if(!result) {
        throw new BadRequestError('category not found')
    }
    res.json({message : "subcategory deleted" })
}

export {
    createSubCategory,
    getAllSubCategory,
    getSingleSubCategory,
    updateSubCategory,
    deleteSubCategory
}