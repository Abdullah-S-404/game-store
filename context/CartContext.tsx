'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { CartItem, Game } from '../types';
import { useAuth } from './AuthContext';

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
    const { user } = useAuth();
    const [cart, setCart] = useState<CartItem[]>([]);

    // 1. Load cart from localStorage when user identity changes
    useEffect(() => {
        // Different keys for different users, or 'guest' for non-logged-in
        const storageKey = user ? `game_store_cart_${user.id}` : 'game_store_cart_guest';

        const savedCart = localStorage.getItem(storageKey);
        if (savedCart) {
            try {
                setCart(JSON.parse(savedCart));
            } catch (e) {
                console.error('Failed to parse cart', e);
                setCart([]);
            }
        } else {
            setCart([]); // Clear state if no saved cart for this user
        }
    }, [user?.id]);

    // 2. Save cart to localStorage whenever it changes
    useEffect(() => {
        const storageKey = user ? `game_store_cart_${user.id}` : 'game_store_cart_guest';
        localStorage.setItem(storageKey, JSON.stringify(cart));
    }, [cart, user?.id]);

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
