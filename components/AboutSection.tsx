"use client";

import { motion } from "framer-motion";

export default function AboutSection() {
  return (
    <section className="py-24 md:py-36 px-6 md:px-12 bg-char relative overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-96 h-96 bg-fire/5 rounded-full blur-[120px] pointer-events-none" />

      <div
        id="about"
        className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center"
      >
        {/* Visual Panel */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative h-[400px] md:h-[520px]"
        >
          {/* Main frame image (showing live grilling) */}
          <div className="w-full h-full overflow-hidden border border-fire/15 relative group rounded-2xl shadow-2xl">
            <img
              src="/frames/ezgif-frame-036.jpg"
              alt="Star BBQ Charcoal Grilled Chicken"
              className="w-full h-full object-cover scale-105 group-hover:scale-100 group-hover:grayscale-0 grayscale-[0.2] transition-all duration-700 ease-out"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/70 via-transparent to-transparent" />
            <span className="absolute bottom-6 left-6 text-xs tracking-[3px] text-muted uppercase font-bold">
              Oak Wood Charcoal Pit
            </span>
          </div>

          {/* EST Badge */}
          <motion.div
            initial={{ scale: 0, rotate: -45 }}
            whileInView={{ scale: 1, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 100, delay: 0.4 }}
            className="absolute -top-6 -right-6 w-24 h-24 bg-fire rounded-full flex items-center justify-center text-center text-black shadow-xl"
            style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: "14px",
              letterSpacing: "2.5px",
              lineHeight: 1.2,
              animation: "rotateBadge 15s linear infinite",
            }}
          >
            EST.<br />2018
          </motion.div>
        </motion.div>

        {/* Text Content */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.15 }}
          className="flex flex-col gap-6"
        >
          <span className="text-xs tracking-[4px] uppercase text-fire font-bold">
            Our Story
          </span>

          <h2 className="text-5xl md:text-7xl font-bold uppercase text-cream leading-none" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
            BORN FROM<br />THE FLAME
          </h2>

          <p className="text-xl md:text-2xl italic font-light text-muted leading-relaxed" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
            StarBBQ started as a single coal pit and a stubborn belief: that fire is the only honest way to cook.
          </p>

          <p className="text-base md:text-lg text-white/70 leading-[1.8] font-light">
            We don&apos;t use shortcuts. No gas. No steamers. No pre-marinated batches sitting in plastic trays. Every bird, every skewer, every wrap starts fresh — marinated overnight, kissed by live oak charcoal, and served the minute it&apos;s ready.
          </p>

          <p className="text-base md:text-lg text-white/70 leading-[1.8] font-light">
            What started in Hyderabad has grown into a legend. But the coal still burns the same way it did on day one.
          </p>

          <a href="#contact" className="btn-fire w-fit mt-4">
            Reserve a Table
          </a>
        </motion.div>
      </div>
    </section>
  );
}
