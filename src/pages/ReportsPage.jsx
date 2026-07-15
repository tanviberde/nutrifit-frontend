import { useState } from 'react';
import { getWeeklyReport, getDailyMotivation, getHabitAnalysis } from '../api/aiApi';
import HabitAnalysisCard from '../components/ai/HabitAnalysisCard';
import { FileText, Sparkles, BarChart3, RefreshCw } from 'lucide-react';

const TABS = ['Weekly Report', 'Daily Motivation', 'Habit Analysis'];

function ReportsPage() {
  const [activeTab, setActiveTab] = useState('Weekly Report');
  const [data, setData] = useState({});
  const [loading, setLoading] = useState({});
  const [errors, setErrors] = useState({});

  const fetchForTab = async (tab) => {
    setLoading((prev) => ({ ...prev, [tab]: true }));
    setErrors((prev) => ({ ...prev, [tab]: '' }));
    try {
      let result;
      if (tab === 'Weekly Report') result = await getWeeklyReport();
      else if (tab === 'Daily Motivation') result = await getDailyMotivation();
      else result = await getHabitAnalysis();
      setData((prev) => ({ ...prev, [tab]: result }));
    } catch (err) {
      setErrors((prev) => ({
        ...prev,
        [tab]: 'The AI service is busy right now — try again in a moment.',
      }));
    } finally {
      setLoading((prev) => ({ ...prev, [tab]: false }));
    }
  };

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    if (!data[tab] && !loading[tab]) {
      fetchForTab(tab);
    }
  };

  const isLoading = loading[activeTab];
  const error = errors[activeTab];
  const tabData = data[activeTab];

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-display font-semibold text-slate-900">AI Insights</h1>
          <p className="text-sm text-slate-500 mt-0.5">
            Personalized coaching generated from your actual logged data
          </p>
        </div>
        {tabData && (
          <button
            onClick={() => fetchForTab(activeTab)}
            disabled={isLoading}
            className="flex items-center gap-1.5 text-sm font-medium text-slate-600 border border-slate-200 rounded-lg px-3 py-1.5 hover:bg-slate-50 disabled:opacity-50 transition-colors"
          >
            <RefreshCw size={14} className={isLoading ? 'animate-spin' : ''} />
            Refresh
          </button>
        )}
      </div>

      <div className="flex bg-white border border-slate-200 rounded-lg p-1 w-fit mb-6">
        {TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => handleTabClick(tab)}
            className={`flex items-center gap-1.5 px-4 py-1.5 text-sm font-medium rounded-md transition-colors ${
              activeTab === tab
                ? 'bg-emerald-600 text-white'
                : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            {tab === 'Weekly Report' && <FileText size={14} />}
            {tab === 'Daily Motivation' && <Sparkles size={14} />}
            {tab === 'Habit Analysis' && <BarChart3 size={14} />}
            {tab}
          </button>
        ))}
      </div>

      {isLoading && (
        <div className="bg-white border border-slate-200 rounded-2xl p-8 text-center">
          <div className="text-slate-400 text-sm">
            {activeTab === 'Weekly Report' && 'Writing your weekly report...'}
            {activeTab === 'Daily Motivation' && 'Finding today\'s motivation...'}
            {activeTab === 'Habit Analysis' && 'Analyzing your last 30 days...'}
          </div>
        </div>
      )}

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg px-4 py-3">
          {error}
        </div>
      )}

      {!isLoading && !error && tabData && (
        <>
          {activeTab === 'Weekly Report' && (
            <div className="bg-white border border-slate-200 rounded-2xl p-6">
              <p className="text-xs text-slate-400 mb-3">
                {tabData.weekStartDate} to {tabData.weekEndDate}
              </p>
              <p className="text-slate-700 leading-relaxed whitespace-pre-line">
                {tabData.reportContent}
              </p>
            </div>
          )}

          {activeTab === 'Daily Motivation' && (
            <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl p-8 text-center">
              <Sparkles size={28} className="text-emerald-100 mx-auto mb-3" />
              <p className="text-white text-lg font-medium leading-relaxed">
                {tabData.message}
              </p>
            </div>
          )}

          {activeTab === 'Habit Analysis' && <HabitAnalysisCard analysis={tabData} />}
        </>
      )}
    </div>
  );
}

export default ReportsPage;