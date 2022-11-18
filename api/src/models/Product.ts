import mongoose, { Document } from 'mongoose'

export type ProductDocument = Document & {
  name: string
  price: number
  description: string
  category: string
  images: string
  rating: number
  stock: number
  comments: string
}

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    price: {
      type: String,
    },
    description: {
      type: String,
    },
    category: {
      type: String,
      required: true,
    },
    images: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      default: 0,
    },

    stock: {
      type: Number,
      default: 1,
      required: true,
    },

    comments: {
      type: String,
      date: Date,
    },
  },
  { timestamps: true }
)

export default mongoose.model<ProductDocument>('Product', productSchema)
