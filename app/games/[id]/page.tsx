'use client';

import React, { use } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import GameCard from '@/components/GameCard';
import games from '@/data/games';
import { useCart } from '@/context/CartContext';
import { Star } from 'lucide-react';

interface PageProps {
    params: Promise<{ id: string }>;
}

const GameDetailPage = ({ params }: PageProps) => {
    const { id } = use(params);
    const game = games.find(g => g.id === parseInt(id));
    const { addToCart } = useCart();

    if (!game) {
        return (
            <main className="min-h-screen bg-black flex flex-col items-center justify-center text-white">
                <Navbar />
                <h1 className="text-4xl font-black mb-4">GAME NOT FOUND</h1>
                <Link href="/games" className="text-primary hover:underline">Return to Store</Link>
                <Footer />
            </main>
        );
    }

    const relatedGames = games.filter(g => g.genre === game.genre && g.id !== game.id).slice(0, 4);

    return (
        <main className="min-h-screen bg-black">
            <Navbar />

            {/* Hero Banner */}
            <section className="relative h-[70vh] w-full overflow-hidden">
                <Image
                    src={game.image}
                    alt={game.title}
                    fill
                    className="object-cover opacity-60"
                    priority
                />
                <div className="absolute inset-0 bg-linear-to-t from-black via-black/40 to-transparent" />

                <div className="absolute bottom-0 left-0 right-0 p-12 max-w-7xl mx-auto flex flex-col md:flex-row items-end justify-between gap-8">
                    <div className="flex-1">
                        <div className="flex items-center gap-4 mb-4">
                            <span className="bg-primary text-black text-[10px] font-black px-2 py-1 rounded-sm uppercase tracking-widest">{game.genre}</span>
                            <div className="flex items-center text-yellow-400 gap-1">
                                <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                                <span className="text-white text-md font-extrabold">{game.rating}</span>
                            </div>
                        </div>
                        <h1 className="text-white text-5xl md:text-7xl font-black uppercase tracking-tighter mb-4">{game.title}</h1>
                        <div className="flex flex-wrap gap-2 mb-6">
                            {game.tags.map(tag => (
                                <span key={tag} className="text-xs text-gray-400 border border-white/10 px-3 py-1 rounded-full uppercase font-bold tracking-widest">{tag}</span>
                            ))}
                        </div>
                    </div>

                    <div className="bg-transparent p-8 rounded-xl border-white/10 w-full md:w-auto min-w-[320px]">
                        <div className="text-5xl font-extrabold text-center text-white mb-6 uppercase tracking-tight">
                            {game.price === 0 ? 'FREE TO PLAY' : `$${game.price}`}
                        </div>
                        <div className="flex gap-6 py-2">
                            <button
                                onClick={() => addToCart(game)}
                                className="w-full btn-primary text-sm tracking-widest uppercase font-gaming"
                            >
                                ADD TO CART
                            </button>
                            <button className="w-full border rounded-xl border-white/20 text-white py-4 text-sm tracking-widest uppercase font-black hover:bg-white/5 transition-all">
                                WISH LIST
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Details Section */}
            <section className="py-24 px-6 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-16">
                <div className="lg:col-span-2">
                    <h2 className="text-white text-2xl font-black uppercase mb-6 tracking-widest border-l-4 border-primary pl-4">About the Game</h2>
                    <p className="text-gray-400 text-lg leading-relaxed mb-12">
                        {game.description}
                    </p>

                    <h2 className="text-white text-2xl font-black uppercase mb-6 tracking-widest border-l-4 border-primary pl-4">Screenshots</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {game.screenshots.map((s, i) => (
                            <div key={i} className="relative aspect-video rounded-lg overflow-hidden border border-white/5 group">
                                <Image src={s} alt={`Screenshot ${i}`} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                            </div>
                        ))}
                    </div>
                </div>

                <div>
                    <h2 className="text-white text-xl font-black uppercase mb-6 tracking-widest">Metadata</h2>
                    <div className="space-y-6 text-sm">
                        <div>
                            <p className="text-gray-500 uppercase font-bold mb-1 tracking-widest">Publisher</p>
                            <p className="text-white font-bold">{game.publisher}</p>
                        </div>
                        <div>
                            <p className="text-gray-500 uppercase font-bold mb-1 tracking-widest">Release Year</p>
                            <p className="text-white font-bold">{game.releaseYear}</p>
                        </div>
                        <div>
                            <p className="text-gray-500 uppercase font-bold mb-1 tracking-widest">Platforms</p>
                            <div className="flex flex-wrap gap-2 mt-2">
                                {game.platforms.map(p => (
                                    <span key={p} className="bg-white/5 text-xs text-white px-3 py-1 rounded border border-white/10 font-bold uppercase">{p}</span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Related Games */}
            {relatedGames.length > 0 && (
                <section className="py-24 px-6 max-w-7xl mx-auto border-t border-white/5">
                    <h2 className="text-white text-3xl font-black uppercase mb-12 tracking-tight">You May Also Like</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {relatedGames.map(g => (
                            <GameCard key={g.id} game={g} />
                        ))}
                    </div>
                </section>
            )}

            <Footer />
        </main>
    );
};

export default GameDetailPage;
