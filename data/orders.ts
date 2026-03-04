import { Order } from '../types';

const orders: Order[] = [
    {
        id: 'order_101',
        userId: 'user_1',
        items: [
            {
                gameId: 2,
                title: 'MINECRAFT',
                price: 29.99,
                quantity: 1,
                image: '/images/minecraft.webp',
            },
        ],
        total: 29.99,
        date: '2026-02-15T10:30:00Z',
        status: 'completed',
    },
];

export default orders;
