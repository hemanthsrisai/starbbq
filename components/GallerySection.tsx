"use client";

import { motion } from "framer-motion";

const GALLERY_ITEMS = [
  { src: "/frames/ezgif-frame-072.jpg", label: "Signature Star BBQ Platter", span: "md:col-span-2 md:row-span-2" },
  { src: "/frames/ezgif-frame-001.jpg", label: "Live Ember & Spice Swirl", span: "" },
  { src: "/images/shawarma-hero.jpeg", label: "Sig. Chicken Shawarma", span: "" },
  { src: "/frames/ezgif-frame-036.jpg", label: "Oak Charcoal Smoked Pit", span: "" },
  { src: "/images/charcoal-chicken.jpeg", label: "Crispy Charcoal Chicken", span: "" },
];

export default function GallerySection() {
  return (
    <section id="gallery" className="py-24 md:py-36 px-6 md:px-12 bg-smoke relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-fire/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8 }}
        >
          <span className="text-xs tracking-[4px] uppercase text-fire block mb-4 font-bold">
            Gallery
          </span>
          <h2 className="text-5xl md:text-7xl font-bold uppercase text-cream mb-12 leading-none" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
            STRAIGHT FROM<br />THE GRILL
          </h2>
        </motion.div>

        {/* Masonry Grid Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 md:grid-rows-[260px_260px] gap-4">
          {GALLERY_ITEMS.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ delay: i * 0.08, duration: 0.7, ease: "easeOut" }}
              className={`relative overflow-hidden group rounded-2xl border border-white/5 shadow-lg ${item.span} h-64 sm:h-auto`}
            >
              <img
                src={item.src}
                alt={item.label}
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 group-hover:grayscale-0 grayscale-[0.1]"
              />
              {/* Overlay with details */}
              <div className="absolute inset-0 bg-gradient-to-t from-char/90 via-char/20 to-transparent opacity-80 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                <span className="text-sm tracking-[2px] uppercase text-cream font-bold">
                  {item.label}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
