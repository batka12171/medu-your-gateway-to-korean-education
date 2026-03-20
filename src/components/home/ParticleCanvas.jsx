import React, { useRef, useEffect } from "react";

export default function ParticleCanvas() {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: -9999, y: -9999 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    let w, h, cx, cy, scale;
    const particles = [];
    const particleCount = 1800;

    function random(min, max) { return Math.random() * (max - min) + min; }
    function lerp(a, b, t) { return a + (b - a) * t; }

    function sampleMeduPoint() {
      const mode = Math.random();
      if (mode < 0.14) {
        const angle = Math.random() * Math.PI * 2;
        const r = Math.sqrt(Math.random()) * 0.12;
        return { x: 0 + Math.cos(angle) * r, y: -0.72 + Math.sin(angle) * r, tone: 0.55 };
      }
      if (mode < 0.48) {
        const t = Math.random();
        const x = lerp(-0.48, -0.05, t);
        const yTop = lerp(-0.18, -0.08, t);
        const yBottom = lerp(0.62, 0.05, t);
        const y = lerp(yTop, yBottom, Math.random());
        const bend = Math.sin(t * Math.PI) * 0.12;
        return { x: x - bend * 0.5 + random(-0.03, 0.03), y: y + bend * 0.15 + random(-0.03, 0.03), tone: 0.1 + t * 0.25 };
      }
      if (mode < 0.62) {
        const t = Math.random();
        return { x: lerp(-0.1, 0.16, t) + random(-0.025, 0.025), y: lerp(-0.12, -0.04, t) + Math.sin(t * Math.PI) * 0.08 + random(-0.025, 0.025), tone: 0.4 };
      }
      const t = Math.random();
      const x = lerp(0.02, 0.54, t);
      const yTop = lerp(-0.18, -0.36, t);
      const yBottom = lerp(0.12, 0.74, t);
      const y = lerp(yTop, yBottom, Math.random());
      const curve = Math.sin(t * Math.PI) * 0.16;
      return { x: x + curve * 0.18 + random(-0.03, 0.03), y: y - curve * 0.08 + random(-0.03, 0.03), tone: 0.65 + t * 0.25 };
    }

    function toneToColor(tone, alpha = 1) {
      const c1 = { r: 0, g: 95, b: 86 };
      const c2 = { r: 0, g: 201, b: 167 };
      const r = Math.round(lerp(c1.r, c2.r, tone));
      const g = Math.round(lerp(c1.g, c2.g, tone));
      const b = Math.round(lerp(c1.b, c2.b, tone));
      return `rgba(${r},${g},${b},${alpha})`;
    }

    function buildParticles() {
      particles.length = 0;
      for (let i = 0; i < particleCount; i++) {
        const p = sampleMeduPoint();
        const tx = cx + p.x * scale;
        const ty = cy + p.y * scale;
        const side = Math.random() < 0.5 ? -1 : 1;
        particles.push({
          tx, ty,
          x: tx + random(180, 420) * side,
          y: ty + random(40, 220),
          baseX: tx, baseY: ty,
          vx: 0, vy: 0,
          size: random(2.5, 6.5),
          tone: p.tone,
          alpha: random(0.5, 0.95),
          offset: random(0, Math.PI * 2),
        });
      }
    }

    function drawDust(time) {
      for (let i = 0; i < 180; i++) {
        const x = (i * 97) % window.innerWidth;
        const y = (i * 53) % window.innerHeight;
        const a = 0.03 + Math.sin(time * 0.0007 + i) * 0.01;
        ctx.fillStyle = `rgba(0,150,130,${a})`;
        ctx.beginPath();
        ctx.arc(x, y, 1, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    let animId;
    function animate(time) {
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
      drawDust(time);

      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;

      for (const p of particles) {
        const driftX = Math.sin(time * 0.001 + p.offset) * 5;
        const driftY = Math.cos(time * 0.0013 + p.offset) * 3;
        let targetX = p.baseX + driftX;
        let targetY = p.baseY + driftY;

        // Mouse repulsion
        const dx = p.x - mx;
        const dy = p.y - my;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const repelRadius = 90;
        if (dist < repelRadius) {
          const force = (repelRadius - dist) / repelRadius;
          targetX += (dx / dist) * force * 55;
          targetY += (dy / dist) * force * 55;
        }

        p.vx += (targetX - p.x) * 0.018;
        p.vy += (targetY - p.y) * 0.018;
        p.vx *= 0.9;
        p.vy *= 0.9;
        p.x += p.vx;
        p.y += p.vy;

        ctx.fillStyle = toneToColor(p.tone, p.alpha);
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      }

      animId = requestAnimationFrame(animate);
    }

    function resize() {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = window.innerWidth + "px";
      canvas.style.height = window.innerHeight + "px";
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
      cx = window.innerWidth / 2;
      cy = window.innerHeight / 2;
      scale = Math.min(window.innerWidth, window.innerHeight) * 0.23;
      buildParticles();
    }

    const onMouseMove = (e) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", onMouseMove);
    resize();
    animId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full block"
    />
  );
}