import { Request, Response, NextFunction } from 'express'
import User from '../models/User'
import userService from '../services/user.service'
import { BadRequestError, UnauthorizedError } from '../helpers/apiError'
import bcrypt from 'bcrypt'
import genToken from '../util/genToken'

// POST /users
export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { username, email, password, isAdmin, token } = req.body

    const user = new User({
      username,
      email,
      password,
      isAdmin,
      token,
    })

    const salt = await bcrypt.genSalt(10)
    user.password = await bcrypt.hash(user.password, salt)

    await userService.create(user)

    res.status(200).json({ message: 'User created successfully 😊 👌' })
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', 400, error))
    } else {
      next(error)
    }
  }
}

// PUT /users/:userId
export const userLogin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const username = req.body.username
    const userFound = await User.findOne({ username })

    if (userFound) {
      const match = await bcrypt.compare(req.body.password, userFound.password)

      if (match) {
        const accessToken = genToken(username)

        res.cookie('token', accessToken, {
          maxAge: 24 * 60 * 60 * 1000,
          httpOnly: true,
        })

        res.status(200).json({
          accessToken,
          username,
          isLoggedIn: true,
        })
        return next()
      } else {
        next(new BadRequestError('Invalid Password', 400))
      }
    } else {
      next(new UnauthorizedError('User does not exist', 401))
    }
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', 400, error))
    } else {
      next(error)
    }
  }
}

export const logout = async (req: Request, res: Response) => {
  //  const authHeader = req.headers.authorization

  res
    .clearCookie('token')
    .status(200)
    .json({ message: 'Successfully logged out' })
}

// PUT /users/:userId
export const updateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const update = req.body
    const userId = req.params.userId
    const updatedUser = await userService.update(userId, update)
    res.json(updatedUser)
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', 400, error))
    } else {
      next(error)
    }
  }
}

// DELETE /users/:userId
export const deleteUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await userService.deleteUser(req.params.userId)
    res.status(204).end()
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', 400, error))
    } else {
      next(error)
    }
  }
}

// GET /users/:userId
export const findById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res.json(await userService.findById(req.params.userId))
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', 400, error))
    } else {
      next(error)
    }
  }
}

// GET /users
export const findAll = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res.json(await userService.findAll())
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', 400, error))
    } else {
      next(error)
    }
  }
}
