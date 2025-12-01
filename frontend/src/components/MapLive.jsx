import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import api from '../api/axios';
import 'leaflet/dist/leaflet.css';

// Basic marker icon fix for leaflet in Vite
import L from 'leaflet';
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png'
});

export default function MapLive({ autoRefresh = true }) {
  const [vehicles, setVehicles] = useState([]);
  const [telemetry, setTelemetry] = useState({});

  async function load() {
    try {
      const resp = await api.get('/vehicles');
      setVehicles(resp.data.data || []);
      // load last telemetry per vehicle (naive)
      const tResp = await api.get('/telemetry'); // Note: we don't have endpoint to list telemetry; alternative: query per vehicle
    } catch (err) {}
  }

  useEffect(() => {
    load();
    if (!autoRefresh) return;
    const int = setInterval(() => load(), 5000);
    return () => clearInterval(int);
  }, []);

  const center = vehicles.length ? [vehicles[0].lastLat || 12.9716, vehicles[0].lastLng || 77.5946] : [12.9716, 77.5946];

  return (
    <MapContainer center={center} zoom={12} className="h-full w-full rounded">
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {vehicles.map(v => (v.lastLat && v.lastLng) ? (
        <Marker key={v.id} position={[v.lastLat, v.lastLng]}>
          <Popup>
            <div className="text-sm font-semibold">{v.registrationNo || v.imei}</div>
            <div className="text-xs text-slate-600">{v.make} {v.model}</div>
          </Popup>
        </Marker>
      ) : null)}
    </MapContainer>
  );
}