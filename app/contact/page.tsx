'use client';

import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import {
    Mail, Phone, MapPin, MessageSquare,
    Clock, ChevronRight, Send, CheckCircle
} from 'lucide-react';
import CustomDropdown from '@/components/CustomDropdown';

const contactInfo = [
    {
        icon: Mail,
        title: 'Email Us',
        detail: 'support@gamestore.gg',
        sub: 'We reply within 24 hours',
        color: '#00ff88',
    },
    {
        icon: Phone,
        title: 'Call Us',
        detail: '+1 (800) GAME-WIN',
        sub: 'Mon–Fri, 9 AM – 9 PM EST',
        color: '#8b5cf6',
    },
    {
        icon: MapPin,
        title: 'Our HQ',
        detail: 'San Francisco, CA',
        sub: 'United States',
        color: '#ec4899',
    },
    {
        icon: Clock,
        title: 'Support Hours',
        detail: '24/7 Live Chat',
        sub: 'Always here for you',
        color: '#f59e0b',
    },
];

const faqs = [
    {
        q: 'How quickly do I receive my game after purchase?',
        a: 'Instantly! Your digital key or download link is sent to your email within seconds of payment confirmation.',
    },
    {
        q: 'What payment methods do you accept?',
        a: 'We accept all major credit/debit cards, PayPal, Apple Pay, Google Pay, and cryptocurrency.',
    },
    {
        q: 'Can I get a refund?',
        a: 'Yes. We offer a 14-day refund policy on unopened/unredeemed keys. Contact support to initiate a refund.',
    },
    {
        q: 'Are your game keys legitimate?',
        a: 'Absolutely. All keys are sourced directly from publishers or authorised distributors.',
    },
];

