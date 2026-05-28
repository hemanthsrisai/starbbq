"use client";

import { useEffect, useRef, useState } from "react";
import { useScroll, useTransform, motion, AnimatePresence } from "framer-motion";

export default function ScrollFrameHero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [firstLoaded, setFirstLoaded] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const frameCount = 72;
  // Make the scroll speed smoother
  const currentFrame = useTransform(scrollYProgress, [0, 1], [1, frameCount]);

  // Text overlays with precise transitions to prevent blank states
  const o1 = useTransform(scrollYProgress, [0, 0.05, 0.18, 0.22], [1, 1, 0, 0]);
  const y1 = useTransform(scrollYProgress, [0, 0.18], [0, -40]);

  const o2 = useTransform(scrollYProgress, [0.22, 0.26, 0.44, 0.48], [0, 1, 1, 0]);
  const y2 = useTransform(scrollYProgress, [0.22, 0.26, 0.44, 0.48], [40, 0, 0, -40]);

  const o3 = useTransform(scrollYProgress, [0.48, 0.52, 0.70, 0.74], [0, 1, 1, 0]);
  const y3 = useTransform(scrollYProgress, [0.48, 0.52, 0.70, 0.74], [40, 0, 0, -40]);

  const o4 = useTransform(scrollYProgress, [0.74, 0.78, 0.92, 0.98], [0, 1, 1, 0]);
  const y4 = useTransform(scrollYProgress, [0.74, 0.78, 0.92, 0.98], [40, 0, 0, -20]);

  const underlineScale = useTransform(scrollYProgress, [0.78, 0.85], [0, 1]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext("2d");
    if (!context) return;

    const images: HTMLImageElement[] = [];
    const loadedMap: boolean[] = new Array(frameCount + 1).fill(false);

    // Render frame logic with fallback
    const drawFrame = (index: number) => {
      let targetIndex = Math.round(index);
      if (targetIndex < 1) targetIndex = 1;
      if (targetIndex > frameCount) targetIndex = frameCount;

      // Find closest loaded image if current one isn't loaded yet
      let resolvedIndex = targetIndex;
      if (!loadedMap[resolvedIndex]) {
        let found = false;
        // Search outwards up to 15 frames away
        for (let offset = 1; offset <= 15; offset++) {
          if (resolvedIndex - offset >= 1 && loadedMap[resolvedIndex - offset]) {
            resolvedIndex = resolvedIndex - offset;
            found = true;
            break;
          }
          if (resolvedIndex + offset <= frameCount && loadedMap[resolvedIndex + offset]) {
            resolvedIndex = resolvedIndex + offset;
            found = true;
            break;
          }
        }
        if (!found && loadedMap[1]) {
          resolvedIndex = 1;
        }
      }

      const img = images[resolvedIndex];
      if (!img || !img.complete) return;

      const hRatio = canvas.width / img.width;
      const vRatio = canvas.height / img.height;
      const ratio = Math.max(hRatio, vRatio);
      const cx = (canvas.width - img.width * ratio) / 2;
      const cy = (canvas.height - img.height * ratio) / 2;

      context.clearRect(0, 0, canvas.width, canvas.height);
      context.drawImage(img, 0, 0, img.width, img.height, cx, cy, img.width * ratio, img.height * ratio);
    };

    // Load Frame 1 immediately
    const img1 = new Image();
    img1.src = `/frames/ezgif-frame-001.jpg`;
    img1.onload = () => {
      images[1] = img1;
      loadedMap[1] = true;
      setFirstLoaded(true);
      drawFrame(1);

      // Preload all other frames in the background
      for (let i = 2; i <= frameCount; i++) {
        const img = new Image();
        img.src = `/frames/ezgif-frame-${String(i).padStart(3, "0")}.jpg`;
        img.onload = () => {
          images[i] = img;
          loadedMap[i] = true;
          // Re-draw current frame to update live
          drawFrame(currentFrame.get());
        };
      }
    };

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      drawFrame(currentFrame.get());
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    const unsubscribe = currentFrame.on("change", (latest) => {
      drawFrame(latest);
    });

    return () => {
      window.removeEventListener("resize", handleResize);
      unsubscribe();
    };
  }, [currentFrame, frameCount]);

  return (
    <div ref={containerRef} className="relative h-[450vh] w-full bg-char">
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-char">
        {/* Frame canvas with initial opacity transition */}
        <motion.canvas
          ref={canvasRef}
          initial={{ opacity: 0 }}
          animate={{ opacity: firstLoaded ? 1 : 0 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Loading Spinner */}
        {!firstLoaded && (
          <div className="absolute inset-0 flex items-center justify-center bg-char z-50">
            <div className="flex flex-col items-center gap-4">
              <div className="w-12 h-12 border-4 border-fire border-t-transparent rounded-full animate-spin" />
              <p className="text-xs uppercase tracking-widest text-muted">Igniting fire kitchen...</p>
            </div>
          </div>
        )}

        {/* Dark filmic overlays */}
        <div className="absolute inset-0 bg-black/45" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a]/80 via-transparent to-[#0a0a0a]/90" />

        {/* Dynamic Text Overlays */}
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center pointer-events-none text-center px-6">
          {/* Section 1: Brand Name */}
          <motion.div style={{ opacity: o1, y: y1 }} className="absolute flex flex-col items-center max-w-4xl">
            <p className="text-xs md:text-sm font-bold tracking-[6px] uppercase text-fire mb-5">
              ★ Hyderabad&apos;s Finest Fire Kitchen ★
            </p>
            <h1 className="text-hero text-cream font-bold uppercase" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
              STAR
              <span className="block" style={{ WebkitTextStroke: "2px #FF5500", color: "transparent" }}>
                BBQ
              </span>
            </h1>
            <p className="mt-5 text-lg md:text-2xl italic font-light text-muted max-w-lg" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
              Where real charcoal meets ancient spice. Every flame tells a story worth tasting.
            </p>
          </motion.div>

          {/* Section 2: Marinade */}
          <motion.div style={{ opacity: o2, y: y2 }} className="absolute flex flex-col items-center max-w-3xl">
            <h2 className="text-4xl md:text-6xl lg:text-7xl uppercase tracking-wider font-bold text-cream mb-6">
              24 Hours of Patience.
            </h2>
            <p className="text-lg md:text-2xl text-white/70 leading-relaxed max-w-xl font-light">
              Marinated in our secret spice blend overnight, then slow-grilled over live oak charcoal.
            </p>
          </motion.div>

          {/* Section 3: Flavor */}
          <motion.div style={{ opacity: o3, y: y3 }} className="absolute flex flex-col items-center max-w-3xl">
            <h2 className="text-4xl md:text-6xl lg:text-7xl uppercase tracking-wider font-bold text-cream mb-6">
              Flavor From The Flame.
            </h2>
            <p className="text-lg md:text-2xl text-white/70 leading-relaxed max-w-xl font-light">
              The char isn&apos;t a byproduct — it&apos;s the point. Every mark tells a story of smoke and heat.
            </p>
          </motion.div>

          {/* Section 4: Promise */}
          <motion.div style={{ opacity: o4, y: y4 }} className="absolute flex flex-col items-center max-w-5xl">
            <h2 className="text-4xl md:text-6xl lg:text-8xl italic text-cream drop-shadow-2xl leading-tight relative" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
              No gas. No shortcuts. No compromise.
              <motion.div
                style={{ scaleX: underlineScale }}
                className="absolute -bottom-4 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-fire to-transparent origin-center shadow-[0_0_20px_rgba(255,85,0,0.5)]"
              />
            </h2>
          </motion.div>
        </div>

        {/* Scroll hint */}
        <motion.div
          style={{ opacity: useTransform(scrollYProgress, [0, 0.05], [1, 0]) }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none"
        >
          <span className="text-[10px] tracking-[3px] text-muted uppercase">Scroll</span>
          <div className="w-[1px] h-12 bg-gradient-to-b from-fire to-transparent" style={{ animation: "scrollPulse 2s infinite" }} />
        </motion.div>
      </div>
    </div>
  );
}
