'use client';

import { useState } from 'react';
import apiRequest from '../../utils/api';

interface PaymentWidgetProps {
  orderId: string;
  amount: number;
  onClose: () => void;
  onSuccess: () => void;
}

export default function PaymentWidget({
  orderId,
  amount,
  onClose,
  onSuccess,
}: PaymentWidgetProps) {
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'upi' | 'cash' | null>(null);
  const [processing, setProcessing] = useState(false);
  const [transactionId, setTransactionId] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handlePayment = async () => {
    if (!paymentMethod) {
      setError('Please select a payment method');
      return;
    }

    setProcessing(true);
    setError(null);

    try {
      // Generate mock transaction ID
      const mockTransactionId = paymentMethod === 'cash' 
        ? `CASH-${Date.now()}`
        : `${paymentMethod.toUpperCase()}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

      await apiRequest(`/orders/${orderId}/payment`, {
        method: 'POST',
        body: JSON.stringify({
          method: paymentMethod,
          amount,
          transactionId: paymentMethod !== 'cash' ? mockTransactionId : undefined,
        }),
      });

      // Show success message
      alert(`Payment successful! Transaction ID: ${mockTransactionId}`);
      onSuccess();
    } catch (err: any) {
      setError(err.message || 'Payment failed');
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg max-w-md w-full m-4">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-gray-900">Payment</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 text-2xl"
            >
              ×
            </button>
          </div>

          <div className="mb-6">
            <p className="text-sm text-gray-600 mb-1">Order ID</p>
            <p className="font-mono text-sm text-gray-900">{orderId}</p>
          </div>

          <div className="mb-6">
            <p className="text-sm text-gray-600 mb-1">Amount to Pay</p>
            <p className="text-3xl font-bold text-gray-900">₹{amount.toFixed(2)}</p>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700">
              {error}
            </div>
          )}

          <div className="mb-6">
            <p className="text-sm font-medium text-gray-700 mb-3">Select Payment Method</p>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => setPaymentMethod('card')}
                className={`p-4 border-2 rounded-lg text-center transition-colors ${
                  paymentMethod === 'card'
                    ? 'border-blue-600 bg-blue-50'
                    : 'border-gray-300 hover:border-gray-400'
                }`}
              >
                <div className="text-3xl mb-2">💳</div>
                <div className="font-medium text-gray-900">Card</div>
              </button>
              <button
                onClick={() => setPaymentMethod('upi')}
                className={`p-4 border-2 rounded-lg text-center transition-colors ${
                  paymentMethod === 'upi'
                    ? 'border-blue-600 bg-blue-50'
                    : 'border-gray-300 hover:border-gray-400'
                }`}
              >
                <div className="text-3xl mb-2">📱</div>
                <div className="font-medium text-gray-900">UPI</div>
              </button>
              <button
                onClick={() => setPaymentMethod('cash')}
                className={`p-4 border-2 rounded-lg text-center transition-colors ${
                  paymentMethod === 'cash'
                    ? 'border-blue-600 bg-blue-50'
                    : 'border-gray-300 hover:border-gray-400'
                }`}
              >
                <div className="text-3xl mb-2">💵</div>
                <div className="font-medium text-gray-900">Cash</div>
              </button>
            </div>
          </div>

          {paymentMethod && (
            <div className="mb-6 p-4 bg-blue-50 rounded-lg">
              <p className="text-sm text-gray-700">
                {paymentMethod === 'card' && '💳 Card payment will be processed via payment gateway'}
                {paymentMethod === 'upi' && '📱 UPI payment will be processed via QR code scan'}
                {paymentMethod === 'cash' && '💵 Cash payment - collect from customer'}
              </p>
            </div>
          )}

          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 font-medium"
            >
              Cancel
            </button>
            <button
              onClick={handlePayment}
              disabled={!paymentMethod || processing}
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {processing ? 'Processing...' : 'Process Payment'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

