"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, User, Mail, MessageSquare, FileText, CheckCircle2 } from "lucide-react";

export default function ContactSection() {
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSending, setIsSending] = useState(false);

  const validate = () => {
    const e: Record<string, string> = {};
    if (!formData.name.trim()) e.name = "Full Name is required";
    if (!formData.email.trim()) {
      e.email = "Email Address is required";
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      e.email = "Please enter a valid email address";
    }
    if (!formData.subject.trim()) e.subject = "Subject is required";
    if (!formData.message.trim()) e.message = "Message cannot be empty";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (ev: React.FormEvent) => {
    ev.preventDefault();
    if (!validate()) return;

    setIsSending(true);

    // Format the message with WhatsApp markdown
    const formattedText = `*New Portfolio Inquiry* 🍢\n\n` +
      `👤 *Name:* ${formData.name}\n` +
      `✉️ *Email:* ${formData.email}\n` +
      `📂 *Subject:* ${formData.subject}\n\n` +
      `💬 *Message:* \n${formData.message}`;

    const encodedText = encodeURIComponent(formattedText);
    const whatsappUrl = `https://wa.me/918985925737?text=${encodedText}`;

    // Simulate sending transition, then redirect
    setTimeout(() => {
      window.open(whatsappUrl, "_blank");
      setIsSending(false);
      setFormData({ name: "", email: "", subject: "", message: "" });
    }, 800);
  };

  const inputClass = (fieldName: string) =>
    `w-full bg-[#18181b]/50 border ${
      errors[fieldName] ? "border-red-500/80 focus:border-red-500/80" : "border-white/10 focus:border-green-wa"
    } rounded-xl px-5 py-3.5 pl-12 text-white focus:outline-none focus:ring-1 focus:ring-green-wa/20 transition-all duration-300 placeholder:text-white/20`;

  return (
    <section id="contact" className="relative py-24 md:py-36 px-6 md:px-12 overflow-hidden bg-gradient-to-b from-char to-[#050505]">
      {/* Background glowing decorations */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[600px] h-[600px] bg-green-wa/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-96 h-96 bg-fire/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-fire/20 to-transparent" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 md:mb-20"
        >
          <span className="text-xs tracking-[4px] uppercase text-fire block mb-4 font-bold">
            Get in touch
          </span>
          <h2 className="text-5xl md:text-7xl font-bold uppercase text-cream leading-none" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
            LET&apos;S <span className="text-green-wa">CONNECT</span>
          </h2>
          <p className="text-lg md:text-xl italic font-light text-muted mt-4 max-w-xl mx-auto" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
            Reach out via our WhatsApp portal. Fill in your details below to start a live chat instantly.
          </p>
        </motion.div>

        {/* 2-Column Responsive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Mock WhatsApp Chat Panel */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="lg:col-span-2 bg-[#0c0c0e]/80 border border-white/5 rounded-3xl overflow-hidden shadow-2xl flex flex-col"
          >
            {/* Header info */}
            <div className="bg-[#1f2c34] px-6 py-4 flex items-center justify-between border-b border-white/5">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <img
                    src="/logo.jpg"
                    alt="Star BBQ logo"
                    className="w-10 h-10 rounded-full object-cover border border-white/10"
                  />
                  <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-wa border-2 border-[#1f2c34] rounded-full" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-white">Star BBQ Support</h4>
                  <p className="text-[11px] text-green-wa tracking-wider uppercase font-bold">Online</p>
                </div>
              </div>
            </div>

            {/* Chat Body */}
            <div className="p-6 bg-[#0b141a]/95 flex-grow space-y-4 min-h-[300px]" style={{ backgroundImage: "url('https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png')", backgroundSize: "contain", backgroundBlendMode: "overlay" }}>
              
              {/* Bubble 1 (Received) */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 10 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="bg-[#202c33] text-cream p-4 rounded-2xl rounded-tl-none max-w-[85%] text-sm shadow-md"
              >
                <p>Hey there! Welcome to the Star BBQ website. 🍗🔥</p>
                <span className="text-[10px] text-white/40 block text-right mt-1.5">14:40</span>
              </motion.div>

              {/* Bubble 2 (Received) */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 10 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6, duration: 0.5 }}
                className="bg-[#202c33] text-cream p-4 rounded-2xl rounded-tl-none max-w-[85%] text-sm shadow-md"
              >
                <p>Have questions about catering, private orders, or menus? Use the form on the right to start a chat directly with Hemanth!</p>
                <span className="text-[10px] text-white/40 block text-right mt-1.5">14:41</span>
              </motion.div>

              {/* Bubble 3 (Sent, Dynamic Preview) */}
              <AnimatePresence>
                {formData.name && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="bg-[#005c4b] text-cream p-4 rounded-2xl rounded-tr-none max-w-[85%] ml-auto text-sm shadow-md"
                  >
                    <p className="font-semibold text-green-wa text-xs mb-1">Preview Message</p>
                    <p className="line-clamp-4 italic text-white/80">
                      Hi, my name is {formData.name}. {formData.message || "I'd like to connect..."}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Right Column: Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-3 w-full"
          >
            <form onSubmit={handleSubmit} className="bg-ash/40 border border-white/5 rounded-3xl p-8 md:p-10 shadow-2xl space-y-6 backdrop-blur-md">
              <h3 className="text-2xl font-bold uppercase text-cream tracking-wide mb-2" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
                Send Message
              </h3>

              {/* Full Name */}
              <div className="space-y-1 relative">
                <label className="text-xs font-semibold tracking-wider uppercase text-muted block mb-2">
                  Full Name
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted">
                    <User className="w-5 h-5" />
                  </span>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className={inputClass("name")}
                    placeholder="John Doe"
                  />
                </div>
                {errors.name && <span className="text-red-400 text-xs mt-1 block">{errors.name}</span>}
              </div>

              {/* Email Address */}
              <div className="space-y-1 relative">
                <label className="text-xs font-semibold tracking-wider uppercase text-muted block mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted">
                    <Mail className="w-5 h-5" />
                  </span>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className={inputClass("email")}
                    placeholder="john@example.com"
                  />
                </div>
                {errors.email && <span className="text-red-400 text-xs mt-1 block">{errors.email}</span>}
              </div>

              {/* Subject */}
              <div className="space-y-1 relative">
                <label className="text-xs font-semibold tracking-wider uppercase text-muted block mb-2">
                  Subject
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted">
                    <FileText className="w-5 h-5" />
                  </span>
                  <input
                    type="text"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className={inputClass("subject")}
                    placeholder="Collaboration, catering, order..."
                  />
                </div>
                {errors.subject && <span className="text-red-400 text-xs mt-1 block">{errors.subject}</span>}
              </div>

              {/* Message */}
              <div className="space-y-1 relative">
                <label className="text-xs font-semibold tracking-wider uppercase text-muted block mb-2">
                  Message
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-5 text-muted">
                    <MessageSquare className="w-5 h-5" />
                  </span>
                  <textarea
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    rows={5}
                    className={`${inputClass("message")} resize-none pl-12 pt-4`}
                    placeholder="Tell us details about your request..."
                  />
                </div>
                {errors.message && <span className="text-red-400 text-xs mt-1 block">{errors.message}</span>}
              </div>

              {/* WhatsApp styled submit button */}
              <button
                type="submit"
                disabled={isSending}
                className="w-full py-4.5 bg-green-wa rounded-xl text-white font-bold tracking-widest uppercase text-base flex items-center justify-center gap-3 hover:bg-[#20bd5a] transition-all duration-300 hover:shadow-[0_0_30px_rgba(37,211,102,0.4)] cursor-pointer disabled:opacity-50"
              >
                {isSending ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Opening WhatsApp...
                  </>
                ) : (
                  <>
                    Send via WhatsApp
                    <Send className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                  </>
                )}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
