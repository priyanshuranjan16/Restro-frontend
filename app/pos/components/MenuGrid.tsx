'use client';

import { useState } from 'react';
import ModifierModal from './ModifierModal';

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

interface MenuGridProps {
  items: MenuItem[];
  onAddToCart: (item: MenuItem, modifiers?: any, notes?: string) => void;
}

export default function MenuGrid({ items, onAddToCart }: MenuGridProps) {
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const [showModifiers, setShowModifiers] = useState(false);

  const handleItemClick = (item: MenuItem) => {
    if (item.modifierGroups && item.modifierGroups.length > 0) {
      setSelectedItem(item);
      setShowModifiers(true);
    } else {
      onAddToCart(item);
    }
  };

  if (items.length === 0) {
    return (
      <div className="flex items-center justify-center h-full text-gray-500">
        <div className="text-center">
          <p className="text-lg">No items found</p>
          <p className="text-sm mt-2">Try adjusting your search or category filter</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {items.map((item) => (
          <button
            key={item._id}
            onClick={() => handleItemClick(item)}
            className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow p-4 text-left group"
          >
            {item.image ? (
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-32 object-cover rounded-lg mb-3"
              />
            ) : (
              <div className="w-full h-32 bg-gray-200 rounded-lg mb-3 flex items-center justify-center">
                <span className="text-4xl">🍽️</span>
              </div>
            )}
            <h3 className="font-semibold text-gray-900 mb-1 group-hover:text-blue-600">
              {item.name}
            </h3>
            {item.description && (
              <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                {item.description}
              </p>
            )}
            <p className="text-lg font-bold text-blue-600">
              ₹{item.price.toFixed(2)}
            </p>
          </button>
        ))}
      </div>

      {showModifiers && selectedItem && (
        <ModifierModal
          item={selectedItem}
          onClose={() => {
            setShowModifiers(false);
            setSelectedItem(null);
          }}
          onAdd={(modifiers, notes) => {
            onAddToCart(selectedItem, modifiers, notes);
            setShowModifiers(false);
            setSelectedItem(null);
          }}
        />
      )}
    </>
  );
}

