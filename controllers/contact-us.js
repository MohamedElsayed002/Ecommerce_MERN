

import { ContactUsModel } from "../models/contact-us.js";


const CreateContactUs = async (req,res) => {
    let result = await ContactUsModel(req.body)
    await result.save()
    if(!result) {
        throw new Error('something went wrong')
    }
    res.status(201).json({message : "message sent successfully" , result})
}

export {
    CreateContactUs
}