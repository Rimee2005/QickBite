import { useEffect, useRef, useState } from 'react'
import { io, Socket } from 'socket.io-client'

interface SocketNotification {
  id: string
  type: 'new-order' | 'status-update' | 'admin-message' | 'info'
  message: string
  data?: any
  timestamp: string
}

export const useSocket = (userRole?: 'admin' | 'customer', userId?: string) => {
  const [socket, setSocket] = useState<Socket | null>(null)
  const [isConnected, setIsConnected] = useState(false)
  const [notifications, setNotifications] = useState<SocketNotification[]>([])
  const socketRef = useRef<Socket | null>(null)

  useEffect(() => {
    const socketInstance = io(
      process.env.NODE_ENV === 'production'
        ? process.env.NEXTAUTH_URL || window.location.origin
        : 'http://localhost:3000',
      {
        path: '/api/socket',
        transports: ['websocket', 'polling'],
      }
    )

    socketRef.current = socketInstance
    setSocket(socketInstance)

    socketInstance.on('connect', () => {
      setIsConnected(true)
      console.log('🔌 Connected to socket')

      if (userRole === 'admin') {
        socketInstance.emit('join-room', 'admin')
      } else if (userRole === 'customer') {
        socketInstance.emit('join-room', 'customer')
        if (userId) {
          socketInstance.emit('join-room', `customer-${userId}`)
        }
      }
    })

    socketInstance.on('disconnect', () => {
      console.log('❌ Disconnected from socket')
      setIsConnected(false)
    })

    socketInstance.on('connect_error', (error) => {
      console.error('🔥 Connection error:', error)
      setIsConnected(false)
    })

    socketInstance.on('order-notification', (data) => {
      addNotification({
        id: Date.now().toString(),
        type: 'new-order',
        message: data.message,
        data: data.data,
        timestamp: data.timestamp
      })
    })

    socketInstance.on('order-status-changed', (data) => {
      addNotification({
        id: Date.now().toString(),
        type: 'status-update',
        message: data.message,
        data: data.data,
        timestamp: data.timestamp
      })
    })

    socketInstance.on('admin-message', (data) => {
      addNotification({
        id: Date.now().toString(),
        type: 'admin-message',
        message: data.message || 'New message from admin',
        data: data.data,
        timestamp: data.timestamp
      })
    })

    return () => {
      socketInstance.disconnect()
    }
  }, [userRole, userId])

  const addNotification = (notification: SocketNotification) => {
    setNotifications((prev: SocketNotification[]) => [
      notification,
      ...prev.slice(0, 9)
    ])

    setTimeout(() => {
      setNotifications((prev: SocketNotification[]) =>
        prev.filter((n: SocketNotification) => n.id !== notification.id)
      )
    }, 5000)
  }

  const emitNewOrder = (orderData: any) => {
    if (socketRef.current?.connected) {
      socketRef.current.emit('new-order', orderData)
    }
  }

  const emitStatusUpdate = (updateData: any) => {
    if (socketRef.current?.connected) {
      socketRef.current.emit('order-status-update', updateData)
    }
  }

  const sendAdminMessage = (messageData: any) => {
    if (socketRef.current?.connected) {
      socketRef.current.emit('admin-message', messageData)
    }
  }

  const clearNotifications = () => {
    setNotifications([])
  }

  const removeNotification = (id: string) => {
    setNotifications((prev: SocketNotification[]) =>
      prev.filter((n: SocketNotification) => n.id !== id)
    )
  }

  return {
    socket,
    isConnected,
    notifications,
    emitNewOrder,
    emitStatusUpdate,
    sendAdminMessage,
    clearNotifications,
    removeNotification,
  }
}
