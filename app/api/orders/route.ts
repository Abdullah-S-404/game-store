import { NextResponse } from 'next/server';
import mockOrders from '@/data/orders';

export async function GET() {
    return NextResponse.json(mockOrders);
}

export async function POST(request: Request) {
    try {
        const body = await request.json();

        if (!body || typeof body !== 'object') {
            return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
        }

        const { userId, items, total } = body;

        // Input Validation
        if (!userId || typeof userId !== 'string') {
            return NextResponse.json({ error: 'Valid userId is required' }, { status: 400 });
        }

        if (!items || !Array.isArray(items) || items.length === 0) {
            return NextResponse.json({ error: 'Order must contain at least one item' }, { status: 400 });
        }

        if (typeof total !== 'number' || total < 0) {
            return NextResponse.json({ error: 'Invalid total amount' }, { status: 400 });
        }

        const newOrder = {
            id: 'order_' + Math.floor(Math.random() * 1000),
            userId,
            items,
            total,
            date: new Date().toISOString(),
            status: 'completed'
        };

        return NextResponse.json(newOrder);
    } catch (error) {
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
