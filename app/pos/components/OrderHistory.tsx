'use client';

import { useState, useEffect } from 'react';
import apiRequest from '../../utils/api';

interface Order {
  _id: string;
  orderNumber: string;
  tableNumber?: string;
  status: string;
  totalAmount: number;
  createdAt: string;
  items: Array<{
    itemName: string;
    qty: number;
    price: number;
  }>;
}

interface OrderHistoryProps {
  onClose: () => void;
}

export default function OrderHistory({ onClose }: OrderHistoryProps) {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    try {
      setLoading(true);
      const data = await apiRequest<Order[]>('/orders?limit=50');
      setOrders(data);
    } catch (error) {
      console.error('Error loading orders:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleReprint = (order: Order) => {
    // Generate receipt HTML
    const receiptWindow = window.open('', '_blank');
    if (!receiptWindow) return;

    const receiptHTML = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Receipt - ${order.orderNumber}</title>
          <style>
            body { font-family: monospace; padding: 20px; max-width: 400px; margin: 0 auto; }
            .header { text-align: center; border-bottom: 2px solid #000; padding-bottom: 10px; margin-bottom: 20px; }
            .info { margin-bottom: 10px; }
            .items { margin: 20px 0; }
            .item { display: flex; justify-content: space-between; margin-bottom: 5px; }
            .total { border-top: 2px solid #000; padding-top: 10px; margin-top: 20px; font-weight: bold; }
            .footer { text-align: center; margin-top: 30px; font-size: 12px; }
          </style>
        </head>
        <body>
          <div class="header">
            <h2>RestroSphere</h2>
            <p>Order Receipt</p>
          </div>
          <div class="info">
            <p><strong>Order #:</strong> ${order.orderNumber}</p>
            <p><strong>Date:</strong> ${new Date(order.createdAt).toLocaleString()}</p>
            ${order.tableNumber ? `<p><strong>Table:</strong> ${order.tableNumber}</p>` : ''}
            <p><strong>Status:</strong> ${order.status}</p>
          </div>
          <div class="items">
            <h3>Items:</h3>
            ${order.items.map(item => `
              <div class="item">
                <span>${item.qty}x ${item.itemName}</span>
                <span>₹${(item.price * item.qty).toFixed(2)}</span>
              </div>
            `).join('')}
          </div>
          <div class="total">
            <p>Total: ₹${order.totalAmount.toFixed(2)}</p>
          </div>
          <div class="footer">
            <p>Thank you for your visit!</p>
          </div>
        </body>
      </html>
    `;

    receiptWindow.document.write(receiptHTML);
    receiptWindow.document.close();
    receiptWindow.print();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto m-4">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-gray-900">Order History</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 text-2xl"
            >
              ×
            </button>
          </div>

          {loading ? (
            <div className="text-center py-8 text-gray-500">Loading orders...</div>
          ) : orders.length === 0 ? (
            <div className="text-center py-8 text-gray-500">No orders found</div>
          ) : (
            <div className="space-y-3">
              {orders.map((order) => (
                <div
                  key={order._id}
                  className="border rounded-lg p-4 hover:bg-gray-50 cursor-pointer"
                  onClick={() => setSelectedOrder(order)}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-semibold text-gray-900">{order.orderNumber}</p>
                      <p className="text-sm text-gray-600">
                        {new Date(order.createdAt).toLocaleString()}
                      </p>
                      {order.tableNumber && (
                        <p className="text-sm text-gray-600">Table: {order.tableNumber}</p>
                      )}
                      <span className={`inline-block mt-2 px-2 py-1 rounded text-xs ${
                        order.status === 'completed' ? 'bg-green-100 text-green-800' :
                        order.status === 'preparing' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {order.status}
                      </span>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-gray-900">
                        ₹{order.totalAmount.toFixed(2)}
                      </p>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleReprint(order);
                        }}
                        className="mt-2 text-sm text-blue-600 hover:text-blue-800"
                      >
                        Print Receipt
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

