

import {Router} from 'express'
import { Register , Login , Logout, allowedTo  } from '../controllers/auth.js'

const AuthRouter = Router()


AuthRouter.get('/signout' , Logout)
AuthRouter.post('/register' , Register)
AuthRouter.post('/login' , Login)
export default AuthRouter