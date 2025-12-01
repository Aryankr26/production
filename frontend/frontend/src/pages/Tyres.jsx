import React, { useEffect, useState } from 'react';
import api from '../api/axios';
import Table from '../components/Table';

export default function Tyres(){
  const [vehicles, setVehicles] = useState([]);
  useEffect(()=> {
    api.get('/vehicles').then(r => setVehicles(r.data.data)).catch(()=>{});
  }, []);
  return (
    <div className="space-y-4">
      <div className="bg-white rounded shadow-sm p-4">
        <h3 className="font-semibold mb-3">Tyres</h3>
        <div className="text-sm text-slate-600">Install or remove tyres and review history</div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {vehicles.map(v => (
          <div key={v.id} className="bg-white p-4 rounded shadow-sm">
            <div className="font-medium">{v.registrationNo || v.imei}</div>
            <div className="text-xs text-slate-500">{v.make} {v.model}</div>
          </div>
        ))}
      </div>
    </div>
  );
}