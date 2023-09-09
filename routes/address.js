

import {
    addToAddress,
    removeFromAddress,
    getAllAddresses
} from '../controllers/addresses.js'
import {Router} from 'express'



const addressesRouter = Router()


addressesRouter.patch('/add' , addToAddress)
addressesRouter.patch('/remove' , removeFromAddress)
addressesRouter.get('/' , getAllAddresses)

export default addressesRouter

