import { useState, useEffect } from 'react';
import { getGroceryLists, toggleGroceryItem } from '../api/groceryApi';
import { ShoppingCart, Check } from 'lucide-react';

function GroceryListPage() {
  const [lists, setLists] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadLists = async () => {
    setIsLoading(true);
    try {
      const result = await getGroceryLists();
      setLists(result.content);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadLists();
  }, []);

  const handleToggle = async (listId, itemId) => {
    const updatedItem = await toggleGroceryItem(listId, itemId);
    setLists((prevLists) =>
      prevLists.map((list) =>
        list.id !== listId
          ? list
          : {
              ...list,
              items: list.items.map((item) => (item.id === itemId ? updatedItem : item)),
            }
      )
    );
  };

  return (
    <div>
      <h1 className="text-2xl font-display font-semibold text-slate-900 mb-6">Grocery Lists</h1>

      {isLoading ? (
        <div className="text-slate-400 text-sm">Loading...</div>
      ) : lists.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <ShoppingCart size={40} className="text-slate-300 mb-3" />
          <p className="text-slate-500 font-medium">No grocery lists yet</p>
          <p className="text-slate-400 text-sm mt-1">
            Generate one from a recipe on the Recipes page
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {lists.map((list) => {
            const purchasedCount = list.items.filter((i) => i.purchased).length;
            return (
              <div key={list.id} className="bg-white border border-slate-200 rounded-2xl p-5">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-display font-semibold text-slate-900">
                    {list.recipeTitle || 'Grocery List'}
                  </h3>
                  <span className="text-xs text-slate-400">
                    {purchasedCount}/{list.items.length}
                  </span>
                </div>
                <p className="text-xs text-slate-400 mb-4">
                  {new Date(list.generatedDate).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric',
                  })}
                </p>

                <ul className="space-y-2">
                  {list.items.map((item) => (
                    <li key={item.id}>
                      <button
                        onClick={() => handleToggle(list.id, item.id)}
                        className="flex items-center gap-3 w-full text-left group"
                      >
                        <span
                          className={`flex items-center justify-center w-5 h-5 rounded border shrink-0 transition-colors ${
                            item.purchased
                              ? 'bg-emerald-600 border-emerald-600'
                              : 'border-slate-300 group-hover:border-emerald-400'
                          }`}
                        >
                          {item.purchased && <Check size={13} className="text-white" />}
                        </span>
                        <span
                          className={`text-sm ${
                            item.purchased ? 'line-through text-slate-400' : 'text-slate-700'
                          }`}
                        >
                          {item.itemName}
                          {item.quantity && (
                            <span className="text-slate-400">
                              {' '}
                              — {item.quantity} {item.unit}
                            </span>
                          )}
                        </span>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default GroceryListPage;