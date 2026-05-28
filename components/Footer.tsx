export default function Footer() {
  return (
    <footer className="bg-[#050507] border-t border-white/5 px-6 md:px-12 relative z-10">
      <div className="max-w-6xl mx-auto py-10 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="text-2xl tracking-[3px] text-muted font-bold" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
          STAR<span className="text-fire">BBQ</span>
        </div>
        <div className="text-xs text-white/35 tracking-wider uppercase" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
          © 2025 StarBBQ. Born in fire. Served with pride.
        </div>
        <div className="flex gap-8">
          {["Menu", "Story", "Contact"].map((l) => (
            <a key={l} href={`#${l.toLowerCase()}`} className="text-xs tracking-[2.5px] uppercase text-muted hover:text-fire transition-colors font-semibold" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
              {l}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
