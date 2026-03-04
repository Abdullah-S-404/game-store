'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const success = await login(email, password);
            if (success) {
                router.push('/');
            } else {
                setError('Invalid email or password. Hint: use any mock email and password123');
            }
        } catch {
            setError('An error occurred. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="min-h-screen bg-black flex flex-col">
            <Navbar />

            <div className="grow flex items-center justify-center px-6 pt-48 pb-32">
                <div className="w-full max-w-md bg-surface border border-white/10 rounded-2xl p-8 md:p-12 shadow-2xl">
                    <div className="text-center mb-10">
                        <h1 className="text-white text-4xl font-black uppercase tracking-tighter mb-2">Login</h1>
                        <p className="text-gray-400 text-sm font-bold uppercase tracking-widest">Welcome back, Soldier</p>
                    </div>

                    {error && (
                        <div className="bg-error/10 border border-error/50 text-error text-xs font-bold p-4 rounded-lg mb-6 uppercase tracking-wider text-center">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-gray-500 text-[10px] font-black uppercase tracking-[0.2em] mb-2 pl-1">Email Address</label>
                            <input
                                type="email"
                                required
                                className="w-full bg-black border border-white/10 rounded-lg py-4 px-4 text-white focus:border-primary outline-none transition-all font-mono"
                                placeholder="commander@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        <div>
                            <label className="block text-gray-500 text-[10px] font-black uppercase tracking-[0.2em] mb-2 pl-1">Password</label>
                            <input
                                type="password"
                                required
                                className="w-full bg-black border border-white/10 rounded-lg py-4 px-4 text-white focus:border-primary outline-none transition-all font-mono"
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full btn-primary py-5 text-sm font-black tracking-widest uppercase disabled:opacity-50"
                        >
                            {loading ? 'Authenticating...' : 'Enter the Arena'}
                        </button>
                    </form>

                    <div className="mt-8 text-center text-xs text-gray-500 font-bold uppercase tracking-widest">
                        Don&apos;t have an account?{' '}
                        <Link href="/register" className="text-primary hover:underline">Sign Up</Link>
                    </div>
                </div>
            </div>

            <Footer />
        </main>
    );
};

export default LoginPage;
