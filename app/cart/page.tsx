'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useCart } from '@/context/CartContext';
import { Trash2, ShoppingCart } from 'lucide-react';

const CartPage = () => {
    const { cart, removeFromCart, updateQuantity, cartTotal, clearCart } = useCart();
    const [showToast, setShowToast] = useState(false);

    const handleCheckout = () => {
        if (cart.length === 0) return;
        // Mock checkout
        setShowToast(true);
        setTimeout(() => {
            setShowToast(false);
            clearCart();
        }, 5000);
    };

    return (
        <main className="min-h-screen bg-surface">
            <Navbar />
            {/* Spacer for fixed navbar */}
            <div className="h-[120px] w-full"></div>

            <div className="pb-24 px-6 max-w-[1600px] mx-auto">
                <h1 className="text-white text-5xl font-gaming uppercase tracking-wider mb-12">Your Cart</h1>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {/* Cart Items */}
                    <div className="lg:col-span-2">
                        {cart.length > 0 ? (
                            cart.map((item) => (
                                <div key={item.gameId} className="bg-surface border border-white/10 rounded-xl p-4 flex justify-between items-center mb-4 group hover:border-primary/50 transition-all z-10 relative hover:-translate-y-2 duration-500 hover:shadow-[0_20px_40px_rgba(0,0,0,0.3)]">
                                    <div className='flex gap-4'>
                                        <div className="relative w-24 h-32 rounded-lg overflow-hidden shrink-0">
                                            <Image src={item.image} alt={item.title} fill className="object-cover" />
                                        </div>

                                        <div className="flex flex-col">
                                            <h3 className="text-white font-gaming text-xl uppercase tracking-wider group-hover:text-primary transition-colors">{item.title}</h3>
                                            <div className='flex flex-col items-start mt-2'>
                                                <p className="text-primary font-extrabold text-lg mb-4">
                                                    {item.price === 0 ? 'FREE' : `$${item.price}`}
                                                </p>
                                            </div>

                                            <div className="flex items-center justify-between w-fit rounded-2xl glass-effect ">
                                                <div className="flex items-center overflow-hidden">
                                                    <button
                                                        onClick={() => updateQuantity(item.gameId, item.quantity - 1)}
                                                        className="px-4 py-2 rounded-l-2xl text-xl hover:bg-white/10 text-primary transition-colors"
                                                    >
                                                        -
                                                    </button>
                                                    <span className="px-4 text-white font-extrabold">{item.quantity}</span>
                                                    <button
                                                        onClick={() => updateQuantity(item.gameId, item.quantity + 1)}
                                                        className="px-4 py-2 rounded-r-2xl text-xl hover:bg-white/10 text-primary transition-colors"
                                                    >
                                                        +
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="items-center justify-between text-right hidden sm:flex flex-col gap-4">
                                        <p className="text-white font-black text-2xl uppercase tracking-tighter">
                                            ${(item.price * item.quantity).toFixed(2)}
                                        </p>
                                        <Trash2 className="w-10 h-5 text-red-500 hover:text-red-600 hover:scale-110 transition-all duration-50 cursor-pointer" onClick={() => removeFromCart(item.gameId)}/>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="bg-surface border border-dashed border-white/10 rounded-2xl py-24 text-center flex flex-col items-center justify-center">
                                <ShoppingCart className="w-16 h-16 text-gray-700 mx-auto mb-6"/>
                                <h3 className="text-white text-2xl font-bold mb-4">Your cart is empty</h3>
                                <Link href="/games" className="btn-primary-glow py-4 px-12 rounded-xl text-sm inline-flex items-center gap-2 font-gaming uppercase tracking-widest max-w-[300] justify-center mb-4">
                                    Browse Games
                                </Link>
                            </div>
                        )}
                    </div>

                    {/* Summary Sidebar */}
                    <div className="lg:col-span-1">
                        <div className="bg-surface border border-white/10 rounded-2xl p-8 sticky top-32">
                            <h2 className="text-white text-2xl font-black uppercase tracking-tighter mb-8 border-b border-white/5 pb-4">Order Summary</h2>

                            <div className="space-y-4 mb-8">
                                <div className="flex justify-between items-center text-gray-400">
                                    <span>Subtotal</span>
                                    <span className="text-white font-extrabold">${cartTotal.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between items-center text-gray-400">
                                    <span>Taxes (0%)</span>
                                    <span className="text-white font-extrabold">$0.00</span>
                                </div>
                                <div className="flex justify-between items-center pt-4 border-t border-white/10 text-xl font-black text-white uppercase tracking-tighter">
                                    <span>Total</span>
                                    <span className="text-primary tracking-normal font-extrabold">${cartTotal.toFixed(2)}</span>
                                </div>
                            </div>

                            <button
                                onClick={handleCheckout}
                                disabled={cart.length === 0}
                                className="btn-primary-glow py-4 px-12 rounded-xl text-sm inline-flex items-center gap-2 font-gaming uppercase tracking-widest w-full justify-center mb-4"
                            >
                                CHECKOUT NOW
                            </button>

                            <p className="text-[10px] text-gray-500 text-center uppercase font-bold tracking-widest">
                                Safe and secure digital delivery guaranteed.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Success Toast */}
            {showToast && (
                <div className="fixed bottom-12 left-1/2 -translate-x-1/2 z-200 animate-slide-in-up">
                    <div className="bg-primary text-black px-8 py-4 rounded-xl shadow-2xl flex items-center gap-4 border-4 border-black font-black uppercase tracking-widest text-sm">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                        <span>Order Placed Successfully!</span>
                    </div>
                </div>
            )}

            <Footer />
        </main>
    );
};

export default CartPage;
