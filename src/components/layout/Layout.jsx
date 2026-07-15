import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { LogOut, LayoutDashboard, UtensilsCrossed, Dumbbell, Scale, History, ChefHat, ShoppingCart, ListChecks, Sparkles } from 'lucide-react';
function Layout({ children }) {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="bg-white border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <span className="font-display text-lg font-bold text-emerald-600">NutriFit</span>

          <nav className="flex items-center gap-6">
            <Link
              to="/dashboard"
              className="flex items-center gap-1.5 text-sm font-medium text-slate-600 hover:text-emerald-600"
            >
              <LayoutDashboard size={16} />
              Dashboard
            </Link>
            <Link
              to="/meals"
              className="flex items-center gap-1.5 text-sm font-medium text-slate-600 hover:text-emerald-600"
            >
              <UtensilsCrossed size={16} />
              Meals
            </Link>
            <Link
              to="/workouts"
              className="flex items-center gap-1.5 text-sm font-medium text-slate-600 hover:text-emerald-600"
            >
              <Dumbbell size={16} />
              Workouts
            </Link>
            <Link
              to="/weight"
              className="flex items-center gap-1.5 text-sm font-medium text-slate-600 hover:text-emerald-600"
            >
              <Scale size={16} />
              Weight
            </Link>
            <Link
              to="/history"
              className="flex items-center gap-1.5 text-sm font-medium text-slate-600 hover:text-emerald-600"
            >
              <History size={16} />
              History
            </Link>
            <Link
              to="/recipes"
              className="flex items-center gap-1.5 text-sm font-medium text-slate-600 hover:text-emerald-600"
            >
              <ChefHat size={16} />
              Recipes
            </Link>
            <Link
              to="/grocery-lists"
              className="flex items-center gap-1.5 text-sm font-medium text-slate-600 hover:text-emerald-600"
            >
              <ShoppingCart size={16} />
              Grocery
            </Link>
            <Link
              to="/routines"
              className="flex items-center gap-1.5 text-sm font-medium text-slate-600 hover:text-emerald-600"
            >
              <ListChecks size={16} />
              Routines
            </Link>
            <Link
              to="/reports"
              className="flex items-center gap-1.5 text-sm font-medium text-slate-600 hover:text-emerald-600"
            >
              <Sparkles size={16} />
              AI Insights
            </Link>
          </nav>

          <div className="flex items-center gap-3">
            <span className="text-sm text-slate-500">{user?.name}</span>
            <button
              onClick={logout}
              className="flex items-center gap-1.5 text-sm text-slate-500 hover:text-red-600 transition-colors"
            >
              <LogOut size={16} />
              Log Out
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8">{children}</main>
    </div>
  );
}

export default Layout;