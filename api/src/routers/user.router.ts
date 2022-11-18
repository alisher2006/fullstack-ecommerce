import express from 'express'
import protect from '../middlewares/protect'

import {
  createUser,
  findById,
  deleteUser,
  findAll,
  userLogin,
  logout,
  updateUser,
} from '../controllers/user.controller'

const router = express.Router()

// Every path we define here will get /api/v1/Users prefix
//app.get("/protected", authorization, (req, res) => {
// [auth, isAdmin, any other middleware...]

router.get('/', findAll)
router.get('/:userId', findById)

router.post('/signup', createUser)
router.post('/login', userLogin)
router.post('/logout', protect, logout)

router.put('/:userId', updateUser)
router.delete('/:userId', deleteUser)

export default router
