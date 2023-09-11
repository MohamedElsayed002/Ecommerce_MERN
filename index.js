
import express from 'express'
import 'express-async-errors'
import dotenv from 'dotenv'
import { dbConnection } from './database/dbConnection.js'
import cookieParser from 'cookie-parser'
import morgan from 'morgan'
import cloudinary from 'cloudinary'
dotenv.config()



// Routes
import AuthRouter from './routes/auth.js'
import UserRouter from './routes/user.js'
import CategoryRouter from './routes/category.js'
import SubCategory from './routes/subcategory.js'
import BrandRouter from './routes/brand.js'
import ProductRouter from './routes/product.js'
import reviewRouter from './routes/review.js'
import wishlistRouter from './routes/wishlist.js'
import addressesRouter from './routes/address.js'
import CouponRouter from './routes/coupon.js'
import CartRouter from './routes/cart.js'
import OrderRouter from './routes/order.js'

// Errors Middleware
import notFound from './middleware/not-found.js'
import errorHandlerMiddleware from './middleware/error-handle.js'
import { authenticateUser } from './middleware/authMiddleware.js'




const app = express()
dbConnection()
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET,
});

import { dirname } from 'path'
import { fileURLToPath } from 'url';
import path from 'path';
const __dirname = dirname(fileURLToPath(import.meta.url));
app.use(express.static(path.resolve(__dirname, './public')));


app.use(cookieParser())
app.use(express.json())

app.use(morgan('dev'))

app.use('/api/v1/auth', AuthRouter)
app.use('/api/v1/users' ,  authenticateUser, UserRouter)
app.use('/api/v1/category' , CategoryRouter)
app.use('/api/v1/subcategory' ,authenticateUser, SubCategory)
app.use('/api/v1/brands' , BrandRouter)
app.use('/api/v1/products' , ProductRouter)
app.use('/api/v1/reviews' ,  authenticateUser,reviewRouter)
app.use('/api/v1/wishlist' ,  authenticateUser,wishlistRouter)
app.use('/api/v1/address' , authenticateUser , addressesRouter)
app.use('/api/v1/coupon' , authenticateUser , CouponRouter)
app.use('/api/v1/cart' , authenticateUser , CartRouter)
app.use('/api/v1/orders' , authenticateUser , OrderRouter)
app.get('/', (req, res) => {
    res.send('<h1>Mohamed</h1>')
})

app.use(errorHandlerMiddleware)
app.use(notFound)

const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log(`listening on ${PORT}`))


// process.on('unhandledException' , (error) => {
//     console.log(error)
// })
