
import {addProductToCart , removeFromCart , updateProductQuantity , ApplyCoupon , getAllUserCart } from '../controllers/cart.js'
import {Router} from 'express'


const CartRouter = Router()


CartRouter.get('/', getAllUserCart)
CartRouter.post('/' , addProductToCart)
CartRouter.patch('/:id' , removeFromCart)
CartRouter.patch('/quantity/:id' , updateProductQuantity)
CartRouter.put('/applyCoupon' , ApplyCoupon)


export default CartRouter