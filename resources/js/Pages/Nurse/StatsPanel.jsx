import React from 'react';

export default function StatsPanel({ stats }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      {stats.map((stat, idx) => (
        <div key={idx} className={`rounded-lg p-4 shadow ${stat.color}`}>
          <div className={`text-2xl font-bold ${stat.text}`}>{stat.value}</div>
          <div className="text-gray-600">{stat.label}</div>
          {/* <button className="mt-2 text-blue-600 underline text-sm">{stat.action}</button> */}
        </div>
      ))}
    </div>
  );
}

// This component displays a panel of statistics for the nurse.
// It takes a `stats` prop, which is an array of objects containing the following properties:
// - `value`: The numerical value of the statistic
// - `label`: A descriptive label for the statistic
// - `color`: A CSS class for the background color of the statistic box
// - `text`: A CSS class for the text color of the statistic value
// - `action`: A string that represents an action link or button (e.g., "View Details", "Update Stats")
//// The component renders each statistic in a grid layout, with each statistic displayed in a rounded box with padding and shadow.
// The `action` property is displayed as a clickable link below the statistic value,
// allowing the user to perform an action related to that statistic (e.g., view more details or update stats).
// The component is responsive, adjusting the layout based on the screen size (single column on small screens, four columns on larger screens).
// The `color` and `text` properties allow for customization of the appearance of each statistic box,
// making it easy to highlight different types of statistics (e.g., counts, percentages, etc.).
