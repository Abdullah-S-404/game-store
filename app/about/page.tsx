'use client';

import React, { useState, useRef, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';
import {
    Gamepad2, Users, Trophy, Zap, Globe, ShieldCheck,
    Target, Star, TrendingUp, Cpu, ChevronRight
} from 'lucide-react';

const stats = [
    { value: '2M+', label: 'Active Gamers', icon: Users },
    { value: '10K+', label: 'Games in Library', icon: Gamepad2 },
    { value: '50+', label: 'Countries', icon: Globe },
    { value: '4.9', label: 'Average Rating', icon: Star },
];

const values = [
    {
        icon: ShieldCheck,
        title: 'Secure & Trusted',
        description: 'Every transaction is protected with military-grade encryption. Your security is our top priority.',
        color: '#00ff88',
    },
    {
        icon: Zap,
        title: 'Instant Delivery',
        description: 'Digital keys and downloads delivered to your inbox in seconds, no waiting.',
        color: '#8b5cf6',
    },
    {
        icon: Trophy,
        title: 'Exclusive Rewards',
        description: 'Earn elite XP points on every purchase and unlock exclusive member-only benefits.',
        color: '#f59e0b',
    },
    {
        icon: Target,
        title: 'Curated Selection',
        description: 'Our team of passionate gamers hand-picks every title in our library.',
        color: '#ec4899',
    },
    {
        icon: TrendingUp,
        title: 'Best Prices',
        description: 'Price-match guarantee and daily deals so you always get the best value.',
        color: '#3b82f6',
    },
    {
        icon: Cpu,
        title: 'All Platforms',
        description: 'PC, console, and mobile — we cover every platform you love to play on.',
        color: '#10b981',
    },
];

const team = [
    { name: 'Alex Reeves', role: 'Founder & CEO', initials: 'AR', color: '#00ff88' },
    { name: 'Jess Kim', role: 'Head of Curation', initials: 'JK', color: '#8b5cf6' },
    { name: 'Marcus Webb', role: 'Lead Developer', initials: 'MW', color: '#ec4899' },
    { name: 'Sofia Lane', role: 'Community Manager', initials: 'SL', color: '#f59e0b' },
];

function useCountUp(target: number, duration = 2000, prefix = '', suffix = '') {
    const [count, setCount] = useState('0');
    const ref = useRef<HTMLSpanElement>(null);
    const started = useRef(false);

    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting && !started.current) {
                started.current = true;
                const startTime = performance.now();
                const step = (now: number) => {
                    const progress = Math.min((now - startTime) / duration, 1);
                    const eased = 1 - Math.pow(1 - progress, 3);
                    const current = Math.floor(eased * target);
                    setCount(prefix + (target >= 1000 ? (current / 1000).toFixed(0) + 'K' : current) + suffix);
                    if (progress < 1) requestAnimationFrame(step);
                    else setCount(prefix + (target >= 10000 ? (target / 1000).toFixed(0) + 'K+' : target) + suffix);
                };
                requestAnimationFrame(step);
            }
        }, { threshold: 0.5 });
        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, [target, duration, prefix, suffix]);

    return { count, ref };
}

const StatCard = ({ stat }: { stat: typeof stats[0] }) => {
    const Icon = stat.icon;
    return (
        <div className="glass-effect rounded-2xl p-8 border border-white/10 flex flex-col items-center text-center group hover:border-primary/40 transition-all duration-500 hover:-translate-y-1">
            <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <Icon className="w-7 h-7 text-primary" />
            </div>
            <p className="text-4xl font-gaming font-black text-white mb-1">{stat.value}</p>
            <p className="text-gray-400 font-gaming text-sm tracking-widest uppercase">{stat.label}</p>
        </div>
    );
};

