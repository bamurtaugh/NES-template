import express, { Request, Response } from 'express';
import cors from 'cors';
import axios from 'axios';
import { User, Order, ApiResponse } from '../../shared/types';

const app = express();
const PORT = process.env.PORT || 3000;

// Service URLs
const USER_SERVICE_URL = process.env.USER_SERVICE_URL || 'http://localhost:5000';
const ORDER_SERVICE_URL = process.env.ORDER_SERVICE_URL || 'http://localhost:3001';

app.use(cors());
app.use(express.json());

// Health check
app.get('/health', (req: Request, res: Response) => {
  res.json({ status: 'healthy', service: 'api-gateway' });
});

// User routes - proxy to user-service
app.get('/api/users', async (req: Request, res: Response) => {
  try {
    const response = await axios.get(`${USER_SERVICE_URL}/users`);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to fetch users' });
  }
});

app.get('/api/users/:id', async (req: Request, res: Response) => {
  try {
    const response = await axios.get(`${USER_SERVICE_URL}/users/${req.params.id}`);
    res.json(response.data);
  } catch (error) {
    res.status(404).json({ success: false, error: 'User not found' });
  }
});

app.post('/api/users', async (req: Request, res: Response) => {
  try {
    const response = await axios.post(`${USER_SERVICE_URL}/users`, req.body);
    res.status(201).json(response.data);
  } catch (error) {
    res.status(400).json({ success: false, error: 'Failed to create user' });
  }
});

// Order routes - proxy to order-service
app.get('/api/orders', async (req: Request, res: Response) => {
  try {
    const response = await axios.get(`${ORDER_SERVICE_URL}/orders`);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to fetch orders' });
  }
});

app.get('/api/orders/:id', async (req: Request, res: Response) => {
  try {
    const response = await axios.get(`${ORDER_SERVICE_URL}/orders/${req.params.id}`);
    res.json(response.data);
  } catch (error) {
    res.status(404).json({ success: false, error: 'Order not found' });
  }
});

app.post('/api/orders', async (req: Request, res: Response) => {
  try {
    const response = await axios.post(`${ORDER_SERVICE_URL}/orders`, req.body);
    res.status(201).json(response.data);
  } catch (error) {
    res.status(400).json({ success: false, error: 'Failed to create order' });
  }
});

app.listen(PORT, () => {
  console.log(`API Gateway running on port ${PORT}`);
});
