'use client';

import React from 'react';
import { AlertTriangle, X } from 'lucide-react';

interface ConfirmModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    title: string;
    message: string;
    confirmText?: string;
    cancelText?: string;
    type?: 'danger' | 'info';
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({
    isOpen,
    onClose,
    onConfirm,
    title,
    message,
    confirmText = 'Confirm',
    cancelText = 'Cancel',
    type = 'danger'
}) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[999] flex items-center justify-center p-6 animate-in fade-in duration-300">
            {/* Backdrop */}
            <div
                className="absolute inset-0 backdrop-blur-[4px]"
                onClick={onClose}
            />

            {/* Modal Container */}
            <div className="relative w-full max-w-md bg-surface-light border border-white/10 rounded-2xl overflow-hidden shadow-2xl animate-in zoom-in-95 slide-in-from-bottom-4 duration-300">
                {/* Header Graphic */}
                <div className={`h-2 w-full ${type === 'danger' ? 'bg-error' : 'bg-primary'}`} />

                <div className="p-8">
                    <div className="flex flex-col items-center text-center">
                        <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-6 ${type === 'danger' ? 'bg-error/10 text-error' : 'bg-primary/10 text-primary'}`}>
                            <AlertTriangle size={32} />
                        </div>

                        <h3 className="text-white font-gaming uppercase tracking-widest text-xl mb-4">{title}</h3>
                        <p className="text-gray-400 text-sm leading-relaxed mb-8 font-medium">
                            {message}
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 w-full">
                            <button
                                onClick={onClose}
                                className="flex-1 cursor-pointer px-8 py-4 rounded-xl border border-white/10 text-white font-black uppercase tracking-widest text-[10px] hover:bg-white/5 transition-all"
                            >
                                {cancelText}
                            </button>
                            <button
                                onClick={() => {
                                    onConfirm();
                                    onClose();
                                }}
                                className={`flex-1 cursor-pointer px-8 py-4 rounded-xl font-bold uppercase tracking-widest text-[12px] shadow-lg transition-all hover:scale-105 active:scale-95 ${type === 'danger'
                                        ? 'bg-error text-white hover:shadow-[0_0_20px_rgba(250,19,19,0.4)]'
                                        : 'bg-primary text-white hover:shadow-[0_0_20px_rgba(0,255,166,0.4)]'
                                    }`}
                            >
                                {confirmText}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Decorative Elements */}
                <div className="absolute -bottom-12 -right-12 w-24 h-24 bg-primary/10 blur-3xl rounded-full" />
                <div className="absolute -top-12 -left-12 w-24 h-24 bg-error/10 blur-3xl rounded-full" />
            </div>
        </div>
    );
};

export default ConfirmModal;
