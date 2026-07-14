import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

function WeightTrendChart({ entries }) {
  const sortedData = [...entries]
    .sort((a, b) => new Date(a.entryDate) - new Date(b.entryDate))
    .map((entry) => ({
      date: new Date(entry.entryDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      weight: entry.weightKg,
    }));

  return (
    <ResponsiveContainer width="100%" height={280}>
      <LineChart data={sortedData}>
        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
        <XAxis dataKey="date" stroke="#64748b" fontSize={12} />
        <YAxis stroke="#64748b" fontSize={12} domain={['dataMin - 2', 'dataMax + 2']} />
        <Tooltip />
        <Line
          type="monotone"
          dataKey="weight"
          stroke="#10b981"
          strokeWidth={2.5}
          dot={{ fill: '#10b981', r: 4 }}
          activeDot={{ r: 6 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}

export default WeightTrendChart;