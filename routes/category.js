

import {Router} from 'express'
import { createCategory , getAllCategories , getSingleCategory , updateCategory , deleteCategory  } from '../controllers/category.js'
import SubCategory from './subcategory.js'
import { validation } from '../middleware/validation.js'
import { createCategorySchema , getCategorySchema } from '../validation/category.js'

import upload from '../middleware/multer.js'
import ProductRouter from './product.js'


const CategoryRouter = Router()

// let fieldsArray = [{name : 'imgCover' , maxCount : 1} , {name : 'images' , maxCount : 10}] 
// CategoryRouter.use('/:categoryId/subcategories' , SubCategory)
CategoryRouter.use('/:categoryId/products' , ProductRouter)
CategoryRouter
    .route('/')
        .post(upload.single('image'), validation(createCategorySchema)  , createCategory)
        .get(getAllCategories)

CategoryRouter
    .route('/:id').get(validation(getCategorySchema),getSingleCategory).patch(updateCategory).delete(deleteCategory)



export default CategoryRouter