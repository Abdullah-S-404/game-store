export interface Game {
    id: number;
    title: string;
    description: string;
    image: string;
    seeMoreLink: string;
    buyLink: string;
    genre: string;
    price: number;
    rating: number;
    platforms: string[];
    screenshots: string[];
    publisher: string;
    releaseYear: number;
    tags: string[];
}

export interface User {
    id: string;
    email: string;
    name: string;
    avatar?: string;
}

export interface Order {
    id: string;
    userId: string;
    items: CartItem[];
    total: number;
    date: string;
    status: 'pending' | 'completed' | 'cancelled';
}

export interface CartItem {
    gameId: number;
    title: string;
    price: number;
    quantity: number;
    image: string;
}

export interface Category {
    id: string;
    name: string;
    slug: string;
}
