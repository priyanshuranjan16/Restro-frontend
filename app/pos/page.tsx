'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import ProtectedRoute from '../components/ProtectedRoute';
import MenuGrid from './components/MenuGrid';
import POSCart from './components/POSCart';
import TableMap from './components/TableMap';
import CheckoutModal from './components/CheckoutModal';
import OrderHistory from './components/OrderHistory';
// @ts-ignore - socket.io-client types will be available after npm install
import { io, Socket } from 'socket.io-client';
import { initOfflineQueue, getQueuedOrders, removeQueuedOrder } from '../utils/offlineQueue';
import apiRequest from '../utils/api';

interface MenuItem {
  _id: string;
  name: string;
  price: number;
  description?: string;
  image?: string;
  categoryId: {
    _id: string;
    name: string;
  };
  modifierGroups?: any[];
}

interface CartItem {
  itemId: string;
  itemName: string;
  price: number;
  qty: number;
  modifiers?: any;
  notes?: string;
}

export default function POSPage() {
  const { user } = useAuth();
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedTable, setSelectedTable] = useState<string | null>(null);
  const [orderType, setOrderType] = useState<'dine-in' | 'takeaway'>('dine-in');
  const [showCheckout, setShowCheckout] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [socket, setSocket] = useState<Socket | null>(null);
  const [isOnline, setIsOnline] = useState(true);

  useEffect(() => {
    // Initialize offline queue
    initOfflineQueue();

    // Check online status
    setIsOnline(navigator.onLine);
    window.addEventListener('online', () => setIsOnline(true));
    window.addEventListener('offline', () => setIsOnline(false));

    // Initialize Socket.IO
    if (user?.id) {
      const newSocket = io(process.env.NEXT_PUBLIC_SOCKET_URL || 'http://localhost:5000', {
        transports: ['websocket'],
        auth: {
          token: typeof window !== 'undefined' ? localStorage.getItem('authToken') : null,
        },
      });

      newSocket.on('connect', () => {
        console.log('Connected to server');
        // Use user ID for kitchen room
        if (user?.id) {
          newSocket.emit('join-kitchen', user.id);
        }
      });

      newSocket.on('order:updated', (data: any) => {
        console.log('Order updated:', data);
        // Refresh orders if needed
      });

      setSocket(newSocket);

      return () => {
        newSocket.disconnect();
      };
    }
  }, [user]);

  useEffect(() => {
    // Retry queued orders when coming back online
    if (isOnline) {
      retryQueuedOrders();
    }
  }, [isOnline]);

  const retryQueuedOrders = async () => {
    const queued = await getQueuedOrders();
    for (const queuedOrder of queued) {
      try {
        await apiRequest('/orders', {
          method: 'POST',
          body: JSON.stringify(queuedOrder.payload),
        });
        await removeQueuedOrder(queuedOrder.id);
      } catch (error) {
        console.error('Failed to retry queued order:', error);
      }
    }
  };

  useEffect(() => {
    loadMenu();
    loadCategories();
  }, []);

  const loadMenu = async () => {
    try {
      const items = await apiRequest<MenuItem[]>('/menu');
      setMenuItems(items);
    } catch (error) {
      console.error('Error loading menu:', error);
    }
  };

  const loadCategories = async () => {
    try {
      const cats = await apiRequest<any[]>('/menu/categories');
      setCategories(cats);
    } catch (error) {
      console.error('Error loading categories:', error);
    }
  };

  const addToCart = (item: MenuItem, modifiers?: any, notes?: string) => {
    const existingIndex = cart.findIndex(
      (ci) => ci.itemId === item._id && JSON.stringify(ci.modifiers) === JSON.stringify(modifiers)
    );

    if (existingIndex >= 0) {
      const updated = [...cart];
      updated[existingIndex].qty += 1;
      setCart(updated);
    } else {
      setCart([
        ...cart,
        {
          itemId: item._id,
          itemName: item.name,
          price: item.price,
          qty: 1,
          modifiers,
          notes,
        },
      ]);
    }
  };

  const updateCartItem = (index: number, updates: Partial<CartItem>) => {
    const updated = [...cart];
    updated[index] = { ...updated[index], ...updates };
    setCart(updated);
  };

  const removeFromCart = (index: number) => {
    setCart(cart.filter((_, i) => i !== index));
  };

  const clearCart = () => {
    setCart([]);
    setSelectedTable(null);
  };

  const filteredMenu = menuItems.filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = !selectedCategory || item.categoryId._id === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <ProtectedRoute>
      <div className="h-screen flex flex-col bg-gray-50">
        {/* Header */}
        <div className="bg-white shadow-sm border-b px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h1 className="text-2xl font-bold text-gray-900">POS System</h1>
            {!isOnline && (
              <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm">
                Offline Mode
              </span>
            )}
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setShowHistory(!showHistory)}
              className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-gray-700 font-medium"
            >
              Order History
            </button>
            <div className="text-sm text-gray-600">
              {user?.firstName} {user?.lastName} ({user?.role})
            </div>
          </div>
        </div>

        <div className="flex-1 flex overflow-hidden">
          {/* Left Sidebar - Table Map / Menu Categories */}
          <div className="w-80 bg-white border-r flex flex-col">
            <div className="p-4 border-b">
              <div className="flex gap-2 mb-4">
                <button
                  onClick={() => {
                    setOrderType('dine-in');
                    setSelectedTable(null);
                  }}
                  className={`flex-1 px-4 py-2 rounded-lg font-medium ${
                    orderType === 'dine-in'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700'
                  }`}
                >
                  Dine-In
                </button>
                <button
                  onClick={() => {
                    setOrderType('takeaway');
                    setSelectedTable(null);
                  }}
                  className={`flex-1 px-4 py-2 rounded-lg font-medium ${
                    orderType === 'takeaway'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700'
                  }`}
                >
                  Takeaway
                </button>
              </div>
              {orderType === 'dine-in' && (
                <TableMap
                  selectedTable={selectedTable}
                  onSelectTable={setSelectedTable}
                />
              )}
            </div>
            <div className="flex-1 overflow-y-auto p-4">
              <h3 className="font-semibold text-gray-700 mb-3">Categories</h3>
              <div className="space-y-2">
                <button
                  onClick={() => setSelectedCategory(null)}
                  className={`w-full text-left px-3 py-2 rounded-lg ${
                    selectedCategory === null
                      ? 'bg-blue-100 text-blue-700 font-medium'
                      : 'hover:bg-gray-100 text-gray-700'
                  }`}
                >
                  All Items
                </button>
                {categories.map((cat) => (
                  <button
                    key={cat._id}
                    onClick={() => setSelectedCategory(cat._id)}
                    className={`w-full text-left px-3 py-2 rounded-lg ${
                      selectedCategory === cat._id
                        ? 'bg-blue-100 text-blue-700 font-medium'
                        : 'hover:bg-gray-100 text-gray-700'
                    }`}
                  >
                    {cat.name}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Main Content - Menu Grid */}
          <div className="flex-1 flex flex-col overflow-hidden">
            {/* Search Bar */}
            <div className="p-4 bg-white border-b">
              <input
                type="text"
                placeholder="Search menu items..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                autoFocus
              />
            </div>

            {/* Menu Grid */}
            <div className="flex-1 overflow-y-auto p-6">
              <MenuGrid
                items={filteredMenu}
                onAddToCart={addToCart}
              />
            </div>
          </div>

          {/* Right Sidebar - Cart */}
          <div className="w-96 bg-white border-l flex flex-col">
            <POSCart
              cart={cart}
              onUpdateItem={updateCartItem}
              onRemoveItem={removeFromCart}
              onClearCart={clearCart}
              onCheckout={() => setShowCheckout(true)}
              orderType={orderType}
              tableNumber={selectedTable}
            />
          </div>
        </div>

        {/* Modals */}
        {showCheckout && (
          <CheckoutModal
            cart={cart}
            orderType={orderType}
            tableNumber={selectedTable}
            onClose={() => setShowCheckout(false)}
            onSuccess={() => {
              clearCart();
              setShowCheckout(false);
            }}
          />
        )}

        {showHistory && (
          <OrderHistory
            onClose={() => setShowHistory(false)}
          />
        )}
      </div>
    </ProtectedRoute>
  );
}

