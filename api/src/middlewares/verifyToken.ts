import { Request, Response, NextFunction } from 'express'
import { ForbiddenError, UnauthorizedError } from '../helpers/apiError'
import jwt from 'jsonwebtoken'

const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  const auth = req.cookies['token']
  const secret = process.env.JWT_SECRET || ''

  if (auth) {
    jwt.verify(auth, secret, function (err: any, decoded: any) {
      if (err) {
        throw new UnauthorizedError(
          '401 Unauthorized : Authenticate (AccessToken) is not valid',
          401
        )
      } else {
        req.user = decoded
        next()
      }
    })
  } else {
    throw new ForbiddenError('403 Forbidden : AccessToken not found', 403)
  }
}

module.exports = verifyToken
