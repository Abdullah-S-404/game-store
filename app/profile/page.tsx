'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useAuth } from '@/context/AuthContext';
import Navbar from '@/components/Navbar';
import ConfirmModal from '@/components/ConfirmModal';
import Link from 'next/link';
import {
    User as UserIcon,
    ShoppingBag,
    Settings,
    LogOut,
    Gamepad2,
    ChevronRight,
    Mail,
    Edit2,
    CheckCircle2,
    AlertCircle,
    ArrowRight,
    Link as LinkIcon,
    Lock
} from 'lucide-react';
import games from '@/data/games';

type TabType = 'overview' | 'orders' | 'settings';

const ProfilePage = () => {
    const { user, logout, updateUser, deleteAccount, isAuthenticated, isLoading, orders } = useAuth();
    const router = useRouter();
    const [activeTab, setActiveTab] = useState<TabType>('overview');

    // Settings form state
    const [newName, setNewName] = useState(user?.name || '');
    const [newEmail, setNewEmail] = useState(user?.email || '');
    const [newPassword, setNewPassword] = useState('');
    const [updateStatus, setUpdateStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    // Sync form with user data when it changes (session transition)
    useEffect(() => {
        if (user) {
            setNewName(user.name);
            setNewEmail(user.email);
        }
    }, [user?.id]);

    if (isLoading) {
        return (
            <div className="min-h-screen bg-surface flex items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
                    <p className="text-primary font-gaming uppercase tracking-widest text-sm">Synchronizing Data...</p>
                </div>
            </div>
        );
    }

    if (!isAuthenticated) {
        if (typeof window !== 'undefined') router.push('/login');
        return null;
    }

    const userOrders = orders;

    const handleUpdateProfile = async (e: React.FormEvent) => {
        e.preventDefault();
        setUpdateStatus('loading');
        try {
            const success = await updateUser(newName, newEmail, newPassword || undefined);
            if (success) {
                setUpdateStatus('success');
                setNewPassword(''); // Clear password field after success
                setTimeout(() => setUpdateStatus('idle'), 3000);
            } else {
                setUpdateStatus('error');
            }
        } catch {
            setUpdateStatus('error');
        }
    };

    return (
        <main className="min-h-screen bg-surface flex flex-col">
            <Navbar />

            {/* Profile Header / Banner */}
            <div className="relative h-64 w-full bg-gradient-to-b from-surface via-surface-light to-surface">
                <div className="absolute inset-0 opacity-20">
                    <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,var(--primary)_0%,transparent_70%)] opacity-30 blur-3xl animate-pulse" />
                </div>
                <div className="max-w-7xl mx-auto px-6 h-full flex items-end pb-8 relative z-10">
                    <div className="flex flex-col md:flex-row items-center md:items-end gap-6 text-center md:text-left">
                        <div className="w-32 h-32 rounded-2xl bg-black overflow-hidden shadow-[0_0_30px_rgba(0,255,136,0.2)] transition-transform hover:scale-105 duration-500">
                            {user?.avatar ? (
                                <Image
                                    src={user.avatar}
                                    alt={user.name}
                                    width={128}
                                    height={128}
                                    className="w-full h-full object-cover"
                                    unoptimized={true}
                                />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center text-4xl font-gaming text-primary">
                                    {user?.name[0]}
                                </div>
                            )}
                        </div>
                        <div className="pb-2">
                            <div className="flex items-center gap-3 mb-1 justify-center md:justify-start">
                                <h1 className="text-white text-4xl font-gaming uppercase tracking-tighter">{user?.name}</h1>
                                <span className="px-2 py-0.5 bg-primary/20 border border-primary/30 text-primary text-[10px] font-bold rounded uppercase tracking-widest">Elite Member</span>
                            </div>
                            <p className="text-gray-400 font-medium">{user?.email}</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 w-full -mt-6 pb-24 relative z-20 mt-10">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">

                    {/* Navigation Sidebar */}
                    <div className="lg:col-span-1">
                        <div className="bg-surface/80 backdrop-blur-xl border border-white/10 rounded-2xl p-4 sticky top-32 space-y-2">
                            <button
                                onClick={() => setActiveTab('overview')}
                                className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl text-sm font-gaming uppercase tracking-wider transition-all cursor-pointer
                                ${activeTab === 'overview' ? 'bg-primary text-black shadow-[0_0_20px_rgba(0,255,136,0.3)]' : 'text-gray-400 hover:bg-white/5 hover:text-white'}`}
                            >
                                <UserIcon size={18} />
                                Overview
                            </button>
                            <button
                                onClick={() => setActiveTab('orders')}
                                className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl text-sm font-gaming uppercase tracking-wider transition-all cursor-pointer
                                ${activeTab === 'orders' ? 'bg-primary text-black shadow-[0_0_20px_rgba(0,255,136,0.3)]' : 'text-gray-400 hover:bg-white/5 hover:text-white'}`}
                            >
                                <ShoppingBag size={18} />
                                Orders
                            </button>
                            <button
                                onClick={() => setActiveTab('settings')}
                                className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl text-sm font-gaming uppercase tracking-wider transition-all cursor-pointer
                                ${activeTab === 'settings' ? 'bg-primary text-black shadow-[0_0_20px_rgba(0,255,136,0.3)]' : 'text-gray-400 hover:bg-white/5 hover:text-white'}`}
                            >
                                <Settings size={18} />
                                Settings
                            </button>

                            <div className="my-4 border-t border-white/5 pt-4">
                                <button
                                    onClick={logout}
                                    className="w-full flex items-center gap-3 px-4 py-3.5 rounded-xl text-sm font-gaming uppercase tracking-wider text-error/80 hover:bg-error/10 hover:text-error transition-all cursor-pointer"
                                >
                                    <LogOut size={18} />
                                    Sign Out
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Main Content Area */}
                    <div className="lg:col-span-3 min-h-[500px]">

                        {/* TAB: OVERVIEW */}
                        {activeTab === 'overview' && (
                            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                                {/* Recently Acquired Section */}
                                <div className="bg-surface-light/30 border border-white/10 rounded-2xl overflow-hidden">
                                    <div className="px-6 py-4 border-b border-white/10 flex justify-between items-center">
                                        <h4 className="text-white font-gaming uppercase tracking-widest text-sm">Recently Acquired</h4>
                                        <button onClick={() => setActiveTab('orders')} className='flex items-center gap-2 text-primary text-xs font-gaming uppercase tracking-wider hover:translate-x-2 transition-all duration-300 cursor-pointer'>
                                            <span>View All Orders</span>
                                            <ChevronRight />
                                        </button>
                                    </div>
                                    <div className="flex flex-col p-4 space-y-4">
                                        {(() => {
                                            // Flatten all items from all orders and sort by date
                                            const allGames = userOrders
                                                .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                                                .flatMap(order => order.items.map(item => {
                                                    const gameData = games.find(g => g.id === item.gameId);
                                                    return {
                                                        ...item,
                                                        purchaseDate: order.date,
                                                        seeMoreLink: gameData?.seeMoreLink || `/games/${item.gameId}`,
                                                        platform: gameData?.platforms || 'PC / CONSOLE'
                                                    };
                                                }));

                                            // Deduplicate by game title (in case of multiple purchases or different editions)
                                            const uniqueGames = Array.from(new Map(allGames.map(game => [game.title, game])).values());

                                            return uniqueGames.length > 0 ? (
                                                uniqueGames.slice(0, 5).map((game, index) => (
                                                    <Link href={game.seeMoreLink} key={`${game.title}-${index}`} className="flex hover:shadow-[0_0_20px_rgba(0,255,136,0.3)] cursor-pointer z-10 hover:-translate-y-2 transition-all duration-300 items-center gap-4 p-2 rounded-xl">
                                                        <div className="relative w-16 h-20 rounded-lg overflow-hidden border border-white/5 shadow-lg">
                                                            <Image
                                                                src={game.image}
                                                                alt={game.title}
                                                                fill
                                                                className="object-cover group-hover:scale-110 transition-transform duration-500"
                                                            />
                                                        </div>
                                                        <div className="flex-1">
                                                            <h5 className="text-white font-gaming text-sm mb-1">{game.title}</h5>
                                                            <div className="flex items-center gap-3">
                                                                <span className="text-[10px] text-gray-500 uppercase tracking-widest">
                                                                    {new Date(game.purchaseDate).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                                                                </span>
                                                                <span className="w-1 h-1 rounded-full bg-surface-light" />
                                                                <span className="text-[10px] text-primary font-bold uppercase tracking-widest flex items-center gap-1">
                                                                    <div className="w-1 h-1 rounded-full bg-primary font-gaming tracking-wider" />
                                                                    {game.platform}
                                                                </span>
                                                            </div>
                                                        </div>
                                                        <Link
                                                            href={game.seeMoreLink}
                                                            className="p-3 bg-white/5 text-gray-400 hover:text-primary hover:bg-primary/10 rounded-xl transition-all cursor-pointer group-hover:translate-x-1"
                                                        >
                                                            <ArrowRight size={18} />
                                                        </Link>
                                                    </Link>
                                                ))
                                            ) : (
                                                <div className="py-16 text-center space-y-4">
                                                    <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto">
                                                        <ShoppingBag size={24} className="text-primary" />
                                                    </div>
                                                    <p className="text-gray-400 font-gaming uppercase tracking-[0.2em] text-xs">Your library is empty</p>
                                                    <button
                                                        onClick={() => router.push('/games')}
                                                        className="btn-primary-glow max-w-[300px]"
                                                    >
                                                        Browse Games
                                                    </button>
                                                </div>
                                            );
                                        })()}
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* TAB: ORDERS */}
                        {activeTab === 'orders' && (
                            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                                <h4 className="text-white font-gaming uppercase tracking-[0.15em] text-lg pl-2 mb-6">Order History</h4>

                                {userOrders.length > 0 ? (
                                    userOrders.map((order) => (
                                        <div key={order.id} className="bg-surface-light/20 border border-white/10 rounded-2xl overflow-hidden group hover:border-primary/30 transition-all">
                                            <div className="px-6 py-4 bg-white/5 flex flex-wrap justify-between items-center gap-4 border-b border-white/5">
                                                <div className="flex items-center gap-6">
                                                    <div>
                                                        <p className="text-[10px] text-gray-500 font-black uppercase tracking-[0.2em] mb-1">Order Number</p>
                                                        <p className="text-white font-mono text-xs uppercase tracking-tighter">#{order.id}</p>
                                                    </div>
                                                    <div className="hidden sm:block">
                                                        <p className="text-[10px] text-gray-500 font-black uppercase tracking-[0.2em] mb-1">Date</p>
                                                        <p className="text-white font-bold text-xs">{new Date(order.date).toLocaleDateString()}</p>
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-4">
                                                    <div className="flex items-center gap-2 px-3 py-1 bg-black/40 rounded-full border border-white/5">
                                                        <div className={`w-1.5 h-1.5 rounded-full ${order.status === 'completed' ? 'bg-primary shadow-[0_0_8px_var(--primary)]' : 'bg-yellow-500'}`} />
                                                        <span className="text-[9px] text-white font-black uppercase tracking-[0.1em]">{order.status}</span>
                                                    </div>
                                                    <span className="text-primary font-gaming text-lg">${order.total.toFixed(2)}</span>
                                                </div>
                                            </div>

                                            <div className="p-6">
                                                {order.items.map((item, idx) => (
                                                    <div key={idx} className="flex items-center gap-4 mb-4 last:mb-0">
                                                        <div className="w-10 h-14 bg-black rounded border border-white/10 overflow-hidden relative flex-shrink-0">
                                                            <Image src={item.image} alt={item.title} fill className="object-cover" />
                                                        </div>
                                                        <div className="flex-grow">
                                                            <p className="text-white font-gaming uppercase text-xs tracking-wider">{item.title}</p>
                                                            <p className="text-gray-500 text-[10px] font-bold uppercase tracking-widest">Digital License Key</p>
                                                        </div>
                                                        <div className="text-right">
                                                            <p className="text-white text-xs font-black">${item.price.toFixed(2)}</p>
                                                            <p className="text-gray-500 text-[10px]">x{item.quantity}</p>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="bg-surface-light/30 border border-dashed border-white/10 rounded-2xl py-24 text-center">
                                        <ShoppingBag size={48} className="mx-auto text-gray-600 mb-6" />
                                        <p className="text-gray-500 font-gaming uppercase tracking-widest mb-8">No purchase history found</p>
                                        <button
                                            onClick={() => router.push('/games')}
                                            className="btn-primary-glow px-10 py-4 text-sm uppercase tracking-[0.2em]"
                                        >
                                            Explore Games
                                        </button>
                                    </div>
                                )}
                            </div>
                        )}

                        {/* TAB: SETTINGS */}
                        {activeTab === 'settings' && (
                            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                                <div className="bg-surface-light/30 border border-white/10 rounded-2xl p-8 max-w-2xl">
                                    <div className="flex items-center gap-3 mb-8">
                                        <div className="p-2 bg-primary/10 rounded-lg text-primary">
                                            <Settings size={20} />
                                        </div>
                                        <h4 className="text-white font-gaming uppercase tracking-widest text-lg">Account Settings</h4>
                                    </div>

                                    <form onSubmit={handleUpdateProfile} className="space-y-6">
                                        <div>
                                            <label className="block text-gray-500 text-[10px] font-black uppercase tracking-[0.2em] mb-3 pl-1">Full Name</label>
                                            <div className="relative">
                                                <UserIcon size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                                                <input
                                                    type="text"
                                                    value={newName}
                                                    onChange={(e) => setNewName(e.target.value)}
                                                    className="w-full bg-black border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white focus:border-primary outline-none transition-all font-medium"
                                                    placeholder="Enter your name"
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-gray-500 text-[10px] font-black uppercase tracking-[0.2em] mb-3 pl-1">Email Address</label>
                                            <div className="relative">
                                                <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                                                <input
                                                    type="email"
                                                    value={newEmail}
                                                    onChange={(e) => setNewEmail(e.target.value)}
                                                    className="w-full bg-black border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white focus:border-primary outline-none transition-all font-medium"
                                                    placeholder="Enter your email"
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-gray-500 text-[10px] font-black uppercase tracking-[0.2em] mb-3 pl-1">New Password</label>
                                            <div className="relative">
                                                <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                                                <input
                                                    type="password"
                                                    value={newPassword}
                                                    onChange={(e) => setNewPassword(e.target.value)}
                                                    className="w-full bg-black border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white focus:border-primary outline-none transition-all font-medium"
                                                    placeholder="Enter new password (optional)"
                                                />
                                            </div>
                                            <p className="text-[9px] text-gray-600 mt-2 ml-1">Leave blank to keep your current password</p>
                                        </div>

                                        <div className="pt-4 flex items-center gap-4">
                                            <button
                                                type="submit"
                                                disabled={updateStatus === 'loading'}
                                                className="btn-primary-glow px-10 py-4 text-sm uppercase tracking-[0.2em] disabled:opacity-50 min-w-[200px]"
                                            >
                                                {updateStatus === 'loading' ? 'Syncing...' : 'Save Changes'}
                                            </button>

                                            {updateStatus === 'success' && (
                                                <div className="flex items-center gap-2 text-primary text-xs font-bold uppercase tracking-wider animate-in fade-in zoom-in">
                                                    <CheckCircle2 size={16} />
                                                    Saved Successfully
                                                </div>
                                            )}

                                            {updateStatus === 'error' && (
                                                <div className="flex items-center gap-2 text-error text-xs font-bold uppercase tracking-wider animate-in fade-in zoom-in">
                                                    <AlertCircle size={16} />
                                                    Update Failed
                                                </div>
                                            )}
                                        </div>
                                    </form>

                                    <div className="mt-12 p-6 bg-error/5 border border-error/10 rounded-2xl">
                                        <h5 className="text-error font-gaming uppercase tracking-widest text-xs mb-2">Danger Zone</h5>
                                        <p className="text-gray-500 text-[10px] font-medium leading-relaxed mb-4">Deleting your account will permanently remove all your game licenses, order history, and personal data. This action cannot be undone.</p>
                                        <button
                                            onClick={() => setShowDeleteModal(true)}
                                            className="text-error hover:text-white border border-error/30 hover:bg-error px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all cursor-pointer"
                                        >
                                            Delete Account
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}

                    </div>
                </div>

                {/* Custom Confirmation Modal */}
                <ConfirmModal
                    isOpen={showDeleteModal}
                    onClose={() => setShowDeleteModal(false)}
                    onConfirm={async () => {
                        const success = await deleteAccount();
                        if (success) {
                            router.push('/');
                        }
                    }}
                    title="Terminate Account?"
                    message="Warning: This action is irreversible. All your game library, achievements, and order history will be permanently vaporized from our servers."
                    confirmText="Permanently Delete"
                    cancelText="Keep My Account"
                    type="danger"
                />
            </div>
        </main>
    );
};

export default ProfilePage;
