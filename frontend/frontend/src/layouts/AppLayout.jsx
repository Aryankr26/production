import React from 'react';
import Sidebar from '../components/Sidebar';
import HeaderBar from '../components/HeaderBar';
import MobileBottomNav from '../components/MobileBottomNav';
import { Outlet } from 'react-router-dom';

export default function AppLayout(){
  return (
    <div className="min-h-screen flex bg-slate-50">
      <aside className="hidden md:block w-64 sticky top-0 h-screen">
        <Sidebar />
      </aside>
      <div className="flex-1 min-h-screen">
        <HeaderBar />
        <main className="p-4 md:p-6">
          <Outlet />
        </main>
      </div>
      <MobileBottomNav />
    </div>
  );
}