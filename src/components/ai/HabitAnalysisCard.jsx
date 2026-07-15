import { TrendingUp, Beef, Dumbbell, Wheat, Scale, Lightbulb } from 'lucide-react';

function HabitAnalysisCard({ analysis }) {
  const sections = [
    { icon: TrendingUp, label: 'Calorie Trend', text: analysis.calorieTrend, color: 'text-orange-500' },
    { icon: Beef, label: 'Protein Trend', text: analysis.proteinTrend, color: 'text-red-500' },
    { icon: Dumbbell, label: 'Workout Consistency', text: analysis.workoutConsistency, color: 'text-sky-500' },
    { icon: Wheat, label: 'Fibre Trend', text: analysis.fibreTrend, color: 'text-amber-500' },
    { icon: Scale, label: 'Weight Trend', text: analysis.weightTrend, color: 'text-purple-500' },
  ];

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        {sections.map(({ icon: Icon, label, text, color }) => (
          <div key={label} className="bg-slate-50 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-1.5">
              <Icon size={16} className={color} />
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
                {label}
              </span>
            </div>
            <p className="text-sm text-slate-700">{text}</p>
          </div>
        ))}
      </div>

      <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-4">
        <div className="flex items-center gap-2 mb-1.5">
          <Lightbulb size={16} className="text-emerald-600" />
          <span className="text-xs font-semibold text-emerald-700 uppercase tracking-wide">
            Overall Insight
          </span>
        </div>
        <p className="text-sm text-emerald-900">{analysis.overallInsight}</p>
      </div>
    </div>
  );
}

export default HabitAnalysisCard;