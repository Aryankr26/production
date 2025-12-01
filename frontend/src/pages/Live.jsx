import React from 'react';
import MapLive from '../components/MapLive';

export default function Live(){
  return (
    <div className="space-y-4">
      <div className="bg-white rounded shadow-sm p-4">
        <h3 className="font-semibold mb-3">Live Tracking</h3>
        <div className="h-[70vh]"><MapLive /></div>
      </div>
    </div>
  );
}