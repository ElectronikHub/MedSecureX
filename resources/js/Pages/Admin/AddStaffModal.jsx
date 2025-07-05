import React from "react";

export default function AddStaffModal({ open, onClose, form, errors, onChange, onSubmit }) {
    if (!open) return null;

    const copyPassword = () => {
        navigator.clipboard.writeText(form.password);
        alert("Temporary password copied to clipboard!");
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md">
                <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
                    Add New Staff
                </h2>
                <form onSubmit={onSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Name
                        </label>
                        <input
                            type="text"
                            name="name"
                            value={form.name}
                            onChange={onChange}
                            className="mt-1 block w-full rounded border-gray-300 dark:bg-gray-700 dark:text-white"
                        />
                        {errors.name && <p className="text-red-600 text-xs mt-1">{errors.name}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Email
                        </label>
                        <input
                            type="email"
                            name="email"
                            value={form.email}
                            onChange={onChange}
                            className="mt-1 block w-full rounded border-gray-300 dark:bg-gray-700 dark:text-white"
                        />
                        {errors.email && <p className="text-red-600 text-xs mt-1">{errors.email}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Role
                        </label>
                        <select
                            name="role"
                            value={form.role}
                            onChange={onChange}
                            className="mt-1 block w-full rounded border-gray-300 dark:bg-gray-700 dark:text-white"
                        >
                            <option value="doctor">Doctor</option>
                            <option value="nurse">Nurse</option>
                            <option value="admin">Admin</option>
                            <option value="user">User</option>
                        </select>
                        {errors.role && <p className="text-red-600 text-xs mt-1">{errors.role}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Temporary Password
                        </label>
                        <div className="flex gap-2 mt-1">
                            <input
                                type="text"
                                name="password"
                                value={form.password}
                                readOnly
                                className="flex-grow rounded border-gray-300 dark:bg-gray-700 dark:text-white"
                            />
                            <button
                                type="button"
                                onClick={copyPassword}
                                className="px-3 py-1 bg-blue-600 text-white rounded"
                            >
                                Copy
                            </button>
                        </div>
                        {errors.password && <p className="text-red-600 text-xs mt-1">{errors.password}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Confirm Password
                        </label>
                        <input
                            type="text"
                            name="password_confirmation"
                            value={form.password_confirmation}
                            readOnly
                            className="mt-1 block w-full rounded border-gray-300 dark:bg-gray-700 dark:text-white"
                        />
                        {errors.password_confirmation && (
                            <p className="text-red-600 text-xs mt-1">{errors.password_confirmation}</p>
                        )}
                    </div>

                    <div className="flex justify-end gap-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 rounded bg-gray-300 dark:bg-gray-600"
                        >
                            Cancel
                        </button>
                        <button type="submit" className="px-4 py-2 rounded bg-blue-600 text-white">
                            Create
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
