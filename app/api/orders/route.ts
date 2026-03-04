import { NextResponse } from 'next/server';
import mockOrders from '@/data/orders';

export async function GET() {
    return NextResponse.json(mockOrders);
}

export async function POST(request: Request) {
    const body = await request.json();

    // Mock order placement
    const newOrder = {
        id: 'order_' + Math.floor(Math.random() * 1000),
        userId: body.userId || 'user_1',
        items: body.items,
        total: body.total,
        date: new Date().toISOString(),
        status: 'completed'
    };

    return NextResponse.json(newOrder);
}
