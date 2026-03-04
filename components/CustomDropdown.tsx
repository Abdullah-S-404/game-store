'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { ChevronDown, Check } from 'lucide-react';

interface Option {
    value: string;
    label: string;
}

interface CustomDropdownProps {
    id?: string;
    options: Option[];
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    className?: string;
    label?: string;
}

const CustomDropdown: React.FC<CustomDropdownProps> = ({
    id,
    options,
    value,
    onChange,
    placeholder = 'Select an option',
    className = '',
    label,
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [highlightedIndex, setHighlightedIndex] = useState<number>(-1);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const listRef = useRef<HTMLDivElement>(null);

    const selectedOption = options.find((opt) => opt.value === value);
    const selectedIndex = options.findIndex((opt) => opt.value === value);

    const close = useCallback(() => {
        setIsOpen(false);
        setHighlightedIndex(-1);
    }, []);

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
                close();
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [close]);

    // Keyboard navigation
    useEffect(() => {
        if (!isOpen) return;
        const handleKey = (e: KeyboardEvent) => {
            if (e.key === 'ArrowDown') {
                e.preventDefault();
                setHighlightedIndex(i => Math.min(i + 1, options.length - 1));
            } else if (e.key === 'ArrowUp') {
                e.preventDefault();
                setHighlightedIndex(i => Math.max(i - 1, 0));
            } else if (e.key === 'Enter' && highlightedIndex >= 0) {
                e.preventDefault();
                onChange(options[highlightedIndex].value);
                close();
            } else if (e.key === 'Escape') {
                close();
            }
        };
        document.addEventListener('keydown', handleKey);
        return () => document.removeEventListener('keydown', handleKey);
    }, [isOpen, highlightedIndex, options, onChange, close]);

    // Scroll highlighted item into view
    useEffect(() => {
        if (highlightedIndex < 0 || !listRef.current) return;
        const item = listRef.current.children[highlightedIndex] as HTMLElement;
        item?.scrollIntoView({ block: 'nearest' });
    }, [highlightedIndex]);

    const handleToggle = () => {
        if (!isOpen) setHighlightedIndex(selectedIndex);
        setIsOpen(prev => !prev);
    };

    const handleSelect = (optionValue: string) => {
        onChange(optionValue);
        close();
    };

    return (
        <div className={`relative ${className}`} ref={dropdownRef} style={{ minWidth: '200px' }}>
            {label && (
                <span className="block text-[10px] font-gaming text-white/40 uppercase tracking-widest mb-1 pl-1">
                    {label}
                </span>
            )}

            {/* Trigger */}
            <button
                id={id}
                type="button"
                onClick={handleToggle}
                aria-haspopup="listbox"
                aria-expanded={isOpen}
                className={`w-full flex items-center justify-between gap-3 px-5 py-3 rounded-xl font-gaming text-sm tracking-widest uppercase font-bold cursor-pointer select-none transition-all duration-300 outline-none
                    ${isOpen
                        ? 'bg-[#0f0f23] border border-[#00ff88] text-white shadow-[0_0_20px_rgba(0,255,136,0.2)]'
                        : 'bg-[#1a1a2e] border border-white/10 text-white hover:border-[#00ff88]/50 hover:shadow-[0_0_15px_rgba(0,255,136,0.08)]'
                    }`}
            >
                <span className={`truncate transition-colors duration-200 ${isOpen ? 'text-[#00ff88]' : 'text-white'}`}>
                    {selectedOption?.label ?? placeholder}
                </span>
                <ChevronDown
                    size={16}
                    className={`shrink-0 transition-all duration-300 ${isOpen ? 'rotate-180 text-[#00ff88]' : 'text-white/40'}`}
                />
            </button>

            {/* Dropdown Panel */}
            {isOpen && (
                <div
                    className="absolute z-[9999] w-full mt-2 rounded-2xl overflow-hidden"
                    style={{
                        background: 'rgba(15, 15, 35, 0.97)',
                        border: '1px solid rgba(0, 255, 136, 0.2)',
                        boxShadow: '0 25px 50px rgba(0,0,0,0.6), 0 0 40px rgba(0,255,136,0.06)',
                        backdropFilter: 'blur(24px)',
                        animation: 'dropdownFadeIn 0.2s cubic-bezier(0.16,1,0.3,1) forwards',
                    }}
                >
                    {/* Top accent line */}
                    <div className="h-[2px] w-full" style={{ background: 'linear-gradient(90deg, transparent, #00ff88, transparent)' }} />

                    <div
                        ref={listRef}
                        role="listbox"
                        className="overflow-y-auto py-2"
                        style={{ maxHeight: '260px' }}
                    >
                        {options.map((option, idx) => {
                            const isSelected = option.value === value;
                            const isHighlighted = idx === highlightedIndex;

                            return (
                                <div
                                    key={option.value}
                                    role="option"
                                    aria-selected={isSelected}
                                    onMouseEnter={() => setHighlightedIndex(idx)}
                                    onMouseLeave={() => setHighlightedIndex(-1)}
                                    onClick={() => handleSelect(option.value)}
                                    className="flex items-center justify-between mx-2 px-4 py-3 rounded-lg cursor-pointer transition-all duration-150"
                                    style={{
                                        background: isSelected
                                            ? 'rgba(0, 255, 136, 0.12)'
                                            : isHighlighted
                                                ? 'rgba(255, 255, 255, 0.05)'
                                                : 'transparent',
                                        borderLeft: isSelected ? '2px solid #00ff88' : '2px solid transparent',
                                    }}
                                >
                                    <span
                                        className="font-gaming text-xs tracking-widest uppercase font-semibold"
                                        style={{
                                            color: isSelected ? '#00ff88' : isHighlighted ? '#ffffff' : 'rgba(255,255,255,0.6)',
                                        }}
                                    >
                                        {option.label}
                                    </span>
                                    {isSelected && (
                                        <Check size={14} className="shrink-0 text-[#00ff88]" />
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}
        </div>
    );
};

export default CustomDropdown;
