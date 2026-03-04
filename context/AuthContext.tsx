'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User } from '../types';
import mockUsers from '../data/users';

interface AuthContextType {
    user: User | null;
    login: (email: string, pass: string) => Promise<boolean>;
    logout: () => void;
    isAuthenticated: boolean;
    isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    // Load user from session storage
    useEffect(() => {
        const savedUser = sessionStorage.getItem('game_store_user');
        if (savedUser) {
            try {
                setUser(JSON.parse(savedUser));
            } catch (e) {
                console.error('Failed to parse user', e);
            }
        }
        setIsLoading(false);
    }, []);

    const login = async (email: string, pass: string): Promise<boolean> => {
        // Mock login logic
        const foundUser = mockUsers.find((u) => u.email === email);
        if (foundUser && pass === 'password123') { // Hardcoded mock password
            setUser(foundUser);
            sessionStorage.setItem('game_store_user', JSON.stringify(foundUser));
            return true;
        }
        return false;
    };

    const logout = () => {
        setUser(null);
        sessionStorage.removeItem('game_store_user');
    };

    const isAuthenticated = !!user;

    return (
        <AuthContext.Provider value={{ user, login, logout, isAuthenticated, isLoading }}>
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
