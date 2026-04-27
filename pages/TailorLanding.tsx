import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ShieldCheck, TrendingUp, Globe, Star, ArrowRight } from 'lucide-react';
import Button from '../components/Button';
import EmbroideryDecoration from '../components/EmbroideryDecoration';
import MandalaDecoration from '../components/MandalaDecoration';

// Variants for smooth staggered animations without heavy GPU filters
const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.15,
            delayChildren: 0.1,
        }
    }
};

const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }
    }
};

export default function TailorLanding() {
    // Utilize Framer Motion's highly optimized scroll hook instead of React State
    // This prevents re-rendering the component on every single scroll frame
    const { scrollY } = useScroll();
    const backgroundY = useTransform(scrollY, [0, 1000], [0, 500]);

    return (
        <div className="bg-[#FDFBF7] min-h-screen font-sans overflow-hidden">

            {/* Cinematic Hero */}
            <section className="relative h-screen flex items-center justify-center overflow-hidden bg-[#F0E5D5]">
                {/* Parallax Background using GPU accelerated transform */}
                <motion.div
                    className="absolute inset-0 z-0 bg-cover bg-center mix-blend-multiply opacity-20 will-change-transform"
                    style={{
                        backgroundImage: "url('https://images.unsplash.com/photo-1598532213005-5ca85efdf552?q=80&w=2670&auto=format&fit=crop')", // High quality image of fabric/tailoring
                        y: backgroundY, // Pass the framer motion transform hook
                    }}
                />

                {/* Light brown gradient overlay for soft contrast */}
                <div className="absolute inset-0 z-0 bg-gradient-to-b from-[#FDFBF7]/80 via-[#F0E5D5]/60 to-[#F0E5D5]/90"></div>

                {/* Hand-coded Embroidery Decorations */}
                <EmbroideryDecoration side="left" />
                <EmbroideryDecoration side="right" />

                {/* Incredible Majestic Mandala - Slow Rotating */}
                <div className="absolute inset-0 z-0 flex items-center justify-center overflow-hidden">
                    <MandalaDecoration className="w-[800px] h-[800px] md:w-[1200px] md:h-[1200px] text-maroon-900 drop-shadow-2xl" />
                </div>

                <div className="relative z-10 max-w-5xl mx-auto px-4 text-center mt-12">
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        <motion.span
                            variants={itemVariants}
                            className="text-[#8B0000] font-bold tracking-[0.2em] uppercase text-sm mb-6 block drop-shadow-sm"
                        >
                            VastraAngan Partner Network
                        </motion.span>
                        <motion.h1
                            variants={itemVariants}
                            className="text-5xl md:text-7xl font-serif font-bold text-[#4A0E17] leading-tight mb-8"
                        >
                            <span
                                className="inline-block relative pb-2"
                                style={{
                                    // Complex text-shadow to create a 3D, raised "threaded" embroidery effect
                                    textShadow: `
                                        0px 1px 1px rgba(255, 255, 255, 0.4),
                                        0px -1px 1px rgba(0, 0, 0, 0.5),
                                        1px 1px 2px rgba(74, 14, 23, 0.4),
                                        -1px -1px 1px rgba(255, 255, 255, 0.3),
                                        2px 4px 6px rgba(0, 0, 0, 0.3)
                                    `,
                                    // A subtle background clip pattern gives a texture like fabric under the thread
                                    backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'6\' height=\'6\' viewBox=\'0 0 6 6\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'%234A0E17\' fill-opacity=\'0.1\' fill-rule=\'evenodd\'%3E%3Cpath d=\'M5 0h1L0 6V5zM6 5v1H5z\'/%3E%3C/g%3E%3C/svg%3E")',
                                    backgroundColor: '#4A0E17',
                                    WebkitBackgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent',
                                    color: '#4A0E17', // Fallback
                                    letterSpacing: '0.02em',
                                }}
                            >
                                Take Your Craft to a
                            </span> <br />
                            <motion.span
                                initial={{ opacity: 0, backgroundPosition: "200% center" }}
                                animate={{ opacity: 1, backgroundPosition: "0% center" }}
                                transition={{ duration: 1.5, delay: 0.4, ease: "easeOut" }}
                                className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] via-[#8B0000] to-[#D4AF37] bg-[length:200%_auto] inline-block will-change-transform pb-2 pr-2"
                            >
                                Global Stage.
                            </motion.span>
                        </motion.h1>
                        <motion.p
                            variants={itemVariants}
                            className="text-xl text-[#5C4033] mb-12 max-w-2xl mx-auto leading-relaxed font-medium"
                        >
                            Join India's premiere network of regional Master Tailors. Expand your reach beyond your city, access premium clientele, and grow your legacy securely.
                        </motion.p>

                        <motion.div variants={itemVariants}>
                            <Link to="/tailor/login">
                                <Button size="lg" className="text-lg px-8 py-4 bg-[#8B0000] hover:bg-[#600000] text-white border-none group shadow-[0_4px_20px_rgba(139,0,0,0.25)] transition-all duration-300 transform hover:scale-105">
                                    Be Our Partner
                                    <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                                </Button>
                            </Link>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* Benefits Section */}
            <section className="py-24 bg-white relative z-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-3xl md:text-5xl font-serif font-bold text-maroon-900 mb-4">Why Partner With Us?</h2>
                        <p className="text-stone-600 max-w-2xl mx-auto">Focus on your craft. We handle the technology, the customers, and the logistics.</p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                        {[
                            {
                                icon: <Globe className="w-12 h-12 text-gold-600 mb-6" />,
                                title: "Nationwide Reach",
                                desc: "Break local boundaries. A customer in Mumbai can now order customized Chikankari outfits directly from your boutique in Lucknow."
                            },
                            {
                                icon: <ShieldCheck className="w-12 h-12 text-gold-600 mb-6" />,
                                title: "100% Secure Payments",
                                desc: "Our escrow system ensures your money is secured the moment a customer places an order. No more haggling or unpaid dues."
                            },
                            {
                                icon: <TrendingUp className="w-12 h-12 text-gold-600 mb-6" />,
                                title: "Premium Clientele",
                                desc: "Get discovered by clients who value authentic heritage and are willing to pay a premium for verified artisanal quality."
                            }
                        ].map((benefit, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-50px" }}
                                transition={{ duration: 0.6, delay: idx * 0.15, ease: "easeOut" }}
                                whileHover={{ y: -5 }}
                                className="bg-stone-50 p-8 rounded-2xl border border-stone-200 hover:shadow-2xl hover:border-[#D4AF37]/50 transition-all duration-300 will-change-transform"
                            >
                                {benefit.icon}
                                <h3 className="text-xl font-bold text-stone-900 mb-4">{benefit.title}</h3>
                                <p className="text-stone-600 leading-relaxed">{benefit.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Social Proof / Stats */}
            <section className="py-24 bg-[#F0E5D5] text-[#4A0E17] relative z-20 border-y border-[#D4AF37]/20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x divide-[#D4AF37]/30">
                        {[
                            { value: "1,200+", label: "Verified Masterjis" },
                            { value: "15,000+", label: "Orders Completed" },
                            { value: "₹4.2Cr", label: "Paid out in 2023" },
                            { value: "4.9/5", label: "Average Rating" }
                        ].map((stat, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: idx * 0.15, ease: "easeOut" }}
                            >
                                <p className="text-4xl md:text-5xl font-bold text-[#8B0000] mb-2">{stat.value}</p>
                                <p className="text-[#5C4033] font-semibold uppercase tracking-wider text-sm">{stat.label}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Bottom CTA */}
            <section className="py-32 bg-[#FDFBF7] relative z-20 text-center overflow-hidden">
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="max-w-3xl mx-auto px-4 relative z-10"
                >
                    <h2 className="text-4xl md:text-5xl font-serif font-bold text-stone-900 mb-8">Ready to grow your legacy?</h2>
                    <Link to="/tailor/login">
                        <Button size="lg" className="text-lg px-8 py-4 bg-[#4A0E17] hover:bg-[#8B0000] text-white border-none shadow-xl transform transition-all duration-300 hover:scale-105 hover:-translate-y-1">
                            Start Your Journey
                        </Button>
                    </Link>
                </motion.div>
            </section>

        </div>
    );
}
