

import { addToWishList , removeFromWishList , getAllUserWishList } from "../controllers/wishlist.js";

import {Router} from 'express'
import { testUser } from "../middleware/testUser.js";



const wishlistRouter = Router()


wishlistRouter.patch('/add' , testUser, addToWishList)
wishlistRouter.patch('/remove' , testUser, removeFromWishList)
wishlistRouter.get('/' , getAllUserWishList)

export default wishlistRouter