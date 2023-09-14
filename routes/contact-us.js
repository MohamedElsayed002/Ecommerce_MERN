

import {Router} from 'express'
import { CreateContactUs } from '../controllers/contact-us.js'


const ContactUsRouter = Router()


ContactUsRouter.post('/' , CreateContactUs)


export default ContactUsRouter