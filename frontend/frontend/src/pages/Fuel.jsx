import React, { useEffect, useState } from 'react';
import api from '../api/axios';
import StatCard from '../components/StatCard';
import Table from '../components/Table';

export default function Fuel(){
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    api.get('/fuel/logs').then(r => setLogs(r.data.data)).catch(()=>{});
  }, []);

  const columns = [
    { key: 'vehicleId', title: 'Vehicle' },
    { key: 'timestamp', title: 'At', render: (r) => new Date(r.timestamp).toLocaleString() },
    { key: 'delta', title: 'Delta (L)' },
    { key: 'suspicion', title: 'Suspicion' },
    { key: 'notes', title: 'Notes' }
  ];

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <StatCard title="Total Fuel (L)" value="4,120" />
        <StatCard title="Refills" value="48" />
        <StatCard title="Anomalies" value={logs.filter(l=>l.suspicion!=='Green').length} />
        <StatCard title="Avg (L/100km)" value="11.8" />
      </div>

      <div className="bg-white rounded shadow-sm p-4">
        <h3 className="font-semibold mb-3">Fuel Logs</h3>
        <Table columns={columns} data={logs} />
      </div>
    </div>
  );
}