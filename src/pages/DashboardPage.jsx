import { useAuth } from '../hooks/useAuth';

function DashboardPage() {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-semibold text-slate-900 mb-2">
          Welcome, {user?.name}!
        </h1>
        <p className="text-slate-500 mb-6">Dashboard content coming in the next module.</p>
        <button
          onClick={logout}
          className="bg-slate-900 text-white px-4 py-2 rounded-lg hover:bg-slate-800"
        >
          Log Out
        </button>
      </div>
    </div>
  );
}

export default DashboardPage;