import BadRequestError from "../errors/badRequest.js";
import { ProductModel } from "../models/product.js";
import slugify from "slugify";
import { formatImage } from '../middleware/multer.js'
import cloudinary from 'cloudinary'




const CreateProduct = async (req,res) => {
    req.body.slug = slugify(req.body.title)
    if(req.file) {
        const file = formatImage(req.file)
        const response = await cloudinary.v2.uploader.upload(file)
        req.body.image = response.secure_url
        req.body.imageId = response.public_id
    }
    let result = await ProductModel(req.body)
    await result.save()
    res.json({message : "success" , result  })
}

const getAllProducts = async (req, res) => {

    const { search   , sort  } = req.query

    let queryObject = {
        
    }

    if(req.params.categoryId) {
        queryObject = {category : req.params.categoryId}
    }


    if (search) {
        queryObject.$or = [
            { title: { $regex: search, $options: 'i' } },
            { description: { $regex: search, $options: 'i' } },
        ];
    }



    const sortOptions = {
        'high' : '-price',
        'low' : 'price',
        'a-z' : 'title',
        'z-a' : '-title'
    }


    const sortKey = sortOptions[sort] || sortOptions.newest


    const page = Number(req.query.page) || 1
    const limit = Number(req.query.limit) || 10
    const skip = (page - 1 ) * limit 



    const products = await ProductModel.find(queryObject).sort(sortKey).limit(limit).skip(skip)

    const totalProducts = await  ProductModel.countDocuments()
    const numOfPages = Math.ceil(totalProducts / limit )
    res.status(200).json({ totalProducts , numOfPages ,page, products })
}


const getProduct = async (req,res,next) => {
    const {id} = req.params
    let result = await ProductModel.findOne({_id : id})
    if(!result) {
        throw new BadRequestError('category not  found')
    }
    res.json({message : "success" , result })
}

const getAllProductsAdmin = async (req,res) => {
    let result = await ProductModel.find({})
    res.status(200).json({message : "success" , result})
}


const updateProduct = async (req,res) => {
    const {id} = req.params
    if(req.body.title) {
        req.body.slug = slugify(req.body.title)
    }

    let result = await ProductModel.findByIdAndUpdate({_id : id} , req.body , {new : true})
    if(!result) {
        throw new BadRequestError('product not found or something went wrong')
    }
    res.status(201).json({message : "product updated successfully" , result })
}

const deleteProduct = async (req,res) => {
    const {id} = req.params
    let result = await ProductModel.findByIdAndDelete({_id : id})
    if(!result) {
        throw new BadRequestError('product not found')
    }

    res.status(201).json({message : "product deleted successfully"})
}

export {
    CreateProduct,
    getAllProducts,
    getProduct,
    updateProduct,
    deleteProduct,
    getAllProductsAdmin
}