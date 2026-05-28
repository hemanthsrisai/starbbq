"use client";

import { useEffect, useRef, useState, CSSProperties } from "react";
import { Send, User, Mail, MessageSquare, FileText } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// Assets
const PORTAL_BG = "https://res.cloudinary.com/dy5er7kv5/image/upload/q_auto/f_auto/v1779707217/image_1_vdzwae.png";
const CURTAIN_LEFT = "https://res.cloudinary.com/dy5er7kv5/image/upload/q_auto/f_auto/v1779706559/curtain_left_znkmva.png";
const CURTAIN_RIGHT = "https://res.cloudinary.com/dy5er7kv5/image/upload/q_auto/f_auto/v1779706564/curtain_right_paeyym.png";
const BOTTOM_CLOUDS = "https://res.cloudinary.com/dy5er7kv5/image/upload/q_auto/f_auto/v1779706555/bottom_clouds_xskut6.png";
const WORLD_BG = "/frames/ezgif-frame-036.jpg"; // Our Star BBQ charcoal pit frame

const SCENE1_CARDS = [
  "/images/shawarma-hero.jpeg",
  "/frames/ezgif-frame-018.jpg",
  "/images/charcoal-chicken.jpeg"
];

// Card Data for Scene 2
const SCENE2_CARDS = [
  { title: 'Whole Charcoal Chicken', desc: '24hr marinated, live oak charcoal grilled', image: '/images/charcoal-chicken.jpeg' },
  { title: 'Signature Shawarma', desc: 'Flame-grilled thigh, house tahini, fresh pita', image: '/images/shawarma-hero.jpeg' },
  { title: 'BBQ Mutton Seekh', desc: 'Hand-minced with charred onions & 7-spice', image: '/frames/ezgif-frame-018.jpg' },
  { title: 'Star Special Platter', desc: 'Half chicken, 2 seekh, shawarma, fries & drinks', image: '/frames/ezgif-frame-072.jpg' },
  { title: 'Tandoor Fish Tikka', desc: 'Fresh Rawas fillet, turmeric-ajwain marinade', image: '/frames/ezgif-frame-045.jpg' },
  { title: 'Chicken Malai Boti', desc: 'Cashew-cream marinade, pale gold perfection', image: '/frames/ezgif-frame-054.jpg' }
];

// Helper functions
const easeInOut = (t: number) => (t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t);
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const clamp = (val: number, min: number, max: number) => Math.max(min, Math.min(max, val));

// Custom responsive hook
function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const media = window.matchMedia("(max-width: 767px)");
    setIsMobile(media.matches);
    const listener = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    media.addEventListener("change", listener);
    return () => media.removeEventListener("change", listener);
  }, []);
  return isMobile;
}

