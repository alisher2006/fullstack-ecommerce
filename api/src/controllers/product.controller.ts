import { Request, Response, NextFunction } from 'express'

import Product from '../models/Product'
import productService from '../services/product.service'
import { BadRequestError } from '../helpers/apiError'

// POST /Products
export const createProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const {
      name,
      price,
      description,
      category,
      images,
      rating,
      stock,
      comments,
    } = req.body

    const product = new Product({
      name,
      price,
      description,
      category,
      images,
      rating,
      stock,
      comments,
    })

    await productService.create(product)
    res.json(product)
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', 400, error))
    } else {
      console.log(error)
      next(error)
    }
  }
}

// PUT /Products/:productId
export const updateProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const update = req.body
    const productId = req.params.productId
    const updatedProduct = await productService.update(productId, update)
    res.json(updatedProduct)
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', 400, error))
    } else {
      next(error)
    }
  }
}

// DELETE /Products/:productId
export const deleteProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await productService.deleteProduct(req.params.productId)
    res.status(204).end()
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', 400, error))
    } else {
      next(error)
    }
  }
}

// GET /products/findByName/:filterValue
export const findByName = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const regex = new RegExp(req.params.filterValue, 'i')

    res.json(await productService.findByName(regex))
  } catch (error) {
    if (error instanceof Error && error.name === 'ValidationError') {
      next(new BadRequestError('Invalid request', 400, error))
    } else {
      next(error)
    }
  }
}

// GET /Products/:productId
export const findById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res.json(await productService.findById(req.params.productId))
    //   log.console('found')
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', 400, error))
    } else {
      next(error)
    }
  }
}

// GET /Products
export const findAll = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res.json(await productService.findAll())
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', 400, error))
    } else {
      next(error)
    }
  }
}
