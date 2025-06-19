import React from "react";
export default function TimelinePanel({ timeline }) {
  return (
    <div className="bg-white rounded-lg shadow p-4 mb-6">
      <h2 className="font-semibold text-lg mb-2">Timeline</h2>
      <ul>
        {timeline.map((item, idx) => (
          <li key={idx} className="mb-2">
            <span className="font-semibold text-blue-700">{item.time}</span>{" "}
            <span className="text-gray-700">{item.event}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
