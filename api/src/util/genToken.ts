import jwt from 'jsonwebtoken'

type User = {
  username: string
  isAdmin: boolean
}

const genToken = (user: User) => {
  return jwt.sign(
    { username: user.username, checkAdmin: user.isAdmin },
    process.env.JWT_SECRET || '',
    {
      expiresIn: '1y',
    }
  )
}

// const accessToken = jwt.sign({id: user._id,isAdmin: user.isAdmin,
//   },
//   process.env.JWT_SEC,
//       {expiresIn:"3d"}
//   );

// let refreshTokens = []

// const refreshToken = (users: User) => {
//   return jwt.sign({ name: users.username }, process.env.REFRESH_TOKEN_SECRET, {
//     expiresIn: '5m',
//   })
// }
// refreshTokens.push(refreshToken)

export default genToken
