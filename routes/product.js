

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
import { testUser } from '../middleware/testUser.js'
import { authenticateUser } from '../middleware/authMiddleware.js'


const ProductRouter = Router({mergeParams : true})

ProductRouter
    .route('/admin-all-products').get(getAllProductsAdmin)
ProductRouter
    .route('/').post(upload.single('image') , testUser , CreateProduct).get(getAllProducts)

ProductRouter
    .route('/:id').get(getProduct).patch(authenticateUser,testUser,updateProduct).delete(authenticateUser,testUser,deleteProduct)



export default ProductRouter