import { NextResponse } from 'next/server';
import users from '@/data/users';

export async function POST(request: Request) {
    const { email, password } = await request.json();

    // Mock logic: check email and password123
    const user = users.find(u => u.email === email);

    if (user && password === 'password123') {
        return NextResponse.json({
            user,
            token: 'mock_jwt_token_' + btoa(user.id)
        });
    }

    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
}