export default function App() {
  const isMobile = useIsMobile();
  const [scrollProgress, setScrollProgress] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Entrance Sequence States
  const [curtainsOpen, setCurtainsOpen] = useState(false);
  const [uiVisible, setUiVisible] = useState(false);
  const [entranceDone, setEntranceDone] = useState(false);

  // Parallax Refs
  const worldRef = useRef<HTMLDivElement>(null);
  const cloudsRef = useRef<HTMLDivElement>(null);
  const portalRef = useRef<HTMLDivElement>(null);
  const curtainLRef = useRef<HTMLDivElement>(null);
  const curtainRRef = useRef<HTMLDivElement>(null);

  // Scroll Progress Listener
  useEffect(() => {
    const handleScroll = () => {
      const container = document.getElementById("outer-container");
      if (!container) return;
      const progress = window.scrollY / (container.scrollHeight - window.innerHeight);
      setScrollProgress(clamp(progress, 0, 1));
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Entrance triggers
  useEffect(() => {
    const t1 = setTimeout(() => setCurtainsOpen(true), 100);
    const t2 = setTimeout(() => setUiVisible(true), 600);
    const t3 = setTimeout(() => setEntranceDone(true), 2200);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, []);

  // Smooth Mouse Parallax Loop
  useEffect(() => {
    const mouse = { targetX: 0, targetY: 0, currentX: 0, currentY: 0 };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.targetX = (e.clientX - window.innerWidth / 2) / (window.innerWidth / 2);
      mouse.targetY = (e.clientY - window.innerHeight / 2) / (window.innerHeight / 2);
    };

    const mq = window.matchMedia("(pointer: fine)");
    if (mq.matches) {
      window.addEventListener("mousemove", handleMouseMove);
    }

    let animId: number;
    const update = () => {
      mouse.currentX += (mouse.targetX - mouse.currentX) * 0.07;
      mouse.currentY += (mouse.targetY - mouse.currentY) * 0.07;
      setMousePos({ x: mouse.currentX, y: mouse.currentY });
      animId = requestAnimationFrame(update);
    };
    update();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animId);
    };
  }, []);

  // ---------------------------------------------------------------------------
  // ANIMATION TIMELINE & MATH (600vh total scroll)
  // ---------------------------------------------------------------------------
  const ep = easeInOut(scrollProgress); // 0 to 1

  // SCENE 1 (Hero): 0% to 15%
  const scene1Opacity = clamp(1 - scrollProgress / 0.15, 0, 1);

  // SCENE 2 (Arc Slider): Fades in 25%-35%, Fades out 65%-75%
  let scene2Opacity = 0;
  if (scrollProgress >= 0.25 && scrollProgress <= 0.65) {
    scene2Opacity = clamp((scrollProgress - 0.25) / 0.10, 0, 1);
  } else if (scrollProgress > 0.65) {
    scene2Opacity = clamp(1 - (scrollProgress - 0.65) / 0.10, 0, 1);
  }

  // SCENE 3 (Contact): Fades in 80%-90%
  const scene3Opacity = clamp((scrollProgress - 0.80) / 0.10, 0, 1);

  // Background scales
  const worldScale = lerp(1, 1.3, ep);
  const cloudsScale = lerp(1, 1.5, ep);
  const portalScale = lerp(1, 7.5, ep);

  // Portal opacity: fades out 25%-40%
  const portalOpacity = clamp(1 - (scrollProgress - 0.25) / 0.15, 0, 1);

  // Arc Slider rotation progress (0 to 1 between 30% and 65%)
  const sliderProg = clamp((scrollProgress - 0.30) / 0.35, 0, 1);
  const arcSweepDeg = (SCENE2_CARDS.length - 1) * (isMobile ? 12 : 9);
  const sliderRotationOffset = lerp(0, arcSweepDeg, sliderProg);

  // Mouse Parallax offsets
  const mx = mousePos.x;
  const my = mousePos.y;

  // Filter to make reference assets look like fire/smoke
  const fireFilter = "sepia(1) hue-rotate(-20deg) saturate(2) brightness(0.6)";

  const worldStyle: CSSProperties = {
    position: "absolute",
    inset: 0,
    transformOrigin: "50% 50%",
    transform: `scale(${worldScale}) translate(${-mx * 6}px, ${-my * 6}px)`,
    zIndex: 0,
  };

  const cloudOpacity = lerp(0.5, 1.0, clamp(scrollProgress / 0.05, 0, 1));
  const cloudsStyle: CSSProperties = {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    transformOrigin: "50% 100%",
    transform: `scale(${cloudsScale}) translate(${-mx * 9}px, ${-my * 9 * 0.4}px)`,
    opacity: cloudOpacity,
    filter: fireFilter,
    zIndex: 10,
  };

  const portalStyle: CSSProperties = {
    position: "absolute",
    inset: 0,
    transformOrigin: "52% 38%",
    transform: `scale(${portalScale}) translate(${-mx * 7}px, ${-my * 7}px)`,
    opacity: portalOpacity,
    filter: fireFilter,
    zIndex: 15,
  };

  const curtainLTranslateX = !entranceDone
    ? curtainsOpen ? -62 : 0
    : -62 - lerp(0, 150, ep);

  const curtainRTranslateX = !entranceDone
    ? curtainsOpen ? 62 : 0
    : 62 + lerp(0, 150, ep);

  const curtainTransition = !entranceDone ? "transform 1.8s cubic-bezier(0.16, 1, 0.3, 1)" : "none";

  const curtainLStyle: CSSProperties = {
    position: "absolute",
    inset: 0,
    transformOrigin: "left center",
    transform: `translate(${curtainLTranslateX}%, 0%) scale(${lerp(1, 1.3, ep)}) translate(${-mx * 14}px, ${-my * 14 * 0.3}px)`,
    transition: curtainTransition,
    filter: "sepia(1) hue-rotate(-30deg) saturate(1.5) brightness(0.4)", // Dark red velvet / smoke
    zIndex: 16,
  };

  const curtainRStyle: CSSProperties = {
    position: "absolute",
    inset: 0,
    transformOrigin: "right center",
    transform: `translate(${curtainRTranslateX}%, 0%) scale(${lerp(1, 1.3, ep)}) translate(${-mx * 14}px, ${-my * 14 * 0.3}px)`,
    transition: curtainTransition,
    filter: "sepia(1) hue-rotate(-30deg) saturate(1.5) brightness(0.4)",
    zIndex: 16,
  };

  return (
    <div id="outer-container" style={{ height: "600vh", position: "relative", backgroundColor: "#0a0608" }}>
      
      {/* Sticky Viewport */}
      <div style={{ position: "sticky", top: 0, height: "100vh", overflow: "hidden", backgroundColor: "#0a0608" }}>
        
        {/* Navigation Bar (z-index: 50) */}
        <nav
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            zIndex: 50,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            boxSizing: "border-box",
          }}
          className="px-5 py-[18px] md:px-12 md:py-[22px]"
        >
          {/* Mobile Nav Links */}
          <div className="flex md:hidden w-full items-center justify-between">
            <span style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: "14px", letterSpacing: "0.12em", textTransform: "uppercase", color: "#FF5500", opacity: 0.9 }}>
              Menu
            </span>
            <StarLogo />
            <span style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: "14px", letterSpacing: "0.12em", textTransform: "uppercase", color: "#FF5500", opacity: 0.9 }}>
              Contact
            </span>
          </div>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex w-full items-center justify-between">
            <div style={{ display: "flex", gap: "36px" }}>
              {["Our Story", "Menu", "Craft"].map((link) => (
                <span key={link} style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: "15px", letterSpacing: "0.12em", textTransform: "uppercase", color: "#fff", opacity: 0.9, cursor: "pointer" }}>
                  {link}
                </span>
              ))}
            </div>
            <StarLogo />
            <div style={{ display: "flex", gap: "36px" }}>
              {["Gallery", "Reviews", "Contact"].map((link) => (
                <span key={link} style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: "15px", letterSpacing: "0.12em", textTransform: "uppercase", color: "#fff", opacity: 0.9, cursor: "pointer" }}>
                  {link}
                </span>
              ))}
            </div>
          </div>
        </nav>

        {/* Top Fade Gradient (z-index: 45) */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "42vh",
            background: "linear-gradient(to bottom, rgba(10,6,8,0.8) 0%, transparent 100%)",
            pointerEvents: "none",
            zIndex: 45,
          }}
        />

        {/* Layer 1: World Background (z-index: 0) */}
        <div ref={worldRef} style={worldStyle}>
          <img src={WORLD_BG} alt="World Background" style={{ width: "100%", height: "100%", objectFit: "cover", filter: "brightness(0.6) contrast(1.2)" }} />
        </div>

        {/* Layer 2: Bottom Clouds (z-index: 10) */}
        <div ref={cloudsRef} style={cloudsStyle}>
          <img src={BOTTOM_CLOUDS} alt="Bottom Clouds" style={{ width: "100%", height: "auto", display: "block" }} />
        </div>

        {/* Layer 2.5: Arc Card Slider (z-index: 9) */}
        <div
          style={{
            position: "absolute",
            bottom: isMobile ? "60px" : "80px",
            left: 0,
            right: 0,
            opacity: scene2Opacity,
            zIndex: 9,
            pointerEvents: scene2Opacity > 0.1 ? "auto" : "none",
            transition: "opacity 0.4s ease",
          }}
        >
          <ArcCardSlider cards={SCENE2_CARDS} rotationOffset={sliderRotationOffset} isMobile={isMobile} />
        </div>

        {/* Layer 3: Portal Frame (z-index: 15) */}
        <div ref={portalRef} style={portalStyle}>
          <img src={PORTAL_BG} alt="Portal Frame" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        </div>

        {/* Layer 3.5: Bottom Fade (z-index: 16) */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: "40%",
            background: "linear-gradient(to top, rgba(10,6,8,0.8) 0%, transparent 100%)",
            pointerEvents: "none",
            zIndex: 16,
          }}
        />

        {/* Layer 4L: Curtain Left (z-index: 16) */}
        <div ref={curtainLRef} style={curtainLStyle}>
          <img src={CURTAIN_LEFT} alt="Curtain Left" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "right center" }} />
        </div>

        {/* Layer 4R: Curtain Right (z-index: 16) */}
        <div ref={curtainRRef} style={curtainRStyle}>
          <img src={CURTAIN_RIGHT} alt="Curtain Right" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "left center" }} />
        </div>

        {/* ═══════════════════════════════════════════════════════════ */}
        {/*  SCENE 1 UI: HERO (z-index: 20)                             */}
        {/* ═══════════════════════════════════════════════════════════ */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 20,
            opacity: scene1Opacity,
            pointerEvents: scene1Opacity > 0.1 ? "auto" : "none",
            transition: "opacity 0.3s ease",
          }}
        >
          {/* Mobile layout (md:hidden) */}
          <div
            className="md:hidden flex flex-col items-center justify-between h-full"
            style={{
              padding: "80px 24px 100px",
              boxSizing: "border-box",
              opacity: uiVisible ? 0.9 : 0,
              transform: uiVisible ? "translateY(0)" : "translateY(20px)",
              transition: "opacity 0.9s ease 0.3s, transform 0.9s ease 0.3s",
            }}
          >
            <div className="text-center mt-[12vh]">
              <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(32px, 9vw, 50px)", letterSpacing: "0.12em", color: "#FF5500", margin: 0 }}>
                STAR <span style={{ color: "#F5EDD8", fontSize: "0.8em" }}>›</span> BBQ
              </h2>
              <h1 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(52px, 16vw, 80px)", lineHeight: 1.0, color: "#F5EDD8", margin: "8px 0 16px 0" }}>
                FIRE-CRAFTED
              </h1>
              <p style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: "16px", lineHeight: "1.6", color: "rgba(245,237,216,0.7)", maxWidth: "280px", margin: "0 auto" }}>
                Hyderabad&apos;s finest fire kitchen. Slow-marinated, live-flame grilled. No gas, no shortcuts. Real charcoal BBQ.
              </p>
            </div>

            <div style={{ width: "140px", height: "140px", borderRadius: "22px", backgroundImage: `url(${SCENE1_CARDS[0]})`, backgroundSize: "cover", backgroundPosition: "center", boxShadow: "0 8px 32px rgba(255,85,0,0.2)", position: "relative", overflow: "hidden" }}>
              <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "60%", background: "linear-gradient(to top, rgba(10,6,8,0.9), transparent)" }} />
              <div style={{ position: "absolute", bottom: "12px", left: "12px", display: "flex", alignItems: "center", gap: "8px" }}>
                <div style={{ width: "26px", height: "26px", borderRadius: "50%", backgroundColor: "#FF5500", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <PlayIcon size={10} color="#000" />
                </div>
                <span style={{ color: "#F5EDD8", fontFamily: "'Barlow Condensed', sans-serif", fontSize: "14px", fontWeight: "bold" }}>View Craft</span>
              </div>
            </div>
          </div>

          {/* Desktop layout (hidden md:block) */}
          <div className="hidden md:block">
            <div
              style={{
                position: "absolute",
                top: "46%",
                left: "60px",
                maxWidth: "440px",
                transform: "translateY(-50%)",
                opacity: uiVisible ? 1 : 0,
                transition: "opacity 0.9s ease 0.3s, transform 0.9s ease 0.3s",
              }}
            >
              <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(36px, 5vw, 64px)", lineHeight: "1.1", letterSpacing: "0.08em", color: "#FF5500", textShadow: "0 2px 24px rgba(0,0,0,0.7)", margin: 0 }}>
                STAR <span style={{ color: "#F5EDD8" }}>›</span> BBQ
              </h2>
              <h1 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(60px, 8vw, 100px)", lineHeight: "0.9", color: "#F5EDD8", textShadow: "0 2px 24px rgba(0,0,0,0.7)", margin: "12px 0 24px 0" }}>
                FIRE-CRAFTED<br />SINCE DAY ONE
              </h1>
              <p style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: "20px", lineHeight: "1.6", color: "rgba(245,237,216,0.85)", maxWidth: "340px", textShadow: "0 1px 12px rgba(0,0,0,0.8)", margin: 0 }}>
                Hyderabad&apos;s finest fire kitchen. Slow-marinated, live-flame grilled. No gas, no shortcuts. Real charcoal BBQ.
              </p>
            </div>

            <div
              style={{
                position: "absolute",
                right: "40px",
                top: "50%",
                transform: "translateY(-50%)",
                display: "flex",
                gap: "14px",
                opacity: uiVisible ? 1 : 0,
                transition: "opacity 0.9s ease 0.55s, transform 0.9s ease 0.55s",
              }}
            >
              {/* Card 1: Play */}
              <div style={{ width: "160px", height: "160px", borderRadius: "24px", backgroundImage: `url(${SCENE1_CARDS[0]})`, backgroundSize: "cover", backgroundPosition: "center", boxShadow: "0 8px 32px rgba(255,85,0,0.2)", position: "relative", overflow: "hidden" }}>
                <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "60%", background: "linear-gradient(to top, rgba(10,6,8,0.9), transparent)" }} />
                <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "44%", backdropFilter: "blur(10px)", backgroundColor: "rgba(10,6,8,0.4)" }} />
                <div style={{ position: "absolute", bottom: "14px", left: "14px", display: "flex", alignItems: "center", gap: "8px" }}>
                  <div style={{ width: "30px", height: "30px", borderRadius: "50%", backgroundColor: "#FF5500", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <PlayIcon size={12} color="#000" />
                  </div>
                  <span style={{ color: "#F5EDD8", fontFamily: "'Barlow Condensed', sans-serif", fontSize: "15px", fontWeight: "bold" }}>View Shawarma</span>
                </div>
              </div>

              {/* Card 2: Number */}
              <div style={{ width: "160px", height: "160px", borderRadius: "24px", backgroundImage: `url(${SCENE1_CARDS[1]})`, backgroundSize: "cover", backgroundPosition: "center", boxShadow: "0 8px 32px rgba(255,85,0,0.2)", position: "relative", overflow: "hidden" }}>
                <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "60%", background: "linear-gradient(to top, rgba(10,6,8,0.9), transparent)" }} />
                <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "44%", backdropFilter: "blur(10px)", backgroundColor: "rgba(10,6,8,0.4)" }} />
                <div style={{ position: "absolute", bottom: "14px", left: "14px", display: "flex", flexDirection: "column" }}>
                  <span style={{ color: "#FF5500", fontFamily: "'Bebas Neue', sans-serif", fontSize: "40px", lineHeight: "1.0" }}>800°</span>
                  <span style={{ color: "#F5EDD8", fontFamily: "'Barlow Condensed', sans-serif", fontSize: "14px", opacity: 0.9 }}>Charcoal Temp</span>
                </div>
              </div>

              {/* Card 3: Play */}
              <div style={{ width: "160px", height: "160px", borderRadius: "24px", backgroundImage: `url(${SCENE1_CARDS[2]})`, backgroundSize: "cover", backgroundPosition: "center", boxShadow: "0 8px 32px rgba(255,85,0,0.2)", position: "relative", overflow: "hidden" }}>
                <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "60%", background: "linear-gradient(to top, rgba(10,6,8,0.9), transparent)" }} />
                <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "44%", backdropFilter: "blur(10px)", backgroundColor: "rgba(10,6,8,0.4)" }} />
                <div style={{ position: "absolute", bottom: "14px", left: "14px", display: "flex", alignItems: "center", gap: "8px" }}>
                  <div style={{ width: "30px", height: "30px", borderRadius: "50%", backgroundColor: "#FF5500", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <PlayIcon size={12} color="#000" />
                  </div>
                  <span style={{ color: "#F5EDD8", fontFamily: "'Barlow Condensed', sans-serif", fontSize: "15px", fontWeight: "bold" }}>View Chicken</span>
                </div>
              </div>
            </div>
          </div>

          {/* Slider Dots */}
          <div
            style={{
              position: "absolute",
              bottom: isMobile ? "28px" : "40px",
              left: isMobile ? "50%" : "60px",
              transform: isMobile ? "translateX(-50%)" : "none",
              display: "flex",
              gap: "8px",
              opacity: uiVisible ? 1 : 0,
              transition: "opacity 0.9s ease 0.8s",
            }}
          >
            {[28, 14, 14, 14].map((width, idx) => (
              <div
                key={idx}
                style={{
                  width: `${width}px`,
                  height: "4px",
                  borderRadius: "2px",
                  backgroundColor: idx === 0 ? "#FF5500" : "rgba(255,85,0,0.3)",
                }}
              />
            ))}
          </div>

          {/* Scroll Cue (desktop only) */}
          {!isMobile && (
            <div
              style={{
                position: "absolute",
                bottom: "36px",
                left: "50%",
                transform: "translateX(-50%)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "10px",
                opacity: uiVisible ? 1 : 0,
                transition: "opacity 0.9s ease 0.9s",
              }}
            >
              <span style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: "12px", letterSpacing: "0.22em", textTransform: "uppercase", color: "rgba(245,237,216,0.6)" }}>
                Descend Into Fire
              </span>
              <div
                className="animate-bob"
                style={{
                  width: "34px",
                  height: "34px",
                  borderRadius: "50%",
                  border: "1.5px solid rgba(255,85,0,0.5)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <ChevronDownIcon />
              </div>
            </div>
          )}
        </div>

        {/* ═══════════════════════════════════════════════════════════ */}
        {/*  SCENE 2 UI: MENU (z-index: 46)                             */}
        {/* ═══════════════════════════════════════════════════════════ */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 46,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "start",
            opacity: scene2Opacity,
            pointerEvents: scene2Opacity > 0.1 ? "auto" : "none",
            transition: "opacity 0.3s ease",
            paddingTop: isMobile ? "8vh" : "12vh",
            boxSizing: "border-box",
          }}
        >
          <div className="text-center px-6">
            <h2
              style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: isMobile ? "clamp(36px, 8vw, 50px)" : "clamp(50px, 6.5vw, 90px)",
                color: "#F5EDD8",
                letterSpacing: "0.05em",
                lineHeight: 1.05,
                textShadow: "0 2px 20px rgba(0,0,0,0.8)",
                margin: 0,
              }}
            >
              FIRE-CRAFTED <span style={{ color: "#FF5500" }}>FAVOURITES</span>
            </h2>
            <p
              style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                fontSize: isMobile ? "16px" : "22px",
                lineHeight: "1.6",
                letterSpacing: "0.02em",
                color: "rgba(245,237,216,0.85)",
                maxWidth: isMobile ? "280px" : "500px",
                margin: "12px auto 0 auto",
                textShadow: "0 1px 10px rgba(0,0,0,0.8)",
              }}
            >
              Singular voyages to astonishing flavor, shaped for those who seek the authentic taste of live charcoal.
            </p>
          </div>
        </div>

        {/* ═══════════════════════════════════════════════════════════ */}
        {/*  SCENE 3 UI: CONTACT (z-index: 60)                          */}
        {/* ═══════════════════════════════════════════════════════════ */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 60,
            opacity: scene3Opacity,
            pointerEvents: scene3Opacity > 0.1 ? "auto" : "none",
            transition: "opacity 0.3s ease",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: `rgba(10, 6, 8, ${scene3Opacity * 0.95})`,
            backdropFilter: `blur(${scene3Opacity * 10}px)`,
          }}
        >
          <ContactUI isMobile={isMobile} />
        </div>

      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// SUB-COMPONENTS
