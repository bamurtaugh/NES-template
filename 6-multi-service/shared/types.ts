// Shared types across all microservices
// These types demonstrate NES capabilities for cross-service type propagation

export interface User {
  id: string;
  email: string;
  name: string;
  createdAt: Date;
}

export interface Order {
  id: string;
  userId: string;
  items: OrderItem[];
  totalAmount: number;
  status: 'pending' | 'processing' | 'completed' | 'cancelled';
  createdAt: Date;
}

export interface OrderItem {
  productId: string;
  quantity: number;
  price: number;
}

export interface Notification {
  id: string;
  userId: string;
  type: 'order_created' | 'order_completed' | 'user_registered';
  message: string;
  sentAt: Date;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}
