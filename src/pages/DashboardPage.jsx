import { useState, useEffect } from 'react';
import { getDailyDashboard, getWeeklyDashboard, getMonthlyDashboard } from '../api/dashboardApi';
import MacroBarChart from '../components/charts/MacroBarChart';
import { Flame, Footprints, Droplet, Trophy } from 'lucide-react';

const TABS = ['Daily', 'Weekly', 'Monthly'];

function DashboardPage() {
  const [activeTab, setActiveTab] = useState('Daily');
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      setError('');
      try {
        let result;
        if (activeTab === 'Daily') {
          result = await getDailyDashboard();
        } else if (activeTab === 'Weekly') {
          result = await getWeeklyDashboard();
        } else {
          result = await getMonthlyDashboard();
        }
        setData(result);
      } catch (err) {
        setError('Failed to load dashboard data.');
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, [activeTab]);

  const getChartData = () => {
    if (!data) return [];
    if (activeTab === 'Daily') {
      return [
        { name: 'Protein', consumed: data.totalProtein, target: data.proteinTarget },
        { name: 'Carbs', consumed: data.totalCarbs, target: data.carbTarget },
        { name: 'Fat', consumed: data.totalFat, target: data.fatTarget },
        { name: 'Fibre', consumed: data.totalFibre, target: data.fibreTarget },
      ];
    }
    return [
      { name: 'Protein', consumed: data.totalProtein },
      { name: 'Carbs', consumed: data.totalCarbs },
      { name: 'Fat', consumed: data.totalFat },
      { name: 'Fibre', consumed: data.totalFibre },
    ];
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold text-slate-900">Dashboard</h1>
        <div className="flex bg-white border border-slate-200 rounded-lg p-1">
          {TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-1.5 text-sm font-medium rounded-md transition-colors ${
                activeTab === tab
                  ? 'bg-emerald-600 text-white'
                  : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg px-4 py-3 mb-4">
          {error}
        </div>
      )}

      {isLoading || !data ? (
        <div className="text-slate-400 text-sm">Loading...</div>
      ) : (
        <>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            {activeTab === 'Daily' ? (
              <>
                <StatCard
                  icon={<Flame size={18} />}
                  label="Calories Remaining"
                  value={Math.round(data.remainingCalories)}
                />
                <StatCard
                  icon={<Footprints size={18} />}
                  label="Workouts Today"
                  value={data.workoutCount}
                />
                <StatCard
                  icon={<Droplet size={18} />}
                  label="Water (ml)"
                  value={data.waterIntakeMl}
                />
                <StatCard
                  icon={<Trophy size={18} />}
                  label="Current Streak"
                  value={`${data.currentStreak} days`}
                />
              </>
            ) : (
              <>
                <StatCard
                  icon={<Flame size={18} />}
                  label="Avg Daily Calories"
                  value={Math.round(data.avgDailyCalories)}
                />
                <StatCard
                  icon={<Footprints size={18} />}
                  label="Workouts"
                  value={data.workoutCount}
                />
                <StatCard
                  icon={<Trophy size={18} />}
                  label="Days Logged"
                  value={data.daysLogged}
                />
                <StatCard
                  icon={<Trophy size={18} />}
                  label="Current Streak"
                  value={`${data.currentStreak} days`}
                />
              </>
            )}
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-6">
            <h2 className="text-sm font-medium text-slate-500 mb-4">
              Macro Breakdown {activeTab === 'Daily' ? '(Consumed vs Target)' : '(Totals)'}
            </h2>
            <MacroBarChart data={getChartData()} />
          </div>
        </>
      )}
    </div>
  );
}

function StatCard({ icon, label, value }) {
  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-4">
      <div className="text-emerald-600 mb-2">{icon}</div>
      <div className="text-2xl font-semibold text-slate-900">{value}</div>
      <div className="text-xs text-slate-500 mt-0.5">{label}</div>
    </div>
  );
}

export default DashboardPage;