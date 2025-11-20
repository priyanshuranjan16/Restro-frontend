'use client';

import { useState } from 'react';

interface MenuItem {
  _id: string;
  name: string;
  price: number;
  modifierGroups?: Array<{
    name: string;
    minSelection: number;
    maxSelection: number;
    modifiers: Array<{
      name: string;
      price: number;
      isRequired?: boolean;
    }>;
  }>;
}

interface ModifierModalProps {
  item: MenuItem;
  onClose: () => void;
  onAdd: (modifiers: any, notes?: string) => void;
}

export default function ModifierModal({ item, onAdd, onClose }: ModifierModalProps) {
  const [selectedModifiers, setSelectedModifiers] = useState<Record<string, string[]>>({});
  const [notes, setNotes] = useState('');

  const handleModifierToggle = (groupName: string, modifierName: string) => {
    const current = selectedModifiers[groupName] || [];
    const isSelected = current.includes(modifierName);
    
    const group = item.modifierGroups?.find(g => g.name === groupName);
    if (!group) return;

    let updated: string[];
    if (isSelected) {
      updated = current.filter(m => m !== modifierName);
    } else {
      if (group.maxSelection === 1) {
        updated = [modifierName];
      } else if (current.length < group.maxSelection) {
        updated = [...current, modifierName];
      } else {
        return; // Max selection reached
      }
    }

    setSelectedModifiers({
      ...selectedModifiers,
      [groupName]: updated,
    });
  };

  const canAdd = () => {
    if (!item.modifierGroups) return true;
    
    return item.modifierGroups.every(group => {
      const selected = selectedModifiers[group.name] || [];
      return selected.length >= group.minSelection;
    });
  };

  const calculateModifierPrice = () => {
    let total = 0;
    item.modifierGroups?.forEach(group => {
      const selected = selectedModifiers[group.name] || [];
      selected.forEach(modName => {
        const modifier = group.modifiers.find(m => m.name === modName);
        if (modifier) total += modifier.price;
      });
    });
    return total;
  };

  const handleAdd = () => {
    if (!canAdd()) return;
    
    // Format modifiers for backend
    const formattedModifiers: Record<string, any[]> = {};
    item.modifierGroups?.forEach(group => {
      const selected = selectedModifiers[group.name] || [];
      formattedModifiers[group.name] = selected.map(modName => {
        const modifier = group.modifiers.find(m => m.name === modName);
        return {
          name: modName,
          price: modifier?.price || 0,
        };
      });
    });
    
    onAdd(formattedModifiers, notes);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto m-4">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-gray-900">{item.name}</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 text-2xl"
            >
              ×
            </button>
          </div>

          <div className="mb-4">
            <p className="text-lg font-semibold text-gray-700">
              Base Price: ₹{item.price.toFixed(2)}
            </p>
            {calculateModifierPrice() > 0 && (
              <p className="text-sm text-gray-600">
                Modifiers: +₹{calculateModifierPrice().toFixed(2)}
              </p>
            )}
            <p className="text-xl font-bold text-blue-600 mt-2">
              Total: ₹{(item.price + calculateModifierPrice()).toFixed(2)}
            </p>
          </div>

          {item.modifierGroups && item.modifierGroups.length > 0 && (
            <div className="space-y-4 mb-4">
              {item.modifierGroups.map((group) => {
                const selected = selectedModifiers[group.name] || [];
                return (
                  <div key={group.name} className="border rounded-lg p-4">
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="font-semibold text-gray-900">{group.name}</h3>
                      <span className="text-sm text-gray-600">
                        {group.minSelection > 0 && `Select ${group.minSelection}-${group.maxSelection}`}
                        {group.minSelection === 0 && `Optional (max ${group.maxSelection})`}
                      </span>
                    </div>
                    <div className="space-y-2">
                      {group.modifiers.map((modifier) => {
                        const isSelected = selected.includes(modifier.name);
                        const isDisabled = !isSelected && selected.length >= group.maxSelection;
                        
                        return (
                          <label
                            key={modifier.name}
                            className={`flex items-center justify-between p-2 rounded-lg border cursor-pointer ${
                              isSelected
                                ? 'bg-blue-50 border-blue-500'
                                : isDisabled
                                ? 'opacity-50 cursor-not-allowed'
                                : 'hover:bg-gray-50'
                            }`}
                          >
                            <div className="flex items-center gap-2">
                              <input
                                type={group.maxSelection === 1 ? 'radio' : 'checkbox'}
                                checked={isSelected}
                                onChange={() => handleModifierToggle(group.name, modifier.name)}
                                disabled={isDisabled}
                                className="w-4 h-4"
                                name={group.maxSelection === 1 ? group.name : undefined}
                              />
                              <span className="text-gray-900">{modifier.name}</span>
                            </div>
                            {modifier.price > 0 && (
                              <span className="text-sm font-medium text-gray-700">
                                +₹{modifier.price.toFixed(2)}
                              </span>
                            )}
                          </label>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Special Instructions
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Add any special instructions..."
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={3}
            />
          </div>

          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 font-medium"
            >
              Cancel
            </button>
            <button
              onClick={handleAdd}
              disabled={!canAdd()}
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

