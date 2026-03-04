import { NextResponse } from 'next/server';
import games from '@/data/games';

export async function GET(
    _request: Request,
    { params }: { params: { id: string } }
) {
    const { id } = params;
    const game = games.find(g => g.id === parseInt(id));

    if (!game) {
        return NextResponse.json({ error: 'Game not found' }, { status: 404 });
    }

    return NextResponse.json(game);
}
