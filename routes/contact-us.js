

import {Router} from 'express'
import { CreateContactUs } from '../controllers/contact-us.js'
import { testUser } from '../middleware/testUser.js'


const ContactUsRouter = Router()


ContactUsRouter.post('/' , testUser, CreateContactUs)


export default ContactUsRouter