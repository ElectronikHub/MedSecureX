import React, { useState } from 'react';

function LoginLogs({ logs }) {
    const [search, setSearch] = useState('');

    // Filter logs by user name or remark (case-insensitive)
    const filteredLogs = logs.filter(log =>
        log.user.name.toLowerCase().includes(search.toLowerCase()) ||
        (log.remark && log.remark.toLowerCase().includes(search.toLowerCase()))
    );

    return (
        <div className="max-w-5xl mx-auto p-4">
            <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
                Recent Login Logs
            </h2>

            <input
                type="search"
                placeholder="Search by user name or remark..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="w-full p-3 mb-6 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                aria-label="Search login logs"
            />

            {filteredLogs.length === 0 ? (
                <p className="text-center text-gray-500 dark:text-gray-400">
                    No logs found.
                </p>
            ) : (
                filteredLogs.map(log => (
                    <div
                        key={log.id}
                        className={`bg-white dark:bg-gray-800 shadow rounded-lg p-5 mb-5 transition-transform transform hover:scale-[1.02]`}
                        role="region"
                        aria-labelledby={`log-user-${log.id}`}
                    >
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-3">
                            <h3
                                id={`log-user-${log.id}`}
                                className="text-lg font-semibold text-gray-900 dark:text-white"
                            >
                                {log.user.name}
                            </h3>
                            <time
                                dateTime={log.logged_in_at}
                                className="text-sm text-gray-500 dark:text-gray-400 mt-1 sm:mt-0"
                            >
                                {new Date(log.logged_in_at).toLocaleString()}
                            </time>
                        </div>

                        <p className="text-gray-700 dark:text-gray-300">
                            <strong>IP Address:</strong> {log.ip_address}
                        </p>

                        <p className="text-gray-700 dark:text-gray-300">
                            <strong>Duty Status:</strong>{' '}
                            <span
                                className={`font-medium ${log.duty_status === 'On Duty'
                                        ? 'text-green-600 dark:text-green-400'
                                        : 'text-red-600 dark:text-red-400'
                                    }`}
                            >
                                {log.duty_status}
                            </span>
                        </p>

                        {log.remark && (
                            <p className="mt-3 text-yellow-700 dark:text-yellow-400 italic">
                                <strong>Remark:</strong> {log.remark}
                            </p>
                        )}
                    </div>
                ))
            )}
        </div>
    );
}

export default LoginLogs;
