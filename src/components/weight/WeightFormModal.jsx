import { useState, useEffect } from 'react';
import { X } from 'lucide-react';

function WeightFormModal({ isOpen, onClose, onSubmit, initialData }) {
  const [formData, setFormData] = useState({
    weightKg: '',
    entryDate: new Date().toISOString().split('T')[0],
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (initialData) {
      setFormData({
        weightKg: initialData.weightKg,
        entryDate: initialData.entryDate,
      });
    } else {
      setFormData({
        weightKg: '',
        entryDate: new Date().toISOString().split('T')[0],
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
        weightKg: parseFloat(formData.weightKg),
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
        className="bg-white rounded-2xl shadow-xl w-full max-w-sm p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-5">
          <h2 className="font-display font-semibold text-lg text-slate-900">
            {initialData ? 'Edit Entry' : 'Log Weight'}
          </h2>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="number"
            step="0.1"
            placeholder="Weight (kg)"
            value={formData.weightKg}
            onChange={handleChange('weightKg')}
            required
            className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />

          <input
            type="date"
            value={formData.entryDate}
            onChange={handleChange('entryDate')}
            required
            className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-emerald-600 hover:bg-emerald-700 disabled:bg-emerald-300 text-white font-medium py-2.5 rounded-lg transition-colors mt-2"
          >
            {isSubmitting ? 'Saving...' : initialData ? 'Save Changes' : 'Log Weight'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default WeightFormModal;