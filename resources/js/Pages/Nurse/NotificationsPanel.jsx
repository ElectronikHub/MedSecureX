import React from 'react';

const iconMap = {
  alert: "🔴",
  lab: "🧪",
  med: "💊",
  update: "🔔"
};

export default function NotificationsPanel({ notifications }) {
  return (
    <div className="bg-white rounded-lg shadow p-4">
      <h3 className="font-semibold text-lg mb-4 text-black">Notifications</h3>
      <div className="space-y-3">
        {notifications.map((n, idx) => (
          <div key={idx} className="flex items-start space-x-2">
            <span className="text-xl">{iconMap[n.type]}</span>
            <div>
              <div className={`font-semibold ${n.type === 'alert' ? 'text-red-600' : n.type === 'lab' ? 'text-blue-600' : n.type === 'med' ? 'text-yellow-600' : 'text-green-600'}`}>
                {n.title}
              </div>
              <div className="text-sm text-gray-700">{n.message}</div>
              <div className="text-xs text-gray-400">{n.time}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}


//This component gives users a quick, visually clear summary of important updates and alerts in your MedSecureX system!
