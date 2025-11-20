'use client';

interface CartItem {
  itemId: string;
  itemName: string;
  price: number;
  qty: number;
  modifiers?: any;
  notes?: string;
}

interface POSCartProps {
  cart: CartItem[];
  onUpdateItem: (index: number, updates: Partial<CartItem>) => void;
  onRemoveItem: (index: number) => void;
  onClearCart: () => void;
  onCheckout: () => void;
  orderType: 'dine-in' | 'takeaway';
  tableNumber: string | null;
}

export default function POSCart({
  cart,
  onUpdateItem,
  onRemoveItem,
  onClearCart,
  onCheckout,
  orderType,
  tableNumber,
}: POSCartProps) {
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const tax = subtotal * 0.18; // 18% GST
  const total = subtotal + tax;

  return (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b">
        <h2 className="text-xl font-bold text-gray-900">Cart</h2>
        {orderType === 'dine-in' && (
          <p className="text-sm text-gray-600 mt-1">
            Table: {tableNumber || 'Not selected'}
          </p>
        )}
        {orderType === 'takeaway' && (
          <p className="text-sm text-gray-600 mt-1">Takeaway Order</p>
        )}
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        {cart.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-gray-500">
            <span className="text-6xl mb-4">🛒</span>
            <p className="text-lg">Cart is empty</p>
            <p className="text-sm mt-2">Add items from the menu</p>
          </div>
        ) : (
          <div className="space-y-3">
            {cart.map((item, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-3">
                <div className="flex justify-between items-start mb-2">
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">{item.itemName}</h3>
                    {item.notes && (
                      <p className="text-xs text-gray-600 mt-1 italic">
                        Note: {item.notes}
                      </p>
                    )}
                    {item.modifiers && Object.keys(item.modifiers).length > 0 && (
                      <div className="text-xs text-gray-600 mt-1">
                        {Object.entries(item.modifiers).map(([group, mods]: [string, any]) => (
                          <div key={group}>
                            {group}: {Array.isArray(mods) ? mods.map((m: any) => m.name).join(', ') : ''}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  <button
                    onClick={() => onRemoveItem(index)}
                    className="text-red-500 hover:text-red-700 ml-2"
                  >
                    ×
                  </button>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onUpdateItem(index, { qty: Math.max(1, item.qty - 1) })}
                      className="w-8 h-8 rounded-lg border border-gray-300 hover:bg-gray-200 flex items-center justify-center"
                    >
                      −
                    </button>
                    <span className="w-12 text-center font-medium">{item.qty}</span>
                    <button
                      onClick={() => onUpdateItem(index, { qty: item.qty + 1 })}
                      className="w-8 h-8 rounded-lg border border-gray-300 hover:bg-gray-200 flex items-center justify-center"
                    >
                      +
                    </button>
                  </div>
                  <span className="font-semibold text-gray-900">
                    ₹{(item.price * item.qty).toFixed(2)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {cart.length > 0 && (
        <div className="border-t p-4 bg-white">
          <div className="space-y-2 mb-4">
            <div className="flex justify-between text-gray-700">
              <span>Subtotal</span>
              <span>₹{subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-gray-700">
              <span>Tax (18%)</span>
              <span>₹{tax.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-lg font-bold text-gray-900 pt-2 border-t">
              <span>Total</span>
              <span>₹{total.toFixed(2)}</span>
            </div>
          </div>
          <div className="flex gap-2">
            <button
              onClick={onClearCart}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 font-medium"
            >
              Clear
            </button>
            <button
              onClick={onCheckout}
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
            >
              Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

