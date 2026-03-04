'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { CartItem, Game } from '../types';

interface CartContextType {
    cart: CartItem[];
    addToCart: (game: Game) => void;
    removeFromCart: (gameId: number) => void;
    updateQuantity: (gameId: number, quantity: number) => void;
    clearCart: () => void;
    cartTotal: number;
    cartCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
    const [cart, setCart] = useState<CartItem[]>([]);

    // Load cart from localStorage
    useEffect(() => {
        const savedCart = localStorage.getItem('game_store_cart');
        if (savedCart) {
            try {
                setCart(JSON.parse(savedCart));
            } catch (e) {
                console.error('Failed to parse cart', e);
            }
        }
    }, []);

    // Save cart to localStorage
    useEffect(() => {
        localStorage.setItem('game_store_cart', JSON.stringify(cart));
    }, [cart]);

    const addToCart = (game: Game) => {
        setCart((prevCart) => {
            const existingItem = prevCart.find((item) => item.gameId === game.id);
            if (existingItem) {
                return prevCart.map((item) =>
                    item.gameId === game.id ? { ...item, quantity: item.quantity + 1 } : item
                );
            }
            return [
                ...prevCart,
                {
                    gameId: game.id,
                    title: game.title,
                    price: game.price,
                    image: game.image,
                    quantity: 1,
                },
            ];
        });
    };

    const removeFromCart = (gameId: number) => {
        setCart((prevCart) => prevCart.filter((item) => item.gameId !== gameId));
    };

    const updateQuantity = (gameId: number, quantity: number) => {
        if (quantity <= 0) {
            removeFromCart(gameId);
            return;
        }
        setCart((prevCart) =>
            prevCart.map((item) =>
                item.gameId === gameId ? { ...item, quantity } : item
            )
        );
    };

    const clearCart = () => setCart([]);

    const cartTotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);
    const cartCount = cart.reduce((count, item) => count + item.quantity, 0);

    return (
        <CartContext.Provider
            value={{
                cart,
                addToCart,
                removeFromCart,
                updateQuantity,
                clearCart,
                cartTotal,
                cartCount,
            }}
        >
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};
