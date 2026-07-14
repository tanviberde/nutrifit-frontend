import { useState, useEffect } from 'react';
import { getWeightEntries, createWeightEntry, updateWeightEntry, deleteWeightEntry } from '../api/weightApi';
import WeightTrendChart from '../components/charts/WeightTrendChart';
import WeightFormModal from '../components/weight/WeightFormModal';
import { Plus, Scale, Pencil, Trash2, TrendingDown, TrendingUp } from 'lucide-react';

function WeightPage() {
  const [entries, setEntries] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEntry, setEditingEntry] = useState(null);

  const loadEntries = async () => {
    setIsLoading(true);
    try {
      const result = await getWeightEntries();
      setEntries(result);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadEntries();
  }, []);

  const handleAddClick = () => {
    setEditingEntry(null);
    setIsModalOpen(true);
  };

  const handleEditClick = (entry) => {
    setEditingEntry(entry);
    setIsModalOpen(true);
  };

  const handleSubmit = async (formData) => {
    if (editingEntry) {
      await updateWeightEntry(editingEntry.id, formData);
    } else {
      await createWeightEntry(formData);
    }
    await loadEntries();
  };

  const handleDelete = async (entryId) => {
    await deleteWeightEntry(entryId);
    await loadEntries();
  };

  const sortedEntries = [...entries].sort(
    (a, b) => new Date(b.entryDate) - new Date(a.entryDate)
  );

  const chronological = [...entries].sort(
    (a, b) => new Date(a.entryDate) - new Date(b.entryDate)
  );
  const change =
    chronological.length >= 2
      ? chronological[chronological.length - 1].weightKg - chronological[0].weightKg
      : null;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-display font-semibold text-slate-900">Weight</h1>
        <button
          onClick={handleAddClick}
          className="flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors"
        >
          <Plus size={16} />
          Log Weight
        </button>
      </div>

      {isLoading ? (
        <div className="text-slate-400 text-sm">Loading...</div>
      ) : entries.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <Scale size={40} className="text-slate-300 mb-3" />
          <p className="text-slate-500 font-medium">No weight entries yet</p>
          <p className="text-slate-400 text-sm mt-1">Log your first entry to start your trend line</p>
        </div>
      ) : (
        <>
          {change !== null && (
            <div className="bg-white border border-slate-200 rounded-2xl p-4 mb-4 inline-flex items-center gap-2">
              {change <= 0 ? (
                <TrendingDown size={18} className="text-emerald-600" />
              ) : (
                <TrendingUp size={18} className="text-amber-500" />
              )}
              <span className="text-sm text-slate-500">
                {change <= 0 ? 'Down' : 'Up'}{' '}
                <span className="font-semibold text-slate-900">
                  {Math.abs(change).toFixed(1)} kg
                </span>{' '}
                since first entry
              </span>
            </div>
          )}

          <div className="bg-white border border-slate-200 rounded-2xl p-6 mb-6">
            <WeightTrendChart entries={entries} />
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl divide-y divide-slate-100">
            {sortedEntries.map((entry) => (
              <div
                key={entry.id}
                className="group flex items-center justify-between px-5 py-3 hover:bg-slate-50 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <span className="font-semibold text-slate-900">{entry.weightKg} kg</span>
                  <span className="text-sm text-slate-400">
                    {new Date(entry.entryDate).toLocaleDateString('en-US', {
                      weekday: 'short',
                      month: 'short',
                      day: 'numeric',
                    })}
                  </span>
                </div>
                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={() => handleEditClick(entry)}
                    className="p-1.5 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"
                  >
                    <Pencil size={15} />
                  </button>
                  <button
                    onClick={() => handleDelete(entry.id)}
                    className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      <WeightFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSubmit}
        initialData={editingEntry}
      />
    </div>
  );
}

export default WeightPage;