import { Pencil, Trash2, Flame } from 'lucide-react';

function MealCard({ meal, onEdit, onDelete }) {
  return (
    <div className="group bg-white border border-slate-200 rounded-2xl p-5 hover:border-emerald-300 hover:shadow-md transition-all">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="font-display font-semibold text-slate-900">{meal.mealName}</h3>
          <p className="text-xs text-slate-400 mt-0.5">
            {new Date(meal.mealDate).toLocaleDateString('en-US', {
              weekday: 'short',
              month: 'short',
              day: 'numeric',
            })}
          </p>
        </div>

        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={() => onEdit(meal)}
            className="p-1.5 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"
          >
            <Pencil size={15} />
          </button>
          <button
            onClick={() => onDelete(meal.id)}
            className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
          >
            <Trash2 size={15} />
          </button>
        </div>
      </div>

      <div className="flex items-center gap-1.5 mt-3 mb-3">
        <Flame size={14} className="text-orange-400" />
        <span className="text-lg font-semibold text-slate-900">{Math.round(meal.calories)}</span>
        <span className="text-xs text-slate-400">calories</span>
      </div>

      <div className="grid grid-cols-4 gap-2 text-center">
        <MacroPill label="Protein" value={meal.protein} unit="g" />
        <MacroPill label="Carbs" value={meal.carbs} unit="g" />
        <MacroPill label="Fat" value={meal.fat} unit="g" />
        <MacroPill label="Fibre" value={meal.fibre} unit="g" />
      </div>
    </div>
  );
}

function MacroPill({ label, value, unit }) {
  return (
    <div className="bg-slate-50 rounded-lg py-1.5">
      <div className="text-sm font-medium text-slate-700">
        {value != null ? Math.round(value) : 0}
        {unit}
      </div>
      <div className="text-[10px] text-slate-400 uppercase tracking-wide">{label}</div>
    </div>
  );
}

export default MealCard;