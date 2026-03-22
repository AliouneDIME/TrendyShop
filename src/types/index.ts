export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  description: string;
  image: string;
  images?: string[];
  category: string;
  subcategory?: string;
  rating: number;
  reviewCount: number;
  badge?: 'new' | 'sale' | 'hot' | 'limited';
  stock: number;
  sku: string;
  tags: string[];
  features?: string[];
}

export interface CartItem extends Product {
  quantity: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  address?: Address;
}

export interface Address {
  street: string;
  city: string;
  country: string;
  postalCode: string;
}

export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  createdAt: string;
  shippingAddress: Address;
  paymentMethod: string;
  transactionId?: string;
}

export interface PaymentRequest {
  amount: number;
  currency: string;
  ref: string;
  item_name: string;
  item_price: number;
  command_name: string;
  success_url: string;
  cancel_url: string;
  ipn_url: string;
  env: 'test' | 'prod';
  payment_config: string;
  buyer_name?: string;
  buyer_phone?: string;
  buyer_email?: string;
  custom_field?: string;
}

export interface PayTechResponse {
  success: number;
  token?: string;
  redirect_url?: string;
  errors?: string[];
}

export interface Review {
  id: string;
  productId: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  createdAt: string;
  verified: boolean;
}

export interface FilterState {
  category: string;
  priceRange: [number, number];
  rating: number;
  sortBy: 'newest' | 'price-asc' | 'price-desc' | 'rating' | 'popular';
  badge?: string;
}

export interface Toast {
  id: string;
  type: 'success' | 'error' | 'info' | 'warning';
  message: string;
  duration?: number;
}
