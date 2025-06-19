// resources/js/Components/Admin/StatCard.jsx
import React from "react";

export default function StatCard({ title, value, color }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow duration-300">
      <h2 className="text-lg font-semibold text-gray-700 mb-2">{title}</h2>
      <p className={`text-4xl font-bold ${color}`}>{value ?? 0}</p>
    </div>
  );
}

