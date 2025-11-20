'use client';

import { useState } from 'react';
import PaymentWidget from './PaymentWidget';
import apiRequest from '../../utils/api';
import { queueOrder } from '../../utils/offlineQueue';

interface CartItem {
  itemId: string;
  itemName: string;
  price: number;
  qty: number;
  modifiers?: any;
  notes?: string;
}

interface CheckoutModalProps {
  cart: CartItem[];
  orderType: 'dine-in' | 'takeaway';
  tableNumber: string | null;
  onClose: () => void;
  onSuccess: () => void;
}

export default function CheckoutModal({
  cart,
  orderType,
  tableNumber,
  onClose,
  onSuccess,
}: CheckoutModalProps) {
  const [step, setStep] = useState<'order' | 'payment'>('order');
  const [orderId, setOrderId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [notes, setNotes] = useState('');
  const [discount, setDiscount] = useState(0);
  const [discountType, setDiscountType] = useState<'fixed' | 'percentage'>('fixed');

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const discountAmount = discountType === 'percentage' 
    ? (subtotal * discount) / 100 
    : discount;
  const tax = (subtotal - discountAmount) * 0.18;
  const total = subtotal - discountAmount + tax;

  const handleCreateOrder = async () => {
    if (orderType === 'dine-in' && !tableNumber) {
      setError('Please select a table');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const orderPayload = {
        items: cart.map(item => ({
          itemId: item.itemId,
          qty: item.qty,
          modifiers: item.modifiers,
          notes: item.notes,
        })),
        tableNumber: orderType === 'dine-in' ? tableNumber : undefined,
        orderType,
        notes,
        discount: discountAmount,
        discountType,
        taxRate: 18,
      };

      // Try to create order
      try {
        const order = await apiRequest('/orders', {
          method: 'POST',
          body: JSON.stringify(orderPayload),
        });
        //@ts-ignore
        setOrderId(order._id);
        setStep('payment');
      } catch (err: any) {
        // If offline, queue the order
        if (!navigator.onLine || err.message.includes('fetch')) {
          const idempotencyToken = await queueOrder(orderPayload);
          setError('Order queued for offline processing. Will be sent when connection is restored.');
          setTimeout(() => {
            onSuccess();
          }, 2000);
          return;
        }
        throw err;
      }
    } catch (err: any) {
      setError(err.message || 'Failed to create order');
    } finally {
      setLoading(false);
    }
  };

  if (step === 'payment' && orderId) {
    return (
      <PaymentWidget
        orderId={orderId}
        amount={total}
        onClose={onClose}
        onSuccess={onSuccess}
      />
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto m-4">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-gray-900">Review Order</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 text-2xl"
            >
              ×
            </button>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700">
              {error}
            </div>
          )}

          <div className="mb-4">
            <h3 className="font-semibold text-gray-700 mb-2">Order Summary</h3>
            <div className="space-y-2">
              {cart.map((item, index) => (
                <div key={index} className="flex justify-between text-sm">
                  <span>
                    {item.qty}x {item.itemName}
                  </span>
                  <span>₹{(item.price * item.qty).toFixed(2)}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Order Notes
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Add any special instructions for the kitchen..."
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={3}
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Discount
            </label>
            <div className="flex gap-2 mb-2">
              <select
                value={discountType}
                onChange={(e) => setDiscountType(e.target.value as 'fixed' | 'percentage')}
                className="px-3 py-2 border border-gray-300 rounded-lg"
              >
                <option value="fixed">Fixed (₹)</option>
                <option value="percentage">Percentage (%)</option>
              </select>
              <input
                type="number"
                value={discount}
                onChange={(e) => setDiscount(parseFloat(e.target.value) || 0)}
                min="0"
                max={discountType === 'percentage' ? 100 : subtotal}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg"
                placeholder={discountType === 'percentage' ? '0-100' : 'Amount'}
              />
            </div>
          </div>

          <div className="mb-4 p-4 bg-gray-50 rounded-lg">
            <div className="space-y-2">
              <div className="flex justify-between text-gray-700">
                <span>Subtotal</span>
                <span>₹{subtotal.toFixed(2)}</span>
              </div>
              {discountAmount > 0 && (
                <div className="flex justify-between text-gray-700">
                  <span>Discount</span>
                  <span className="text-green-600">-₹{discountAmount.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between text-gray-700">
                <span>Tax (18%)</span>
                <span>₹{tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-lg font-bold text-gray-900 pt-2 border-t">
                <span>Total</span>
                <span>₹{total.toFixed(2)}</span>
              </div>
            </div>
          </div>

          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 font-medium"
            >
              Cancel
            </button>
            <button
              onClick={handleCreateOrder}
              disabled={loading || cart.length === 0}
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Creating Order...' : 'Create Order & Proceed to Payment'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

