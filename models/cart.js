
import mongoose from 'mongoose'


const CartSchema = new mongoose.Schema({
    user : {
        type : mongoose.Types.ObjectId,
        ref : 'user',
        required : [true , 'user id is required']
    },
    cartItems : [{
        product : {type : mongoose.Types.ObjectId , ref : 'product' , required : [true , 'product id is required']},
        quantity : {type : Number , default : 1},
        price : Number
    }],
    totalPrice: Number,
    totalPriceDiscount : Number,
    discount : Number
})


export const CartModel = mongoose.model('cart' , CartSchema)