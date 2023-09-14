


import {Router} from 'express'
import { getCurrentUser , updateUser , getAllUsers , getOneUser , DeleteUser  } from '../controllers/user.js'
import upload from '../middleware/multer.js'
import { testUser } from '../middleware/testUser.js'

const UserRouter = Router()

UserRouter.get('/getCurrent',getCurrentUser)
UserRouter.patch('/update-user' , upload.single('avatar') ,testUser, updateUser)
// UserRouter.patch('/change-password' , ChangePassword)
UserRouter.get('/' , getAllUsers)
UserRouter.get('/:id', getOneUser)
UserRouter.delete('/:id' ,  testUser,DeleteUser)
export default UserRouter