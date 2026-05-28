"use client";

import { motion } from "framer-motion";

const REVIEWS = [
  {
    text: "Best charcoal chicken in Hyderabad. Period. The skin is unreal — crackling, smoky, perfect.",
    name: "Rohit K.",
    role: "Zomato · Verified",
    initials: "RK",
  },
  {
    text: "The shawarma wrap is massive and absolutely packed. Tahini sauce is something else. We keep coming back.",
    name: "Priya S.",
    role: "Google Maps · Local Guide",
    initials: "PS",
  },
  {
    text: "Ordered the Star Special Platter for two. Didn't speak for 20 minutes. That's how good it was.",
    name: "Arjun M.",
    role: "Swiggy · Top Reviewer",
    initials: "AM",
  },
];

export default function TestimonialsSection() {
  return (
    <section className="py-24 md:py-36 px-6 md:px-12 bg-char relative overflow-hidden">
      {/* Background glowing decorations */}
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-80 h-80 bg-fire/5 rounded-full blur-[100px] pointer-events-none" />

      <div id="testimonials" className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8 }}
        >
          <span className="text-xs tracking-[4px] uppercase text-fire block mb-4 font-bold">
            Reviews
          </span>
          <h2 className="text-5xl md:text-7xl font-bold uppercase text-cream mb-14 leading-none" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
            WHAT PEOPLE<br />SAY
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {REVIEWS.map((review, i) => (
            <motion.div
              key={review.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ delay: i * 0.12, duration: 0.7 }}
              className="glass-card p-8 md:p-9 relative rounded-2xl border border-white/5 flex flex-col justify-between h-full"
            >
              <div>
                {/* Opening quote */}
                <div
                  className="absolute top-2 left-5 text-7xl text-fire opacity-20 leading-none select-none"
                  style={{ fontFamily: "'Cormorant Garamond', serif" }}
                >
                  &ldquo;
                </div>

                {/* Stars */}
                <div className="text-gold text-sm mb-4">★★★★★</div>

                <p
                  className="text-lg md:text-xl italic text-white/80 leading-relaxed mb-6 pt-4"
                  style={{ fontFamily: "'Cormorant Garamond', serif" }}
                >
                  {review.text}
                </p>
              </div>

              <div className="flex items-center gap-3 mt-4">
                <div className="w-10 h-10 rounded-full bg-fire flex items-center justify-center text-sm font-bold text-black shadow-md">
                  {review.initials}
                </div>
                <div>
                  <div
                    className="text-sm font-semibold text-cream"
                    style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
                  >
                    {review.name}
                  </div>
                  <div
                    className="text-xs text-muted tracking-wide"
                    style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
                  >
                    {review.role}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
