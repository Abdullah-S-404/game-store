'use client';

import React, { useState, useMemo } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import GameCard from '@/components/GameCard';
import CustomDropdown from '@/components/CustomDropdown';
import games from '@/data/games';
import categories from '@/data/categories';
import { Search, PackageOpen } from 'lucide-react';

const GamesPage = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedGenre, setSelectedGenre] = useState('all');
    const [sortBy, setSortBy] = useState('newest');

    const genreOptions = useMemo(() => [
        { value: 'all', label: 'ALL GENRES' },
        ...categories.map(cat => ({ value: cat.slug, label: cat.name.toUpperCase() }))
    ], []);

    const sortOptions = [
        { value: 'newest', label: 'NEWEST FIRST' },
        { value: 'rating', label: 'TOP RATED' },
        { value: 'price-low', label: 'PRICE: LOW TO HIGH' },
        { value: 'price-high', label: 'PRICE: HIGH TO LOW' },
    ];

    const filteredGames = useMemo(() => {
        let result = [...games];

        // Search filter
        if (searchQuery) {
            result = result.filter(game =>
                game.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                game.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
            );
        }

        // Genre filter
        if (selectedGenre !== 'all') {
            result = result.filter(game => game.genre.toLowerCase() === selectedGenre.toLowerCase());
        }

        // Sort
        if (sortBy === 'price-low') {
            result.sort((a, b) => a.price - b.price);
        } else if (sortBy === 'price-high') {
            result.sort((a, b) => b.price - a.price);
        } else if (sortBy === 'rating') {
            result.sort((a, b) => b.rating - a.rating);
        } else {
            result.sort((a, b) => b.releaseYear - a.releaseYear);
        }

        return result;
    }, [searchQuery, selectedGenre, sortBy]);

    return (
        <main className="min-h-screen bg-surface">
            <Navbar />
            {/* Spacer for fixed navbar */}
            <div className="h-[12vh] w-full"></div>

            <div className="pb-24 px-8 w-full">
                <div className="max-w-[1700px] mx-auto">
                    {/* Header */}
                    <div className="mb-16">
                        <h1 className="text-white text-5xl md:text-7xl font-gaming uppercase tracking-wider mb-6 leading-none">Game Library</h1>
                        <p className="text-gray-400 font-gaming tracking-wider max-w-2xl text-lg">
                            Explore our massive collection of digital titles. From AAA blockbusters to indie gems,
                            everything a gamer needs is right here.
                        </p>
                    </div>

                    {/* Filters & Search */}
                    <div className="flex flex-col lg:flex-row gap-6 mb-12 font-sans items-center justify-between">
                        <div className="relative group">
                            <input
                                type="text"
                                placeholder="Search games, tags..."
                                className="w-ful glass-effect rounded-xl py-3 px-12 text-white outline-none focus:ring-2 focus:ring-primary"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                            <Search className='absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-primary transition-colors group-hover:text-primary/80' />
                        </div>

                        <div className="flex flex-wrap gap-4 items-center">
                            <CustomDropdown
                                options={genreOptions}
                                value={selectedGenre}
                                onChange={setSelectedGenre}
                                placeholder="Select Genre"
                            />

                            <CustomDropdown
                                options={sortOptions}
                                value={sortBy}
                                onChange={setSortBy}
                                placeholder="Sort By"
                            />
                        </div>
                    </div>
                </div>

                {/* Games Grid */}
                {filteredGames.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 group/grid px-12 py-12">
                        {filteredGames.map((game, idx) => (
                            <GameCard key={game.id} game={game} priority={idx < 4} />
                        ))}
                    </div>
                ) : (
                    <div className="py-24 text-center">
                        <PackageOpen className="w-16 h-16 text-gray-700 mx-auto mb-4" />
                        <h3 className="text-white text-xl font-gaming uppercase tracking-wider mb-2">No games found</h3>
                        <p className="text-gray-500 font-gaming tracking-wider mb-6">Try adjusting your search or filters.</p>
                        <button
                            onClick={() => { setSearchQuery(''); setSelectedGenre('all'); }}
                            className="text-primary font-gaming tracking-wider uppercase cursor-pointer hover:animate-pulse"
                        >
                            Clear all filters
                        </button>
                    </div>
                )}
            </div>

            <Footer />
        </main>
    );
};

export default GamesPage;
