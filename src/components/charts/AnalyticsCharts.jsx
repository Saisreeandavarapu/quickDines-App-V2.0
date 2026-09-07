import React from 'react';
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  BarChart, 
  Bar, 
  PieChart, 
  Pie, 
  Cell, 
  XAxis, 
  YAxis, 
  Tooltip, 
  CartesianGrid 
} from 'recharts';
import { REVENUE_GRAPH_DATA } from '../../mockData';

export const RevenueChart = ({ data = REVENUE_GRAPH_DATA }) => {
  return (
    <div className="w-full h-64">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <defs>
            <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#2563EB" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#0B1F5E" stopOpacity={0.0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
          <XAxis dataKey="time" stroke="#94A3B8" fontSize={11} tickLine={false} />
          <YAxis stroke="#94A3B8" fontSize={11} tickLine={false} />
          <Tooltip 
            contentStyle={{ backgroundColor: '#071535', borderColor: 'rgba(255,255,255,0.15)', borderRadius: '16px', color: '#fff', fontSize: '12px' }}
            formatter={(value) => [`₹${value.toLocaleString()}`, 'Revenue']}
          />
          <Area type="monotone" dataKey="revenue" stroke="#3B82F6" strokeWidth={3} fillOpacity={1} fill="url(#colorRev)" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export const OrderVolumeChart = ({ data = REVENUE_GRAPH_DATA }) => {
  return (
    <div className="w-full h-64">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
          <XAxis dataKey="time" stroke="#94A3B8" fontSize={11} tickLine={false} />
          <YAxis stroke="#94A3B8" fontSize={11} tickLine={false} />
          <Tooltip 
            contentStyle={{ backgroundColor: '#071535', borderColor: 'rgba(255,255,255,0.15)', borderRadius: '16px', color: '#fff', fontSize: '12px' }}
            formatter={(value) => [`${value} Orders`, 'Volume']}
          />
          <Bar dataKey="orders" fill="#16A34A" radius={[8, 8, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export const CommissionPieChart = () => {
  const pieData = [
    { name: 'Restaurant Share (76%)', value: 142800, color: '#16A34A' },
    { name: 'Platform Commission (14%)', value: 24040, color: '#2563EB' },
    { name: 'Driver Incentives (10%)', value: 18110, color: '#F59E0B' },
  ];

  return (
    <div className="w-full h-56 flex items-center justify-center">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={pieData}
            cx="50%"
            cy="50%"
            innerRadius={50}
            outerRadius={75}
            paddingAngle={5}
            dataKey="value"
          >
            {pieData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip 
            contentStyle={{ backgroundColor: '#071535', borderColor: 'rgba(255,255,255,0.15)', borderRadius: '16px', color: '#fff', fontSize: '12px' }}
            formatter={(val) => `₹${val.toLocaleString()}`}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};