const AboutPage: React.FC = () => {
    return (
        <main className="min-h-screen bg-surface overflow-x-hidden">
            <Navbar />
            <div className="h-[12vh] w-full" />

            {/* ─── Hero ─── */}
            <section className="relative py-28 px-8 text-center overflow-hidden">
                {/* BG blobs */}
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary/5 blur-[140px] rounded-full" />
                    <div className="absolute bottom-0 right-0 w-96 h-96 bg-gaming-purple/10 blur-[120px] rounded-full" />
                </div>

                <div className="relative z-10 max-w-4xl mx-auto">
                    <span className="inline-block text-primary font-gaming text-xs tracking-[0.4em] uppercase mb-6 border border-primary/30 px-4 py-1.5 rounded-full">
                        Our Story
                    </span>
                    <h1 className="text-white text-5xl md:text-7xl font-gaming uppercase tracking-tight mb-6 leading-none">
                        Built By Gamers,<br />
                        <span className="text-primary">For Gamers</span>
                    </h1>
                    <p className="text-gray-400 text-lg leading-relaxed max-w-2xl mx-auto font-gaming tracking-wide">
                        GAMESTORE was born from a simple idea — gamers deserve a premium store that speaks their language.
                        No bloat, no nonsense. Just the best games at the best prices, delivered instantly.
                    </p>
                    <div className="flex flex-wrap justify-center gap-4 mt-10">
                        <Link href="/games" className="btn-primary-glow py-3 px-8 rounded-xl text-[13px] flex items-center gap-2">
                            Browse Store <ChevronRight size={16} />
                        </Link>
                        <Link href="/contact" className="py-3 px-8 rounded-xl border border-white/15 text-white text-[13px] font-gaming tracking-widest uppercase hover:border-white/40 hover:bg-white/5 transition-all">
                            Contact Us
                        </Link>
                    </div>
                </div>
            </section>

            {/* ─── Stats ─── */}
            <section className="py-16 px-8">
                <div className="max-w-6xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-6">
                    {stats.map((stat) => (
                        <StatCard key={stat.label} stat={stat} />
                    ))}
                </div>
            </section>

            {/* ─── Mission ─── */}
            <section className="py-24 px-8">
                <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <div>
                        <span className="text-primary font-gaming text-xs tracking-[0.4em] uppercase mb-4 block">Our Mission</span>
                        <h2 className="text-white text-4xl md:text-5xl font-gaming uppercase tracking-tight leading-tight mb-6">
                            Elevating the<br /><span className="text-primary">Gaming Experience</span>
                        </h2>
                        <p className="text-gray-400 leading-relaxed mb-6">
                            We believe gaming is more than entertainment — it&#39;s a culture, a community, and a passion.
                            That&#39;s why we&#39;re obsessed with making every step of your journey, from discovery to download, feel legendary.
                        </p>
                        <p className="text-gray-400 leading-relaxed">
                            Since 2021, we&#39;ve partnered with the world&#39;s top publishers and indie studios to deliver
                            the most comprehensive catalog of digital games, with instant delivery and unbeatable support.
                        </p>
                    </div>
                    {/* Visual */}
                    <div className="relative">
                        <div className="glass-effect rounded-3xl p-8 border border-white/10 relative overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-gaming-purple/5 pointer-events-none" />
                            <div className="relative z-10 grid grid-cols-2 gap-4">
                                {['2021', '2022', '2023', '2024'].map((year, i) => (
                                    <div key={year} className="rounded-xl p-4 border border-white/10 bg-white/5">
                                        <p className="text-primary font-gaming font-black text-xl">{year}</p>
                                        <p className="text-gray-400 text-xs font-gaming tracking-wider mt-1">
                                            {['Founded', '500K users', '1M+ titles', '2M gamers'][i]}
                                        </p>
                                    </div>
                                ))}
                            </div>
                            <div className="mt-6 pt-6 border-t border-white/10">
                                <p className="text-white font-gaming font-bold tracking-widest uppercase text-sm mb-1">Growth Rate</p>
                                <div className="w-full bg-white/10 rounded-full h-2">
                                    <div className="bg-primary h-2 rounded-full" style={{ width: '87%' }} />
                                </div>
                                <p className="text-primary text-xs font-gaming mt-1">+87% Year-over-Year</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ─── Values ─── */}
            <section className="py-24 px-8 bg-[#12122a]">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-16">
                        <span className="text-primary font-gaming text-xs tracking-[0.4em] uppercase mb-4 block">What We Stand For</span>
                        <h2 className="text-white text-4xl font-gaming uppercase tracking-tight">Our Core Values</h2>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {values.map((v) => {
                            const Icon = v.icon;
                            return (
                                <div key={v.title} className="glass-effect rounded-2xl p-7 border border-white/10 group hover:border-white/20 transition-all duration-300 hover:-translate-y-1">
                                    <div
                                        className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
                                        style={{ background: `${v.color}18` }}
                                    >
                                        <Icon className="w-6 h-6" style={{ color: v.color }} />
                                    </div>
                                    <h3 className="text-white font-gaming font-bold tracking-wider uppercase text-sm mb-3">{v.title}</h3>
                                    <p className="text-gray-400 text-sm leading-relaxed">{v.description}</p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* ─── Team ─── */}
            <section className="py-24 px-8">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-16">
                        <span className="text-primary font-gaming text-xs tracking-[0.4em] uppercase mb-4 block">The People</span>
                        <h2 className="text-white text-4xl font-gaming uppercase tracking-tight">Meet the Team</h2>
                    </div>
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                        {team.map((member) => (
                            <div key={member.name} className="glass-effect rounded-2xl p-6 border border-white/10 text-center group hover:border-white/25 transition-all duration-300 hover:-translate-y-1">
                                <div
                                    className="w-16 h-16 rounded-2xl mx-auto mb-4 flex items-center justify-center text-black font-gaming font-black text-xl"
                                    style={{ background: member.color }}
                                >
                                    {member.initials}
                                </div>
                                <p className="text-white font-gaming font-bold text-sm tracking-wide">{member.name}</p>
                                <p className="text-gray-500 font-gaming text-xs tracking-widest uppercase mt-1">{member.role}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ─── CTA ─── */}
            <section className="py-20 px-8">
                <div className="max-w-4xl mx-auto glass-effect rounded-3xl p-12 border border-white/10 text-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-gaming-purple/5 pointer-events-none" />
                    <div className="relative z-10">
                        <h2 className="text-white text-4xl font-gaming uppercase tracking-tight mb-4">
                            Ready to <span className="text-primary">Level Up?</span>
                        </h2>
                        <p className="text-gray-400 mb-8">Join millions of gamers and discover your next favourite game.</p>
                        <Link href="/games" className="btn-primary-glow py-4 px-12 rounded-xl text-sm inline-flex items-center gap-2">
                            Shop Now <ChevronRight size={16} />
                        </Link>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
};

export default AboutPage;
