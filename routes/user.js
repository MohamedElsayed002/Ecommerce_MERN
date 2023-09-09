


import {Router} from 'express'
import { getCurrentUser , updateUser , ChangePassword } from '../controllers/user.js'
import upload from '../middleware/multer.js'

const UserRouter = Router()

UserRouter.get('/getCurrent',getCurrentUser)
UserRouter.patch('/update-user' , upload.single('avatar') , updateUser)
UserRouter.patch('/change-password' , ChangePassword)


export default UserRouter