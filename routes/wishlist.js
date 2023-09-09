

import { addToWishList , removeFromWishList , getAllUserWishList } from "../controllers/wishlist.js";
import {Router} from 'express'



const wishlistRouter = Router()


wishlistRouter.patch('/add' , addToWishList)
wishlistRouter.patch('/remove' , removeFromWishList)
wishlistRouter.get('/' , getAllUserWishList)

export default wishlistRouter