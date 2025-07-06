import React, { useState } from "react";

// Modal component for adding staff
function AddStaffModal({ open, onClose, form, errors, onChange, onSubmit, loading }) {
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
                            required
                            disabled={loading}
                        />
                        {errors.name && (
                            <p className="text-red-600 text-xs mt-1">{errors.name}</p>
                        )}
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
                            required
                            disabled={loading}
                        />
                        {errors.email && (
                            <p className="text-red-600 text-xs mt-1">{errors.email}</p>
                        )}
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
                            required
                            disabled={loading}
                        >
                            <option value="doctor">Doctor</option>
                            <option value="nurse">Nurse</option>
                            <option value="admin">Admin</option>
                            <option value="user">User</option>
                        </select>
                        {errors.role && (
                            <p className="text-red-600 text-xs mt-1">{errors.role}</p>
                        )}
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
                                disabled={loading}
                            />
                            <button
                                type="button"
                                onClick={copyPassword}
                                className="px-3 py-1 bg-blue-600 text-white rounded"
                                disabled={loading}
                            >
                                Copy
                            </button>
                        </div>
                        {errors.password && (
                            <p className="text-red-600 text-xs mt-1">{errors.password}</p>
                        )}
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
                            disabled={loading}
                        />
                        {errors.password_confirmation && (
                            <p className="text-red-600 text-xs mt-1">
                                {errors.password_confirmation}
                            </p>
                        )}
                    </div>

                    <div className="flex justify-end gap-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 rounded bg-gray-300 dark:bg-gray-600"
                            disabled={loading}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 rounded bg-blue-600 text-white"
                            disabled={loading}
                        >
                            {loading ? "Creating..." : "Create"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default function StaffPanel({ doctors = [], nurses = [] }) {
    const [activeTab, setActiveTab] = useState("doctors");
    const safeDoctors = Array.isArray(doctors) ? doctors : [];
    const safeNurses = Array.isArray(nurses) ? nurses : [];

    const [modalOpen, setModalOpen] = useState(false);
    const [form, setForm] = useState({
        name: "",
        email: "",
        role: "doctor",
        password: "",
        password_confirmation: "",
    });
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);

    // Pagination states
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 6;

    // Show/hide retired staff
    const [showRetired, setShowRetired] = useState(false);

    const getCsrfToken = () => {
        const token = document.querySelector("meta[name='csrf-token']");
        return token ? token.getAttribute("content") : "";
    };

    const generateTempPassword = (length = 10) => {
        const chars =
            "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()";
        let password = "";
        for (let i = 0; i < length; i++) {
            password += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return password;
    };

    const openModal = () => {
        const tempPassword = generateTempPassword();
        setModalOpen(true);
        setForm({
            name: "",
            email: "",
            role: "doctor",
            password: tempPassword,
            password_confirmation: tempPassword,
        });
        setErrors({});
    };

    const closeModal = () => {
        setModalOpen(false);
        setErrors({});
    };

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const submitForm = async (e) => {
        e.preventDefault();
        setLoading(true);
        setErrors({});
        try {
            const response = await fetch("/admin/users", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "X-CSRF-TOKEN": getCsrfToken(),
                    Accept: "application/json",
                },
                body: JSON.stringify(form),
                credentials: "same-origin",
            });

            if (response.ok) {
                closeModal();
                window.location.reload(); // Or fetch updated staff list dynamically
            } else if (response.status === 422) {
                const data = await response.json();
                setErrors(data.errors || {});
            } else {
                alert("An error occurred while creating staff.");
            }
        } catch (error) {
            alert("Network error: " + error.message);
        } finally {
            setLoading(false);
        }
    };

    const getStatusColorClass = (status) => {
        switch (status) {
            case "Active":
                return "bg-green-100 text-green-700";
            case "Retired":
                return "bg-yellow-900 text-yellow-100"; // brownish background
            default:
                return "bg-gray-100 text-gray-700";
        }
    };

    // Filter retired staff if needed
    const filterRetired = (staff) =>
        showRetired ? staff : staff.filter((person) => person.status !== "Retired");

    // Paginate staff list
    const paginate = (staff) => {
        const start = (currentPage - 1) * pageSize;
        return staff.slice(start, start + pageSize);
    };

    // Render staff cards
    const renderStaffCards = (staff) =>
        staff.length === 0 ? (
            <p className="text-gray-500 col-span-full text-center py-10">
                No staff available.
            </p>
        ) : (
            paginate(staff).map((person) => (
                <div
                    key={person.id}
                    className="border rounded-lg p-3 flex flex-col gap-1"
                    title={`${person.name} - ${person.status}`}
                >
                    <div className="flex items-center gap-2">
                        <div className="rounded-full w-8 h-8 flex items-center justify-center font-bold bg-gray-200">
                            {person.initials || "N/A"}
                        </div>
                        <div>
                            <div className="font-medium text-black">{person.name || "Unknown"}</div>
                            <div className="text-xs text-gray-500">{person.dept || "Unknown Dept"}</div>
                        </div>
                        <span
                            className={`ml-auto px-2 py-0.5 rounded text-xs font-semibold ${getStatusColorClass(
                                person.status
                            )}`}
                        >
                            {person.status || "Unknown"}
                        </span>
                    </div>
                    <div className="text-sm text-gray-500">
                        Current Ward: {person.ward || "N/A"}
                    </div>
                </div>
            ))
        );

    // Calculate active counts for tabs
    const activeDoctors = safeDoctors.filter((d) => d.status === "Active");
    const activeNurses = safeNurses.filter((n) => n.status === "Active");

    // Calculate total pages for pagination
    const totalStaff = filterRetired(
        activeTab === "doctors" ? safeDoctors : safeNurses
    ).length;
    const totalPages = Math.ceil(totalStaff / pageSize);

    const handlePageChange = (page) => {
        if (page < 1 || page > totalPages) return;
        setCurrentPage(page);
    };

    return (
        <>
            <div className="bg-white rounded-lg shadow p-4 mt-6">
                <div className="flex items-center justify-between mb-4">
                    <div className="flex space-x-4">
                        <button
                            onClick={() => {
                                setActiveTab("doctors");
                                setCurrentPage(1);
                            }}
                            className={`px-4 py-2 rounded-t-lg font-semibold ${activeTab === "doctors"
                                    ? "bg-blue-600 text-white"
                                    : "bg-gray-200 text-black"
                                }`}
                        >
                            Doctors ({activeDoctors.length})
                        </button>
                        <button
                            onClick={() => {
                                setActiveTab("nurses");
                                setCurrentPage(1);
                            }}
                            className={`px-4 py-2 rounded-t-lg font-semibold ${activeTab === "nurses"
                                    ? "bg-blue-600 text-white"
                                    : "bg-gray-200 text-black"
                                }`}
                        >
                            Nurses ({activeNurses.length})
                        </button>
                    </div>
                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => setShowRetired(!showRetired)}
                            className="px-3 py-1 bg-gray-300 rounded"
                        >
                            {showRetired ? "Hide Retired" : "Show Retired"}
                        </button>
                        <button
                            onClick={openModal}
                            className="px-3 py-1 bg-blue-600 text-white rounded font-medium"
                        >
                            Add Staff
                        </button>
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {activeTab === "doctors"
                        ? renderStaffCards(filterRetired(safeDoctors))
                        : renderStaffCards(filterRetired(safeNurses))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                    <div className="flex justify-center items-center mt-6 space-x-2">
                        <button
                            onClick={() => handlePageChange(currentPage - 1)}
                            disabled={currentPage === 1}
                            className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
                        >
                            Previous
                        </button>
                        {[...Array(totalPages)].map((_, idx) => {
                            const page = idx + 1;
                            return (
                                <button
                                    key={page}
                                    onClick={() => handlePageChange(page)}
                                    className={`px-3 py-1 rounded ${page === currentPage
                                            ? "bg-blue-600 text-white"
                                            : "bg-gray-200"
                                        }`}
                                >
                                    {page}
                                </button>
                            );
                        })}
                        <button
                            onClick={() => handlePageChange(currentPage + 1)}
                            disabled={currentPage === totalPages}
                            className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
                        >
                            Next
                        </button>
                    </div>
                )}
            </div>

            <AddStaffModal
                open={modalOpen}
                onClose={closeModal}
                form={form}
                errors={errors}
                onChange={handleChange}
                onSubmit={submitForm}
                loading={loading}
            />
        </>
    );
}
