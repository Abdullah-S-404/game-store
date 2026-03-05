import { NextResponse } from 'next/server';
import users from '@/data/users';

export async function POST(request: Request) {
    try {
        const body = await request.json();

        if (!body || typeof body !== 'object') {
            return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
        }

        const { email, password } = body;

        // Basic Input Validation
        if (!email || typeof email !== 'string' || !/^\S+@\S+\.\S+$/.test(email)) {
            return NextResponse.json({ error: 'Valid email is required' }, { status: 400 });
        }

        if (!password || typeof password !== 'string' || password.length < 6) {
            return NextResponse.json({ error: 'Invalid credentials format' }, { status: 400 });
        }

        const user = users.find(u => u.email === email);

        if (user && password === 'password123') {
            return NextResponse.json({
                user,
                token: 'mock_jwt_token_' + btoa(user.id)
            });
        }

        return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    } catch (error) {
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
