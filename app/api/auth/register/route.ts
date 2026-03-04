import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    const { name, email } = await request.json();

    // Mock registration: return success
    return NextResponse.json({
        message: 'Account created',
        user: { id: 'user_new', name, email }
    });
}
