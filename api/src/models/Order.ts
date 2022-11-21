import mongoose, { Document } from 'mongoose'

export type OrderDocument = Document & {
  userId: mongoose.Schema.Types.ObjectId
  products: mongoose.Schema.Types.ObjectId
  fullname: string
  address: string
  city: string
  postalcode: string
  country: string
  status: string
  total: number
  productname: string
  cartQuantity: number
  price: number
}

const orderSchema = new mongoose.Schema(
  {
    postalcode: { type: String, required: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    total: { type: Number },
    country: { type: String, required: true },
    status: { type: String, default: 'pending' },
    fullname: { type: String, required: true },
    products: [
      {
        productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
        productname: { type: String },
        cartQuantity: { type: Number },
        price: { type: Number },
      },
    ],
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  { timestamps: true }
)
export default mongoose.model<OrderDocument>('Order', orderSchema)
