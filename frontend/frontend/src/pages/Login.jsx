import React, { useState } from 'react';
import api from '../api/axios';
import { useAuthStore } from '../stores/auth';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('admin@example.com');
  const [password, setPassword] = useState('adminpass');
  const [busy, setBusy] = useState(false);
  const setAuth = useAuthStore((s) => s.setAuth);
  const navigate = useNavigate();

  async function submit(e) {
    e.preventDefault();
    setBusy(true);
    try {
      const resp = await api.post('/auth/login', { email, password });
      const { token, user } = resp.data;
      setAuth(token, user);
      navigate('/');
    } catch (err) {
      alert(err?.response?.data?.error || 'Login failed');
    } finally { setBusy(false); }
  }

  return (
    <div className="w-full max-w-md">
      <div className="bg-white p-6 rounded shadow-sm">
        <h2 className="text-xl font-semibold mb-4">Sign in</h2>
        <form onSubmit={submit} className="space-y-3">
          <div>
            <label className="text-xs text-slate-600">Email</label>
            <input className="mt-1 block w-full border rounded px-3 py-2" value={email} onChange={(e)=>setEmail(e.target.value)} />
          </div>
          <div>
            <label className="text-xs text-slate-600">Password</label>
            <input type="password" className="mt-1 block w-full border rounded px-3 py-2" value={password} onChange={(e)=>setPassword(e.target.value)} />
          </div>
          <button disabled={busy} className="w-full bg-sky-600 text-white py-2 rounded">{busy ? 'Signing...' : 'Sign in'}</button>
        </form>
      </div>
    </div>
  );
}