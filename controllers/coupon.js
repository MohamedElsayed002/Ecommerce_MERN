
import { CouponModel } from "../models/coupon.js";
import qrcode from 'qrcode'



const CreateCoupon = async (req,res) => {
    let result = await CouponModel(req.body)
    await result.save()
    res.json({message : "success" , result})
}

const GetAllCoupons = async (req,res) => {
    let result = await CouponModel.find({})
    res.json({message : "success" , result})
}

const GetCoupon = async (req,res) => {
    const {id} = req.params
    let result = await CouponModel.findById(id)
    let url = await qrcode.toDataURL(result.code)
    if(!result) {
        throw new Error('coupon not found')
    }
    res.json({message : "success" , result , url})
}

const UpdateCoupon = async (req,res) => {

    const {id} = req.params
    let result = await CouponModel.findByIdAndUpdate(id , req.body , {new : true})
    if(!result) {
        throw new Error('coupon not found')
    }
    res.json({message : "success" , result})

}

const DeleteCoupon = async (req,res) => {
    const {id} = req.params
    let result = await CouponModel.findByIdAndDelete(id)
    if(!result) {
        throw new Error('coupon not found')
    }
    res.json({message : "deleted successfully"})
}

export {
    CreateCoupon,
    GetAllCoupons,
    GetCoupon,
    UpdateCoupon,
    DeleteCoupon
}