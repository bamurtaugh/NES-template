const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3002;

app.use(cors());
app.use(express.json());

// In-memory storage for notifications
const notifications = [];

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'healthy', service: 'notification-service' });
});

// Get all notifications
app.get('/notifications', (req, res) => {
  res.json({
    success: true,
    data: notifications
  });
});

// Get notifications for a specific user
app.get('/notifications/user/:userId', (req, res) => {
  const userNotifications = notifications.filter(
    n => n.userId === req.params.userId
  );
  
  res.json({
    success: true,
    data: userNotifications
  });
});

// Receive notification webhook
app.post('/notifications', (req, res) => {
  const { userId, type, message } = req.body;
  
  if (!userId || !type || !message) {
    return res.status(400).json({
      success: false,
      error: 'userId, type, and message are required'
    });
  }
  
  const notification = {
    id: `notif-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    userId,
    type,
    message,
    sentAt: new Date().toISOString()
  };
  
  notifications.push(notification);
  
  console.log(`📧 Notification sent: ${type} to user ${userId}`);
  
  res.status(201).json({
    success: true,
    data: notification
  });
});

app.listen(PORT, () => {
  console.log(`Notification Service running on port ${PORT}`);
});
