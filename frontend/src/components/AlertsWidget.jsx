import React, { useEffect, useState } from 'react';
import api from '../api/axios';

export default function AlertsWidget(){
  const [alerts, setAlerts] = useState([]);
  useEffect(() => {
    let mounted = true;
    async function load() {
      try {
        const resp = await api.get('/geofence/alerts');
        if (mounted) setAlerts(resp.data.data || []);
      } catch (err) {}
    }
    load();
    return () => { mounted = false; };
  }, []);
  return (
    <div className="bg-white rounded shadow-sm p-4">
      <h4 className="font-semibold mb-2">Alerts</h4>
      <ul className="space-y-2 text-sm">
        {alerts.slice(0,6).map(a => <li key={a.id} className="flex justify-between"><div>{a.message}</div><div className="text-xs text-slate-500">{a.severity}</div></li>)}
        {alerts.length === 0 && <li className="text-xs text-slate-500">No alerts</li>}
      </ul>
    </div>
  );
}