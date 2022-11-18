import express from 'express'

import {
  createProduct,
  findById,
  deleteProduct,
  findAll,
  findByName,
  updateProduct,
} from '../controllers/product.controller'

const router = express.Router()

// Every path we define here will get /api/v1/Products prefix
router.get('/', findAll)
router.get('/findByName/:filterValue', findByName)
router.get('/:productId', findById)
router.put('/:productId', updateProduct)
router.delete('/:productId', deleteProduct)
router.post('/', createProduct)

export default router
