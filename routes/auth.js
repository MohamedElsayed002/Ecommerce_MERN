

import {Router} from 'express'
import { Register , Login , Logout, allowedTo , updateUser } from '../controllers/auth.js'

const AuthRouter = Router()


AuthRouter.get('/signout' , Logout)
AuthRouter.post('/register' , Register)
AuthRouter.post('/login' , Login)
AuthRouter.patch('/update-user/:id' , updateUser)
export default AuthRouter