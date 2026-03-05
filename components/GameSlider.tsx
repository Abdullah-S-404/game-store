'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import games from '@/data/games';
import { Game } from '@/types';
import { useCart } from '@/context/CartContext';

const THUMB_W = 160;
const THUMB_H = 110;
const THUMB_GAP = 14;
const THUMB_RIGHT_PCT = 5;
const THUMB_BOTTOM_PCT = 6;

const TRANSITION_MS = 850;
const EXPO_EASING = 'cubic-bezier(0.19, 1, 0.22, 1)';

function getThumbClipPath(thumbIdx: number): string {
  const i = thumbIdx;
  // With 4 slots visible, the rightmost (index 3) is at the 0px offset relative to THUMB_RIGHT_PCT
  const rightPx = (3 - i) * (THUMB_W + THUMB_GAP);
  const rightInset = rightPx === 0
    ? `${THUMB_RIGHT_PCT}%`
    : `calc(${THUMB_RIGHT_PCT}% + ${rightPx}px)`;

  const leftPx = (i + 1) * THUMB_W + i * THUMB_GAP;
  // Adjusted left calculation to account for the 4-slot viewport
  const leftInset = `calc(${100 - THUMB_RIGHT_PCT}% - ${leftPx}px)`;

  const topInset = `calc(${100 - THUMB_BOTTOM_PCT}% - ${THUMB_H}px)`;
  const bottomInset = `${THUMB_BOTTOM_PCT}%`;
  return `inset(${topInset} ${rightInset} ${bottomInset} ${leftInset} round 12px)`;
}

const CLIP_FULL = 'inset(0% 0% 0% 0% round 0px)';

interface SlideContentProps {
  game: Game;
  style?: React.CSSProperties;
}

function SlideContent({ game, style }: SlideContentProps) {
  const labelText = game.genre.toLocaleUpperCase().includes('FEATURED') ? game.genre : 'FEATURED';
  const { addToCart } = useCart();
  const router = useRouter();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(game);
    router.push('/cart');
  };

  return (
    <div className="slide-content z-50" style={style}>
      <p
        className="slide-label animate-fade-in opacity-0"
        style={{ animation: 'fadeUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards', animationDelay: '0.2s' }}
      >
        {labelText}
      </p>
      <h2
        className="slide-title animate-fade-in opacity-0"
        style={{ animation: 'fadeUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards', animationDelay: '0.35s' }}
      >
        {game.title}
      </h2>
      <p
        className="slide-description animate-fade-in opacity-0"
        style={{ animation: 'fadeUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards', animationDelay: '0.5s' }}
      >
        {game.description}
      </p>
      <div
        className="slide-buttons animate-fade-in opacity-0"
        style={{ animation: 'fadeUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards', animationDelay: '0.65s' }}
      >
        <Link href={game.seeMoreLink} className="btn-see-more">See More</Link>
        <button
          onClick={handleAddToCart}
          className="btn-primary-glow py-4 px-12 rounded-xl text-sm inline-flex items-center gap-2 font-gaming uppercase tracking-widest max-w-fit justify-center cursor-pointer"
        >
          Buy Now
        </button>
      </div>
    </div>
  );
}

const VISIBLE_THUMBS = 4;

