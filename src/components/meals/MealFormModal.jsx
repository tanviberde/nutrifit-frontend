import { useState, useEffect } from 'react';
import { X } from 'lucide-react';

function MealFormModal({ isOpen, onClose, onSubmit, initialData }) {
  const [formData, setFormData] = useState({
    mealName: '',
    calories: '',
    protein: '',
    carbs: '',
    fat: '',
    fibre: '',
    mealDate: new Date().toISOString().split('T')[0],
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (initialData) {
      setFormData({
        mealName: initialData.mealName,
        calories: initialData.calories,
        protein: initialData.protein || '',
        carbs: initialData.carbs || '',
        fat: initialData.fat || '',
        fibre: initialData.fibre || '',
        mealDate: initialData.mealDate,
      });
    } else {
      setFormData({
        mealName: '',
        calories: '',
        protein: '',
        carbs: '',
        fat: '',
        fibre: '',
        mealDate: new Date().toISOString().split('T')[0],
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
        calories: parseFloat(formData.calories),
        protein: formData.protein ? parseFloat(formData.protein) : null,
        carbs: formData.carbs ? parseFloat(formData.carbs) : null,
        fat: formData.fat ? parseFloat(formData.fat) : null,
        fibre: formData.fibre ? parseFloat(formData.fibre) : null,
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
            {initialData ? 'Edit Meal' : 'Log a Meal'}
          </h2>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="text"
            placeholder="Meal name"
            value={formData.mealName}
            onChange={handleChange('mealName')}
            required
            className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />

          <div className="grid grid-cols-2 gap-3">
            <input
              type="number"
              step="0.1"
              placeholder="Calories"
              value={formData.calories}
              onChange={handleChange('calories')}
              required
              className="px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
            <input
              type="date"
              value={formData.mealDate}
              onChange={handleChange('mealDate')}
              required
              className="px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <div className="grid grid-cols-4 gap-2">
            <input
              type="number"
              step="0.1"
              placeholder="Protein"
              value={formData.protein}
              onChange={handleChange('protein')}
              className="px-2 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
            <input
              type="number"
              step="0.1"
              placeholder="Carbs"
              value={formData.carbs}
              onChange={handleChange('carbs')}
              className="px-2 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
            <input
              type="number"
              step="0.1"
              placeholder="Fat"
              value={formData.fat}
              onChange={handleChange('fat')}
              className="px-2 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
            <input
              type="number"
              step="0.1"
              placeholder="Fibre"
              value={formData.fibre}
              onChange={handleChange('fibre')}
              className="px-2 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-emerald-600 hover:bg-emerald-700 disabled:bg-emerald-300 text-white font-medium py-2.5 rounded-lg transition-colors mt-2"
          >
            {isSubmitting ? 'Saving...' : initialData ? 'Save Changes' : 'Log Meal'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default MealFormModal;