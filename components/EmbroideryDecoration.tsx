import React from 'react';
import { motion } from 'framer-motion';

// This component renders a high-quality SVG that mimics traditional Indian embroidery (like Aari or Zardosi work)
// It uses paths to create vines, leaves, and floral motifs.

interface EmbroideryDecorationProps {
    side: 'left' | 'right';
    className?: string;
}

export default function EmbroideryDecoration({ side, className = '' }: EmbroideryDecorationProps) {
    const isRight = side === 'right';

    // Color palette based on the premium theme and embroidery reference
    const colors = {
        vine: '#2a5a3b',     // Deep Forest Green
        leaf: '#3e754f',     // Rich Green
        redTop: '#8B0000',   // Royal Maroon
        redShadow: '#5c0000',
        pinkTop: '#D87093',  // Fine Pink
        pinkShadow: '#9E2A54',
        yellowTop: '#FFC107',// Gold/Amber
        yellowShadow: '#FF8F00',
        goldAccent: '#D4AF37' // Gold
    };

    // The intricate SVG pattern
    return (
        <motion.div
            initial={{ opacity: 0, x: isRight ? 50 : -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.5, ease: "easeOut", delay: 0.3 }}
            className={`absolute top-0 bottom-0 pointer-events-none z-10 hidden lg:block ${isRight ? 'right-0 scale-x-[-1]' : 'left-0'
                } ${className}`}
            style={{ width: '350px', height: '100%' }}
        >
            <svg
                viewBox="0 0 350 800"
                preserveAspectRatio="xMinYMid slice"
                className="w-full h-full drop-shadow-md opacity-80"
                xmlns="http://www.w3.org/2000/svg"
            >
                {/* Wrap everything and translate to perfectly center it within the 350px width, allocating equal padding left and right */}
                <g strokeLinecap="round" strokeLinejoin="round" transform="translate(68, 0)">

                    {/* Left Curved Dashed Decorative Arc - Repositioned and Extended as requested */}
                    <path
                        d="M 50,800 Q 150,700 80,600 T 120,400 T 60,200 Q -30,100 100,0"
                        fill="none"
                        stroke={colors.goldAccent}
                        strokeWidth="1.5"
                        strokeDasharray="6 8"
                        opacity="0.8"
                        transform="translate(-15, 0)"
                    />

                    {/* Main climbing vine stem (adjusted the final control point from T to Q to gracefully stay on canvas) */}
                    <path
                        d="M 50,800 Q 150,700 80,600 T 120,400 T 60,200 Q -30,100 100,0"
                        fill="none"
                        stroke={colors.vine}
                        strokeWidth="3"
                    />

                    {/* Branching vines */}
                    <path d="M 125,720 Q 200,680 180,600" fill="none" stroke={colors.vine} strokeWidth="2" />
                    <path d="M 80,600 Q 20,550 40,480" fill="none" stroke={colors.vine} strokeWidth="2" />
                    <path d="M 100,500 Q 220,450 160,350" fill="none" stroke={colors.vine} strokeWidth="2" />
                    <path d="M 90,300 Q 20,250 50,150" fill="none" stroke={colors.vine} strokeWidth="2" />
                    <path d="M 80,100 Q 180,50 140,0" fill="none" stroke={colors.vine} strokeWidth="2" />

                    {/* Leaves (using path combinations for detailed shapes) */}
                    <g fill={colors.leaf}>
                        {/* Bottom Section */}
                        <path d="M 125,720 Q 140,730 150,720 Q 140,710 125,720" />
                        <path d="M 150,695 Q 165,710 175,695 Q 160,680 150,695" />
                        <path d="M 175,640 Q 195,650 200,640 Q 190,620 175,640" />

                        {/* Mid-Lower Section */}
                        <path d="M 80,600 Q 60,610 50,600 Q 65,585 80,600" />
                        <path d="M 60,540 Q 40,550 35,535 Q 50,520 60,540" />
                        <path d="M 45,490 Q 20,490 20,475 Q 35,465 45,490" />

                        {/* Mid Section */}
                        <path d="M 100,500 Q 120,520 135,505 Q 120,490 100,500" />
                        <path d="M 140,465 Q 165,480 175,460 Q 165,440 140,465" />
                        <path d="M 185,410 Q 215,415 210,395 Q 195,385 185,410" />
                        <path d="M 160,350 Q 180,340 170,320 Q 150,330 160,350" />

                        {/* Upper-Mid Section */}
                        <path d="M 90,300 Q 70,310 60,295 Q 75,280 90,300" />
                        <path d="M 65,240 Q 40,245 40,225 Q 55,215 65,240" />
                        <path d="M 50,150 Q 30,140 35,120 Q 55,130 50,150" />

                        {/* Top Section */}
                        <path d="M 80,100 Q 100,120 115,100 Q 100,85 80,100" />
                        <path d="M 115,65 Q 140,80 150,65 Q 135,45 115,65" />
                        <path d="M 155,30 Q 185,30 180,15 Q 160,5 155,30" />
                    </g>

                    {/* Flowers / Rhythmic Spacing Adjustment (5 flowers spanning vertically) */}
                    <g>
                        {/* Flower 1 (Bottom-Right) - Large Yellow */}
                        <g transform="translate(150, 680) rotate(45)">
                            <path d="M 0,0 C 15,10 20,-5 10,-15 C 0,-5 5,10 0,0" fill={colors.yellowTop} />
                            <path d="M 0,0 C -10,15 5,20 15,10 C 5,0 -10,5 0,0" fill={colors.yellowShadow} />
                            <path d="M 0,0 C -15,-10 -20,5 -10,15 C 0,5 -5,-10 0,0" fill={colors.yellowTop} />
                            <path d="M 0,0 C 10,-15 -5,-20 -15,-10 C -5,0 10,-5 0,0" fill={colors.yellowShadow} />
                            <circle cx="0" cy="0" r="4" fill={colors.redTop} />
                        </g>

                        {/* Flower 2 (Mid-Bottom-Left) - Medium Yellow */}
                        <g transform="translate(40, 540) rotate(15)">
                            <path d="M 0,0 C 12,8 16,-4 8,-12 C 0,-4 4,8 0,0" fill={colors.yellowTop} />
                            <path d="M 0,0 C -8,12 4,16 12,8 C 4,0 -8,4 0,0" fill={colors.yellowShadow} />
                            <path d="M 0,0 C -12,-8 -16,4 -8,12 C 0,4 -4,-8 0,0" fill={colors.yellowTop} />
                            <path d="M 0,0 C 8,-12 -4,-16 -12,-8 C -4,0 8,-4 0,0" fill={colors.yellowShadow} />
                            <circle cx="0" cy="0" r="3" fill={colors.redTop} />
                        </g>

                        {/* Flower 3 (Center-Right) - Large Pink */}
                        <g transform="translate(170, 400) rotate(-15)">
                            <path d="M 0,0 C 15,10 20,-5 10,-15 C 0,-5 5,10 0,0" fill={colors.pinkTop} />
                            <path d="M 0,0 C -10,15 5,20 15,10 C 5,0 -10,5 0,0" fill={colors.pinkShadow} />
                            <path d="M 0,0 C -15,-10 -20,5 -10,15 C 0,5 -5,-10 0,0" fill={colors.pinkTop} />
                            <path d="M 0,0 C 10,-15 -5,-20 -15,-10 C -5,0 10,-5 0,0" fill={colors.pinkShadow} />
                            <circle cx="0" cy="0" r="4" fill={colors.goldAccent} />
                            <circle cx="-3" cy="-3" r="1.5" fill={colors.goldAccent} />
                            <circle cx="3" cy="3" r="1.5" fill={colors.goldAccent} />
                        </g>

                        {/* Flower 4 (Mid-Top-Left) - Medium Pink */}
                        <g transform="translate(45, 260) rotate(20)">
                            <path d="M 0,0 C 12,8 16,-4 8,-12 C 0,-4 4,8 0,0" fill={colors.pinkTop} />
                            <path d="M 0,0 C -8,12 4,16 12,8 C 4,0 -8,4 0,0" fill={colors.pinkShadow} />
                            <path d="M 0,0 C -12,-8 -16,4 -8,12 C 0,4 -4,-8 0,0" fill={colors.pinkTop} />
                            <path d="M 0,0 C 8,-12 -4,-16 -12,-8 C -4,0 8,-4 0,0" fill={colors.pinkShadow} />
                            <circle cx="0" cy="0" r="3" fill={colors.yellowTop} />
                        </g>

                        {/* Flower 5 (Top-Right) - Large Red */}
                        <g transform="translate(120, 120) rotate(-30)">
                            <path d="M 0,0 C 20,10 25,-10 10,-20 C 0,-5 5,15 0,0" fill={colors.redTop} />
                            <path d="M 0,0 C -10,20 10,25 20,10 C 5,0 -15,5 0,0" fill={colors.redShadow} />
                            <path d="M 0,0 C -20,-10 -25,10 -10,20 C 0,5 -5,-15 0,0" fill={colors.redTop} />
                            <path d="M 0,0 C 10,-20 -10,-25 -20,-10 C -5,0 15,-5 0,0" fill={colors.redShadow} />
                            <circle cx="0" cy="0" r="5" fill={colors.goldAccent} />
                            <circle cx="-4" cy="-3" r="1.5" fill={colors.goldAccent} />
                            <circle cx="3" cy="4" r="1.5" fill={colors.goldAccent} />
                            <circle cx="4" cy="-3" r="1.5" fill={colors.goldAccent} />
                            <circle cx="-3" cy="4" r="1.5" fill={colors.goldAccent} />
                        </g>

                        {/* Small Buds/Knots symmetrically distributed near the new flower positions */}
                        <circle cx="165" cy="660" r="5" fill={colors.pinkTop} />
                        <circle cx="175" cy="640" r="4" fill={colors.pinkShadow} />
                        <circle cx="30" cy="510" r="6" fill={colors.yellowTop} />
                        <circle cx="20" cy="490" r="4" fill={colors.yellowShadow} />
                        <circle cx="150" cy="380" r="6" fill={colors.redShadow} />
                        <circle cx="165" cy="365" r="4" fill={colors.redTop} />
                        <circle cx="35" cy="230" r="5" fill={colors.pinkTop} />
                        <circle cx="180" cy="210" r="4.5" fill={colors.yellowTop} />
                        <circle cx="145" cy="90" r="4" fill={colors.redTop} />
                        <circle cx="95" cy="720" r="5" fill={colors.pinkTop} />
                    </g>

                    {/* Gold Accents / French Knots */}
                    <g fill={colors.goldAccent}>
                        {/* Clustered gold dots near branches like the reference image */}
                        <circle cx="150" cy="740" r="3" />
                        <circle cx="160" cy="735" r="2.5" />
                        <circle cx="145" cy="755" r="3" />
                        <circle cx="95" cy="620" r="2.5" />
                        <circle cx="105" cy="610" r="3" />
                        <circle cx="20" cy="520" r="3.5" />
                        <circle cx="15" cy="535" r="2.5" />
                        <circle cx="30" cy="510" r="3" />
                        <circle cx="190" cy="450" r="3" />
                        <circle cx="195" cy="435" r="2.5" />
                        <circle cx="125" cy="370" r="3" />
                        <circle cx="115" cy="385" r="3.5" />
                        <circle cx="135" cy="390" r="2.5" />
                        <circle cx="30" cy="270" r="3" />
                        <circle cx="40" cy="260" r="2.5" />
                        <circle cx="180" cy="80" r="3.5" />
                        <circle cx="170" cy="95" r="3" />
                        <circle cx="190" cy="65" r="2.5" />
                    </g>

                    {/* Intricate thread detailing overlay (subtle lines inside branches/decorations) */}
                    <g stroke="#ffffff" strokeWidth="0.5" opacity="0.3" fill="none">
                        <path d="M 125,720 L 140,720" />
                        <path d="M 150,695 L 165,695" />
                        <path d="M 100,500 L 115,505" />
                        <path d="M 80,100 L 95,100" />
                    </g>

                </g>
            </svg>
        </motion.div>
    );
}