const GameSlider: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [nextIndex, setNextIndex] = useState<number | null>(null);
  const [expanded, setExpanded] = useState(false);
  const [thumbOrigin, setThumbOrigin] = useState(0);
  const [displayIndex, setDisplayIndex] = useState(0);

  const isTransitioningRef = useRef(false);
  const currentIndexRef = useRef(currentIndex);

  useEffect(() => {
    currentIndexRef.current = currentIndex;
  }, [currentIndex]);

  const getVisibleThumbs = useCallback(() => {
    const thumbs = [];
    for (let i = 0; i < VISIBLE_THUMBS; i++) {
      const idx = (currentIndex + 1 + i) % games.length;
      thumbs.push({ gameIndex: idx, slotIdx: i });
    }
    return thumbs;
  }, [currentIndex]);

  const visibleThumbs = getVisibleThumbs();

  const startSlide = useCallback((target: number, slotIdx: number) => {
    if (isTransitioningRef.current) return;
    isTransitioningRef.current = true;

    setNextIndex(target);
    setThumbOrigin(slotIdx);

    setTimeout(() => {
      setDisplayIndex(target);
    }, 120);

    setExpanded(false);

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setExpanded(true);
      });
    });

    setTimeout(() => {
      setCurrentIndex(target);
      setNextIndex(null);
      setExpanded(false);
      isTransitioningRef.current = false;
    }, TRANSITION_MS + 50);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }

      if (e.key === 'ArrowRight') {
        e.preventDefault();
        const nextIdx = (currentIndexRef.current + 1) % games.length;
        startSlide(nextIdx, 0);
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        const prevIdx = currentIndexRef.current === 0 ? games.length - 1 : currentIndexRef.current - 1;
        startSlide(prevIdx, VISIBLE_THUMBS - 1);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [startSlide]);

  useEffect(() => {
    const timer = setTimeout(() => {
      const nextIdx = (currentIndex + 1) % games.length;
      startSlide(nextIdx, 0);
    }, 6000);
    return () => clearTimeout(timer);
  }, [currentIndex, startSlide]);

  const currentGame = games[currentIndex];
  const incomingGame = nextIndex !== null ? games[nextIndex] : null;

  return (
    <div className="slider-wrapper overflow-hidden relative w-full h-screen">
      <div className="absolute inset-0 opacity-0 pointer-events-none z-[-1]">
        {games.map((g) => (
          <Image
            key={`preload-${g.id}`}
            src={g.image}
            alt="preload"
            fill
            sizes="100vw"
            priority
          />
        ))}
      </div>

      <div className="slide-bg absolute inset-0">
        <Image
          src={currentGame.image}
          alt={currentGame.title}
          fill
          className="slide-image object-cover"
          priority
          sizes="100vw"
        />
        <div className="slide-overlay absolute inset-0" />
      </div>

      {incomingGame && (
        <div
          className="slide-bg slide-incoming absolute inset-0"
          style={{
            clipPath: expanded ? CLIP_FULL : getThumbClipPath(thumbOrigin),
            transition: `clip-path ${TRANSITION_MS}ms ${EXPO_EASING}`,
            zIndex: 5,
          }}
        >
          <Image
            src={incomingGame.image}
            alt={incomingGame.title}
            fill
            className="slide-image object-cover"
            style={{
              transform: expanded ? 'scale(1)' : 'scale(1.15)',
              transition: `transform ${TRANSITION_MS}ms ${EXPO_EASING}`,
            }}
            priority
            sizes="100vw"
          />
          <div
            className="slide-overlay absolute inset-0"
            style={{
              opacity: expanded ? 1 : 0,
              transition: `opacity ${TRANSITION_MS * 0.8}ms ease`,
            }}
          />
        </div>
      )}

      <SlideContent
        key={`content-${displayIndex}`}
        game={games[displayIndex]}
      />

      <div className="thumb-viewport" style={{ width: THUMB_W * VISIBLE_THUMBS + THUMB_GAP * (VISIBLE_THUMBS - 1) }}>
        <div
          className="slide-thumbnails flex"
          style={{
            gap: `${THUMB_GAP}px`,
          }}
        >
          {visibleThumbs.map(({ gameIndex, slotIdx }) => {
            const game = games[gameIndex];
            const isExpanding = nextIndex === gameIndex;

            return (
              <div
                key={`thumb-${gameIndex}`}
                className={`thumb-item group/thumb
                  ${isExpanding ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
                style={{
                  transition: `all ${TRANSITION_MS}ms ${EXPO_EASING}`,
                  boxShadow: '0 10px 20px rgba(0,0,0,0.3)'
                }}
                onClick={() => startSlide(gameIndex, slotIdx)}
              >
                <Image
                  src={game.image}
                  alt={game.title}
                  fill
                  className="thumb-image object-cover border-none"
                  sizes="180px"
                />
                <div className="absolute inset-0 border-2 border-white/10 rounded-xl group-hover/thumb:border-primary transition-colors" />
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
};

export default GameSlider;