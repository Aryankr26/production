import React from 'react';
import { useAuthStore } from '../stores/auth';
export default function HeaderBar(){
  const { user, clearAuth } = useAuthStore();
  return (
    <header className="bg-white border-b">
      <div className="flex items-center justify-between px-4 py-3">
        <div className="text-lg font-semibold">Overview</div>
        <div className="flex items-center gap-3">
          <div className="text-sm text-slate-600 hidden sm:block">{user?.name ?? 'Company Admin'}</div>
          <button onClick={() => clearAuth()} className="text-sm text-red-600">Logout</button>
        </div>
      </div>
    </header>
  );
}