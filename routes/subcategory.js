

import { Router} from 'express'
import { createSubCategory ,
        getAllSubCategory ,
        getSingleSubCategory ,
        deleteSubCategory ,
        updateSubCategory } from '../controllers/subcategory.js'
import { allowedTo } from '../controllers/auth.js'



const SubCategory = Router({mergeParams : true})


SubCategory
    .route('/').post(createSubCategory).get(allowedTo('admin'),getAllSubCategory)

SubCategory
    .route('/:id').get(getSingleSubCategory).delete(deleteSubCategory).patch(updateSubCategory)

export default SubCategory