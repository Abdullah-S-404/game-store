'use client';

import React from 'react';
import Link from 'next/link';
import {Instagram, Facebook} from 'lucide-react';
const Footer: React.FC = () => {
    return (
        <footer className="bg-surface border-white/5 pt-20 pb-10 px-2 text-gray-400">
            {/* Newsletter Section */}
            <div className="max-w-7xl mx-auto mb-32">
                <div className="glass-effect rounded-3xl p-8 md:p-12 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 blur-[100px] -mr-32 -mt-32 rounded-full pointer-events-none"></div>
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-gaming-purple/10 blur-[100px] -ml-32 -mb-32 rounded-full pointer-events-none"></div>

                    <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                        <div className="space-y-4">
                            <h3 className="text-3xl md:text-4xl font-gaming font-black text-white tracking-tight">
                                STAY IN THE <span className="text-primary italic">LOOP</span>
                            </h3>
                            <p className="text-gray-400 text-lg max-w-md">
                                Exclusive drops, gaming news, and elite member rewards delivered straight to your inbox.
                            </p>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="flex-1 bg-white/5 border border-white/10 rounded-xl px-6 py-4 text-white focus:outline-none focus:border-primary/50 transition-colors"
                            />
                            <button className="btn-primary-glow whitespace-nowrap">
                                JOIN NOW
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16">
                {/* Brand */}
                <div className="space-y-6">
                    <Link href="/" className="text-primary text-3xl font-gaming font-black tracking-tighter hover:scale-105 transition-transform inline-block">
                        GAMESTORE
                    </Link>
                    <p className="text-sm leading-relaxed text-gray-400">
                        Elevating your gaming experience with premium access to the world&apos;s most anticipated titles and exclusive community events.
                    </p>
                    <div className="flex space-x-4">
                        <span className="w-12 h-12 rounded-xl glass-effect flex items-center justify-center hover:bg-primary/20 hover:scale-110 transition-all text-white hover:text-primary border border-white/10">
                            <Instagram className="w-6 h-6"/>
                        </span>
                        
                        <span className="w-12 h-12 rounded-xl glass-effect flex items-center justify-center hover:bg-primary/20 hover:scale-110 transition-all text-white hover:text-primary border border-white/10">
                            <Facebook className='w-6 h-6'/>
                        </span>
                    </div>
                </div>

                {/* Quick Links */}
                <div>
                    <h4 className="text-white font-gaming font-bold mb-8 uppercase tracking-[0.2em] text-sm flex items-center">
                        <span className="w-2 h-2 bg-primary rounded-full mr-3"></span>
                        Quick Links
                    </h4>
                    <ul className="space-y-4 text-sm font-medium">
                        <li><Link href="/" className="hover:text-primary transition-all flex items-center group"><span className="w-0 group-hover:w-4 h-px bg-primary mr-0 group-hover:mr-2 transition-all"></span>Home</Link></li>
                        <li><Link href="/games" className="hover:text-primary transition-all flex items-center group"><span className="w-0 group-hover:w-4 h-px bg-primary mr-0 group-hover:mr-2 transition-all"></span>Store</Link></li>
                        <li><Link href="/about" className="hover:text-primary transition-all flex items-center group"><span className="w-0 group-hover:w-4 h-px bg-primary mr-0 group-hover:mr-2 transition-all"></span>About Us</Link></li>
                        <li><Link href="/contact" className="hover:text-primary transition-all flex items-center group"><span className="w-0 group-hover:w-4 h-px bg-primary mr-0 group-hover:mr-2 transition-all"></span>Contact</Link></li>
                    </ul>
                </div>

                {/* Categories */}
                <div>
                    <h4 className="text-white font-gaming font-bold mb-8 uppercase tracking-[0.2em] text-sm flex items-center">
                        <span className="w-2 h-2 bg-gaming-purple rounded-full mr-3"></span>
                        Categories
                    </h4>
                    <ul className="space-y-4 text-sm font-medium">
                        <li><Link href="/games?genre=action" className="hover:text-gaming-purple transition-all flex items-center group"><span className="w-0 group-hover:w-4 h-px bg-gaming-purple mr-0 group-hover:mr-2 transition-all"></span>Action</Link></li>
                        <li><Link href="/games?genre=fps" className="hover:text-gaming-purple transition-all flex items-center group"><span className="w-0 group-hover:w-4 h-px bg-gaming-purple mr-0 group-hover:mr-2 transition-all"></span>FPS</Link></li>
                        <li><Link href="/games?genre=rpg" className="hover:text-gaming-purple transition-all flex items-center group"><span className="w-0 group-hover:w-4 h-px bg-gaming-purple mr-0 group-hover:mr-2 transition-all"></span>RPG</Link></li>
                        <li><Link href="/games?genre=strategy" className="hover:text-gaming-purple transition-all flex items-center group"><span className="w-0 group-hover:w-4 h-px bg-gaming-purple mr-0 group-hover:mr-2 transition-all"></span>Strategy</Link></li>
                    </ul>
                </div>

                {/* Legal */}
                <div>
                    <h4 className="text-white font-gaming font-bold mb-8 uppercase tracking-[0.2em] text-sm flex items-center">
                        <span className="w-2 h-2 bg-gaming-pink rounded-full mr-3"></span>
                        Legal
                    </h4>
                    <ul className="space-y-4 text-sm font-medium">
                        <li><Link href="/terms" className="hover:text-gaming-pink transition-all flex items-center group"><span className="w-0 group-hover:w-4 h-px bg-gaming-pink mr-0 group-hover:mr-2 transition-all"></span>Terms of Service</Link></li>
                        <li><Link href="/privacy" className="hover:text-gaming-pink transition-all flex items-center group"><span className="w-0 group-hover:w-4 h-px bg-gaming-pink mr-0 group-hover:mr-2 transition-all"></span>Privacy Policy</Link></li>
                        <li><Link href="/cookies" className="hover:text-gaming-pink transition-all flex items-center group"><span className="w-0 group-hover:w-4 h-px bg-gaming-pink mr-0 group-hover:mr-2 transition-all"></span>Cookie Policy</Link></li>
                    </ul>
                </div>
            </div>

            {/* Copyright */}
            <div className="max-w-7xl mx-auto border-t border-white/5 mt-20 pt-10 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] uppercase tracking-[0.25em] font-bold text-gray-500">
                <p>&copy; {new Date().getFullYear()} Gamestore. All rights reserved.</p>
                <p className="text-white/20">Designed for elite gaming performance</p>
            </div>
        </footer>
    );
};

export default Footer;
