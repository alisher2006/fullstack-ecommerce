import mongoose, { Document } from 'mongoose'

export type UserDocument = Document & {
  username: string
  email: number
  password: string
  isAdmin: boolean
  token: string
}

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      lowercase: true,
      unique: true,
      required: [true, 'can\'t be blank'],
      match: [/\S+@\S+\.\S+/, 'is invalid'],
      index: true,
    },

    password: {
      type: String,
      required: true,
      //  select: false,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    token: { type: String },
  },
  { timestamps: true }
)

export default mongoose.model<UserDocument>('User', userSchema)
