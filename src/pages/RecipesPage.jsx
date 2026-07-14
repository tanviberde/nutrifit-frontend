import { useState, useEffect } from 'react';
import { generateRecipe, regenerateRecipe, getRecipes } from '../api/recipeApi';
import { generateGroceryListFromRecipe } from '../api/groceryApi';
import RecipeCard from '../components/ai/RecipeCard';
import { Sparkles, ChefHat } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

function RecipesPage() {
  const [recipes, setRecipes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isGenerating, setIsGenerating] = useState(false);
  const [regeneratingId, setRegeneratingId] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const loadRecipes = async () => {
    setIsLoading(true);
    try {
      const result = await getRecipes();
      setRecipes(result.content);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadRecipes();
  }, []);

  const handleGenerate = async () => {
    setIsGenerating(true);
    setError('');
    try {
      const newRecipe = await generateRecipe();
      setRecipes((prev) => [newRecipe, ...prev]);
    } catch (err) {
      setError('Recipe generation failed. The AI service may be busy — try again in a moment.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleRegenerate = async (recipeId) => {
    setRegeneratingId(recipeId);
    setError('');
    try {
      const newRecipe = await regenerateRecipe(recipeId);
      setRecipes((prev) => [newRecipe, ...prev]);
    } catch (err) {
      setError('Regeneration failed. Try again in a moment.');
    } finally {
      setRegeneratingId(null);
    }
  };

  const handleCreateGroceryList = async (recipeId) => {
    try {
      await generateGroceryListFromRecipe(recipeId);
      navigate('/grocery-lists');
    } catch (err) {
      setError('Failed to create grocery list.');
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-display font-semibold text-slate-900">AI Recipes</h1>
          <p className="text-sm text-slate-500 mt-0.5">
            Personalized to your diet preference, allergies, and macro targets
          </p>
        </div>
        <button
          onClick={handleGenerate}
          disabled={isGenerating}
          className="flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 disabled:bg-emerald-300 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors"
        >
          <Sparkles size={16} />
          {isGenerating ? 'Asking the AI chef...' : 'Generate Recipe'}
        </button>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg px-4 py-3 mb-4">
          {error}
        </div>
      )}

      {isLoading ? (
        <div className="text-slate-400 text-sm">Loading recipes...</div>
      ) : recipes.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <ChefHat size={40} className="text-slate-300 mb-3" />
          <p className="text-slate-500 font-medium">No recipes yet</p>
          <p className="text-slate-400 text-sm mt-1">
            Generate your first AI-tailored recipe above
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {recipes.map((recipe) => (
            <RecipeCard
              key={recipe.id}
              recipe={recipe}
              onRegenerate={handleRegenerate}
              onCreateGroceryList={handleCreateGroceryList}
              isRegenerating={regeneratingId === recipe.id}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default RecipesPage;