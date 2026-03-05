'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import { Gamepad2, Search, ShoppingCart, Menu } from 'lucide-react';
import games from '@/data/games';
import { Game } from '@/types';

const Navbar: React.FC = () => {
    const { cartCount } = useCart();
    const { user, isAuthenticated, logout } = useAuth();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredGames, setFilteredGames] = useState<Game[]>([]);
    const [showResults, setShowResults] = useState(false);
    const searchInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        if (isSearchOpen && searchInputRef.current) {
            searchInputRef.current.focus();
        }
    }, [isSearchOpen]);

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            if (searchQuery.trim()) {
                const filtered = games.filter(game =>
                    game.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    game.genre.toLowerCase().includes(searchQuery.toLowerCase())
                );
                setFilteredGames(filtered.slice(0, 5)); // Show max 5 results
                setShowResults(true);
            } else {
                setFilteredGames([]);
                setShowResults(false);
            }
        }, 300); // Debounce search

        return () => clearTimeout(timeoutId);
    }, [searchQuery]);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            // Navigate to search results page
            window.location.href = `/games?search=${encodeURIComponent(searchQuery.trim())}`;
        }
    };

    const toggleSearch = () => {
        setIsSearchOpen(!isSearchOpen);
        if (!isSearchOpen) {
            setSearchQuery('');
        }
    };

    return (
        <>
            <nav className={`fixed w-full z-100 transition-all duration-500 ease-in-out animate-navbar-drop ${isScrolled
                ? 'bg-white/5 backdrop-blur-2xl border-white/10 shadow-xl py-4'
                : 'bg-transparent pt-4 px-4 mx-auto'
                }`}>
                <div className="w-full max-w-[1920px] mx-auto px-2 sm:px-12 md:px-16 lg:px-24 flex items-center justify-between">
                    {/* Logo */}
                    <span className="text-primary md:gap-2 text-xl md:text-3xl font-gaming font-black tracking-tighter hover:scale-105 transition-transform group flex items-center animate-logo-glow">
                        <Gamepad2 className='p-2 rounded-lg transition-colors w-10 h-10 text-primary' />
                        GAMESTORE
                    </span>

                    {/* Desktop Links */}
                    <div className="hidden gap-2 md:flex items-center space-x-6">
                        <Link href="/" className="font-gaming text-xs! tracking-[0.2em] nav-item-animate nav-anim-1">
                            <span className="nav-item-glitch">Home</span>
                        </Link>
                        <Link href="/games" className="font-gaming text-xs! tracking-[0.2em] nav-item-animate nav-anim-2">
                            <span className="nav-item-glitch">Store</span>
                        </Link>
                        <Link href="/about" className="font-gaming text-xs! tracking-[0.2em] nav-item-animate nav-anim-3">
                            <span className="nav-item-glitch">About</span>
                        </Link>
                        <Link href="/contact" className="font-gaming text-xs! tracking-[0.2em] nav-item-animate nav-anim-4">
                            <span className="nav-item-glitch">Contact</span>
                        </Link>
                    </div>

                    {/* Search & Actions */}
                    <div className="flex  gap-6 items-center">
                        <div className="hidden md:flex gap-2 items-center">
                            <button
                                onClick={toggleSearch}
                                className="text-white/70 hover:text-primary transition-all hover:scale-110 cursor-pointer"
                                aria-label="Search"
                            >
                                <Search strokeWidth={2.5} className='h-5' />
                            </button>
                            <Link href="/cart" className="relative text-white/70 hover:text-primary transition-all hover:scale-110 cursor-pointer">
                                <ShoppingCart size={25} strokeWidth={2.5} className='h-5' />
                                {cartCount > 0 && (
                                    <span className="absolute -top-2 -right-2 bg-primary text-black text-[9px] font-black px-1 rounded-full min-w-[16px] h-4 flex items-center justify-center animate-pulse">
                                        {cartCount}
                                    </span>
                                )}
                            </Link>
                        </div>

                        {/* Auth / User */}
                        {isAuthenticated ? (
                            <div className="flex gap-4 items-center">
                                <Link href="/profile" className="flex items-center justify-center">
                                    <div className="w-9 h-9 rounded-xl glass-effect flex items-center justify-center overflow-hidden hover:scale-110 transition-all duration-300 hover:border-primary transition-colors">
                                        {user?.avatar ? (
                                            <Image
                                                src={user.avatar}
                                                alt={user.name}
                                                width={36}
                                                height={36}
                                                className="w-full h-full object-cover"
                                                unoptimized={true}
                                            />
                                        ) : (
                                            <span className="text-sm font-gaming text-primary">{user?.name[0]}</span>
                                        )}
                                    </div>
                                </Link>
                                <button onClick={logout} className="btn-logout-glow py-2! px-6! text-[11px]! rounded-xl!">
                                    Logout
                                </button>
                            </div>
                        ) : (
                            <Link href="/login" className="btn-primary-glow py-2! px-6! text-[11px]! rounded-xl!">
                                LOGIN
                            </Link>
                        )}

                        <Menu size={40} className='glass-effect md:hidden text-white/70 ml-2 p-2 rounded-xl hover:text-primary transition-all hover:scale-110' onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} />
                    </div>
                </div>

                <div className={`absolute top-full left-0 right-0 bg-surface backdrop-blur-3xl border-b border-white/5 md:hidden flex flex-col p-8 space-y-6 transition-all duration-300 origin-top ${isMobileMenuOpen ? 'opacity-100 scale-y-100' : 'opacity-0 scale-y-0 pointer-events-none'
                    }`}>
                    <div className="flex gap-6 items-center justify-end">
                        <button
                            onClick={toggleSearch}
                            className="text-white/70 hover:text-primary transition-all hover:scale-110 cursor-pointer"
                            aria-label="Search"
                        >
                            <Search strokeWidth={2.5} className='h-5' />
                        </button>
                        <Link href="/cart" className="relative text-white/70 hover:text-primary transition-all hover:scale-110 cursor-pointer">
                            <ShoppingCart size={25} strokeWidth={2.5} className='h-5' />
                            {cartCount > 0 && (
                                <span className="absolute -top-2 -right-2 bg-primary text-black text-[9px] font-black px-1 rounded-full min-w-[16px] h-4 flex items-center justify-center animate-pulse">
                                    {cartCount}
                                </span>
                            )}
                        </Link>
                    </div>
                    <Link href="/" onClick={() => setIsMobileMenuOpen(false)} className="nav-link-global font-gaming text-sm tracking-[0.2em]">Home</Link>
                    <Link href="/games" onClick={() => setIsMobileMenuOpen(false)} className="nav-link-global font-gaming text-sm tracking-[0.2em]">Store</Link>
                    <Link href="/about" onClick={() => setIsMobileMenuOpen(false)} className="nav-link-global font-gaming text-sm tracking-[0.2em]">About</Link>
                    <Link href="/contact" onClick={() => setIsMobileMenuOpen(false)} className="nav-link-global font-gaming text-sm tracking-[0.2em]">Contact</Link>
                </div>
            </nav>

            {/* Search Modal */}
            <div className={`fixed h-screen w-screen top-0 left-0 right-0 z-50 shadow-[0_20px_40px_rgba(0,0,0,0.6)] transition-all duration-300 ${isSearchOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
                <div className="absolute inset-0 bg-transparent " onClick={toggleSearch} />
                <div className="relative flex items-start justify-center pt-20 pointer-events-none">
                    <div className="relative w-full max-w-2xl mx-6 shadow-lg border-b-white/10 pointer-events-auto">
                        <form onSubmit={handleSearch} className="relative">
                            <div className="relative group font-gaming -tracking-wider">
                                <input
                                    ref={searchInputRef}
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    placeholder="Search for games..."
                                    className="w-full px-6 py-4 glass-effect border border-white/10 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300 text-lg"
                                />
                                <button
                                    type="submit"
                                    className="absolute right-2 top-1/2 -translate-y-1/2 p-3 bg-primary text-black rounded-xl hover:bg-primary/80 transition-all duration-300 hover:scale-105"
                                >
                                    <Search strokeWidth={2.5} className='w-5 h-5' />
                                </button>
                            </div>
                        </form>

                        {/* Search Results */}
                        {showResults && filteredGames.length > 0 && (
                            <div className="absolute top-full left-0 right-0 mt-2 glass-effect border border-white/10 rounded-2xl overflow-hidden backdrop-blur-xl">
                                <div className="max-h-96 overflow-y-auto">
                                    {filteredGames.map((game) => (
                                        <Link
                                            key={game.id}
                                            href={`/games/${game.id}`}
                                            onClick={toggleSearch}
                                            className="flex items-center gap-4 p-4 hover:bg-white/5 transition-colors border-b border-white/5 last:border-b-0"
                                        >
                                            <div className="relative w-12 h-16 rounded-lg overflow-hidden">
                                                <Image
                                                    src={game.image}
                                                    alt={game.title}
                                                    fill
                                                    className="object-cover"
                                                    sizes="180px"
                                                />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <h4 className="text-white font-gaming text-sm truncate">{game.title}</h4>
                                                <p className="text-gray-400 text-xs">{game.genre}</p>
                                            </div>
                                            <div className="text-primary font-extrabold text-sm">
                                                {game.price === 0 ? 'FREE' : `$${game.price}`}
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Navbar;
