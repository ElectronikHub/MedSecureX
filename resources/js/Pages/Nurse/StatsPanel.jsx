import React, { useState } from 'react';

export default function StatsPanel({ stats, onAdd, onUpdate, onDelete }) {
    const [editingStat, setEditingStat] = useState(null);
    const [newStat, setNewStat] = useState({ label: '', value: '', color: '', text: '' });

    // Add Stat
    const handleAdd = () => {
        if (!newStat.label || !newStat.value) {
            alert('Please provide both label and value.');
            return;
        }
        // Assign default colors if empty
        const statToAdd = {
            ...newStat,
            id: Date.now(),
            color: newStat.color || 'bg-blue-100',
            text: newStat.text || 'text-blue-700',
            value: Number(newStat.value),
        };
        onAdd(statToAdd);
        setNewStat({ label: '', value: '', color: '', text: '' });
    };

    // Edit Stat
    const handleUpdate = () => {
        if (!editingStat.label || !editingStat.value) {
            alert('Please provide both label and value.');
            return;
        }
        onUpdate({
            ...editingStat,
            value: Number(editingStat.value),
        });
        setEditingStat(null);
    };

    // Delete Stat
    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this stat?')) {
            onDelete(id);
        }
    };

    return (
        <div className="mb-8">
            {/* Add New Stat Section */}
            <div className="mb-6 flex flex-wrap gap-2 items-center">
                <input
                    type="text"
                    placeholder="Label"
                    value={newStat.label}
                    onChange={e => setNewStat(s => ({ ...s, label: e.target.value }))}
                    className="border rounded px-2 py-1 w-40"
                />
                <input
                    type="number"
                    placeholder="Value"
                    value={newStat.value}
                    onChange={e => setNewStat(s => ({ ...s, value: e.target.value }))}
                    className="border rounded px-2 py-1 w-24"
                />
                <select
                    value={newStat.color}
                    onChange={e => setNewStat(s => ({ ...s, color: e.target.value }))}
                    className="border rounded px-2 py-1 w-40"
                >
                    <option value="">Select Background Color</option>
                    <option value="bg-blue-100">Blue</option>
                    <option value="bg-green-100">Green</option>
                    <option value="bg-yellow-100">Yellow</option>
                    <option value="bg-red-100">Red</option>
                    <option value="bg-purple-100">Purple</option>
                </select>
                <select
                    value={newStat.text}
                    onChange={e => setNewStat(s => ({ ...s, text: e.target.value }))}
                    className="border rounded px-2 py-1 w-40"
                >
                    <option value="">Select Text Color</option>
                    <option value="text-blue-700">Blue</option>
                    <option value="text-green-700">Green</option>
                    <option value="text-yellow-700">Yellow</option>
                    <option value="text-red-700">Red</option>
                    <option value="text-purple-700">Purple</option>
                </select>
                <button
                    onClick={handleAdd}
                    className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700 transition"
                >
                    Add Stat
                </button>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {stats.map((stat) => (
                    <div key={stat.id} className={`rounded-lg p-4 shadow ${stat.color}`}>
                        {editingStat && editingStat.id === stat.id ? (
                            <div>
                                <input
                                    type="text"
                                    value={editingStat.label}
                                    onChange={e => setEditingStat(s => ({ ...s, label: e.target.value }))}
                                    className="border rounded px-2 py-1 mb-2 w-full"
                                />
                                <input
                                    type="number"
                                    value={editingStat.value}
                                    onChange={e => setEditingStat(s => ({ ...s, value: e.target.value }))}
                                    className="border rounded px-2 py-1 mb-2 w-full"
                                />
                                <select
                                    value={editingStat.color}
                                    onChange={e => setEditingStat(s => ({ ...s, color: e.target.value }))}
                                    className="border rounded px-2 py-1 mb-2 w-full"
                                >
                                    <option value="bg-blue-100">Blue</option>
                                    <option value="bg-green-100">Green</option>
                                    <option value="bg-yellow-100">Yellow</option>
                                    <option value="bg-red-100">Red</option>
                                    <option value="bg-purple-100">Purple</option>
                                </select>
                                <select
                                    value={editingStat.text}
                                    onChange={e => setEditingStat(s => ({ ...s, text: e.target.value }))}
                                    className="border rounded px-2 py-1 mb-2 w-full"
                                >
                                    <option value="text-blue-700">Blue</option>
                                    <option value="text-green-700">Green</option>
                                    <option value="text-yellow-700">Yellow</option>
                                    <option value="text-red-700">Red</option>
                                    <option value="text-purple-700">Purple</option>
                                </select>
                                <div className="flex gap-2">
                                    <button
                                        onClick={handleUpdate}
                                        className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 transition"
                                    >
                                        Save
                                    </button>
                                    <button
                                        onClick={() => setEditingStat(null)}
                                        className="bg-gray-400 text-white px-3 py-1 rounded hover:bg-gray-500 transition"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <>
                                <div className={`text-2xl font-bold ${stat.text}`}>{stat.value}</div>
                                <div className="text-gray-600">{stat.label}</div>
                                <div className="mt-3 flex gap-4">
                                    <button
                                        onClick={() => setEditingStat(stat)}
                                        className="text-blue-600 hover:underline"
                                        aria-label={`Edit stat ${stat.label}`}
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDelete(stat.id)}
                                        className="text-red-600 hover:underline"
                                        aria-label={`Delete stat ${stat.label}`}
                                    >
                                        Delete
                                    </button>
                                </div>
                            </>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}
