import React, { useState } from 'react';

// Define all possible roles here (adjust as needed)
const ALL_ROLES = ['admin', 'doctor', 'nurse', 'user', ''];

export default function UsersPanel({ users }) {
    const [editingUserId, setEditingUserId] = useState(null);
    const [selectedRole, setSelectedRole] = useState('');
    const [loading, setLoading] = useState(false);

    // Helper to get CSRF token from meta tag (Laravel default)
    const getCsrfToken = () => {
        const token = document.querySelector('meta[name="csrf-token"]');
        return token ? token.getAttribute('content') : '';
    };

    const startEditing = (user) => {
        setEditingUserId(user.id);
        setSelectedRole(user.role || '');
    };

    const cancelEditing = () => {
        setEditingUserId(null);
        setSelectedRole('');
    };

    const saveRole = async (userId) => {
        setLoading(true);
        try {
            const response = await fetch(`/admin/users/${userId}/role`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': getCsrfToken(),
                    'Accept': 'application/json',
                },
                body: JSON.stringify({ role: selectedRole }),
                credentials: 'same-origin',
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to update role');
            }

            // Optionally you can refresh the page or update state here
            // For now, just exit edit mode
            setEditingUserId(null);
            setSelectedRole('');
            alert('User role updated successfully');
        } catch (error) {
            alert('Error updating role: ' + error.message);
        } finally {
            setLoading(false);
        }
    };

    if (!users.length) {
        return (
            <div className="p-6 bg-white dark:bg-gray-800 rounded shadow mt-8 max-w-6xl mx-auto">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
                    All Users
                </h2>
                <p className="text-gray-600 dark:text-gray-300">No users found.</p>
            </div>
        );
    }

    return (
        <div className="p-6 bg-white dark:bg-gray-800 rounded shadow mt-8 max-w-6xl mx-auto overflow-x-auto">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
                All Users
            </h2>
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-700">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                            Name
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                            Email
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                            Role
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                            Status
                        </th>
                        <th className="px-6 py-3" /> {/* For action buttons */}
                    </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                    {users.map(user => (
                        <tr key={user.id}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100">
                                {user.name}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-300">
                                {user.email}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                                {editingUserId === user.id ? (
                                    <select
                                        value={selectedRole}
                                        onChange={e => setSelectedRole(e.target.value)}
                                        disabled={loading}
                                        className="rounded border-gray-300 dark:bg-gray-700 dark:text-white"
                                    >
                                        <option value="">No Role</option>
                                        {ALL_ROLES.filter(r => r !== '').map(role => (
                                            <option key={role} value={role}>
                                                {role.charAt(0).toUpperCase() + role.slice(1)}
                                            </option>
                                        ))}
                                    </select>
                                ) : (
                                    user.role || 'No Role'
                                )}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${user.statusColor}`}>
                                    {user.status}
                                </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                {editingUserId === user.id ? (
                                    <>
                                        <button
                                            onClick={() => saveRole(user.id)}
                                            disabled={loading}
                                            className="mr-2 text-green-600 hover:text-green-900"
                                        >
                                            {loading ? 'Saving...' : 'Save'}
                                        </button>
                                        <button
                                            onClick={cancelEditing}
                                            disabled={loading}
                                            className="text-red-600 hover:text-red-900"
                                        >
                                            Cancel
                                        </button>
                                    </>
                                ) : (
                                    <button
                                        onClick={() => startEditing(user)}
                                        className="text-blue-600 hover:text-blue-900"
                                    >
                                        Edit
                                    </button>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
