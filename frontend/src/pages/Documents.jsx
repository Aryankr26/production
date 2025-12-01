import React, { useEffect, useState } from 'react';
import api from '../api/axios';
import Table from '../components/Table';

export default function Documents(){
  const [vehicles, setVehicles] = useState([]);
  useEffect(()=> api.get('/vehicles').then(r => setVehicles(r.data.data)).catch(()=>{}), []);
  return (
    <div className="space-y-4">
      <div className="bg-white rounded shadow-sm p-4">
        <h3 className="font-semibold mb-3">Documents & Expiry</h3>
        <div className="text-sm text-slate-600">Expired or expiring documents will show alerts</div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {vehicles.map(v => (
          <div key={v.id} className="bg-white p-4 rounded shadow-sm">
            <div className="flex justify-between"><div className="font-medium">{v.registrationNo || v.imei}</div><div className="text-xs text-slate-500">{v.make}</div></div>
          </div>
        ))}
      </div>
    </div>
  );
}