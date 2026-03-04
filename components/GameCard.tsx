'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Game } from '../types';
import { useCart } from '@/context/CartContext';
import { ShoppingCart, Star } from 'lucide-react';

interface GameCardProps {
    game: Game;
    priority?: boolean;
}

function GameCard({ game, priority = false }: GameCardProps) {
    const { addToCart } = useCart();

    const handleAddToCart = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        addToCart(game);
    };

    return (
        <Link
            href={game.seeMoreLink}
            className="group/card relative flex flex-col rounded-[24px] overflow-hidden shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-white/5 
            group-has-[:hover]/grid:blur-4px group-has-[:hover]/grid:opacity-50 hover:blur-none hover:opacity-100 hover:shadow-[0_20px_40px_rgba(0,0,0,0.6)] z-10 hover:z-20"
        >
            {/* Image Section */}
            <div className="relative aspect-3/4 w-full overflow-hidden">
                <Image
                    src={game.image}
                    alt={game.title}
                    fill
                    className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] group-hover/card:scale-110 group-hover/card:rotate-2"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                    priority={priority}
                    quality={100}
                />
                <div className="absolute inset-0 bg-linear-to-t from-[#0f1115] via-[#0f1115]/60 to-transparent opacity-95 transition-opacity duration-500 group-hover/card:opacity-90" />

                <div className="absolute top-3 right-3 backdrop-blur-md border border-white/10 px-2 py-1 rounded-lg flex items-center gap-1">
                    <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                    <span className="text-white text-xs font-extrabold">{game.rating}</span>
                </div>

                <div className="absolute inset-x-0 bottom-0 p-6 flex flex-col z-20">

                    <div className="flex flex-wrap gap-2 mb-3">
                        <span className="px-2 py-0.5 rounded bg-white/10 text-[9px] font-bold text-white uppercase backdrop-blur-sm">
                            {game.genre}
                        </span>
                        <span className="px-2 py-0.5 rounded bg-white/10 text-[9px] font-bold text-white uppercase backdrop-blur-sm">
                            PC / CONSOLE
                        </span>
                    </div>

                    <h3 className="text-2xl font-bold text-white leading-tight tracking-tight group-hover:text-accent-cyan transition-colors mb-2">
                        {game.title}
                    </h3>

                    <div className="flex items-center justify-between">
                        <div className="flex flex-col">
                            <span className="text-accent-cyan font-extrabold text-xl tracking-tighter">
                                {game.price === 0 ? (
                                    <span>FREE</span>
                                ) : (
                                    `$${game.price.toFixed(2)}`
                                )}
                            </span>
                        </div>

                        <button
                            onClick={handleAddToCart}
                            className="flex items-center justify-center w-12 h-12 bg-primary text-black rounded-xl transition-all duration-300 hover:bg-primary/80 hover:scale-105 hover:-translate-y-1 shadow-[0_0_18px_rgba(0,255,136,0.55)] cursor-pointer"
                        >
                            <ShoppingCart size={20} className="z-10 relative -ml-0.5" strokeWidth={2.5} />
                        </button>
                    </div>
                </div>
            </div>
        </Link>
    );
}

export default GameCard;