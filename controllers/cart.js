
import { CartModel } from "../models/cart.js";
import { ProductModel } from "../models/product.js";
import { CouponModel } from "../models/coupon.js";



function calcTotalPrice(cart) {
    let totalPrice = 0
    cart.cartItems.forEach((elm) => {
        totalPrice += elm.quantity * elm.price
    })

    cart.totalPrice = totalPrice
}



const addProductToCart = async (req, res) => {


    let product = await ProductModel.findById(req.body.product)

    if(product.quantity === 0) {
        throw new Error('no product available')
    }

    if (!product) {
        throw new Error('product not found')
    }
    req.body.price = product.price
    let isCartExist = await CartModel.findOne({ user: req.user.userId })
    console.log(product.price)
    if (!isCartExist) {
        let result = new CartModel({
            user: req.user.userId,
            cartItems: [req.body],
        })
        calcTotalPrice(result);
        await result.save()
        return res.json({ message: "success", result })
    }
    let item = isCartExist.cartItems.find((elm) => elm.product == req.body.product)
    if (item) {
        item.quantity += 1

    } else {
        isCartExist.cartItems.push(req.body)
    }


    calcTotalPrice(isCartExist);
    if (isCartExist.discount) {
        isCartExist.totalPriceDiscount = isCartExist.totalPrice - (isCartExist.totalPrice * isCartExist.discount) / 100
    }

    await isCartExist.save()
    res.json({ message: "success", cart: isCartExist })
}


const removeFromCart = async (req, res, next) => {
    let result = await CartModel.findOneAndUpdate(
        { user: req.user.userId },
        { $pull: { cartItems: { _id: req.params.id } } },
        { new: true }
    ).populate('cartItems.product')
    if (!result) {
        throw new Error('cart not found')
    }
    calcTotalPrice(result)
    if (result.discount) {
        result.totalPriceDiscount = result.totalPrice - (result.totalPrice * result.discount) / 100
    }
    res.json({ message: "success",cartItems : result.cartItems ,totalPrice: result.totalPrice });
}


const updateProductQuantity = async (req, res, next) => {
    let product = await ProductModel.findById(req.params.id);
    if (!product) {
        throw new Error('product not found')
    }

    let isCartExist = await CartModel.findOne({ user: req.user.userId })


    let item = isCartExist.cartItems.find(elm => elm.product == req.params.id)

    if (item) {
        item.quantity = req.body.quantity
    }

    calcTotalPrice(isCartExist);
    if (isCartExist.discount) {
        isCartExist.totalPriceDiscount = isCartExist.totalPrice - (isCartExist.totalPrice * isCartExist.discount) / 100
    }

    await isCartExist.save();
    res.json({ message: "success", cart: isCartExist });
}


const ApplyCoupon = async (req, res) => {
    let coupon = await CouponModel.findOne({ code: req.body.code, expires: { $gt: Date.now() } })
    if (!coupon) {
        throw new Error('coupon not found')
    }
    let cart = await CartModel.findOne({ user: req.user.userId })
    cart.totalPriceDiscount = cart.totalPrice - (cart.totalPrice * coupon.discount) / 100
    cart.discount = coupon.discount
    await cart.save()
    res.status(201).json({ message: "success", cart })
}

const getAllUserCart = async (req,res) => {
    let result = await CartModel.findOne({user : req.user.userId}).populate('cartItems.product')
    res.json({message : "success" ,cartId : result._id , cartItems : result.cartItems , totalPrice : result.totalPrice  })
} 


export {
    addProductToCart,
    removeFromCart,
    updateProductQuantity,
    ApplyCoupon,
    getAllUserCart
}