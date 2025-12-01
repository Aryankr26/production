import React, { useEffect, useState } from 'react';
import api from '../api/axios';
import MapLive from '../components/MapLive';
export default function Geofencing(){
  const [gfs, setGfs] = useState([]);
  useEffect(()=> api.get('/geofence').then(r => setGfs(r.data.data)).catch(()=>{}), []);
  return (
    <div className="space-y-4">
      <div className="bg-white p-4 rounded shadow-sm">
        <h3 className="font-semibold mb-3">Geofences</h3>
        <div className="h-80"><MapLive /></div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {gfs.map(g => <div key={g.id} className="bg-white p-4 rounded shadow-sm"><div className="font-medium">{g.name}</div><div className="text-xs text-slate-500">{g.type}</div></div>)}
      </div>
    </div>
  );
}