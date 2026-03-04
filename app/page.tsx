import GameSlider from "@/components/GameSlider";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import GameCard from "@/components/GameCard";
import games from "@/data/games";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
export default function Home() {
  // Sort by rating for featured
  const featuredGames = [...games].sort((a, b) => b.rating - a.rating).slice(0, 4);
  // Sort by newest for trending (release year)
  const trendingGames = [...games].sort((a, b) => b.releaseYear - a.releaseYear).slice(0, 4);

  return (
    <main className="min-h-screen overflow-x-hidden bg-surface">
      <Navbar />

      {/* Hero Slider */}
      <section className="w-full h-screen mb-8">
        <GameSlider />
      </section>

      {/* Featured Games Grid */}
      <section className="px-30 py-16 w-full bg-surface">
        <div className="mx-auto">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h2 className="text-primary text-sm font-gaming uppercase tracking-[0.3em] mb-2">Editor&apos;s Choice</h2>
              <h3 className="text-white text-4xl font-gaming uppercase tracking-tight">Featured Games</h3>
            </div>
            <Link href="/games" className="flex gap-2 justify-center items-center text-primary text-2xl font-gaming uppercase tracking-widest cursor-pointer mb-1 hover:translate-x-2 transition-all duration-300">
              Browse All
              <ChevronRight size={25} strokeWidth={2.5} />
            </Link>
          </div>
        </div>

        <div className="mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 group/grid">
            {featuredGames.map((game, idx) => (
              <GameCard key={game.id} game={game} priority={idx < 4} />
            ))}
          </div>
        </div>
      </section>

      {/* Trending Now */}
      <section className="px-30 py-16 w-full bg-surface">
        <div className="mx-auto w-full">
          <div className="flex justify-center items-center mb-12">
            <div className="text-center">
              <h2 className="text-primary text-sm font-gaming uppercase tracking-[0.3em] mb-2">What&apos;s Hot</h2>
              <h3 className="text-white text-4xl font-gaming uppercase tracking-wider">Trending Now</h3>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto w-full">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 group/grid">
            {trendingGames.map((game, idx) => (
              <GameCard key={game.id} game={game} priority={idx < 4} />
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
