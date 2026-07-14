import { useState, useEffect } from 'react';
import { X } from 'lucide-react';

function WorkoutFormModal({ isOpen, onClose, onSubmit, initialData }) {
  const [formData, setFormData] = useState({
    workoutName: '',
    durationMinutes: '',
    caloriesBurned: '',
    workoutDate: new Date().toISOString().split('T')[0],
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (initialData) {
      setFormData({
        workoutName: initialData.workoutName,
        durationMinutes: initialData.durationMinutes,
        caloriesBurned: initialData.caloriesBurned,
        workoutDate: initialData.workoutDate,
      });
    } else {
      setFormData({
        workoutName: '',
        durationMinutes: '',
        caloriesBurned: '',
        workoutDate: new Date().toISOString().split('T')[0],
      });
    }
  }, [initialData, isOpen]);

  if (!isOpen) return null;

  const handleChange = (field) => (e) => {
    setFormData({ ...formData, [field]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await onSubmit({
        ...formData,
        durationMinutes: parseInt(formData.durationMinutes, 10),
        caloriesBurned: parseFloat(formData.caloriesBurned),
      });
      onClose();
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4 z-50"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-5">
          <h2 className="font-display font-semibold text-lg text-slate-900">
            {initialData ? 'Edit Workout' : 'Log a Workout'}
          </h2>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="text"
            placeholder="Workout name (e.g. Morning Run)"
            value={formData.workoutName}
            onChange={handleChange('workoutName')}
            required
            className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />

          <div className="grid grid-cols-2 gap-3">
            <input
              type="number"
              placeholder="Duration (min)"
              value={formData.durationMinutes}
              onChange={handleChange('durationMinutes')}
              required
              className="px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
            <input
              type="number"
              step="0.1"
              placeholder="Calories burned"
              value={formData.caloriesBurned}
              onChange={handleChange('caloriesBurned')}
              required
              className="px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <input
            type="date"
            value={formData.workoutDate}
            onChange={handleChange('workoutDate')}
            required
            className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-emerald-600 hover:bg-emerald-700 disabled:bg-emerald-300 text-white font-medium py-2.5 rounded-lg transition-colors mt-2"
          >
            {isSubmitting ? 'Saving...' : initialData ? 'Save Changes' : 'Log Workout'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default WorkoutFormModal;