const ContactPage: React.FC = () => {
    const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
    const [submitted, setSubmitted] = useState(false);
    const [openFaq, setOpenFaq] = useState<number | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitted(true);
    };

    const topicOptions = [
        { value: 'order', label: 'Order / Purchase Issue' },
        { value: 'technical', label: 'Technical Support' },
        { value: 'refund', label: 'Refund Request' },
        { value: 'account', label: 'Account Help' },
        { value: 'partnership', label: 'Partnership Inquiry' },
        { value: 'other', label: 'Other' },
    ];

    return (
        <main className="min-h-screen bg-surface overflow-x-hidden">
            <Navbar />
            <div className="h-[12vh] w-full" />

            {/* ─── Hero ─── */}
            <section className="relative py-28 px-8 text-center overflow-hidden">
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[300px] bg-gaming-purple/8 blur-[140px] rounded-full" />
                    <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary/6 blur-[120px] rounded-full" />
                </div>
                <div className="relative z-10 max-w-3xl mx-auto">
                    <span className="inline-block text-primary font-gaming text-xs tracking-[0.4em] uppercase mb-6 border border-primary/30 px-4 py-1.5 rounded-full">
                        Get In Touch
                    </span>
                    <h1 className="text-white text-5xl md:text-7xl font-gaming uppercase tracking-tight mb-6 leading-none">
                        We&apos;re Here<br />
                        <span className="text-primary">To Help</span>
                    </h1>
                    <p className="text-gray-400 text-lg leading-relaxed font-gaming tracking-wide">
                        Got a question, issue, or just want to say hi? Our team of gamers is standing by.
                    </p>
                </div>
            </section>

            {/* ─── Contact Info Cards ─── */}
            <section className="py-8 px-8">
                <div className="max-w-6xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-5">
                    {contactInfo.map((item) => {
                        const Icon = item.icon;
                        return (
                            <div key={item.title} className="glass-effect rounded-2xl p-6 border border-white/10 group hover:border-white/20 hover:-translate-y-1 transition-all duration-300">
                                <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-4" style={{ background: `${item.color}15` }}>
                                    <Icon className="w-5 h-5" style={{ color: item.color }} />
                                </div>
                                <p className="text-white/50 font-gaming text-[10px] tracking-[0.3em] uppercase mb-1">{item.title}</p>
                                <p className="text-white font-gaming font-bold text-sm tracking-wide">{item.detail}</p>
                                <p className="text-gray-500 text-xs mt-1">{item.sub}</p>
                            </div>
                        );
                    })}
                </div>
            </section>

            {/* ─── Form + FAQ ─── */}
            <section className="py-20 px-8">
                <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">

                    {/* Contact Form */}
                    <div>
                        <h2 className="text-white text-3xl font-gaming uppercase tracking-tight mb-2">Send a Message</h2>
                        <p className="text-gray-500 font-gaming text-sm tracking-wider mb-8">Fill in the details below and we&apos;ll get back to you ASAP.</p>

                        {submitted ? (
                            <div className="glass-effect rounded-3xl p-12 border border-primary/30 flex flex-col items-center text-center">
                                <CheckCircle className="w-16 h-16 text-primary mb-6" />
                                <h3 className="text-white font-gaming text-2xl uppercase tracking-tight mb-3">Message Sent!</h3>
                                <p className="text-gray-400">We&apos;ve received your message and will respond within 24 hours.</p>
                                <button
                                    onClick={() => { setSubmitted(false); setForm({ name: '', email: '', subject: '', message: '' }); }}
                                    className="mt-8 text-primary font-gaming text-sm tracking-widest uppercase hover:text-primary/80 transition-colors flex items-center gap-2"
                                >
                                    Send Another <ChevronRight size={14} />
                                </button>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-5">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                    <div>
                                        <label htmlFor="name" className="block text-white/50 font-gaming text-[10px] tracking-[0.3em] uppercase mb-2">Your Name</label>
                                        <input
                                            type="text" id="name" name="name" required value={form.name} onChange={handleChange}
                                            placeholder="John Doe"
                                            className="w-full bg-[#1a1a2e] border border-white/10 rounded-xl px-5 py-3.5 text-white text-sm font-gaming tracking-wider outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all placeholder-white/20"
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="email" className="block text-white/50 font-gaming text-[10px] tracking-[0.3em] uppercase mb-2">Email</label>
                                        <input
                                            type="email" id="email" name="email" required value={form.email} onChange={handleChange}
                                            placeholder="you@example.com"
                                            className="w-full bg-[#1a1a2e] border border-white/10 rounded-xl px-5 py-3.5 text-white text-sm font-gaming tracking-wider outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all placeholder-white/20"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="subject" className="block text-white/50 font-gaming text-[10px] tracking-[0.3em] uppercase mb-2">Subject</label>
                                    <CustomDropdown
                                        id="subject"
                                        options={topicOptions}
                                        value={form.subject}
                                        onChange={(val) => setForm(prev => ({ ...prev, subject: val }))}
                                        placeholder="Select a topic…"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="message" className="block text-white/50 font-gaming text-[10px] tracking-[0.3em] uppercase mb-2">Message</label>
                                    <textarea
                                        id="message" name="message" required value={form.message} onChange={handleChange}
                                        rows={5} placeholder="Tell us everything…"
                                        className="w-full bg-[#1a1a2e] border border-white/10 rounded-xl px-5 py-3.5 text-white text-sm font-gaming tracking-wider outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all resize-none placeholder-white/20"
                                    />
                                </div>

                                <button
                                    type="submit"
                                    className="w-full btn-primary-glow py-4 rounded-xl text-sm flex items-center justify-center gap-3"
                                >
                                    <Send size={16} />
                                    Send Message
                                </button>
                            </form>
                        )}
                    </div>

                    {/* FAQ */}
                    <div>
                        <h2 className="text-white text-3xl font-gaming uppercase tracking-tight mb-2">Common Questions</h2>
                        <p className="text-gray-500 font-gaming text-sm tracking-wider mb-8">Quick answers to what gamers ask most.</p>

                        <div className="space-y-3">
                            {faqs.map((faq, i) => (
                                <div
                                    key={i}
                                    className={`rounded-2xl border transition-all duration-300 overflow-hidden ${openFaq === i ? 'border-primary/40 bg-primary/5' : 'border-white/10 bg-[#1a1a2e] hover:border-white/20'}`}
                                >
                                    <button
                                        onClick={() => setOpenFaq(openFaq === i ? null : i)}
                                        className="w-full flex items-center justify-between p-5 text-left cursor-pointer"
                                    >
                                        <span className="text-white font-gaming text-sm tracking-wide pr-4">{faq.q}</span>
                                        <MessageSquare
                                            size={16}
                                            className={`shrink-0 transition-colors ${openFaq === i ? 'text-primary' : 'text-white/30'}`}
                                        />
                                    </button>
                                    {openFaq === i && (
                                        <div className="px-5 pb-5">
                                            <p className="text-gray-400 text-sm leading-relaxed border-t border-white/10 pt-4">{faq.a}</p>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>

                        {/* Live chat nudge */}
                        <div className="mt-8 glass-effect rounded-2xl p-6 border border-primary/20 flex items-start gap-4">
                            <div className="w-10 h-10 rounded-xl bg-primary/15 flex items-center justify-center shrink-0">
                                <MessageSquare className="w-5 h-5 text-primary" />
                            </div>
                            <div>
                                <p className="text-white font-gaming font-bold text-sm tracking-wide mb-1">Prefer Live Chat?</p>
                                <p className="text-gray-400 text-sm">Our support agents are online 24/7 and typically respond in under 2 minutes.</p>
                                <button className="mt-3 text-primary font-gaming text-xs tracking-widest uppercase flex items-center gap-1 hover:text-primary/80 transition-colors">
                                    Start Chat <ChevronRight size={12} />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
};

export default ContactPage;
