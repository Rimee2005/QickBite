import { useSocket } from "@/hooks/useSocket"

export default function AdminDashboard() {
  const {
    isConnected,
    notifications,
    emitStatusUpdate,
  } = useSocket("admin")

  const handleStatusChange = (orderId: string, status: string, userId: string) => {
    emitStatusUpdate({ id: orderId, status, userId })
  }

  return (
    <div>
      <h1>🛠 Admin Panel - {isConnected ? "Connected" : "Disconnected"}</h1>
      {notifications.map((note) => (
        <div key={note.id}>
          <p>{note.message}</p>
        </div>
      ))}
    </div>
  )
}
