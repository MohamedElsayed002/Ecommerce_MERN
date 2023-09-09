

import {
    createReview,
    getAllReviews,
    getReview,
    UpdateReview,
    deleteReview
} from '../controllers/review.js'
import {Router} from 'express'

const reviewRouter = Router()


reviewRouter
    .route('/')
        .post(createReview).get(getAllReviews)

reviewRouter
    .route('/:id')
        .get(getReview).patch(UpdateReview).delete(deleteReview)



export default reviewRouter