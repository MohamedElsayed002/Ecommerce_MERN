

import {
    CreateCoupon,
    GetAllCoupons,
    GetCoupon,
    UpdateCoupon,
    DeleteCoupon
} from '../controllers/coupon.js'
import {Router} from 'express'

const CouponRouter = Router()

CouponRouter
        .route('/')
            .get(GetAllCoupons).post(CreateCoupon)
CouponRouter
        .route('/:id')
            .get(GetCoupon).patch(UpdateCoupon).delete(DeleteCoupon)


export default CouponRouter