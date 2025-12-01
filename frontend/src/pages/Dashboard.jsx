import React, { useEffect, useState } from 'react';
import StatCard from '../components/StatCard';
import api from '../api/axios';
import AlertsWidget from '../components/AlertsWidget';
import { Link } from 'react-router-dom';
import MapLive from '../components/MapLive';

export default function Dashboard(){
  const [vehicles, setVehicles] = useState([]);
  useEffect(() => {
    api.get('/vehicles').then(r => setVehicles(r.data.data)).catch(()=>{});
  }, []);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <StatCard title="Active Vehicles" value={vehicles.length} />
        <StatCard title="Refills (30d)" value="48" />
        <StatCard title="Fuel Cost" value="$12,420" />
        <StatCard title="Avg Fuel (L/100km)" value="11.8" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-white rounded shadow-sm p-4">
            <h3 className="font-semibold mb-3">Live Map</h3>
            <div className="h-80"><MapLive /></div>
            <div className="mt-3 text-right"><Link to="/live" className="text-sky-600">Open full map</Link></div>
          </div>

          <div className="bg-white rounded shadow-sm p-4">
            <h3 className="font-semibold mb-3">Recent Telemetry</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex justify-between"><div>Truck 01</div><div className="text-xs text-slate-500">Speed 54 km/h</div></li>
              <li className="flex justify-between"><div>Van 02</div><div className="text-xs text-slate-500">Idle</div></li>
            </ul>
          </div>
        </div>

        <div className="space-y-4">
          <AlertsWidget />
          <div className="bg-white rounded shadow-sm p-4">
            <h4 className="font-semibold mb-2">Vehicles</h4>
            <ul className="space-y-2">
              {vehicles.map(v => <li key={v.id} className="flex justify-between"><div>{v.registrationNo || v.imei}</div><div className="text-xs text-slate-500">{v.make}</div></li>)}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}