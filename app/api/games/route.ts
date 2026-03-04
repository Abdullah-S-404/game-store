import { NextResponse } from 'next/server';
import games from '@/data/games';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get('search')?.toLowerCase();
    const genre = searchParams.get('genre')?.toLowerCase();
    const sort = searchParams.get('sort');

    let result = [...games];

    if (search) {
        result = result.filter(g =>
            g.title.toLowerCase().includes(search) ||
            g.tags.some(t => t.toLowerCase().includes(search))
        );
    }

    if (genre && genre !== 'all') {
        result = result.filter(g => g.genre.toLowerCase() === genre);
    }

    if (sort === 'price-low') {
        result.sort((a, b) => a.price - b.price);
    } else if (sort === 'price-high') {
        result.sort((a, b) => b.price - a.price);
    } else if (sort === 'rating') {
        result.sort((a, b) => b.rating - a.rating);
    } else {
        result.sort((a, b) => b.releaseYear - a.releaseYear);
    }

    return NextResponse.json(result);
}
