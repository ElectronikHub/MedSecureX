import React, { useState } from 'react';

const ALL_ROLES = ['admin', 'doctor', 'nurse', 'user'];
const ALL_STATUSES = ['Active', 'Retired']; // Add more statuses as needed

export default function UsersPanel({ users: initialUsers }) {
    const [users, setUsers] = useState(initialUsers);
    const [editingUserId, setEditingUserId] = useState(null);
    const [selectedRole, setSelectedRole] = useState('');
    const [selectedStatus, setSelectedStatus] = useState('');
    const [loading, setLoading] = useState(false);
    const [filter, setFilter] = useState({ name: '', email: '', role: '' });

    const getStatusColorClass = (status) => {
        switch (status) {
            case 'Active':
                return 'bg-green-100 text-green-700';
            case 'Retired':
                return 'bg-yellow-900 text-yellow-100'; // brownish background with light text
            // Add other statuses if needed
            default:
                return 'bg-gray-100 text-gray-700';
        }
    };

    // Modal state for Add User
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);

    // New user form state
    const [newUser, setNewUser] = useState({
        name: '',
        email: '',
        role: '',
        password: '',
        password_confirmation: '',
        status: 'Active', // default new user status
    });
    const [tempPassword, setTempPassword] = useState('');
    const [adding, setAdding] = useState(false);
    const [addErrors, setAddErrors] = useState({});

    const getCsrfToken = () => {
        const token = document.querySelector('meta[name="csrf-token"]');
        return token ? token.getAttribute('content') : '';
    };

    const startEditing = (user) => {
        setEditingUserId(user.id);
        setSelectedRole(user.role || '');
        setSelectedStatus(user.status || 'Active');
    };

    const cancelEditing = () => {
        setEditingUserId(null);
        setSelectedRole('');
        setSelectedStatus('');
    };

    // Save updated role and status
    const saveUser = async (userId) => {
        setLoading(true);
        try {
            const response = await fetch(`/admin/users/${userId}/role`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': getCsrfToken(),
                    'Accept': 'application/json',
                },
                body: JSON.stringify({ role: selectedRole, status: selectedStatus }),
                credentials: 'same-origin',
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to update user');
            }

            setUsers((prev) =>
                prev.map((u) =>
                    u.id === userId ? { ...u, role: selectedRole, status: selectedStatus } : u
                )
            );

            cancelEditing();
            alert('User updated successfully');
        } catch (error) {
            alert('Error updating user: ' + error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilter((prev) => ({ ...prev, [name]: value }));
    };

    const filteredUsers = users.filter((user) => {
        return (
            user.name.toLowerCase().includes(filter.name.toLowerCase()) &&
            user.email.toLowerCase().includes(filter.email.toLowerCase()) &&
            (filter.role === '' || user.role === filter.role)
        );
    });

    const handleNewUserChange = (e) => {
        const { name, value } = e.target;
        setNewUser((prev) => ({ ...prev, [name]: value }));
    };

    const openAddModal = () => {
        const tempPass = generateTempPassword();
        setTempPassword(tempPass);
        setIsAddModalOpen(true);
        setNewUser({
            name: '',
            email: '',
            role: '',
            status: 'Active',
            password: tempPass,
            password_confirmation: tempPass,
        });
        setAddErrors({});
    };

    const closeAddModal = () => {
        setIsAddModalOpen(false);
        setAddErrors({});
    };

    const handleAddUser = async (e) => {
        e.preventDefault();
        setAdding(true);
        setAddErrors({});

        try {
            const response = await fetch('/admin/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': getCsrfToken(),
                    Accept: 'application/json',
                },
                body: JSON.stringify(newUser),
                credentials: 'same-origin',
            });

            const data = await response.json();

            if (!response.ok) {
                if (data.errors) {
                    setAddErrors(data.errors);
                } else {
                    alert(data.message || 'Failed to add user');
                }
                setAdding(false);
                return;
            }

            setUsers((prev) => [...prev, data.user]);
            alert('User added successfully');
            closeAddModal();
        } catch (error) {
            alert('Network error: Could not connect to the server.');
            console.error(error);
        } finally {
            setAdding(false);
        }
    };

    // Temporary password generator
    const generateTempPassword = (length = 10) => {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()';
        let pass = '';
        for (let i = 0; i < length; i++) {
            pass += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return pass;
    };

    return (
        <div className="p-6 bg-white dark:bg-gray-800 rounded shadow mt-8 max-w-6xl mx-auto overflow-x-auto">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
                All Users
            </h2>

            {/* Filter Inputs */}
            <div className="flex flex-wrap gap-4 mb-4">
                <input
                    type="text"
                    name="name"
                    placeholder="Filter by name"
                    value={filter.name}
                    onChange={handleFilterChange}
                    className="border rounded p-2 dark:bg-gray-700 dark:text-white"
                />
                <input
                    type="text"
                    name="email"
                    placeholder="Filter by email"
                    value={filter.email}
                    onChange={handleFilterChange}
                    className="border rounded p-2 dark:bg-gray-700 dark:text-white"
                />
                <select
                    name="role"
                    value={filter.role}
                    onChange={handleFilterChange}
                    className="border rounded p-2 dark:bg-gray-700 dark:text-white"
                >
                    <option value="">All Roles</option>
                    {ALL_ROLES.map((role) => (
                        <option key={role} value={role}>
                            {role.charAt(0).toUpperCase() + role.slice(1)}
                        </option>
                    ))}
                </select>
                <button
                    onClick={openAddModal}
                    className="ml-auto px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                    + Add New User
                </button>
            </div>

            {/* Users Table */}
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
                        <th className="px-6 py-3" />
                    </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                    {filteredUsers.length === 0 ? (
                        <tr>
                            <td colSpan={5} className="text-center text-gray-400 py-6">
                                No users found.
                            </td>
                        </tr>
                    ) : (
                        filteredUsers.map(user => (
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
                                            {ALL_ROLES.map(role => (
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
                                    {editingUserId === user.id ? (
                                        <select
                                            value={selectedStatus}
                                            onChange={e => setSelectedStatus(e.target.value)}
                                            disabled={loading}
                                            className="rounded border-gray-300 dark:bg-gray-700 dark:text-white"
                                        >
                                            {ALL_STATUSES.map(status => (
                                                <option key={status} value={status}>
                                                    {status}
                                                </option>
                                            ))}
                                        </select>
                                    ) : (
                                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColorClass(user.status)}`}>
                                            {user.status}
                                        </span>
                                    )}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                    {editingUserId === user.id ? (
                                        <>
                                            <button
                                                onClick={() => saveUser(user.id)}
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
                        ))
                    )}
                </tbody>
            </table>

            {/* Add User Modal */}
            {isAddModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 w-full max-w-md">
                        <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100">Add New User</h3>
                        <p className="mb-4 text-sm text-gray-700 dark:text-gray-300">
                            Temporary password generated: <strong>{tempPassword}</strong><br />
                            Please communicate this password securely to the new user.
                        </p>
                        <form onSubmit={handleAddUser} className="space-y-4">
                            {/* Name, Email, Role inputs same as before */}

                            <div>
                                <label className="block text-sm font-medium mb-1" htmlFor="name">Name</label>
                                <input
                                    id="name"
                                    name="name"
                                    type="text"
                                    value={newUser.name}
                                    onChange={handleNewUserChange}
                                    className={`w-full rounded border p-2 dark:bg-gray-700 dark:text-white ${addErrors.name ? 'border-red-500' : 'border-gray-300'}`}
                                    required
                                />
                                {addErrors.name && <p className="text-red-600 text-xs mt-1">{addErrors.name[0]}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-1" htmlFor="email">Email</label>
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    value={newUser.email}
                                    onChange={handleNewUserChange}
                                    className={`w-full rounded border p-2 dark:bg-gray-700 dark:text-white ${addErrors.email ? 'border-red-500' : 'border-gray-300'}`}
                                    required
                                />
                                {addErrors.email && <p className="text-red-600 text-xs mt-1">{addErrors.email[0]}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-1" htmlFor="role">Role</label>
                                <select
                                    id="role"
                                    name="role"
                                    value={newUser.role}
                                    onChange={handleNewUserChange}
                                    className={`w-full rounded border p-2 dark:bg-gray-700 dark:text-white ${addErrors.role ? 'border-red-500' : 'border-gray-300'}`}
                                    required
                                >
                                    <option value="">Select Role</option>
                                    {ALL_ROLES.map(role => (
                                        <option key={role} value={role}>
                                            {role.charAt(0).toUpperCase() + role.slice(1)}
                                        </option>
                                    ))}
                                </select>
                                {addErrors.role && <p className="text-red-600 text-xs mt-1">{addErrors.role[0]}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-1" htmlFor="status">Status</label>
                                <select
                                    id="status"
                                    name="status"
                                    value={newUser.status}
                                    onChange={handleNewUserChange}
                                    className={`w-full rounded border p-2 dark:bg-gray-700 dark:text-white ${addErrors.status ? 'border-red-500' : 'border-gray-300'}`}
                                    required
                                >
                                    {ALL_STATUSES.map(status => (
                                        <option key={status} value={status}>
                                            {status}
                                        </option>
                                    ))}
                                </select>
                                {addErrors.status && <p className="text-red-600 text-xs mt-1">{addErrors.status[0]}</p>}
                            </div>

                            {/* Password fields pre-filled and read-only */}
                            <div>
                                <label className="block text-sm font-medium mb-1" htmlFor="password">Password</label>
                                <input
                                    id="password"
                                    name="password"
                                    type="text"
                                    value={newUser.password}
                                    readOnly
                                    className="w-full rounded border p-2 bg-gray-100 dark:bg-gray-700 dark:text-white cursor-not-allowed"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-1" htmlFor="password_confirmation">Confirm Password</label>
                                <input
                                    id="password_confirmation"
                                    name="password_confirmation"
                                    type="text"
                                    value={newUser.password_confirmation}
                                    readOnly
                                    className="w-full rounded border p-2 bg-gray-100 dark:bg-gray-700 dark:text-white cursor-not-allowed"
                                />
                            </div>

                            <div className="flex justify-end gap-2">
                                <button
                                    type="button"
                                    onClick={closeAddModal}
                                    disabled={adding}
                                    className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={adding}
                                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                                >
                                    {adding ? 'Adding...' : 'Add User'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
