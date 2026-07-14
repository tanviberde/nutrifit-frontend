import { Dumbbell } from 'lucide-react';

function RoutineCard({ routine }) {
  const groupedByDay = routine.exercises.reduce((acc, exercise) => {
    if (!acc[exercise.dayLabel]) acc[exercise.dayLabel] = [];
    acc[exercise.dayLabel].push(exercise);
    return acc;
  }, {});

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-5">
      <div className="flex items-center gap-2 mb-1">
        <Dumbbell size={18} className="text-emerald-600" />
        <h3 className="font-display font-semibold text-lg text-slate-900">{routine.title}</h3>
      </div>
      <p className="text-sm text-slate-500 mb-4">{routine.description}</p>

      <div className="space-y-4">
        {Object.entries(groupedByDay).map(([dayLabel, exercises]) => (
          <div key={dayLabel}>
            <h4 className="text-xs font-semibold text-emerald-600 uppercase tracking-wide mb-2">
              {dayLabel}
            </h4>
            <div className="space-y-1.5">
              {exercises.map((ex) => (
                <div
                  key={ex.id}
                  className="flex items-center justify-between text-sm bg-slate-50 rounded-lg px-3 py-2"
                >
                  <span className="text-slate-700 font-medium">{ex.exerciseName}</span>
                  <span className="text-slate-400 text-xs">
                    {ex.sets} × {ex.reps}
                    {ex.restSeconds ? ` · ${ex.restSeconds}s rest` : ''}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RoutineCard;