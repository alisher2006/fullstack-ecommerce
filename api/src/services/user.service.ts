import User, { UserDocument } from '../models/User'
import { NotFoundError } from '../helpers/apiError'

const create = async (user: UserDocument): Promise<UserDocument> => {
  return user.save()
}

const findById = async (userId: string): Promise<UserDocument> => {
  const foundUser = await User.findById(userId)

  if (!foundUser) {
    throw new NotFoundError(`User ${userId} not found`)
  }

  return foundUser
}

const findByName = async (username: string): Promise<UserDocument> => {
  //   // const foundUser = await User.find({ name: { username: 'username' }
  const foundUser = await User.findOne({ username })
  //.then(err, result) {console.log(result)};  $or: [{ email: req.body.email }, { username: req.body.username }]

  if (!foundUser) {
    throw new NotFoundError('User not found')
  }
  return foundUser
}

const findAll = async (): Promise<UserDocument[]> => {
  return User.find().sort({ name: 1, publishedYear: -1 })
}

const update = async (
  userId: string,
  update: Partial<UserDocument>
): Promise<UserDocument | null> => {
  const foundUser = await User.findByIdAndUpdate(userId, update, {
    new: true,
  })

  if (!foundUser) {
    throw new NotFoundError(`User ${userId} not found`)
  }

  return foundUser
}

const deleteUser = async (userId: string): Promise<UserDocument | null> => {
  const foundUser = User.findByIdAndDelete(userId)

  if (!foundUser) {
    throw new NotFoundError(`User ${userId} not found`)
  }

  return foundUser
}

export default {
  create,
  findById,
  findAll,
  update,
  findByName,
  deleteUser,
}
