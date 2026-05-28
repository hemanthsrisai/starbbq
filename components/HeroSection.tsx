"use client";

import { motion } from "framer-motion";
import EmberCanvas from "./EmberCanvas";

const STATS = [
  { num: "800°", label: "Charcoal Temp" },
  { num: "24hr", label: "Marinade Time" },
  { num: "12+", label: "Secret Spices" },
  { num: "0%", label: "Gas. Ever." },
];

export default function HeroSection() {
  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden px-6 md:px-12 py-32 bg-char">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_80%,rgba(255,85,0,0.18)_0%,transparent_70%),radial-gradient(ellipse_40%_30%_at_20%_60%,rgba(255,140,0,0.08)_0%,transparent_60%)] z-0" />
      
      {/* Ember particles */}
      <EmberCanvas />

      {/* Hero content */}
      <div className="relative z-10 text-center max-w-5xl">
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="text-xs md:text-sm font-semibold tracking-[5px] uppercase text-fire mb-6"
        >
          ★ Hyderabad&apos;s Finest Fire Kitchen ★
        </motion.p>

        <h1
          className="text-hero text-cream font-bold"
          style={{ fontFamily: "'Bebas Neue', sans-serif" }}
        >
          STAR
          <span
            className="block"
            style={{ WebkitTextStroke: "2px #FF5500", color: "transparent" }}
          >
            BBQ
          </span>
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.9 }}
          className="mt-6 text-lg md:text-2xl italic font-light text-muted max-w-lg mx-auto leading-relaxed"
          style={{ fontFamily: "'Cormorant Garamond', serif" }}
        >
          Where real charcoal meets ancient spice. Every flame tells a story worth tasting.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.9 }}
          className="mt-12 flex flex-wrap gap-4 justify-center"
        >
          <a href="#menu" className="btn-fire text-base">Explore Our Menu</a>
          <a href="#about" className="btn-outline text-base">Our Story</a>
        </motion.div>
      </div>

      {/* Scroll hint */}
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-[10px] tracking-[3px] text-muted uppercase">
          Scroll
        </span>
        <div
          className="w-[1px] h-12 bg-gradient-to-b from-fire to-transparent"
          style={{ animation: "scrollPulse 2s infinite" }}
        />
      </div>
    </section>
  );
}

export function StatsStrip() {
  return (
    <div className="bg-ash border-t border-b border-fire/15 py-8 px-6 md:px-12 relative z-10">
      <div className="max-w-6xl mx-auto flex flex-wrap justify-center gap-0">
        {STATS.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.6 }}
            className="flex-1 min-w-[120px] max-w-[200px] text-center px-4 md:px-8 border-r border-fire/10 last:border-r-0"
          >
            <div
              className="text-4xl md:text-5xl text-fire leading-none font-bold"
              style={{ fontFamily: "'Bebas Neue', sans-serif" }}
            >
              {s.num}
            </div>
            <div
              className="text-[11px] tracking-[2px] uppercase text-muted mt-2"
              style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
            >
              {s.label}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
