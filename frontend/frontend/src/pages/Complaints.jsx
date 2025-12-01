import React, { useEffect, useState } from 'react';
import api from '../api/axios';
import Table from '../components/Table';
import StatCard from '../components/StatCard';

export default function Complaints() {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    type: 'other',
    priority: 'medium',
    subject: '',
    description: ''
  });
  const [vehicles, setVehicles] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    try {
      setLoading(true);
      const [complaintsRes, vehiclesRes] = await Promise.all([
        api.get('/complaints'),
        api.get('/vehicles')
      ]);
      setComplaints(complaintsRes.data.data || []);
      setVehicles(vehiclesRes.data.data || []);
    } catch (err) {
      console.error('Load complaints error', err);
    } finally {
      setLoading(false);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await api.post('/complaints', formData);
      setShowForm(false);
      setFormData({ type: 'other', priority: 'medium', subject: '', description: '' });
      loadData();
    } catch (err) {
      alert(err?.response?.data?.error || 'Failed to create complaint');
    }
  }

  const columns = [
    { key: 'subject', title: 'Subject' },
    { key: 'type', title: 'Type', render: (r) => (
      <span className="capitalize px-2 py-1 rounded text-xs bg-slate-100">{r.type?.replace('_', ' ')}</span>
    )},
    { key: 'priority', title: 'Priority', render: (r) => (
      <span className={`capitalize px-2 py-1 rounded text-xs ${
        r.priority === 'critical' ? 'bg-red-100 text-red-700' :
        r.priority === 'high' ? 'bg-orange-100 text-orange-700' :
        r.priority === 'medium' ? 'bg-yellow-100 text-yellow-700' :
        'bg-green-100 text-green-700'
      }`}>{r.priority}</span>
    )},
    { key: 'status', title: 'Status', render: (r) => (
      <span className={`capitalize px-2 py-1 rounded text-xs ${
        r.status === 'resolved' || r.status === 'closed' ? 'bg-green-100 text-green-700' :
        r.status === 'in_progress' ? 'bg-blue-100 text-blue-700' :
        'bg-yellow-100 text-yellow-700'
      }`}>{r.status?.replace('_', ' ')}</span>
    )},
    { key: 'createdAt', title: 'Created', render: (r) => new Date(r.createdAt).toLocaleString() },
    { key: 'response', title: 'Response', render: (r) => r.response || '-' }
  ];

  const openCount = complaints.filter(c => c.status === 'open').length;
  const inProgressCount = complaints.filter(c => c.status === 'in_progress').length;
  const resolvedCount = complaints.filter(c => c.status === 'resolved' || c.status === 'closed').length;

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Complaints</h2>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-sky-600 text-white px-4 py-2 rounded text-sm hover:bg-sky-700"
        >
          {showForm ? 'Cancel' : 'New Complaint'}
        </button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <StatCard title="Total" value={complaints.length} />
        <StatCard title="Open" value={openCount} />
        <StatCard title="In Progress" value={inProgressCount} />
        <StatCard title="Resolved" value={resolvedCount} />
      </div>

      {showForm && (
        <div className="bg-white rounded shadow-sm p-4">
          <h3 className="font-semibold mb-3">Create New Complaint</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-slate-600 mb-1">Type</label>
                <select
                  className="w-full border rounded px-3 py-2 text-sm"
                  value={formData.type}
                  onChange={(e) => setFormData({...formData, type: e.target.value})}
                >
                  <option value="fuel_theft">Fuel Theft</option>
                  <option value="tyre_issue">Tyre Issue</option>
                  <option value="document_expired">Document Expired</option>
                  <option value="geofence_violation">Geofence Violation</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div>
                <label className="block text-xs text-slate-600 mb-1">Priority</label>
                <select
                  className="w-full border rounded px-3 py-2 text-sm"
                  value={formData.priority}
                  onChange={(e) => setFormData({...formData, priority: e.target.value})}
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                  <option value="critical">Critical</option>
                </select>
              </div>
            </div>
            <div>
              <label className="block text-xs text-slate-600 mb-1">Vehicle (optional)</label>
              <select
                className="w-full border rounded px-3 py-2 text-sm"
                value={formData.vehicleId || ''}
                onChange={(e) => setFormData({...formData, vehicleId: e.target.value || undefined})}
              >
                <option value="">Select vehicle...</option>
                {vehicles.map(v => (
                  <option key={v.id} value={v.id}>{v.registrationNo || v.imei}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs text-slate-600 mb-1">Subject *</label>
              <input
                type="text"
                required
                className="w-full border rounded px-3 py-2 text-sm"
                value={formData.subject}
                onChange={(e) => setFormData({...formData, subject: e.target.value})}
                placeholder="Brief summary of the issue"
              />
            </div>
            <div>
              <label className="block text-xs text-slate-600 mb-1">Description</label>
              <textarea
                className="w-full border rounded px-3 py-2 text-sm"
                rows={4}
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                placeholder="Detailed description of the issue..."
              />
            </div>
            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="px-4 py-2 border rounded text-sm hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-sky-600 text-white px-4 py-2 rounded text-sm hover:bg-sky-700"
              >
                Submit Complaint
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="bg-white rounded shadow-sm p-4">
        <h3 className="font-semibold mb-3">All Complaints</h3>
        {loading ? (
          <div className="text-center py-8 text-slate-500">Loading...</div>
        ) : complaints.length === 0 ? (
          <div className="text-center py-8 text-slate-500">No complaints found</div>
        ) : (
          <Table columns={columns} data={complaints} />
        )}
      </div>
    </div>
  );
}