// ---------------------------------------------------------------------------

interface ArcSliderProps {
  cards: typeof SCENE2_CARDS;
  rotationOffset: number;
  isMobile: boolean;
}

function ArcCardSlider({ cards, rotationOffset, isMobile }: ArcSliderProps) {
  const cardSpacingDeg = isMobile ? 12 : 9;
  const totalCards = cards.length;
  const centerIndex = Math.floor(totalCards / 2);
  const arcRadius = isMobile ? 700 : 1100;
  const cardW = isMobile ? 180 : 260;
  const cardH = isMobile ? 220 : 320;

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: isMobile ? "280px" : "400px",
        display: "flex",
        justifyContent: "center",
      }}
    >
      {cards.map((card, i) => {
        const baseDeg = (i - centerIndex) * cardSpacingDeg;
        const deg = baseDeg - rotationOffset + (centerIndex * cardSpacingDeg);
        const rad = (deg * Math.PI) / 180;
        const x = Math.sin(rad) * arcRadius;
        const y = arcRadius - Math.cos(rad) * arcRadius;

        const bottomVal = -y + (isMobile ? 160 : 240);
        const leftVal = `calc(50% + ${x}px - ${cardW / 2}px)`;
        const indexStr = String(i + 1).padStart(2, "0");

        return (
          <div
            key={i}
            style={{
              position: "absolute",
              bottom: `${bottomVal}px`,
              left: leftVal,
              width: `${cardW}px`,
              height: `${cardH}px`,
              borderRadius: isMobile ? "20px" : "28px",
              boxShadow: "0 12px 40px rgba(255, 85, 0, 0.15)",
              transform: `rotate(${deg}deg)`,
              transformOrigin: `${cardW / 2}px ${arcRadius}px`,
              overflow: "hidden",
              display: "flex",
              flexDirection: "column",
              boxSizing: "border-box",
              backgroundImage: `url(${card.image})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              border: "1px solid rgba(255,85,0,0.15)",
            }}
          >
            {/* Dark gradient overlay */}
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(10,6,8,0.95) 0%, rgba(10,6,8,0.4) 50%, transparent 100%)" }} />
            
            {/* Top Right index */}
            <div style={{ position: "relative", zIndex: 2, padding: isMobile ? "12px" : "20px", display: "flex", justifyContent: "flex-end" }}>
              <div
                style={{
                  width: "28px",
                  height: "28px",
                  borderRadius: "50%",
                  border: "1.5px solid rgba(255, 85, 0, 0.5)",
                  color: "#FF5500",
                  fontFamily: "'Bebas Neue', sans-serif",
                  fontSize: "14px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: "rgba(10,6,8,0.6)",
                  backdropFilter: "blur(4px)"
                }}
              >
                {indexStr}
              </div>
            </div>

            {/* Bottom Title + Description */}
            <div style={{ position: "relative", zIndex: 2, marginTop: "auto", padding: isMobile ? "16px" : "24px", textAlign: "left" }}>
              <h4
                style={{
                  fontFamily: "'Bebas Neue', sans-serif",
                  fontSize: isMobile ? "24px" : "32px",
                  letterSpacing: "0.05em",
                  lineHeight: 1.1,
                  margin: "0 0 6px 0",
                  color: "#F5EDD8",
                }}
              >
                {card.title}
              </h4>
              <p
                style={{
                  fontFamily: "'Barlow Condensed', sans-serif",
                  fontSize: isMobile ? "14px" : "16px",
                  lineHeight: 1.4,
                  color: "rgba(245,237,216,0.75)",
                  margin: 0,
                }}
              >
                {card.desc}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

// Contact UI Component
function ContactUI({ isMobile }: { isMobile: boolean }) {
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });
  const [isSending, setIsSending] = useState(false);

  const handleSubmit = (ev: React.FormEvent) => {
    ev.preventDefault();
    setIsSending(true);
    const text = `*New Portfolio Inquiry* 🍢\n\n👤 *Name:* ${formData.name}\n✉️ *Email:* ${formData.email}\n📂 *Subject:* ${formData.subject}\n\n💬 *Message:* \n${formData.message}`;
    setTimeout(() => {
      window.open(`https://wa.me/918985925737?text=${encodeURIComponent(text)}`, "_blank");
      setIsSending(false);
      setFormData({ name: "", email: "", subject: "", message: "" });
    }, 800);
  };

  const inputClass = "w-full bg-[#18181b]/50 border border-white/10 rounded-xl px-5 py-3 md:py-3.5 pl-12 text-white focus:outline-none focus:border-[#25D366] focus:ring-1 focus:ring-[#25D366]/30 transition-all duration-300 placeholder:text-white/30 font-['Barlow_Condensed'] text-sm md:text-base";

  return (
    <div className="w-full max-w-5xl px-6">
      <div className="text-center mb-10">
        <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(36px, 6vw, 64px)", color: "#F5EDD8", letterSpacing: "0.05em", margin: 0 }}>
          LET&apos;S <span style={{ color: "#25D366" }}>CONNECT</span>
        </h2>
        <p style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: "18px", color: "rgba(245,237,216,0.7)", marginTop: "8px" }}>
          Reach out via our WhatsApp portal instantly.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-8 items-start">
        {/* Left: Mock Chat */}
        <div className="md:col-span-2 bg-[#0c0c0e] border border-white/10 rounded-3xl overflow-hidden shadow-2xl flex flex-col h-full max-h-[400px]">
          <div className="bg-[#1f2c34] px-5 py-4 flex items-center gap-3 border-b border-white/5">
            <img src="/logo.jpg" alt="Star BBQ" className="w-10 h-10 rounded-full border border-white/10" />
            <div>
              <h4 className="text-sm font-bold text-white font-['Barlow_Condensed'] tracking-wider">Star BBQ Support</h4>
              <p className="text-[10px] text-[#25D366] tracking-widest uppercase font-bold">Online</p>
            </div>
          </div>
          <div className="p-5 flex-grow space-y-4 overflow-y-auto bg-[#0b141a]">
            <div className="bg-[#202c33] text-[#F5EDD8] p-4 rounded-2xl rounded-tl-none max-w-[90%] text-sm font-['Barlow_Condensed'] tracking-wide">
              Hey there! Welcome to the Star BBQ website. 🍗🔥
            </div>
            <div className="bg-[#202c33] text-[#F5EDD8] p-4 rounded-2xl rounded-tl-none max-w-[90%] text-sm font-['Barlow_Condensed'] tracking-wide">
              Have questions about catering or private orders? Fill the form!
            </div>
          </div>
        </div>

        {/* Right: Form */}
        <div className="md:col-span-3">
          <form onSubmit={handleSubmit} className="bg-[#1a1510]/40 border border-[#FF5500]/20 rounded-3xl p-6 md:p-8 space-y-5 backdrop-blur-lg">
            <div className="space-y-1 relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40"><User className="w-5 h-5" /></span>
              <input required type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className={inputClass} placeholder="Full Name" />
            </div>
            <div className="space-y-1 relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40"><Mail className="w-5 h-5" /></span>
              <input required type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className={inputClass} placeholder="Email Address" />
            </div>
            <div className="space-y-1 relative">
              <span className="absolute left-4 top-5 text-white/40"><MessageSquare className="w-5 h-5" /></span>
              <textarea required value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})} rows={3} className={`${inputClass} resize-none pl-12 pt-4`} placeholder="Your message..." />
            </div>
            <button type="submit" disabled={isSending} className="w-full py-4 bg-[#25D366] rounded-xl text-white font-bold tracking-widest uppercase text-base flex items-center justify-center gap-3 hover:bg-[#20bd5a] transition-all duration-300 font-['Bebas_Neue'] disabled:opacity-50">
              {isSending ? "Opening WhatsApp..." : "Send via WhatsApp"} <Send className="w-5 h-5" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// ICON COMPONENTS
// ---------------------------------------------------------------------------

function StarLogo() {
  return (
    <div className="flex flex-col items-center">
      <img src="/logo.jpg" alt="Logo" className="w-12 h-12 rounded-full border-2 border-[#FF5500] shadow-[0_0_15px_rgba(255,85,0,0.5)]" />
    </div>
  );
}

function PlayIcon({ size = 12, color = "#000" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color} xmlns="http://www.w3.org/2000/svg">
      <path d="M8 5v14l11-7z" />
    </svg>
  );
}

function ChevronDownIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#FF5500" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
}
