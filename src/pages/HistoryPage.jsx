import { useState, useEffect } from 'react';
import { getMealHistory, getWorkoutHistory, getWeightHistory } from '../api/historyApi';
import { Search, ChevronLeft, ChevronRight, History as HistoryIcon } from 'lucide-react';

const TABS = ['Meals', 'Workouts', 'Weight'];

function HistoryPage() {
  const [activeTab, setActiveTab] = useState('Meals');
  const [keyword, setKeyword] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [page, setPage] = useState(0);
  const [result, setResult] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const loadData = async () => {
    setIsLoading(true);
    try {
      const filters = {};
      if (startDate) filters.startDate = startDate;
      if (endDate) filters.endDate = endDate;
      if (keyword && activeTab !== 'Weight') filters.keyword = keyword;

      let data;
      if (activeTab === 'Meals') {
        data = await getMealHistory(filters, page);
      } else if (activeTab === 'Workouts') {
        data = await getWorkoutHistory(filters, page);
      } else {
        data = await getWeightHistory(filters, page);
      }
      setResult(data);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTab, page]);

  const handleSearch = (e) => {
    e.preventDefault();
    setPage(0);
    loadData();
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setPage(0);
    setKeyword('');
  };

  const renderRow = (item) => {
    if (activeTab === 'Meals') {
      return (
        <tr key={item.id} className="border-b border-slate-100 hover:bg-slate-50">
          <td className="py-3 px-4 font-medium text-slate-900">{item.mealName}</td>
          <td className="py-3 px-4 text-slate-600">{Math.round(item.calories)} cal</td>
          <td className="py-3 px-4 text-slate-600">{item.protein ?? 0}g protein</td>
          <td className="py-3 px-4 text-slate-400 text-sm">
            {new Date(item.mealDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
          </td>
        </tr>
      );
    }
    if (activeTab === 'Workouts') {
      return (
        <tr key={item.id} className="border-b border-slate-100 hover:bg-slate-50">
          <td className="py-3 px-4 font-medium text-slate-900">{item.workoutName}</td>
          <td className="py-3 px-4 text-slate-600">{item.durationMinutes} min</td>
          <td className="py-3 px-4 text-slate-600">{Math.round(item.caloriesBurned)} cal burned</td>
          <td className="py-3 px-4 text-slate-400 text-sm">
            {new Date(item.workoutDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
          </td>
        </tr>
      );
    }
    return (
      <tr key={item.id} className="border-b border-slate-100 hover:bg-slate-50">
        <td className="py-3 px-4 font-medium text-slate-900">{item.weightKg} kg</td>
        <td className="py-3 px-4 text-slate-400 text-sm" colSpan={2}>
          {new Date(item.entryDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
        </td>
      </tr>
    );
  };

  return (
    <div>
      <h1 className="text-2xl font-display font-semibold text-slate-900 mb-6">History</h1>

      <div className="flex bg-white border border-slate-200 rounded-lg p-1 w-fit mb-5">
        {TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => handleTabChange(tab)}
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

      <form
        onSubmit={handleSearch}
        className="bg-white border border-slate-200 rounded-2xl p-4 mb-5 flex flex-wrap items-end gap-3"
      >
        {activeTab !== 'Weight' && (
          <div className="flex-1 min-w-[180px]">
            <label className="block text-xs font-medium text-slate-500 mb-1">Search</label>
            <div className="relative">
              <Search size={15} className="absolute left-3 top-2.5 text-slate-400" />
              <input
                type="text"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                placeholder="Search by name..."
                className="w-full pl-8 pr-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
          </div>
        )}
        <div>
          <label className="block text-xs font-medium text-slate-500 mb-1">From</label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-slate-500 mb-1">To</label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>
        <button
          type="submit"
          className="bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors"
        >
          Filter
        </button>
      </form>

      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden">
        {isLoading ? (
          <div className="p-8 text-slate-400 text-sm text-center">Loading...</div>
        ) : !result || result.content.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <HistoryIcon size={40} className="text-slate-300 mb-3" />
            <p className="text-slate-500 font-medium">No records found</p>
            <p className="text-slate-400 text-sm mt-1">Try adjusting your filters</p>
          </div>
        ) : (
          <>
            <table className="w-full text-sm">
              <tbody>{result.content.map(renderRow)}</tbody>
            </table>

            <div className="flex items-center justify-between px-4 py-3 border-t border-slate-100">
              <span className="text-xs text-slate-400">
                Page {result.pageNumber + 1} of {result.totalPages || 1}
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setPage((p) => Math.max(0, p - 1))}
                  disabled={page === 0}
                  className="p-1.5 text-slate-400 hover:text-emerald-600 disabled:opacity-30 disabled:hover:text-slate-400 transition-colors"
                >
                  <ChevronLeft size={18} />
                </button>
                <button
                  onClick={() => setPage((p) => (result.last ? p : p + 1))}
                  disabled={result.last}
                  className="p-1.5 text-slate-400 hover:text-emerald-600 disabled:opacity-30 disabled:hover:text-slate-400 transition-colors"
                >
                  <ChevronRight size={18} />
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default HistoryPage;