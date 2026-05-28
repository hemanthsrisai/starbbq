"use client";

import { motion } from "framer-motion";

const MENU_ITEMS = [
  {
    image: "/images/charcoal-chicken.jpeg",
    name: "Whole Charcoal Chicken",
    desc: "24hr marinated whole bird, slow-grilled over live oak charcoal until the skin crackles and the inside stays butter-soft.",
    price: "₹649",
    unit: "serves 2–3",
  },
  {
    image: "/images/shawarma-hero.jpeg",
    name: "Signature Shawarma",
    desc: "Flame-grilled chicken thigh, house tahini, fresh pita baked daily, loaded till it barely wraps.",
    price: "₹249",
    unit: "wrap",
  },
  {
    image: "/frames/ezgif-frame-018.jpg",
    name: "BBQ Mutton Seekh",
    desc: "Hand-minced mutton with charred onions, raw papaya tenderiser, and a 7-spice rub. Served with mint chutney.",
    price: "₹349",
    unit: "4 pcs",
  },
  {
    image: "/frames/ezgif-frame-072.jpg",
    name: "Star Special Platter",
    desc: "Half chicken + 2 seekh + shawarma + fries + 2 drinks. The full StarBBQ experience in one box.",
    price: "₹899",
    unit: "serves 2",
  },
  {
    image: "/frames/ezgif-frame-045.jpg",
    name: "Tandoor Fish Tikka",
    desc: "Fresh Rawas fillet, turmeric-ajwain marinade, cooked in a clay oven. Crisp outside, flaky inside.",
    price: "₹299",
    unit: "3 pcs",
  },
  {
    image: "/frames/ezgif-frame-054.jpg",
    name: "Chicken Malai Boti",
    desc: "Cashew-cream marinade, slow coal heat, no char — just an impossibly tender, pale gold cube of chicken.",
    price: "₹279",
    unit: "4 pcs",
  },
];

export default function MenuSection() {
  return (
    <section id="menu" className="py-24 md:py-36 px-6 md:px-12 bg-smoke relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-fire/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8 }}
          className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6"
        >
          <div>
            <span className="text-xs tracking-[4px] uppercase text-fire block mb-4 font-bold">
              Specialties
            </span>
            <h2 className="text-5xl md:text-7xl font-bold uppercase text-cream leading-none" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
              FIRE-CRAFTED<br />FAVOURITES
            </h2>
          </div>
          <a href="#contact" className="btn-outline">
            Full Menu →
          </a>
        </motion.div>

        {/* Structured Menu Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {MENU_ITEMS.map((item, i) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ delay: i * 0.08, duration: 0.7, ease: "easeOut" }}
              className="bg-ash/60 border border-white/5 rounded-2xl overflow-hidden relative group transition-all duration-300 hover:border-fire/20 hover:shadow-[0_10px_30px_rgba(255,85,0,0.1)] flex flex-col h-full"
            >
              {/* Image Header with Zoom Effect */}
              <div className="aspect-video w-full overflow-hidden relative">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-char/90 via-char/20 to-transparent" />
              </div>

              {/* Bottom decorative glowing fire line */}
              <div className="absolute bottom-0 left-0 w-full h-[3px] bg-gradient-to-r from-fire to-gold transform scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-500" />

              {/* Content Panel */}
              <div className="p-6 md:p-8 flex flex-col flex-grow">
                <h3 className="text-2xl md:text-3xl text-cream tracking-wide mb-3 font-semibold" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
                  {item.name}
                </h3>
                <p className="text-sm text-muted leading-relaxed font-light mb-6 flex-grow">
                  {item.desc}
                </p>
                <div className="text-3xl text-fire font-bold mt-auto" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
                  {item.price}
                  <span className="text-xs text-muted font-normal tracking-wider ml-1.5 lowercase">
                    / {item.unit}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
