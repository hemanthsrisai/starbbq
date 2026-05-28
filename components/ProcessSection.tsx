"use client";

import { motion } from "framer-motion";

const STEPS = [
  { num: "01", icon: "🧂", title: "Marinate", desc: "Every protein sits in our 12-spice wet marinade for a minimum of 24 hours. No shortcuts. No exceptions." },
  { num: "02", icon: "🪵", title: "Select Wood", desc: "We use only oak and coconut shell charcoal. Both burn hotter and cleaner than standard coal — no chemical taste." },
  { num: "03", icon: "🔥", title: "Live Fire", desc: "Grill temperature reaches 800°C. The Maillard reaction locks in juices and builds that iconic char crust." },
  { num: "04", icon: "🍽️", title: "Plate & Serve", desc: "Served within minutes of leaving the grill. No heat lamps. No holding trays. Just live food, alive." },
];

export default function ProcessSection() {
  return (
    <section className="py-24 md:py-36 px-6 md:px-12 bg-char relative overflow-hidden">
      <div id="process" className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8 }}
        >
          <span className="text-xs tracking-[4px] uppercase text-fire block mb-4 font-bold">
            The Craft
          </span>
          <h2 className="text-5xl md:text-7xl font-bold uppercase text-cream mb-16 leading-none" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
            HOW WE<br />COOK
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border border-fire/10 rounded-2xl overflow-hidden bg-ash/20 backdrop-blur-sm">
          {STEPS.map((step, i) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ delay: i * 0.1, duration: 0.7 }}
              className="p-8 md:p-10 border-r border-b border-fire/10 last:border-r-0 last:border-b-0 sm:odd:border-r sm:even:border-r-0 lg:even:border-r lg:last:border-r-0 lg:border-b-0 relative group transition-colors duration-300 hover:bg-fire/[0.04]"
            >
              {/* Large ghost number */}
              <div
                className="absolute top-5 right-5 text-6xl md:text-7xl text-fire/10 leading-none font-bold"
                style={{ fontFamily: "'Bebas Neue', sans-serif" }}
              >
                {step.num}
              </div>

              <span className="text-3xl block mb-5 saturate-150">{step.icon}</span>
              <div
                className="text-xl md:text-2xl text-cream tracking-wide mb-3 font-semibold"
                style={{ fontFamily: "'Bebas Neue', sans-serif" }}
              >
                {step.title}
              </div>
              <p
                className="text-sm text-muted leading-relaxed font-light"
                style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
              >
                {step.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
