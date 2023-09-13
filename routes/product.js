

import { Router } from 'express'
import {
    CreateProduct,
    getAllProducts,
    getProduct,
    updateProduct,
    deleteProduct,
    getAllProductsAdmin
} from '../controllers/product.js'
import upload from '../middleware/multer.js'


const ProductRouter = Router({mergeParams : true})

ProductRouter
    .route('/admin-all-products').get(getAllProductsAdmin)
ProductRouter
    .route('/').post(upload.single('image') , CreateProduct).get(getAllProducts)

ProductRouter
    .route('/:id').get(getProduct).patch(updateProduct).delete(deleteProduct)



export default ProductRouter