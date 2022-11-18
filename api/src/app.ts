import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import cookieParser from 'cookie-parser'

import apiErrorHandler from './middlewares/apiErrorHandler'
import apiContentType from './middlewares/apiContentType'
import userRouter from './routers/user.router'
import productRouter from './routers/product.router'
import orderRouter from './routers/order.router'

dotenv.config({ path: '.env' })
const app = express()

// Express configuration
app.set('port', process.env.PORT)

// Global middleware
app.use(
  cors({
    origin: '*',
  })
)
app.use(apiContentType)
app.use(express.json())
app.use(cookieParser())

app.use('/api/v1/users', userRouter)
app.use('/api/v1/product', productRouter)
app.use('/api/v1/order', orderRouter)

// Custom API error handler
app.use(apiErrorHandler)

export default app
