import React from 'react';
export default function StatCard({ title, value, delta }) {
  return (
    <div className="bg-white rounded shadow-sm p-4">
      <div className="text-xs text-slate-500">{title}</div>
      <div className="text-2xl font-semibold">{value}</div>
      {delta && <div className="text-xs text-green-600 mt-1">{delta}</div>}
    </div>
  );
}