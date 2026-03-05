import { Order } from '../types';

const orders: Order[] = [
    {
        id: '9Y2X-K8L1-P5A3',
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
    {
        id: '4B7V-M2N9-Q6W4',
        userId: 'user_1',
        items: [
            {
                gameId: 3,
                title: 'VALORANT',
                price: 0,
                quantity: 1,
                image: '/images/valorant.webp',
            },
            {
                gameId: 1,
                title: 'FORTNITE',
                price: 0,
                quantity: 1,
                image: '/images/fortnite.jpg',
            }
        ],
        total: 0,
        date: '2026-02-28T14:15:00Z',
        status: 'completed',
    },
    {
        id: 'R1T8-E4W2-S7D5',
        userId: 'user_1',
        items: [
            {
                gameId: 6,
                title: 'GTA V',
                price: 39.99,
                quantity: 1,
                image: '/images/gta-5.webp',
            }
        ],
        total: 39.99,
        date: '2026-03-01T09:45:00Z',
        status: 'pending',
    }
];

export default orders;
