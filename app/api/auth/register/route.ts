import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    try {
        const body = await request.json();

        if (!body || typeof body !== 'object') {
            return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
        }

        const { name, email, password } = body;

        // Input Validation
        if (!name || typeof name !== 'string' || name.trim().length < 2) {
            return NextResponse.json({ error: 'Valid name is required' }, { status: 400 });
        }

        if (!email || typeof email !== 'string' || !/^\S+@\S+\.\S+$/.test(email)) {
            return NextResponse.json({ error: 'Valid email is required' }, { status: 400 });
        }

        // We assume password might be passed in a real scenario, adding basic check
        if (password && (typeof password !== 'string' || password.length < 6)) {
            return NextResponse.json({ error: 'Password must be at least 6 characters' }, { status: 400 });
        }

        // Mock registration: return success
        return NextResponse.json({
            message: 'Account created',
            user: { id: 'user_' + Date.now(), name: name.trim(), email: email.toLowerCase() }
        });
    } catch (error) {
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
