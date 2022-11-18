import { Request, Response, NextFunction } from 'express'

import orderService from '../services/order.service'
import { BadRequestError } from '../helpers/apiError'
import Order from '../models/Order'

// POST /orders

// productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
// productname: { type: String, required: true },
// cartQuantity: { type: Number, required: true },
// total: { type: Number, required: true },
export const createOrder = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { fullname, address, city, postalcode, country, total, products } =
      req.body
    // const { orderDate, deliveryDate, returnDate, products, userId } = req.body
    //   const order = new Order({ orderDate, deliveryDate, returnDate, products, userId })
    const order = new Order({
      fullname,
      address,
      city,
      postalcode,
      country,
      total,
      products,
    })

    /*
  {
    _id: objectId,
    userName: string,
    emails:[
        {
            type: string,
            emailaddress:string
        }
    ]
}
  
    db.user.update({_id: objectId},{
    {$push:{emails: {$each:emailListArr }}}
})
    */

    await orderService.create(order)
    res.json(order)
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', 400, error))
    } else {
      next(error)
    }
  }
}

// PUT /orders/:orderId
export const updateOrder = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const update = req.body
    const orderId = req.params.orderId
    const updatedorder = await orderService.update(orderId, update)
    res.json(updatedorder)
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', 400, error))
    } else {
      next(error)
    }
  }
}

// DELETE /orders/:orderId
export const deleteOrder = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await orderService.deleteOrder(req.params.orderId)
    res.status(204).end()
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', 400, error))
    } else {
      next(error)
    }
  }
}

// GET /orders/:orderId
export const findById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res.json(await orderService.findById(req.params.orderId))
    //   log.console('found')
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', 400, error))
    } else {
      next(error)
    }
  }
}

// GET /orders
export const findAll = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res.json(await orderService.findAll())
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', 400, error))
    } else {
      next(error)
    }
  }
}
