import express, { Request, Response } from 'express';
import cors from 'cors';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { Order, ApiResponse } from '../../shared/types';

const app = express();
const PORT = process.env.PORT || 3001;

// Service URLs
const USER_SERVICE_URL = process.env.USER_SERVICE_URL || 'http://localhost:5000';
const NOTIFICATION_SERVICE_URL = process.env.NOTIFICATION_SERVICE_URL || 'http://localhost:3002';

app.use(cors());
app.use(express.json());

// In-memory storage
const orders: Map<string, Order> = new Map();

// Health check
app.get('/health', (req: Request, res: Response) => {
  res.json({ status: 'healthy', service: 'order-service' });
});

// Get all orders
app.get('/orders', (req: Request, res: Response) => {
  const allOrders = Array.from(orders.values());
  res.json({
    success: true,
    data: allOrders
  });
});

// Get order by ID
app.get('/orders/:id', (req: Request, res: Response) => {
  const order = orders.get(req.params.id);
  
  if (!order) {
    return res.status(404).json({
      success: false,
      error: 'Order not found'
    });
  }
  
  res.json({
    success: true,
    data: order
  });
});

// Create new order
app.post('/orders', async (req: Request, res: Response) => {
  try {
    const { userId, items } = req.body;
    
    if (!userId || !items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({
        success: false,
        error: 'userId and items array are required'
      });
    }
    
    // Verify user exists
    try {
      await axios.get(`${USER_SERVICE_URL}/users/${userId}`);
    } catch (error) {
      return res.status(400).json({
        success: false,
        error: 'User not found'
      });
    }
    
    // Calculate total amount
    const totalAmount = items.reduce((sum: number, item: any) => {
      return sum + (item.price * item.quantity);
    }, 0);
    
    const order: Order = {
      id: uuidv4(),
      userId,
      items,
      totalAmount,
      status: 'pending',
      createdAt: new Date()
    };
    
    orders.set(order.id, order);
    
    // Notify notification service (fire and forget)
    axios.post(`${NOTIFICATION_SERVICE_URL}/notifications`, {
      userId,
      type: 'order_created',
      message: `Order ${order.id} created successfully`
    }).catch(err => console.error('Failed to send notification:', err.message));
    
    res.status(201).json({
      success: true,
      data: order
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to create order'
    });
  }
});

// Update order status
app.patch('/orders/:id/status', (req: Request, res: Response) => {
  const order = orders.get(req.params.id);
  
  if (!order) {
    return res.status(404).json({
      success: false,
      error: 'Order not found'
    });
  }
  
  const { status } = req.body;
  const validStatuses = ['pending', 'processing', 'completed', 'cancelled'];
  
  if (!validStatuses.includes(status)) {
    return res.status(400).json({
      success: false,
      error: 'Invalid status'
    });
  }
  
  order.status = status;
  
  // Notify if completed
  if (status === 'completed') {
    axios.post(`${NOTIFICATION_SERVICE_URL}/notifications`, {
      userId: order.userId,
      type: 'order_completed',
      message: `Order ${order.id} has been completed`
    }).catch(err => console.error('Failed to send notification:', err.message));
  }
  
  res.json({
    success: true,
    data: order
  });
});

app.listen(PORT, () => {
  console.log(`Order Service running on port ${PORT}`);
});
