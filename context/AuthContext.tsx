'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, Order, CartItem } from '../types';
import mockUsers from '../data/users';
import mockOrders from '../data/orders';

interface AuthContextType {
    user: User | null;
    orders: Order[];
    login: (email: string, pass: string) => Promise<boolean>;
    register: (name: string, email: string, pass: string) => Promise<boolean>;
    updateUser: (name: string, email: string, password?: string) => Promise<boolean>;
    deleteAccount: () => Promise<boolean>;
    logout: () => void;
    placeOrder: (items: CartItem[], total: number) => Promise<boolean>;
    isAuthenticated: boolean;
    isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [orders, setOrders] = useState<Order[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const savedUser = sessionStorage.getItem('game_store_user');
        if (savedUser) {
            try {
                let parsedUser = JSON.parse(savedUser);

                if (!parsedUser.avatar || parsedUser.avatar.includes('avataaars')) {
                    parsedUser.avatar = `https://api.dicebear.com/9.x/initials/svg?seed=${encodeURIComponent(parsedUser.name)}&backgroundColor=00ffa6,00d1ff,ff00e5,ffae00,7000ff&backgroundType=solid,gradientLinear&chars=1`;
                    sessionStorage.setItem('game_store_user', JSON.stringify(parsedUser));
                }

                setUser(parsedUser);
            } catch (e) {
                console.error('Failed to parse user', e);
            }
        }
        setIsLoading(false);
    }, []);

    useEffect(() => {
        if (user) {
            loadUserOrders(user.id);
        } else {
            setOrders([]);
        }
    }, [user?.id]);

    const loadUserOrders = (userId: string) => {
        setOrders([]);
        const staticOrders = mockOrders.filter(o => o.userId === userId);

        const storedOrdersRaw = localStorage.getItem(`game_store_orders_${userId}`);
        const storedOrders = storedOrdersRaw ? JSON.parse(storedOrdersRaw) : [];

        const allOrders = [...staticOrders, ...storedOrders];

        if (allOrders.length === 0) {
            const welcomeOrder: Order = {
                id: `WELCOME-${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
                userId: userId,
                items: [
                    { gameId: 1, title: 'FORTNITE', price: 0, quantity: 1, image: '/images/fortnite.jpg' },
                    { gameId: 3, title: 'VALORANT', price: 0, quantity: 1, image: '/images/valorant.webp' }
                ],
                total: 0,
                date: new Date().toISOString(),
                status: 'completed'
            };
            const seeded = [welcomeOrder];
            localStorage.setItem(`game_store_orders_${userId}`, JSON.stringify(seeded));
            setOrders(seeded);
        } else {
            setOrders(allOrders);
        }
    };

    const login = async (email: string, pass: string): Promise<boolean> => {
        let foundUser: User | null = null;

        const staticUser = mockUsers.find((u) => u.email === email);
        if (staticUser && pass === 'password123') { // Hardcoded for pre-defined mocks
            foundUser = staticUser;
        } else {
            const storedUsersRaw = localStorage.getItem('game_store_registered_users');
            if (storedUsersRaw) {
                const registeredUsers = JSON.parse(storedUsersRaw);
                const regUser = registeredUsers.find((u: any) => u.email === email && u.password === pass);
                if (regUser) {
                    foundUser = {
                        id: regUser.id,
                        email: regUser.email,
                        name: regUser.name,
                        avatar: regUser.avatar || `https://api.dicebear.com/9.x/initials/svg?seed=${encodeURIComponent(regUser.name)}&backgroundColor=00ffa6,00d1ff,ff00e5,ffae00,7000ff&backgroundType=solid,gradientLinear&chars=1`
                    };
                }
            }
        }

        if (foundUser) {
            setUser(foundUser);
            sessionStorage.setItem('game_store_user', JSON.stringify(foundUser));
            return true;
        }

        return false;
    };

    const register = async (name: string, email: string, pass: string): Promise<boolean> => {
        const newUser = {
            id: `user_${Date.now()}`,
            name,
            email,
            password: pass,
            avatar: `https://api.dicebear.com/9.x/initials/svg?seed=${encodeURIComponent(name)}&backgroundColor=00ffa6,00d1ff,ff00e5,ffae00,7000ff&backgroundType=solid,gradientLinear&chars=1`
        };

        const storedUsersRaw = localStorage.getItem('game_store_registered_users');
        const registeredUsers = storedUsersRaw ? JSON.parse(storedUsersRaw) : [];

        if (registeredUsers.some((u: any) => u.email === email)) {
            return false; // Email already exists
        }

        registeredUsers.push(newUser);
        localStorage.setItem('game_store_registered_users', JSON.stringify(registeredUsers));

        return true;
    };

    const placeOrder = async (items: CartItem[], total: number): Promise<boolean> => {
        if (!user) return false;

        const newOrder: Order = {
            id: `${Math.random().toString(36).substr(2, 4).toUpperCase()}-${Math.random().toString(36).substr(2, 4).toUpperCase()}-${Math.random().toString(36).substr(2, 4).toUpperCase()}`,
            userId: user.id,
            items: [...items],
            total,
            date: new Date().toISOString(),
            status: 'completed'
        };

        const storedOrdersRaw = localStorage.getItem(`game_store_orders_${user.id}`);
        const storedOrders = storedOrdersRaw ? JSON.parse(storedOrdersRaw) : [];
        const updatedOrders = [newOrder, ...storedOrders];

        localStorage.setItem(`game_store_orders_${user.id}`, JSON.stringify(updatedOrders));

        loadUserOrders(user.id);
        return true;
    };

    const updateUser = async (name: string, email: string, password?: string): Promise<boolean> => {
        if (!user) return false;

        const updatedUser = {
            ...user,
            name,
            email,
            avatar: `https://api.dicebear.com/9.x/initials/svg?seed=${encodeURIComponent(name)}&backgroundColor=00ffa6,00d1ff,ff00e5,ffae00,7000ff&backgroundType=solid,gradientLinear&chars=1`
        };

        setUser(updatedUser);
        sessionStorage.setItem('game_store_user', JSON.stringify(updatedUser));

        const storedUsersRaw = localStorage.getItem('game_store_registered_users');
        if (storedUsersRaw) {
            const registeredUsers = JSON.parse(storedUsersRaw);
            const userIdx = registeredUsers.findIndex((u: any) => u.id === user.id);
            if (userIdx !== -1) {
                const updatedPersistedUser = {
                    ...registeredUsers[userIdx],
                    name,
                    email,
                    avatar: updatedUser.avatar
                };

                if (password) {
                    updatedPersistedUser.password = password;
                }

                registeredUsers[userIdx] = updatedPersistedUser;
                localStorage.setItem('game_store_registered_users', JSON.stringify(registeredUsers));
            }
        }

        return true;
    };

    const deleteAccount = async (): Promise<boolean> => {
        if (!user) return false;

        const storedUsersRaw = localStorage.getItem('game_store_registered_users');
        if (storedUsersRaw) {
            const registeredUsers = JSON.parse(storedUsersRaw);
            const filteredUsers = registeredUsers.filter((u: any) => u.id !== user.id);
            localStorage.setItem('game_store_registered_users', JSON.stringify(filteredUsers));
        }

        localStorage.removeItem(`game_store_orders_${user.id}`);
        logout();
        return true;
    };

    const logout = () => {
        setUser(null);
        setOrders([]);
        sessionStorage.removeItem('game_store_user');
    };

    const isAuthenticated = !!user;

    return (
        <AuthContext.Provider value={{ user, orders, login, register, updateUser, logout, deleteAccount, placeOrder, isAuthenticated, isLoading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
