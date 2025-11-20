'use client';

interface TableMapProps {
  selectedTable: string | null;
  onSelectTable: (tableNumber: string | null) => void;
}

export default function TableMap({ selectedTable, onSelectTable }: TableMapProps) {
  // Generate table numbers (1-20 for demo)
  const tables = Array.from({ length: 20 }, (_, i) => String(i + 1));

  return (
    <div>
      <h3 className="font-semibold text-gray-700 mb-3">Select Table</h3>
      <div className="grid grid-cols-4 gap-2">
        {tables.map((tableNum) => (
          <button
            key={tableNum}
            onClick={() => onSelectTable(selectedTable === tableNum ? null : tableNum)}
            className={`p-3 rounded-lg font-medium transition-colors ${
              selectedTable === tableNum
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {tableNum}
          </button>
        ))}
      </div>
      {selectedTable && (
        <button
          onClick={() => onSelectTable(null)}
          className="mt-3 w-full px-4 py-2 text-sm text-gray-600 hover:text-gray-800"
        >
          Clear Selection
        </button>
      )}
    </div>
  );
}

