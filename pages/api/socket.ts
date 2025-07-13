// pages/api/socket.ts
import { NextApiRequest, NextApiResponse } from 'next'
import { Server as NetServer } from 'http'
import { Server as SocketIOServer } from 'socket.io'

export type NextApiResponseServerIO = NextApiResponse & {
  socket: {
    server: NetServer & {
      io: SocketIOServer
    }
  }
}

const initSocket = (server: NetServer) => {
  const io = new SocketIOServer(server, {
    path: '/api/socket',
    cors: {
      origin: process.env.NODE_ENV === 'production' 
        ? process.env.NEXTAUTH_URL 
        : 'http://localhost:3000',
      methods: ['GET', 'POST'],
    },
  })

  io.on('connection', (socket) => {
    console.log('🔌 Client connected:', socket.id)

    // Handle user joining rooms based on role
    socket.on('join-room', (room) => {
      socket.join(room)
      console.log(`👤 Socket ${socket.id} joined room: ${room}`)
    })

    // Handle new orders from customers
    socket.on('new-order', (orderData) => {
      console.log('🛒 New order received:', orderData)
      // Broadcast to all admin users
      socket.to('admin').emit('order-notification', {
        type: 'new-order',
        data: orderData,
        timestamp: new Date().toISOString(),
        message: `New order #${orderData.id} from ${orderData.customerName}`
      })
    })

    // Handle order status updates from admin
    socket.on('order-status-update', (updateData) => {
      console.log('📋 Order status update:', updateData)
      
      // Notify specific customer
      if (updateData.customerId) {
        socket.to(`customer-${updateData.customerId}`).emit('order-status-changed', {
          type: 'status-update',
          data: updateData,
          timestamp: new Date().toISOString(),
          message: getStatusMessage(updateData.status, updateData.orderId, updateData.estimatedTime)
        })
      }
      
      // Also notify all customers for general updates
      socket.to('customer').emit('order-status-changed', {
        type: 'status-update',
        data: updateData,
        timestamp: new Date().toISOString(),
        message: getStatusMessage(updateData.status, updateData.orderId, updateData.estimatedTime)
      })
    })

    // Handle admin messages
    socket.on('admin-message', (messageData) => {
      console.log('💬 Admin message:', messageData)
      socket.to('customer').emit('admin-message', {
        type: 'admin-message',
        data: messageData,
        timestamp: new Date().toISOString()
      })
    })

    socket.on('disconnect', () => {
      console.log('❌ Client disconnected:', socket.id)
    })
  })

  return io
}

function getStatusMessage(status: string, orderId: string, estimatedTime?: string) {
  switch (status) {
    case 'confirmed':
      return `Order #${orderId} confirmed!${estimatedTime ? ` Estimated time: ${estimatedTime} minutes` : ''}`
    case 'preparing':
      return `Order #${orderId} is being prepared`
    case 'ready':
      return `Order #${orderId} is ready for pickup! 🎉`
    case 'completed':
      return `Order #${orderId} has been completed`
    default:
      return `Order #${orderId} status updated to ${status}`
  }
}

export default function handler(req: NextApiRequest, res: NextApiResponseServerIO) {
  if (!res.socket.server.io) {
    console.log('🚀 Initializing Socket.IO server...')
    const io = initSocket(res.socket.server)
    res.socket.server.io = io
    console.log('✅ Socket.IO server initialized successfully')
  } else {
    console.log('⚡ Socket.IO server already running')
  }

  res.end()
}