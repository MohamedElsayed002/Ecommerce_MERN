

import mongoose from "mongoose";


const OrderSchema = new mongoose.Schema({
    user : {
        type : mongoose.Types.ObjectId,
        ref : 'user',
        required : [true , 'user id required']
    },
    cartItems : [{
        product : {type : mongoose.Types.ObjectId , ref : 'product' , required : [true , 'product id required']},
        quantity : Number,
        price : Number
    }],
    totalOrderPrice : Number,
    shippingAddress : {
        street : String,
        city : String,
        phone : String
    },
    paymentMethod : {
        type : String,
        enum : ['card','cash'],
        default : 'cash'
    },
    isPaid : {
        type : Boolean,
        default : false
    },
    paidAt : {
        type : Date
    },
    isDelivered : {
        type : Boolean,
        default : false
    },
    deliveredAt : Date
}, {
    timestamps : true
})

export const OrderModel = mongoose.model('order',OrderSchema)