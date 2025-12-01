import React from 'react';
import { NavLink } from 'react-router-dom';
export default function MobileBottomNav(){
  return (
    <nav className="fixed bottom-0 left-0 right-0 md:hidden bg-white border-t">
      <div className="flex justify-around py-2 text-sm">
        <NavLink to="/" className={({isActive}) => isActive ? 'text-sky-600' : 'text-slate-600'}>Home</NavLink>
        <NavLink to="/live" className={({isActive}) => isActive ? 'text-sky-600' : 'text-slate-600'}>Live</NavLink>
        <NavLink to="/fuel" className={({isActive}) => isActive ? 'text-sky-600' : 'text-slate-600'}>Fuel</NavLink>
      </div>
    </nav>
  );
}