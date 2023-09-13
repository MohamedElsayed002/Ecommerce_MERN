
import { OrderModel } from "../models/order.js";
import { ProductModel } from "../models/product.js";
import {CartModel} from '../models/cart.js'



const createCashOrder = async (req,res) => {
    console.log(req.params.id)
    const cart = await CartModel.findById(req.params.id)
    console.log(cart)
    const totalOrderPrice = cart.totalPriceDiscount ? cart.totalPriceDiscount : cart.totalPrice


    const order = new OrderModel({
        user : req.user.userId,
        cartItems : cart.cartItems,
        totalOrderPrice,
        shippingAddress: req.body.shippingAddress
    })

    await order.save()

    if(order) {
        let options = cart.cartItems.map((item) => ({
            updateOne : {
                filter : {_id : item.product},
                update : {$inc : {quantity : -item.quantity , sold : item.quantity}}
            }   
        }))
        ProductModel.bulkWrite(options)
        await CartModel.findByIdAndDelete(req.params.id);

    }

    return res.status(201).json({ message: "success", order });

}

const GetSpecificOrder = async (req,res) => {
    let order = await OrderModel.findOne({user : req.user.userId}).populate('cartItems.product')
    res.status(200).json({message : "success" , order})
}

const getAllOrders = async (req,res) => {
    let order = await OrderModel.find({}).populate('user')
    console.log(order)
    res.status(200).json({message : "successss" , order})
}


export {
    createCashOrder,
    GetSpecificOrder,
    getAllOrders
}