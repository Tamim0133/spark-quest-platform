import { useEffect, useRef } from 'react';

class Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  life: number;
  maxLife: number;
  opacity: number;

  constructor(canvas: HTMLCanvasElement) {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.vx = (Math.random() - 0.5) * 0.5;
    this.vy = (Math.random() - 0.5) * 0.5;
    this.size = Math.random() * 2 + 1;
    this.maxLife = Math.random() * 200 + 100;
    this.life = this.maxLife;
    this.opacity = 0;
  }

  update(flowField: number[][], canvas: HTMLCanvasElement) {
    // Flow field influence
    const col = Math.floor(this.x / 20);
    const row = Math.floor(this.y / 20);
    
    if (flowField[row] && flowField[row][col] !== undefined) {
      const angle = flowField[row][col];
      this.vx += Math.cos(angle) * 0.1;
      this.vy += Math.sin(angle) * 0.1;
    }

    // Damping
    this.vx *= 0.95;
    this.vy *= 0.95;

    // Update position
    this.x += this.vx;
    this.y += this.vy;

    // Fade in/out
    if (this.life > this.maxLife * 0.8) {
      this.opacity = (this.maxLife - this.life) / (this.maxLife * 0.2);
    } else if (this.life < this.maxLife * 0.2) {
      this.opacity = this.life / (this.maxLife * 0.2);
    } else {
      this.opacity = 1;
    }

    this.life--;

    // Wrap around edges
    if (this.x < 0) this.x = canvas.width;
    if (this.x > canvas.width) this.x = 0;
    if (this.y < 0) this.y = canvas.height;
    if (this.y > canvas.height) this.y = 0;
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = `hsla(var(--primary), ${this.opacity * 0.6})`;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }

  isDead() {
    return this.life <= 0;
  }
}

const ParticleBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Create flow field
    const cols = Math.ceil(canvas.width / 20);
    const rows = Math.ceil(canvas.height / 20);
    const flowField: number[][] = [];

    for (let y = 0; y < rows; y++) {
      flowField[y] = [];
      for (let x = 0; x < cols; x++) {
        flowField[y][x] = Math.random() * Math.PI * 2;
      }
    }

    // Particles
    const particles: Particle[] = [];
    const maxParticles = 100;

    // Initialize particles
    for (let i = 0; i < maxParticles; i++) {
      particles.push(new Particle(canvas));
    }

    let time = 0;

    // Animation loop
    const animate = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Update flow field
      time += 0.003;
      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          const noise = Math.sin(x * 0.1 + time) * Math.cos(y * 0.1 + time);
          flowField[y][x] = noise * Math.PI * 2;
        }
      }

      // Update and draw particles
      for (let i = particles.length - 1; i >= 0; i--) {
        particles[i].update(flowField, canvas);
        particles[i].draw(ctx);

        // Remove dead particles and add new ones
        if (particles[i].isDead()) {
          particles.splice(i, 1);
          particles.push(new Particle(canvas));
        }
      }

      // Draw connections
      ctx.strokeStyle = `hsla(var(--primary), 0.15)`;
      ctx.lineWidth = 0.5;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 100) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.globalAlpha = (1 - distance / 100) * 0.5;
            ctx.stroke();
            ctx.globalAlpha = 1;
          }
        }
      }

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ mixBlendMode: 'screen' }}
    />
  );
};

export default ParticleBackground;
