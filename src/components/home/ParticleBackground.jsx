import React, { useRef, useEffect } from 'react';

export default function ParticleBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

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
      const c1 = { r: 7, g: 59, b: 106 };
      const c2 = { r: 95, g: 244, b: 220 };
      const r = Math.round(lerp(c1.r, c2.r, tone));
      const g = Math.round(lerp(c1.g, c2.g, tone));
      const b = Math.round(lerp(c1.b, c2.b, tone));
      return `rgba(${r}, ${g}, ${b}, ${alpha})`;
    }

    function buildParticles() {
      particles.length = 0;
      for (let i = 0; i < particleCount; i++) {
        const p = sampleMeduPoint();
        const tx = cx + p.x * scale;
        const ty = cy + p.y * scale;
        const side = Math.random() < 0.5 ? -1 : 1;
        const spreadX = random(180, 420) * side;
        const spreadY = random(40, 220);
        particles.push({
          tx, ty, x: tx + spreadX, y: ty + spreadY,
          baseX: tx, baseY: ty, vx: 0, vy: 0,
          size: random(2.8, 7.2), tone: p.tone, alpha: random(0.5, 0.95),
          offset: random(0, Math.PI * 2)
        });
      }
    }

    function drawBackgroundDust(time) {
      for (let i = 0; i < 180; i++) {
        const x = (i * 97) % window.innerWidth;
        const y = (i * 53) % window.innerHeight;
        const a = 0.04 + Math.sin(time * 0.0007 + i) * 0.01;
        ctx.fillStyle = `rgba(15, 23, 42, ${a})`;
        ctx.beginPath();
        ctx.arc(x, y, 1.1, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    let animationFrameId;
    function animate(time) {
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
      drawBackgroundDust(time);
      for (const p of particles) {
        const driftX = Math.sin(time * 0.001 + p.offset) * 6;
        const driftY = Math.cos(time * 0.0013 + p.offset) * 4;
        const targetX = p.baseX + driftX;
        const targetY = p.baseY + driftY;
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
      animationFrameId = requestAnimationFrame(animate);
    }

    const resizeHandler = () => {
      w = canvas.width = window.innerWidth * devicePixelRatio;
      h = canvas.height = window.innerHeight * devicePixelRatio;
      canvas.style.width = window.innerWidth + 'px';
      canvas.style.height = window.innerHeight + 'px';
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(devicePixelRatio, devicePixelRatio);
      cx = window.innerWidth / 2;
      cy = window.innerHeight / 2;
      scale = Math.min(window.innerWidth, window.innerHeight) * 0.23;
      buildParticles();
    };

    window.addEventListener('resize', resizeHandler);
    resizeHandler();
    animationFrameId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', resizeHandler);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full block" />;
}