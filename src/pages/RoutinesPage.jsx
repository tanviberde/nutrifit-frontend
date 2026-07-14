import { useState, useEffect } from 'react';
import { generateWorkoutRoutine, getWorkoutRoutines } from '../api/workoutRoutineApi';
import RoutineCard from '../components/ai/RoutineCard';
import { Sparkles, Dumbbell } from 'lucide-react';

function RoutinesPage() {
  const [routines, setRoutines] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState('');
  const [daysPerWeek, setDaysPerWeek] = useState(4);
  const [equipmentAccess, setEquipmentAccess] = useState('Bodyweight and light dumbbells');

  const loadRoutines = async () => {
    setIsLoading(true);
    try {
      const result = await getWorkoutRoutines();
      setRoutines(result.content);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadRoutines();
  }, []);

  const handleGenerate = async () => {
    setIsGenerating(true);
    setError('');
    try {
      const newRoutine = await generateWorkoutRoutine(daysPerWeek, equipmentAccess);
      setRoutines((prev) => [newRoutine, ...prev]);
    } catch (err) {
      setError('Routine generation failed. The AI service may be busy — try again in a moment.');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-display font-semibold text-slate-900">Workout Routines</h1>
        <p className="text-sm text-slate-500 mt-0.5">
          AI-generated split routines tailored to your goal and activity level
        </p>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl p-4 mb-6 flex flex-wrap items-end gap-3">
        <div>
          <label className="block text-xs font-medium text-slate-500 mb-1">Days per week</label>
          <select
            value={daysPerWeek}
            onChange={(e) => setDaysPerWeek(parseInt(e.target.value, 10))}
            className="px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
          >
            {[2, 3, 4, 5, 6].map((n) => (
              <option key={n} value={n}>
                {n} days
              </option>
            ))}
          </select>
        </div>
        <div className="flex-1 min-w-[200px]">
          <label className="block text-xs font-medium text-slate-500 mb-1">Equipment access</label>
          <input
            type="text"
            value={equipmentAccess}
            onChange={(e) => setEquipmentAccess(e.target.value)}
            placeholder="e.g. Full gym, dumbbells only, bodyweight..."
            className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>
        <button
          onClick={handleGenerate}
          disabled={isGenerating}
          className="flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 disabled:bg-emerald-300 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors"
        >
          <Sparkles size={16} />
          {isGenerating ? 'Building your routine...' : 'Generate Routine'}
        </button>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg px-4 py-3 mb-4">
          {error}
        </div>
      )}

      {isLoading ? (
        <div className="text-slate-400 text-sm">Loading routines...</div>
      ) : routines.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <Dumbbell size={40} className="text-slate-300 mb-3" />
          <p className="text-slate-500 font-medium">No routines yet</p>
          <p className="text-slate-400 text-sm mt-1">Generate your first AI workout split above</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {routines.map((routine) => (
            <RoutineCard key={routine.id} routine={routine} />
          ))}
        </div>
      )}
    </div>
  );
}

export default RoutinesPage;