import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend, Text } from 'recharts';

const RowCharts = ({ items }) => {
  // Filter out NA values and then aggregate data for the bar chart at the item level
  const barChartData = items.map((item) => ({
    name: item.item,
    risk: item.risk !== "NA" ? item.risk : 0,
    moderate: item.moderate !== "NA" ? item.moderate : 0,
    safe: item.safe !== "NA" ? item.safe : 0,
  }));

  // Filter out NA values and then aggregate data for the pie chart at the item level
  const statusCounts = items.reduce((acc, item) => {
    acc.risk = (acc.risk || 0) + (item.risk !== "NA" ? item.risk : 0);
    acc.moderate = (acc.moderate || 0) + (item.moderate !== "NA" ? item.moderate : 0);
    acc.safe = (acc.safe || 0) + (item.safe !== "NA" ? item.safe : 0);
    return acc;
  }, {});

  const pieChartData = [
    { name: 'RISK', value: statusCounts.risk || 0 },
    { name: 'MODERATE', value: statusCounts.moderate || 0 },
    { name: 'SAFE', value: statusCounts.safe || 0 },
  ];

  // Lighter colors for RISK, MODERATE, SAFE
  const COLORS = ['#FFA07A', '#FFD700', '#98FB98']; // Lighter shades of red, yellow, green

  const renderCustomLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
    const RADIAN = Math.PI / 180;
    const radius = 25 + innerRadius + (outerRadius - innerRadius);
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <Text 
        x={x} 
        y={y} 
        fill={COLORS[index]} 
        textAnchor={x > cx ? 'start' : 'end'} 
        dominantBaseline="central"
        fontSize="14px"
        fontWeight="bold"
      >
        {`${pieChartData[index].name}: ${(percent * 100).toFixed(0)}%`}
      </Text>
    );
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'space-around', gap: '20px', padding: '20px' }}>
      <ResponsiveContainer width="50%" height={350}>
        <BarChart data={barChartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <XAxis dataKey="name" tick={{ fontSize: 12, fontWeight: 'bold' }} />
          <YAxis tick={{ fontSize: 12, fontWeight: 'bold' }} />
          <Tooltip />
          <Bar dataKey="risk" fill="#FFA07A" barSize={40} />
          <Bar dataKey="moderate" fill="#FFD700" barSize={40} />
          <Bar dataKey="safe" fill="#98FB98" barSize={40} />
        </BarChart>
      </ResponsiveContainer>

      <ResponsiveContainer width="50%" height={350}>
        <PieChart>
          <Pie
            data={pieChartData}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={renderCustomLabel} // Use the custom label rendering function
            outerRadius={120}
            paddingAngle={5}
            fill="#8884d8"
            dataKey="value"
            isAnimationActive={false}
          >
            {pieChartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend 
            layout="horizontal" 
            align="center" 
            verticalAlign="bottom" 
            wrapperStyle={{ fontSize: '14px', fontWeight: 'bold' }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default RowCharts;
