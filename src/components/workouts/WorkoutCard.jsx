import { Pencil, Trash2, Zap, Clock } from 'lucide-react';

function WorkoutCard({ workout, onEdit, onDelete }) {
  return (
    <div className="group bg-white border border-slate-200 rounded-2xl p-5 hover:border-emerald-300 hover:shadow-md transition-all">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="font-display font-semibold text-slate-900">{workout.workoutName}</h3>
          <p className="text-xs text-slate-400 mt-0.5">
            {new Date(workout.workoutDate).toLocaleDateString('en-US', {
              weekday: 'short',
              month: 'short',
              day: 'numeric',
            })}
          </p>
        </div>

        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={() => onEdit(workout)}
            className="p-1.5 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"
          >
            <Pencil size={15} />
          </button>
          <button
            onClick={() => onDelete(workout.id)}
            className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
          >
            <Trash2 size={15} />
          </button>
        </div>
      </div>

      <div className="flex items-center gap-4 mt-4">
        <div className="flex items-center gap-1.5">
          <Zap size={16} className="text-amber-400" />
          <span className="text-lg font-semibold text-slate-900">
            {Math.round(workout.caloriesBurned)}
          </span>
          <span className="text-xs text-slate-400">cal burned</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Clock size={16} className="text-sky-400" />
          <span className="text-lg font-semibold text-slate-900">{workout.durationMinutes}</span>
          <span className="text-xs text-slate-400">min</span>
        </div>
      </div>
    </div>
  );
}

export default WorkoutCard;