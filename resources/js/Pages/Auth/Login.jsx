import Checkbox from '@/Components/Checkbox';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <GuestLayout>
            <Head title="Log in" />
            <div className="flex flex-col bg-gradient-to-br from-blue-50 to-blue-100">
                {/* Header */}
                <header className="w-full flex items-center justify-between px-4 md:px-12 py-6 bg-white">
                    <div className="text-xl font-bold text-blue-700">MedSecureX</div>
                    <nav className="flex space-x-6 text-sm">
                        <Link href={route('login')} className="text-gray-700 hover:text-blue-700">Log in</Link>
                        <Link href={route('register')} className="text-gray-700 hover:text-blue-700">Register</Link>
                    </nav>
                </header>

                {/* Main Content */}
                <main className="flex-1 flex flex-col items-center justify-center px-4">
                    <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8 mt-8 mb-8">
                        <div className="flex flex-col items-center mb-6">
                            <span className="text-2xl font-bold text-blue-700">Welcome Back</span>
                            <span className="text-sm text-gray-500 mt-1 text-center">
                                Secure, time-based access for healthcare professionals.
                            </span>
                        </div>
                        {status && (
                            <div className="mb-4 text-sm font-medium text-green-600 text-center">
                                {status}
                            </div>
                        )}
                        <form onSubmit={submit} className="space-y-5">
                            <div>
                                <InputLabel htmlFor="email" value="Email" />
                                <TextInput
                                    id="email"
                                    type="email"
                                    name="email"
                                    value={data.email}
                                    className="mt-1 block w-full"
                                    autoComplete="username"
                                    isFocused={true}
                                    onChange={(e) => setData('email', e.target.value)}
                                />
                                <InputError message={errors.email} className="mt-2" />
                            </div>
                            <div>
                                <InputLabel htmlFor="password" value="Password" />
                                <TextInput
                                    id="password"
                                    type="password"
                                    name="password"
                                    value={data.password}
                                    className="mt-1 block w-full"
                                    autoComplete="current-password"
                                    onChange={(e) => setData('password', e.target.value)}
                                />
                                <InputError message={errors.password} className="mt-2" />
                            </div>
                            <div className="flex items-center justify-between">
                                <label className="flex items-center">
                                    <Checkbox
                                        name="remember"
                                        checked={data.remember}
                                        onChange={(e) => setData('remember', e.target.checked)}
                                    />
                                    <span className="ms-2 text-sm text-gray-600">Remember me</span>
                                </label>
                                {canResetPassword && (
                                    <Link
                                        href={route('password.request')}
                                        className="text-sm text-blue-600 hover:underline"
                                    >
                                        Forgot password?
                                    </Link>
                                )}
                            </div>
                            <PrimaryButton className="w-full" disabled={processing}>
                                Log in
                            </PrimaryButton>
                        </form>
                    </div>
                </main>

                {/* Footer */}
                <footer className="text-center text-xs text-gray-400 py-4">
                    © {new Date().getFullYear()} MedSecureX. All rights reserved.
                </footer>
            </div>
        </GuestLayout>
    );
}

// This code is a complete login page for a healthcare application using React and Inertia.js.
// It includes a header with navigation links, a main content area with a login form, and
// a footer with copyright information. The form allows users to enter their email and password,
// with options for remembering the login and resetting the password. The layout is styled with
// a gradient background and responsive design principles to ensure it looks good on various screen sizes.
