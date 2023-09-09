

import {Router} from 'express'
import {
    createBrand,
    getAllBrands,
    getBrand,
    updateBrand,
    deleteBrand
} from '../controllers/brand.js'
import upload from '../middleware/multer.js'

const BrandRouter = Router()

BrandRouter
    .route('/').post(upload.single('logo') , createBrand).get(getAllBrands)

BrandRouter
    .route('/:id').get(getBrand).patch(updateBrand).delete(deleteBrand)


export default BrandRouter