import React, { useState, useMemo } from 'react';

function LoginLogsTable({ logs }) {
    const [search, setSearch] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 5;

    // Filter logs by user name or remark
    const filteredLogs = useMemo(() => {
        return logs.filter(log =>
            log.user.name.toLowerCase().includes(search.toLowerCase()) ||
            (log.remark && log.remark.toLowerCase().includes(search.toLowerCase()))
        );
    }, [logs, search]);

    const totalPages = Math.ceil(filteredLogs.length / pageSize);

    const paginatedLogs = useMemo(() => {
        const start = (currentPage - 1) * pageSize;
        return filteredLogs.slice(start, start + pageSize);
    }, [filteredLogs, currentPage, pageSize]);

    // Reset page on search change
    React.useEffect(() => {
        setCurrentPage(1);
    }, [search]);

    return (
        <div className="max-w-7xl mx-auto p-4">
            <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
                Recent Login Logs
            </h2>

            <input
                type="search"
                placeholder="Search by user name or remark..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="w-full p-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                aria-label="Search login logs"
            />

            <div className="overflow-x-auto rounded-lg border border-gray-300 dark:border-gray-700">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                    <thead className="bg-gray-50 dark:bg-gray-800">
                        <tr>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                User
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Logged In At
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                IP Address
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Duty Status
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Remark
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
                        {paginatedLogs.length === 0 ? (
                            <tr>
                                <td colSpan="5" className="px-4 py-6 text-center text-gray-500 dark:text-gray-400">
                                    No logs found.
                                </td>
                            </tr>
                        ) : (
                            paginatedLogs.map(log => (
                                <tr key={log.id} className="hover:bg-gray-100 dark:hover:bg-gray-800">
                                    <td className="px-4 py-3 whitespace-nowrap text-gray-900 dark:text-white font-semibold">
                                        {log.user.name}
                                    </td>
                                    <td className="px-4 py-3 whitespace-nowrap text-gray-700 dark:text-gray-300">
                                        {new Date(log.logged_in_at).toLocaleString()}
                                    </td>
                                    <td className="px-4 py-3 whitespace-nowrap text-gray-700 dark:text-gray-300">
                                        {log.ip_address}
                                    </td>
                                    <td className="px-4 py-3 whitespace-nowrap">
                                        <span
                                            className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${log.duty_status === 'On Duty'
                                                ? 'bg-green-100 text-green-800 dark:bg-green-700 dark:text-green-100'
                                                : 'bg-red-100 text-red-800 dark:bg-red-700 dark:text-red-100'
                                                }`}
                                        >
                                            {log.duty_status}
                                        </span>
                                    </td>
                                    <td className="px-4 py-3 whitespace-normal text-yellow-700 dark:text-yellow-400 italic max-w-xs">
                                        {log.remark || '-'}
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
                <nav
                    className="flex justify-center items-center space-x-4 mt-6"
                    role="navigation"
                    aria-label="Pagination Navigation"
                >
                    <button
                        onClick={() => setCurrentPage(p => Math.max(p - 1, 1))}
                        disabled={currentPage === 1}
                        className={`px-4 py-2 rounded-md border ${currentPage === 1
                            ? 'cursor-not-allowed border-gray-300 text-gray-400'
                            : 'border-indigo-600 text-indigo-600 hover:bg-indigo-600 hover:text-white dark:hover:bg-indigo-500'
                            }`}
                        aria-disabled={currentPage === 1}
                        aria-label="Previous page"
                    >
                        Previous
                    </button>

                    <span className="text-gray-700 dark:text-gray-300">
                        Page {currentPage} of {totalPages}
                    </span>

                    <button
                        onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))}
                        disabled={currentPage === totalPages}
                        className={`px-4 py-2 rounded-md border ${currentPage === totalPages
                            ? 'cursor-not-allowed border-gray-300 text-gray-400'
                            : 'border-indigo-600 text-indigo-600 hover:bg-indigo-600 hover:text-white dark:hover:bg-indigo-500'
                            }`}
                        aria-disabled={currentPage === totalPages}
                        aria-label="Next page"
                    >
                        Next
                    </button>
                </nav>
            )}
        </div>
    );
}

export default LoginLogsTable;
