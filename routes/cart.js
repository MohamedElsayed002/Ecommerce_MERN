
import {addProductToCart , removeFromCart , updateProductQuantity , ApplyCoupon , getAllUserCart } from '../controllers/cart.js'
import {Router} from 'express'
import { testUser } from '../middleware/testUser.js'


const CartRouter = Router()


CartRouter.get('/', getAllUserCart)
CartRouter.post('/' , testUser, addProductToCart)
CartRouter.patch('/:id' , testUser, removeFromCart)
CartRouter.patch('/quantity/:id' , testUser, updateProductQuantity)
CartRouter.put('/applyCoupon' , testUser, ApplyCoupon)


export default CartRouter