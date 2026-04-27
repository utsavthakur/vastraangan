import React, { useEffect, useRef, useState } from 'react';
import { useScroll, useSpring, useTransform, motion } from 'framer-motion';

const FRAME_COUNT = 151;
const ASSET_PATH = '/img/ezgif-frame-';

const CinematicScroll: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [images, setImages] = useState<HTMLImageElement[]>([]);
    const [loadedFrames, setLoadedFrames] = useState<number>(0);
    const [isFullyLoaded, setIsFullyLoaded] = useState(false);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ['start start', 'end end'],
    });

    // Apply a smooth spring to the scroll progress for a premium feel
    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001,
    });

    // Map 0 -> 1 progress to 0 -> 150 frame index
    const frameIndexRaw = useTransform(smoothProgress, [0, 1], [0, FRAME_COUNT - 1]);

    useEffect(() => {
        // 1. Array to hold images
        const tempImages: HTMLImageElement[] = new Array(FRAME_COUNT);
        let loadedCount = 0;

        const loadImage = (index: number): Promise<void> => {
            return new Promise((resolve) => {
                const img = new Image();
                const frameNum = (index + 1).toString().padStart(3, '0');
                img.src = `${ASSET_PATH}${frameNum}.png`;
                img.onload = () => {
                    tempImages[index] = img;
                    loadedCount++;
                    setLoadedFrames(loadedCount);
                    if (loadedCount === FRAME_COUNT) {
                        setIsFullyLoaded(true);
                    }
                    // If this is the very first frame or the currently needed frame, draw it to make it feel responsive
                    if (index === 0 && canvasRef.current) {
                        const ctx = canvasRef.current.getContext('2d');
                        if (ctx) {
                            drawFrame(img, canvasRef.current, ctx);
                        }
                    }
                    resolve();
                };
            });
        };

        // Load Strategy: 
        // Stage 1: Load frame 0 immediately.
        // Stage 2: Load a sparse skeleton (every 10th frame) for quick initial interaction.
        // Stage 3: Load the rest.

        const loadSequence = async () => {
            // Stage 1
            await loadImage(0);

            // Stage 2
            const skeletonPromises = [];
            for (let i = 10; i < FRAME_COUNT; i += 10) {
                skeletonPromises.push(loadImage(i));
            }
            await Promise.all(skeletonPromises);

            // Stage 3
            const remainingPromises = [];
            for (let i = 1; i < FRAME_COUNT; i++) {
                if (i % 10 !== 0) { // skip the ones we already loaded
                    remainingPromises.push(loadImage(i));
                }
            }
            await Promise.all(remainingPromises);
            setImages(tempImages);
        };

        loadSequence();
    }, []);

    const drawFrame = (img: HTMLImageElement, canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) => {
        // Clear canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Calculate scaling to "cover" the canvas (like object-fit: cover)
        const hRatio = canvas.width / img.width;
        const vRatio = canvas.height / img.height;
        const ratio = Math.max(hRatio, vRatio);

        const centerShift_x = (canvas.width - img.width * ratio) / 2;
        const centerShift_y = (canvas.height - img.height * ratio) / 2;

        ctx.drawImage(
            img,
            0, 0, img.width, img.height,
            centerShift_x, centerShift_y, img.width * ratio, img.height * ratio
        );
    };

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Handle Resize
        const handleResize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;

            // Redraw current frame immediately on resize
            const currentIdx = Math.round(frameIndexRaw.get());
            const currentImg = images[currentIdx] || images[0]; // fallback to first frame if still loading
            if (currentImg) {
                drawFrame(currentImg, canvas, ctx);
            }
        };

        handleResize();
        window.addEventListener('resize', handleResize);

        // Subscribe to framer-motion value changes to draw the frame
        const unsubscribe = frameIndexRaw.on('change', (latest) => {
            const index = Math.round(latest);
            const img = images[index];

            // If we're scrolling super fast and hit an unloaded frame, fallback to a known loaded one (ideally nearest, but keeping simple for now)
            if (img && canvas && ctx) {
                drawFrame(img, canvas, ctx);
            }
        });

        return () => {
            window.removeEventListener('resize', handleResize);
            unsubscribe();
        };
    }, [images, frameIndexRaw]);

    // Typography Animations triggered by specific scroll progress stages
    const opacity1 = useTransform(smoothProgress, [0.05, 0.1, 0.2, 0.25], [0, 1, 1, 0]);
    const y1 = useTransform(smoothProgress, [0.05, 0.1], [50, 0]);

    const opacity2 = useTransform(smoothProgress, [0.3, 0.35, 0.5, 0.55], [0, 1, 1, 0]);
    const y2 = useTransform(smoothProgress, [0.3, 0.35], [50, 0]);

    const opacity3 = useTransform(smoothProgress, [0.65, 0.7, 0.85, 0.9], [0, 1, 1, 0]);
    const y3 = useTransform(smoothProgress, [0.65, 0.7], [50, 0]);


    return (
        <div ref={containerRef} className="relative w-full bg-charcoal h-[800vh]">
            {/* SVG Noise Overlay for Filmic Texture */}
            <svg className="fixed pointer-events-none opacity-0 invisible" width="0" height="0">
                <filter id="noiseFilter">
                    <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
                </filter>
            </svg>

            <div className="sticky top-0 h-screen w-full overflow-hidden bg-stone-900">
                {/* Canvas Engine */}
                <canvas
                    ref={canvasRef}
                    className="absolute inset-0 w-full h-full object-cover"
                    style={{ opacity: loadedFrames > 0 ? 1 : 0, transition: 'opacity 1s ease-in-out' }}
                />

                {/* Dynamic Vignette / Lighting Overlays */}
                <div className="absolute inset-0 pointer-events-none bg-radial-vignette opacity-80 mix-blend-overlay"></div>
                <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-charcoal/80 via-transparent to-charcoal/40"></div>

                {/* Film Grain Texture - Low Opacity over everything */}
                <div className="absolute inset-0 pointer-events-none opacity-5 mix-blend-screen" style={{ filter: 'url(#noiseFilter)' }}></div>

                {/* Scrollytelling Typography Layer */}
                <div className="absolute inset-0 flex flex-col items-center justify-center p-8 pointer-events-none z-10 text-center">

                    {/* Slide 1 */}
                    <motion.div
                        style={{ opacity: opacity1, y: y1 }}
                        className="absolute max-w-3xl"
                    >
                        <h2 className="text-4xl md:text-7xl font-serif text-gold-500 mb-6 drop-shadow-xl font-light italic">
                            The Heritage Thread
                        </h2>
                        <p className="text-xl md:text-2xl text-ivory/90 font-sans tracking-wide leading-relaxed drop-shadow-md">
                            Every stitch carries the weight of history. Born in Kanchipuram, preserved in our ateliers.
                        </p>
                    </motion.div>

                    {/* Slide 2 */}
                    <motion.div
                        style={{ opacity: opacity2, y: y2 }}
                        className="absolute max-w-3xl"
                    >
                        <h2 className="text-4xl md:text-7xl font-serif text-white mb-6 drop-shadow-xl font-bold">
                            Woven in Gold
                        </h2>
                        <p className="text-xl md:text-2xl text-gold-500 font-sans tracking-wide leading-relaxed drop-shadow-md">
                            400+ hours to weave. 100% pure zari. A Kanjeevaram isn't just a saree—it's an inheritance.
                        </p>
                    </motion.div>

                    {/* Slide 3 */}
                    <motion.div
                        style={{ opacity: opacity3, y: y3 }}
                        className="absolute max-w-4xl"
                    >
                        <h2 className="text-4xl md:text-6xl font-serif text-white mb-6 drop-shadow-xl">
                            Experience the Legacy
                        </h2>
                        <p className="text-lg md:text-xl text-stone-300 font-sans tracking-wide leading-relaxed drop-shadow-md mb-8">
                            Connect with Master Weavers and Tailors to customize your heirloom.
                        </p>
                    </motion.div>
                </div>

                {/* Loading Indicator for Heavy Assets */}
                {!isFullyLoaded && (
                    <div className="absolute bottom-8 right-8 text-gold-500/50 font-sans text-sm tracking-widest font-bold">
                        BUFFERING {Math.floor((loadedFrames / FRAME_COUNT) * 100)}%
                    </div>
                )}
            </div>
        </div>
    );
};

export default CinematicScroll;
