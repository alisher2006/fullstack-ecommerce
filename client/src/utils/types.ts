export type ProductsTS = {
  name: string;
  price: number;
  description: string;
  category: string;
  images: string;
  rating: number;
  stock: number;
  comments: string;
  cartQuantity: number;
  total: number;
  _id: Object;
};

export type ProductTS = {
  _id: Object;
  name: string;
  price: number;
  description: string;
  images: string;
  rating: number;
  stock: number;
  comments: string;
};

export type UserTS = {
  _id: Object;
  name: string;
  isAdmin: boolean;
  email?: string;
  password?: string;
};

export type OrderTS = {
  _id: Object;
  postalcode: string;
  address: string;
  country: string;
  status: string;
  fullname: string;
  city: string;
  product: [];
};
