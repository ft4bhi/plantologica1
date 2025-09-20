"use client";
import { useEffect, useRef, useState } from 'react';
import { useHydration } from '@/hooks/useHydration';

interface Point {
  x: number;
  y: number;
  vx: number;
  vy: number;
  fixed?: boolean;
}

interface Plant {
  points: Point[];
  segments: { start: number; end: number; width: number }[];
  growth: number;
  maxGrowth: number;
  color: string;
}

export default function PlantsBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | null>(null);
  const isMounted = useHydration();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!isMounted) return;
    
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

    // Animation variables
    let plants: Plant[] = [];
    let time = 0;

    // Create plants
    const createPlants = () => {
      plants = [];
      const plantCount = Math.min(8, Math.floor(window.innerWidth / 150));
      
      for (let i = 0; i < plantCount; i++) {
        const x = (i + 1) * (window.innerWidth / (plantCount + 1));
        const y = window.innerHeight - 50;
        
        plants.push({
          points: [
            { x, y, vx: 0, vy: 0, fixed: true }, // Root
            { x: x - 2, y: y - 20, vx: 0, vy: 0 }, // Left branch
            { x: x + 2, y: y - 20, vx: 0, vy: 0 }, // Right branch
            { x, y: y - 40, vx: 0, vy: 0 }, // Top
          ],
          segments: [
            { start: 0, end: 1, width: 3 },
            { start: 0, end: 2, width: 3 },
            { start: 1, end: 3, width: 2 },
            { start: 2, end: 3, width: 2 },
          ],
          growth: 0,
          maxGrowth: 1,
          color: `rgba(139, 195, 74, ${0.15 + Math.random() * 0.1})`
        });
      }
    };

    // Physics simulation
    const updatePhysics = () => {
      const gravity = 0.1;
      const damping = 0.98;
      const springStrength = 0.1;

      plants.forEach(plant => {
        plant.points.forEach(point => {
          if (point.fixed) return;

          // Apply gravity
          point.vy += gravity;
          
          // Apply spring forces
          plant.segments.forEach(segment => {
            const p1 = plant.points[segment.start];
            const p2 = plant.points[segment.end];
            const dx = p2.x - p1.x;
            const dy = p2.y - p1.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            const targetDistance = 20 + segment.width * 5;
            
            if (distance > 0) {
              const force = (distance - targetDistance) * springStrength;
              const fx = (dx / distance) * force;
              const fy = (dy / distance) * force;
              
              if (!p1.fixed) {
                p1.vx += fx;
                p1.vy += fy;
              }
              if (!p2.fixed) {
                p2.vx -= fx;
                p2.vy -= fy;
              }
            }
          });

          // Apply wind
          const wind = Math.sin(time * 0.01 + point.x * 0.001) * 0.5;
          point.vx += wind;

          // Update position
          point.x += point.vx;
          point.y += point.vy;
          
          // Apply damping
          point.vx *= damping;
          point.vy *= damping;

          // Boundary constraints
          if (point.x < 0 || point.x > canvas.width) {
            point.vx *= -0.8;
            point.x = Math.max(0, Math.min(canvas.width, point.x));
          }
          if (point.y > canvas.height - 50) {
            point.vy *= -0.8;
            point.y = canvas.height - 50;
          }
        });

        // Grow plant
        plant.growth = Math.min(plant.maxGrowth, plant.growth + 0.005);
      });
    };

    // Render function
    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw modern gradient background
      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
      gradient.addColorStop(0, 'rgba(240, 249, 244, 0.15)');
      gradient.addColorStop(0.5, 'rgba(220, 242, 228, 0.08)');
      gradient.addColorStop(1, 'rgba(188, 228, 204, 0.05)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      plants.forEach(plant => {
        // Draw segments
        plant.segments.forEach(segment => {
          const p1 = plant.points[segment.start];
          const p2 = plant.points[segment.end];
          
          ctx.beginPath();
          ctx.strokeStyle = plant.color;
          ctx.lineWidth = segment.width * plant.growth;
          ctx.lineCap = 'round';
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.stroke();

          // Add highlight
          ctx.beginPath();
          ctx.strokeStyle = `rgba(139, 195, 74, ${0.3 * plant.growth})`;
          ctx.lineWidth = (segment.width * plant.growth) / 2;
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.stroke();
        });

        // Draw leaves
        if (plant.growth > 0.3) {
          plant.segments.forEach(segment => {
            if (segment.width < 2) return;
            
            const p1 = plant.points[segment.start];
            const p2 = plant.points[segment.end];
            const midX = (p1.x + p2.x) / 2;
            const midY = (p1.y + p2.y) / 2;
            
            // Draw leaf
            ctx.beginPath();
            ctx.fillStyle = `rgba(139, 195, 74, ${0.2 * plant.growth})`;
            ctx.ellipse(midX, midY, 8 * plant.growth, 3 * plant.growth, 
                       Math.atan2(p2.y - p1.y, p2.x - p1.x), 0, 2 * Math.PI);
            ctx.fill();
          });
        }
      });
    };

    // Animation loop with performance optimization
    let lastTime = 0;
    const targetFPS = 30;
    const frameInterval = 1000 / targetFPS;

    const animate = (currentTime: number) => {
      if (currentTime - lastTime >= frameInterval) {
        time++;
        updatePhysics();
        render();
        lastTime = currentTime;
      }
      animationRef.current = requestAnimationFrame(animate);
    };

    // Initialize
    createPlants();
    setIsLoading(false);
    animationRef.current = requestAnimationFrame(animate);

    // Cleanup
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [isMounted]);

  // Don't render on server to avoid hydration issues
  if (!isMounted) {
    return (
      <div className="fixed inset-0 -z-10 pointer-events-none">
        <div className="w-full h-full bg-gradient-to-br from-green-50/20 to-emerald-100/20" />
      </div>
    );
  }

  return (
    <div className="fixed inset-0 -z-10 pointer-events-none">
      {isLoading && (
        <div className="w-full h-full bg-gradient-to-br from-green-50/20 to-emerald-100/20 animate-pulse" />
      )}
      <canvas
        ref={canvasRef}
        className={`w-full h-full opacity-40 transition-opacity duration-1000 ${
          isLoading ? 'opacity-0' : 'opacity-40'
        }`}
        style={{ 
          filter: 'blur(0.5px)',
        }}
      />
    </div>
  );
}
