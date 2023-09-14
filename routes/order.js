

import { allowedTo } from '../controllers/auth.js'
import {createCashOrder , GetSpecificOrder , getAllOrders} from '../controllers/order.js'
import {Router} from 'express'
import { testUser } from '../middleware/testUser.js'


const OrderRouter = Router()

OrderRouter.route('/').get(allowedTo('admin','user'),GetSpecificOrder)
OrderRouter.route('/all-orders').get( getAllOrders)
OrderRouter
    .route('/:id').post(allowedTo('admin','user'),testUser,createCashOrder)


export default OrderRouter