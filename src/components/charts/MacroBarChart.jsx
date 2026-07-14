import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

function MacroBarChart({ data }) {
  const hasTarget = data.some((entry) => entry.target !== undefined);

  return (
    <ResponsiveContainer width="100%" height={280}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
        <XAxis dataKey="name" stroke="#64748b" fontSize={12} />
        <YAxis stroke="#64748b" fontSize={12} />
        <Tooltip />
        <Legend />
        <Bar dataKey="consumed" fill="#10b981" radius={[4, 4, 0, 0]} name="Consumed" />
        {hasTarget && (
          <Bar dataKey="target" fill="#cbd5e1" radius={[4, 4, 0, 0]} name="Target" />
        )}
      </BarChart>
    </ResponsiveContainer>
  );
}

export default MacroBarChart;