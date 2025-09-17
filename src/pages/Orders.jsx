import { useEffect, useState } from "react";
import axios from "axios";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (!user) return;

    const fetchOrders = async () => {
      try {
        const res = await axios.get("http://localhost:3000/orders");
        const userOrders = res.data.filter(
          (order) => order.customer.email === user.email
        );
        setOrders(userOrders);
      } catch (err) {
        console.error("Error fetching orders:", err);
      }
    };

    fetchOrders();
  }, [user]);

  if (!user)
    return (
      <p className="text-center mt-10 text-gray-600">
        Please sign in to view your orders.
      </p>
    );

  return (
    <div className="max-w-5xl mx-auto mt-20 p-6">
      <h1 className="text-3xl font-bold mb-8 text-center text-purple-600">
        My Orders
      </h1>

      {orders.length === 0 ? (
        <p className="text-gray-600 text-center">You have no orders yet.</p>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div
              key={order.reference}
              className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden"
            >
              {/* Header */}
              <div className="flex justify-between items-center px-6 py-4 bg-gray-50 border-b">
                <p className="font-semibold text-gray-800">
                  Order Ref: {order.reference}
                </p>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-bold ${
                    order.status === "paid"
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {order.status.toUpperCase()}
                </span>
              </div>

              {/* Body */}
              <div className="p-6 space-y-4">
                <div className="text-sm text-gray-600">
                  <p>Date: {new Date(order.date).toLocaleString()}</p>
                  <p>Total: ₦{order.total.toFixed(2)}</p>
                </div>

                {/* Items */}
                <div>
                  <h3 className="font-semibold mb-2 text-gray-800">
                    Items Ordered:
                  </h3>
                  <div className="divide-y divide-gray-200">
                    {order.items.map((item) => (
                      <div
                        key={item.id}
                        className="flex justify-between py-2 text-gray-700"
                      >
                        <span>{item.name}</span>
                        <span>Qty: {item.quantity || 1}</span>
                        <span>
                          ₦{(item.price * (item.quantity || 1)).toFixed(2)}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="px-6 py-3 bg-gray-50 border-t text-sm text-gray-500">
                Shipping to: {order.customer.address}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;

