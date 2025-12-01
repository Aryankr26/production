import React from 'react';
import { NavLink } from 'react-router-dom';

const links = [
  { to: '/', label: 'Dashboard' },
  { to: '/live', label: 'Live Tracking' },
  { to: '/fuel', label: 'Fuel Reports' },
  { to: '/tyres', label: 'Tyres' },
  { to: '/documents', label: 'Documents' },
  { to: '/geofencing', label: 'Geofencing' },
  { to: '/complaints', label: 'Complaints' }
];

export default function Sidebar(){
  return (
    <div className="h-full bg-white border-r p-4">
      <div className="mb-6"><h1 className="text-xl font-semibold">Fleet Manager</h1></div>
      <nav className="space-y-2">
        {links.map(l => (
          <NavLink key={l.to} to={l.to} className={({isActive}) => `block px-3 py-2 rounded ${isActive ? 'bg-sky-50 text-sky-700' : 'text-slate-700 hover:bg-slate-100'}`}>
            {l.label}
          </NavLink>
        ))}
      </nav>
    </div>
  );
}