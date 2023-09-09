
import { BrandModel } from "../models/brand.js";
import BadRequestError from '../errors/badRequest.js'
import { formatImage} from '../middleware/multer.js'
import cloudinary from 'cloudinary'
import slugify from "slugify";

const createBrand  = async (req,res) => {
    req.body.slug = slugify(req.body.name)
    
    if(req.file) {
        const file = formatImage(req.file)
        const response = await cloudinary.v2.uploader.upload(file)
        req.body.logo = response.secure_url
        req.body.logoId = response.public_id
    }


    let result = await BrandModel(req.body)
    await result.save()

    res.json({message : "success" , result})
}

const getAllBrands  = async (req,res) => {
    const categories= await BrandModel.find({})
    res.json({message : "success" , categories})
}


const getBrand  = async (req,res) => {
    const {id} = req.params
    let result = await BrandModel.findOne({_id : id})
    if(!result) {
        throw new BadRequestError('category not found')
    }
    res.json({message : "success" , result})
}


const updateBrand  = async (req,res) => {
    const {id} = req.params
    const {name} = req.body
    let result = await BrandModel.findByIdAndUpdate({_id : id} , {name : name , slug : slugify(name)} , {new : true})
    if(!result) {
        throw new BadRequestError('category not found')
    }
    res.json({message : "success" , result})
}


const deleteBrand  = async (req,res) => {
    const {id} = req.params
    let result = await BrandModel.findByIdAndDelete(id)
    if(!result) {
        throw new BadRequestError('category not found')
    }
    res.json({message : 'success' , result})
}

export {
    createBrand,
    getAllBrands,
    getBrand,
    updateBrand,
    deleteBrand
}