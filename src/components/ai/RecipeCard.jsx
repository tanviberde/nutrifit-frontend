import { useState } from 'react';
import { RefreshCw, ShoppingCart, ChevronDown, ChevronUp } from 'lucide-react';

function RecipeCard({ recipe, onRegenerate, onCreateGroceryList, isRegenerating }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-5 hover:shadow-md transition-shadow">
      <h3 className="font-display font-semibold text-lg text-slate-900">{recipe.title}</h3>
      <p className="text-sm text-slate-500 mt-1">{recipe.description}</p>

      <div className="grid grid-cols-4 gap-2 mt-4">
        <MacroPill label="Cal" value={recipe.calories} />
        <MacroPill label="Protein" value={recipe.protein} unit="g" />
        <MacroPill label="Carbs" value={recipe.carbs} unit="g" />
        <MacroPill label="Fat" value={recipe.fat} unit="g" />
      </div>

      <button
        onClick={() => setExpanded(!expanded)}
        className="flex items-center gap-1 text-sm text-emerald-600 font-medium mt-4"
      >
        {expanded ? 'Hide ingredients' : `Show ingredients (${recipe.ingredients.length})`}
        {expanded ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
      </button>

      {expanded && (
        <ul className="mt-3 space-y-1.5">
          {recipe.ingredients.map((ing) => (
            <li key={ing.id} className="text-sm text-slate-600 flex justify-between">
              <span>{ing.ingredientName}</span>
              <span className="text-slate-400">
                {ing.quantity} {ing.unit}
              </span>
            </li>
          ))}
        </ul>
      )}

      <div className="flex gap-2 mt-5">
        <button
          onClick={() => onRegenerate(recipe.id)}
          disabled={isRegenerating}
          className="flex-1 flex items-center justify-center gap-1.5 text-sm font-medium text-slate-600 border border-slate-200 rounded-lg py-2 hover:bg-slate-50 disabled:opacity-50 transition-colors"
        >
          <RefreshCw size={14} className={isRegenerating ? 'animate-spin' : ''} />
          {isRegenerating ? 'Regenerating...' : 'Regenerate'}
        </button>
        <button
          onClick={() => onCreateGroceryList(recipe.id)}
          className="flex-1 flex items-center justify-center gap-1.5 text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg py-2 transition-colors"
        >
          <ShoppingCart size={14} />
          Grocery List
        </button>
      </div>
    </div>
  );
}

function MacroPill({ label, value, unit = '' }) {
  return (
    <div className="bg-slate-50 rounded-lg py-1.5 text-center">
      <div className="text-sm font-semibold text-slate-800">
        {value != null ? Math.round(value) : 0}
        {unit}
      </div>
      <div className="text-[10px] text-slate-400 uppercase tracking-wide">{label}</div>
    </div>
  );
}

export default RecipeCard;