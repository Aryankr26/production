import React from 'react';
export default function Table({ columns, data }) {
  return (
    <div className="bg-white rounded shadow-sm overflow-auto">
      <table className="min-w-full text-sm">
        <thead className="bg-slate-50">
          <tr>
            {columns.map(c => <th key={c.key} className="p-3 text-left">{c.title}</th>)}
          </tr>
        </thead>
        <tbody>
          {data.map((row, idx) => (
            <tr key={idx} className="border-t">
              {columns.map(c => <td key={c.key} className="p-3 align-top">{c.render ? c.render(row) : row[c.key]}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}