import { useState, useEffect } from 'react';
import { getMeals, createMeal, updateMeal, deleteMeal } from '../api/mealApi';
import MealCard from '../components/meals/MealCard';
import MealFormModal from '../components/meals/MealFormModal';
import { Plus, UtensilsCrossed } from 'lucide-react';

function MealsPage() {
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingMeal, setEditingMeal] = useState(null);

  const loadMeals = async () => {
    setIsLoading(true);
    try {
      const result = await getMeals();
      setMeals(result.content);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadMeals();
  }, []);

  const handleAddClick = () => {
    setEditingMeal(null);
    setIsModalOpen(true);
  };

  const handleEditClick = (meal) => {
    setEditingMeal(meal);
    setIsModalOpen(true);
  };

  const handleSubmit = async (formData) => {
    if (editingMeal) {
      await updateMeal(editingMeal.id, formData);
    } else {
      await createMeal(formData);
    }
    await loadMeals();
  };

  const handleDelete = async (mealId) => {
    await deleteMeal(mealId);
    await loadMeals();
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-display font-semibold text-slate-900">Meals</h1>
        <button
          onClick={handleAddClick}
          className="flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors"
        >
          <Plus size={16} />
          Log Meal
        </button>
      </div>

      {isLoading ? (
        <div className="text-slate-400 text-sm">Loading meals...</div>
      ) : meals.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <UtensilsCrossed size={40} className="text-slate-300 mb-3" />
          <p className="text-slate-500 font-medium">No meals logged yet</p>
          <p className="text-slate-400 text-sm mt-1">Start tracking by logging your first meal</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {meals.map((meal) => (
            <MealCard
              key={meal.id}
              meal={meal}
              onEdit={handleEditClick}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}

      <MealFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSubmit}
        initialData={editingMeal}
      />
    </div>
  );
}

export default MealsPage;