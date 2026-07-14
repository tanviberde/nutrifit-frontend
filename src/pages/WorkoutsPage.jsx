import { useState, useEffect } from 'react';
import { getWorkouts, createWorkout, updateWorkout, deleteWorkout } from '../api/workoutApi';
import WorkoutCard from '../components/workouts/WorkoutCard';
import WorkoutFormModal from '../components/workouts/WorkoutFormModal';
import { Plus, Dumbbell } from 'lucide-react';

function WorkoutsPage() {
  const [workouts, setWorkouts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingWorkout, setEditingWorkout] = useState(null);

  const loadWorkouts = async () => {
    setIsLoading(true);
    try {
      const result = await getWorkouts();
      setWorkouts(result.content);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadWorkouts();
  }, []);

  const handleAddClick = () => {
    setEditingWorkout(null);
    setIsModalOpen(true);
  };

  const handleEditClick = (workout) => {
    setEditingWorkout(workout);
    setIsModalOpen(true);
  };

  const handleSubmit = async (formData) => {
    if (editingWorkout) {
      await updateWorkout(editingWorkout.id, formData);
    } else {
      await createWorkout(formData);
    }
    await loadWorkouts();
  };

  const handleDelete = async (workoutId) => {
    await deleteWorkout(workoutId);
    await loadWorkouts();
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-display font-semibold text-slate-900">Workouts</h1>
        <button
          onClick={handleAddClick}
          className="flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors"
        >
          <Plus size={16} />
          Log Workout
        </button>
      </div>

      {isLoading ? (
        <div className="text-slate-400 text-sm">Loading workouts...</div>
      ) : workouts.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <Dumbbell size={40} className="text-slate-300 mb-3" />
          <p className="text-slate-500 font-medium">No workouts logged yet</p>
          <p className="text-slate-400 text-sm mt-1">Log your first workout to start your streak</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {workouts.map((workout) => (
            <WorkoutCard
              key={workout.id}
              workout={workout}
              onEdit={handleEditClick}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}

      <WorkoutFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSubmit}
        initialData={editingWorkout}
      />
    </div>
  );
}

export default WorkoutsPage;