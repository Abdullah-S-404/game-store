'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import mockOrders from '@/data/orders';

const ProfilePage = () => {
    const { user, logout, isAuthenticated, isLoading } = useAuth();
    const router = useRouter();

    if (isLoading) {
        return <div className="min-h-screen bg-black flex items-center justify-center text-primary font-black uppercase tracking-widest">Loading Profiles...</div>;
    }

    if (!isAuthenticated) {
        if (typeof window !== 'undefined') router.push('/login');
        return null;
    }

    const userOrders = mockOrders.filter(order => order.userId === user?.id);

    return (
        <main className="min-h-screen bg-black flex flex-col">
            <Navbar />

            <div className="flex-grow pt-48 pb-24 px-6 max-w-7xl mx-auto w-full">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
                    {/* User Sidebar */}
                    <div className="lg:col-span-1">
                        <div className="bg-surface border border-white/10 rounded-2xl p-8 text-center sticky top-32">
                            <div className="w-24 h-24 rounded-full bg-surface-light border-2 border-primary mx-auto mb-6 flex items-center justify-center overflow-hidden">
                                {user?.avatar ? (
                                    <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                                ) : (
                                    <span className="text-3xl font-black">{user?.name[0]}</span>
                                )}
                            </div>
                            <h2 className="text-white text-2xl font-black uppercase tracking-tighter mb-1">{user?.name}</h2>
                            <p className="text-gray-500 text-xs font-bold uppercase tracking-widest mb-8">{user?.email}</p>

                            <div className="space-y-3 pt-8 border-t border-white/5">
                                <button className="w-full py-3 bg-white/5 hover:bg-white/10 text-white text-xs font-black uppercase tracking-widest rounded transition-all">
                                    Edit Profile
                                </button>
                                <button
                                    onClick={logout}
                                    className="w-full py-3 bg-error/10 hover:bg-error/20 text-error text-xs font-black uppercase tracking-widest rounded transition-all"
                                >
                                    Log Out
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Order History */}
                    <div className="lg:col-span-3">
                        <h1 className="text-white text-4xl font-black uppercase tracking-tighter mb-8 pl-4 border-l-4 border-primary">Order History</h1>

                        {userOrders.length > 0 ? (
                            <div className="space-y-6">
                                {userOrders.map((order) => (
                                    <div key={order.id} className="bg-surface border border-white/10 rounded-xl overflow-hidden hover:border-primary/30 transition-all">
                                        <div className="bg-white/5 px-6 py-4 flex justify-between items-center border-b border-white/5">
                                            <div>
                                                <p className="text-[10px] text-gray-500 font-bold uppercase tracking-[0.2em] mb-1">Order ID</p>
                                                <p className="text-white font-mono text-sm uppercase">#{order.id}</p>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-[10px] text-gray-500 font-bold uppercase tracking-[0.2em] mb-1">Date</p>
                                                <p className="text-white font-bold text-sm">{new Date(order.date).toLocaleDateString()}</p>
                                            </div>
                                        </div>

                                        <div className="p-6">
                                            {order.items.map((item, idx) => (
                                                <div key={idx} className="flex items-center gap-4 mb-4 last:mb-0">
                                                    <div className="w-12 h-16 bg-black rounded overflow-hidden relative flex-shrink-0">
                                                        {item.image && <img src={item.image} alt={item.title} className="w-full h-full object-cover" />}
                                                    </div>
                                                    <div>
                                                        <p className="text-white font-bold uppercase text-sm">{item.title}</p>
                                                        <p className="text-gray-500 text-xs font-bold uppercase tracking-widest">Qty: {item.quantity}</p>
                                                    </div>
                                                    <div className="ml-auto text-white font-black">
                                                        ${(item.price * item.quantity).toFixed(2)}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>

                                        <div className="px-6 py-4 bg-white/5 flex justify-between items-center border-t border-white/5">
                                            <div className="flex items-center space-x-2">
                                                <div className={`w-2 h-2 rounded-full ${order.status === 'completed' ? 'bg-primary shadow-[0_0_8px_var(--primary)]' : 'bg-yellow-500'}`} />
                                                <span className="text-[10px] text-white font-bold uppercase tracking-widest">{order.status}</span>
                                            </div>
                                            <div className="text-right">
                                                <span className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mr-4">Total Paid</span>
                                                <span className="text-xl font-black text-primary">${order.total.toFixed(2)}</span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="bg-surface border border-dashed border-white/10 rounded-2xl py-24 text-center">
                                <p className="text-gray-500 font-bold uppercase tracking-widest mb-6">No combat records found</p>
                                <Link href="/games" className="btn-primary-glow px-8 py-3 uppercase tracking-widest">
                                    Start Shopping
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <Footer />
        </main>
    );
};

export default ProfilePage;
