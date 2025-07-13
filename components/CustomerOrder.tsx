import { useSocket } from "@/hooks/useSocket"

export default function CustomerPage() {
  const {
    isConnected,
    emitNewOrder,
    notifications,
  } = useSocket("customer", "user123")

  const handlePlaceOrder = () => {
    emitNewOrder({
      id: Date.now().toString(),
      item: "Chowmein",
      status: "Pending",
      userId: "user123",
    })
  }

  return (
    <div>
      <h1>🍜 Place Order</h1>
      <button onClick={handlePlaceOrder}>Order Now</button>
      {notifications.map((note) => (
        <div key={note.id}>
          <p>{note.message}</p>
        </div>
      ))}
    </div>
  )
}
