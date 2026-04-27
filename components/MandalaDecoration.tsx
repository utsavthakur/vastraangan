import React from 'react';

interface MandalaDecorationProps {
    className?: string;
}

export default function MandalaDecoration({ className = '' }: MandalaDecorationProps) {
    // Classic Zardosi/Royal colors
    const primary = '#8B0000'; // Maroon
    const gold = '#D4AF37';    // Gold
    const secondaryGold = '#F3E5AB';

    // Number of petals/symmetries
    const petals = 16;
    const angles = Array.from({ length: petals }, (_, i) => (360 / petals) * i);

    return (
        <div className={`pointer-events-none select-none ${className}`}>
            <div
                className="w-full h-full will-change-transform"
                style={{ animation: 'spin-slow 120s linear infinite' }}
            >
                <style>
                    {`
                        @keyframes spin-slow {
                            from { transform: rotate(0deg); }
                            to { transform: rotate(360deg); }
                        }
                    `}
                </style>
                <svg
                    viewBox="-500 -500 1000 1000"
                    className="w-full h-full opacity-15" // Very subtle opacity so it doesn't overpower text
                    xmlns="http://www.w3.org/2000/svg"
                >
                    {/* Base outer ring */}
                    <circle cx="0" cy="0" r="480" fill="none" stroke={gold} strokeWidth="2" strokeDasharray="10 10" />
                    <circle cx="0" cy="0" r="460" fill="none" stroke={primary} strokeWidth="4" />
                    <circle cx="0" cy="0" r="450" fill="none" stroke={gold} strokeWidth="1" />

                    {/* Intricate Repeated Petals */}
                    {angles.map((angle) => (
                        <g key={`petal-${angle}`} transform={`rotate(${angle})`}>

                            {/* Outer sharp petals */}
                            <path
                                d="M 0,-450 L 30,-380 L 0,-340 L -30,-380 Z"
                                fill="none"
                                stroke={primary}
                                strokeWidth="2"
                            />
                            <circle cx="0" cy="-420" r="5" fill={gold} />

                            {/* Mid layer arches */}
                            <path
                                d="M -50,-330 A 150 150 0 0 1 50,-330 L 0,-250 Z"
                                fill="none"
                                stroke={gold}
                                strokeWidth="2"
                            />
                            <path
                                d="M -40,-320 A 130 130 0 0 1 40,-320"
                                fill="none"
                                stroke={primary}
                                strokeWidth="1.5"
                                strokeDasharray="4 4"
                            />

                            {/* Inner intricate leaves */}
                            <path
                                d="M 0,-250 C 50,-180 80,-100 0,-50 C -80,-100 -50,-180 0,-250 Z"
                                fill="none"
                                stroke={primary}
                                strokeWidth="3"
                            />
                            {/* Inner leaf detail */}
                            <path
                                d="M 0,-240 C 30,-180 50,-120 0,-60 C -50,-120 -30,-180 0,-240 Z"
                                fill="none"
                                stroke={gold}
                                strokeWidth="1.5"
                            />
                            <line x1="0" y1="-240" x2="0" y2="-60" stroke={gold} strokeWidth="1" />

                            {/* Connecting vines / filigree */}
                            <path
                                d="M 0,-50 C 30,-30 40,0 20,20"
                                fill="none"
                                stroke={primary}
                                strokeWidth="1.5"
                            />

                            {/* French knots (Gold dots) */}
                            <circle cx="0" cy="-200" r="4" fill={secondaryGold} />
                            <circle cx="0" cy="-140" r="6" fill={gold} />
                            <circle cx="0" cy="-100" r="3" fill={primary} />
                        </g>
                    ))}

                    {/* Inner core detailed rings */}
                    <circle cx="0" cy="0" r="100" fill="none" stroke={gold} strokeWidth="4" />
                    <circle cx="0" cy="0" r="85" fill="none" stroke={primary} strokeWidth="2" strokeDasharray="5 5" />
                    <circle cx="0" cy="0" r="70" fill="none" stroke={gold} strokeWidth="1" />

                    {/* Core Star */}
                    {Array.from({ length: 8 }, (_, i) => (
                        <g key={`core-${i}`} transform={`rotate(${(360 / 8) * i})`}>
                            <path d="M 0,-70 L 15,-20 L 0,0 L -15,-20 Z" fill={primary} stroke={gold} strokeWidth="1" />
                            <circle cx="0" cy="-45" r="3" fill={secondaryGold} />
                        </g>
                    ))}
                    <circle cx="0" cy="0" r="15" fill={gold} />

                </svg>
            </div>
        </div>
    );
}
