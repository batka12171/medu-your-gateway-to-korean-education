import React, { useEffect, useRef } from 'react';

export default function ParticleLogo() {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;
    
    const ctx = canvas.getContext('2d', { willReadFrequently: true });

    let width = container.clientWidth;
    let height = container.clientHeight;
    canvas.width = width;
    canvas.height = height;

    const mouse = { x: -9999, y: -9999, radius: 100 };

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      mouse.x = -9999;
      mouse.y = -9999;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);

    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = 'https://media.base44.com/images/public/694e6255f87f952ccf7b0ebb/6d5105f42_Abstract_dot_figure_logo_in_motion-removebg-preview.png';

    let particles = [];
    let initialized = false;

    const PARTICLE_COUNT = 5000;
    const SAMPLE_STEP = 4;

    class AmbientDot {
      constructor(canvasW, canvasH) {
        this.canvasW = canvasW;
        this.canvasH = canvasH;
        this.reset(true);
      }

      reset(initial) {
        const edge = Math.floor(Math.random() * 4);
        if (edge === 0) { this.x = Math.random() * this.canvasW; this.y = -10; }
        else if (edge === 1) { this.x = this.canvasW + 10; this.y = Math.random() * this.canvasH; }
        else if (edge === 2) { this.x = Math.random() * this.canvasW; this.y = this.canvasH + 10; }
        else { this.x = -10; this.y = Math.random() * this.canvasH; }

        if (initial) {
          this.x = Math.random() * this.canvasW;
          this.y = Math.random() * this.canvasH;
        }

        this.size = Math.random() * 1.5 + 0.4;
        this.alpha = Math.random() * 0.5 + 0.2;
        this.targetAlpha = this.alpha;
        this.speed = Math.random() * 0.6 + 0.2;
        this.angle = Math.random() * Math.PI * 2;
        this.vx = Math.cos(this.angle) * this.speed;
        this.vy = Math.sin(this.angle) * this.speed;
        this.life = 0;
        this.maxLife = 220 + Math.random() * 300;
        this.absorbed = false;
        const tints = [
          `rgba(80,100,140,`,
          `rgba(60,80,120,`,
          `rgba(100,110,130,`,
          `rgba(40,50,80,`,
          `rgba(120,130,150,`,
        ];
        this.colorBase = tints[Math.floor(Math.random() * tints.length)];
      }

      update(logoCenterX, logoCenterY) {
        const dx = logoCenterX - this.x;
        const dy = logoCenterY - this.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const steer = 0.008;
        this.vx += (dx / dist) * steer;
        this.vy += (dy / dist) * steer;

        const spd = Math.sqrt(this.vx * this.vx + this.vy * this.vy);
        if (spd > 1.2) { this.vx = (this.vx / spd) * 1.2; this.vy = (this.vy / spd) * 1.2; }

        this.x += this.vx;
        this.y += this.vy;
        this.life++;

        if (dist < 30 || this.life > this.maxLife) {
          this.absorbed = true;
        }

        const lifeRatio = this.life / this.maxLife;
        if (lifeRatio < 0.15) this.alpha = this.targetAlpha * (lifeRatio / 0.15);
        else if (lifeRatio > 0.75) this.alpha = this.targetAlpha * (1 - (lifeRatio - 0.75) / 0.25);
        else this.alpha = this.targetAlpha;
      }

      draw(ctx) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.colorBase + this.alpha.toFixed(2) + ')';
        ctx.fill();
      }
    }

    class Particle {
      constructor(x, y, color) {
        this.originX = x;
        this.originY = y;
        this.x = x + (Math.random() - 0.5) * 800;
        this.y = y + (Math.random() - 0.5) * 800;
        this.color = color;
        this.size = Math.random() * 1.8 + 0.6;
        this.baseSize = this.size;
        this.vx = 0;
        this.vy = 0;
        this.ease = 0.045 + Math.random() * 0.025;
        this.friction = 0.82;
        this.dispersed = false;
        this.blasting = false;
        this.driftAngle = Math.random() * Math.PI * 2;
        this.driftSpeed = 0.008 + Math.random() * 0.012;
        this.driftRadius = 2.5 + Math.random() * 4;
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
      }

      blast(cx, cy) {
        const angle = Math.atan2(this.originY - cy, this.originX - cx) + (Math.random() - 0.5) * 1.5;
        const speed = 20 + Math.random() * 38;
        this.vx = Math.cos(angle) * speed;
        this.vy = Math.sin(angle) * speed;
        this.blasting = true;
        this.friction = 0.92;
      }

      resetAfterBlast() {
        this.blasting = false;
        this.friction = 0.82;
      }

      update() {
        this.driftAngle += this.driftSpeed;
        const driftX = Math.cos(this.driftAngle) * this.driftRadius;
        const driftY = Math.sin(this.driftAngle) * this.driftRadius;
        const targetX = this.originX + driftX;
        const targetY = this.originY + driftY;

        if (!this.blasting) {
          const dx = mouse.x - this.x;
          const dy = mouse.y - this.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const force = Math.max(0, (mouse.radius - dist) / mouse.radius);

          if (force > 0) {
            const angle = Math.atan2(dy, dx);
            const push = force * force * 20;
            const trailOffset = Math.random() * 60 - 30;
            const perpAngle = angle + Math.PI / 2;

            this.vx -= Math.cos(angle) * push + Math.cos(perpAngle) * trailOffset * 0.3;
            this.vy -= Math.sin(angle) * push + Math.sin(perpAngle) * trailOffset * 0.3;
            this.dispersed = true;
            this.size = this.baseSize * (1 + force * 1.5);
          } else {
            this.size += (this.baseSize - this.size) * 0.1;
          }
        } else {
          this.size += (this.baseSize - this.size) * 0.05;
        }

        this.vx *= this.friction;
        this.vy *= this.friction;

        this.x += this.vx + (targetX - this.x) * (this.blasting ? 0.01 : this.ease);
        this.y += this.vy + (targetY - this.y) * (this.blasting ? 0.01 : this.ease);

        this.draw();
      }
    }

    function initParticles(imageData, imgW, imgH, offsetX, offsetY, scaleX, scaleY) {
      particles = [];

      const sampled = [];
      for (let y = 0; y < imgH; y += SAMPLE_STEP) {
        for (let x = 0; x < imgW; x += SAMPLE_STEP) {
          const idx = (y * imgW + x) * 4;
          const a = imageData[idx + 3];
          if (a > 40) {
            sampled.push({ x, y, r: imageData[idx], g: imageData[idx+1], b: imageData[idx+2], a });
          }
        }
      }

      const total = Math.min(PARTICLE_COUNT, sampled.length);
      const step = sampled.length / total;

      for (let i = 0; i < total; i++) {
        const s = sampled[Math.floor(i * step)];
        const wx = offsetX + s.x * scaleX;
        const wy = offsetY + s.y * scaleY;
        const color = `rgba(${s.r},${s.g},${s.b},${(s.a / 255).toFixed(2)})`;
        particles.push(new Particle(wx, wy, color));
      }

      initialized = true;
    }

    const handleImageLoad = () => {
      const offscreen = document.createElement('canvas');
      const maxW = Math.min(width * 0.72, 520);
      const maxH = Math.min(height * 0.72, 520);
      const scaleRatio = Math.min(maxW / img.width, maxH / img.height);

      const drawW = img.width * scaleRatio;
      const drawH = img.height * scaleRatio;

      offscreen.width = img.width;
      offscreen.height = img.height;
      const octx = offscreen.getContext('2d', { willReadFrequently: true });
      octx.drawImage(img, 0, 0);

      const imageData = octx.getImageData(0, 0, img.width, img.height).data;
      const offsetX = (width - drawW) / 2;
      const offsetY = (height - drawH) / 2;

      initParticles(imageData, img.width, img.height, offsetX, offsetY, drawW / img.width, drawH / img.height);
    };

    if (img.complete) {
      handleImageLoad();
    } else {
      img.onload = handleImageLoad;
    }

    let ambientDots = [];
    const AMBIENT_COUNT = 180;

    function initAmbient() {
      ambientDots = [];
      for (let i = 0; i < AMBIENT_COUNT; i++) {
        ambientDots.push(new AmbientDot(width, height));
      }
    }
    initAmbient();

    function updateAmbient() {
      const cx = width / 2;
      const cy = height / 2;
      for (let i = ambientDots.length - 1; i >= 0; i--) {
        const d = ambientDots[i];
        d.update(cx, cy);
        d.draw(ctx);
        if (d.absorbed) {
          ambientDots.splice(i, 1);
          ambientDots.push(new AmbientDot(width, height));
        }
      }
    }

    let blastTimeout = null;

    const handleClick = e => {
      if (!initialized) return;
      const rect = canvas.getBoundingClientRect();
      const cx = e.clientX - rect.left;
      const cy = e.clientY - rect.top;

      particles.forEach(p => p.blast(cx, cy));

      if (blastTimeout) clearTimeout(blastTimeout);
      blastTimeout = setTimeout(() => {
        particles.forEach(p => p.resetAfterBlast());
      }, 2200);
    };
    window.addEventListener('click', handleClick);

    function drawCursor() {
      if (mouse.x < 0 || mouse.x > width || mouse.y < 0 || mouse.y > height) return;
      ctx.beginPath();
      ctx.arc(mouse.x, mouse.y, 6, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(255,180,50,0.9)';
      ctx.lineWidth = 1.5;
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(mouse.x, mouse.y, mouse.radius, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(255,120,30,0.12)';
      ctx.lineWidth = 1;
      ctx.stroke();
    }

    let animationFrameId;
    function animate() {
      ctx.clearRect(0, 0, width, height);

      updateAmbient();

      if (initialized) {
        for (let i = 0; i < particles.length; i++) {
          particles[i].update();
        }
      }

      drawCursor();
      animationFrameId = requestAnimationFrame(animate);
    }

    animate();

    const handleResize = () => {
      if (!containerRef.current) return;
      width = containerRef.current.clientWidth;
      height = containerRef.current.clientHeight;
      canvas.width = width;
      canvas.height = height;

      if (img.complete) {
        handleImageLoad();
        initAmbient();
      }
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('click', handleClick);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      if (blastTimeout) clearTimeout(blastTimeout);
    };
  }, []);

  return (
    <div ref={containerRef} className="w-full h-full min-h-[400px] lg:min-h-[600px] relative rounded-[2.5rem] overflow-hidden bg-black shadow-2xl">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full block cursor-none" />
    </div>
  );
}