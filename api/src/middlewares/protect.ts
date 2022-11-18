import { Request, Response, NextFunction } from 'express'
import { UnauthorizedError } from '../helpers/apiError'
import jwt from 'jsonwebtoken'

export const protect = (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies.token
  const secret = process.env.JWT_SECRET || ''
  if (token) {
    jwt.verify(token, secret, (err: any, decoded: any) => {
      if (err) {
        throw new UnauthorizedError(
          '401 Unauthorized : Authenticate (AccessToken) is not valid',
          401
        )
      }

      req.user = decoded
      next()
    })
  } else {
    throw new Error('403 Forbidden : AccessToken not found')
  }
}

export default protect

//  const authHeader = req.headers.authorization
//  var cookies = req.headers.cookie
//  const token = authHeader.split(' ')[1]
//  console.log(token)
