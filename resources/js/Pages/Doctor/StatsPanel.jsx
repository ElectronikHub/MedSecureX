import React from "react";
export default function StatsPanel({ stats }) {
  return (
    <div className="flex gap-4 mb-6">
      {stats.map((stat, i) => (
        <div
          key={i}
          className={`rounded-lg px-6 py-4 ${stat.color} ${stat.text} flex-1`}
        >
          <div className="font-bold text-2xl">{stat.value}</div>
          <div className="text-sm">{stat.label}</div>
        </div>
      ))}
    </div>
  );
}

