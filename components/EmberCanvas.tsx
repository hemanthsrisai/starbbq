"use client";

import { useEffect, useRef } from "react";

interface Ember {
  x: number;
  y: number;
  r: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  color: string;
}

export default function EmberCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let W = 0, H = 0;
    let animId: number;

    const resize = () => {
      W = canvas.width = canvas.offsetWidth;
      H = canvas.height = canvas.offsetHeight;
    };

    resize();
    window.addEventListener("resize", resize);

    const EMBER_COUNT = 50;
    const embers: Ember[] = Array.from({ length: EMBER_COUNT }, () => ({
      x: Math.random() * 2000,
      y: Math.random() * 1000 + 200,
      r: Math.random() * 2.8 + 0.5,
      vx: (Math.random() - 0.5) * 0.8,
      vy: -(Math.random() * 1.4 + 0.4),
      life: Math.random(),
      maxLife: Math.random() * 0.6 + 0.4,
      color: Math.random() > 0.5 ? "#FF5500" : Math.random() > 0.5 ? "#FFB700" : "#FF8C00",
    }));

    const draw = () => {
      ctx.clearRect(0, 0, W, H);

      embers.forEach((e) => {
        e.x += e.vx;
        e.y += e.vy;
        e.life -= 0.003;

        if (e.life <= 0) {
          e.x = Math.random() * W;
          e.y = H * 0.7 + Math.random() * H * 0.3;
          e.life = e.maxLife;
        }

        const alpha = Math.sin((e.life / e.maxLife) * Math.PI) * 0.8;
        ctx.save();
        ctx.globalAlpha = alpha;
        ctx.fillStyle = e.color;
        ctx.shadowBlur = 8;
        ctx.shadowColor = e.color;
        ctx.beginPath();
        ctx.arc(e.x, e.y, e.r, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });

      animId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
    />
  );
}
