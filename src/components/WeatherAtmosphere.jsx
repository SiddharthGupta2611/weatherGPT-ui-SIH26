import React, { useEffect, useRef } from 'react';

export default function WeatherAtmosphere({ condition = 'thunderstorm', isNight = false }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };

    window.addEventListener('resize', handleResize);

    // Weather Particles State
    const particles = [];
    const particleCount =
      condition === 'thunderstorm'
        ? 140
        : condition === 'rainy'
        ? 90
        : condition === 'snow'
        ? 120
        : condition === 'heatwave' || condition === 'sunny'
        ? 45
        : condition === 'clear_night'
        ? 100
        : 35; // cloudy

    // Lightning state for thunderstorm
    let lightningTimer = 0;
    let isFlashing = false;
    let flashOpacity = 0;

    // Shooting star state for night
    let shootingStar = null;
    let shootingStarTimer = 0;

    // Initialize particles based on condition
    for (let i = 0; i < particleCount; i++) {
      if (condition === 'thunderstorm' || condition === 'rainy') {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          length: Math.random() * (condition === 'thunderstorm' ? 24 : 16) + 12,
          speed: Math.random() * 8 + (condition === 'thunderstorm' ? 14 : 9),
          slant: condition === 'thunderstorm' ? -3 : -1.5,
          opacity: Math.random() * 0.45 + 0.25,
          splash: false,
          splashRadius: 0
        });
      } else if (condition === 'snow') {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          radius: Math.random() * 2.8 + 0.8,
          speed: Math.random() * 1.5 + 0.6,
          swing: Math.random() * 2 * Math.PI,
          swingSpeed: Math.random() * 0.02 + 0.01,
          swingRadius: Math.random() * 1.5 + 0.5,
          opacity: Math.random() * 0.7 + 0.3
        });
      } else if (condition === 'heatwave' || condition === 'sunny') {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          radius: Math.random() * 3 + 1,
          speed: Math.random() * 0.8 + 0.3,
          swing: Math.random() * 2 * Math.PI,
          swingSpeed: Math.random() * 0.03 + 0.01,
          opacity: Math.random() * 0.5 + 0.2,
          hue: Math.random() * 20 + 35 // golden to amber
        });
      } else if (condition === 'clear_night') {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * (height * 0.75),
          radius: Math.random() * 1.5 + 0.5,
          twinkleSpeed: Math.random() * 0.04 + 0.01,
          twinklePhase: Math.random() * Math.PI * 2,
          baseOpacity: Math.random() * 0.6 + 0.3
        });
      } else {
        // Cloudy vapor particles
        particles.push({
          x: Math.random() * width,
          y: Math.random() * (height * 0.6),
          radius: Math.random() * 40 + 20,
          speed: Math.random() * 0.3 + 0.1,
          opacity: Math.random() * 0.06 + 0.02
        });
      }
    }

    // Heatwave shimmer wave parameters
    let heatTime = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // --- 1. THUNDERSTORM / RAIN ---
      if (condition === 'thunderstorm' || condition === 'rainy') {
        // Lightning Flash Effect
        if (condition === 'thunderstorm') {
          lightningTimer++;
          if (lightningTimer > 180 && Math.random() < 0.02) {
            isFlashing = true;
            flashOpacity = Math.random() * 0.35 + 0.15;
            lightningTimer = 0;
          }

          if (isFlashing) {
            ctx.fillStyle = `rgba(220, 245, 255, ${flashOpacity})`;
            ctx.fillRect(0, 0, width, height);
            flashOpacity *= 0.82;
            if (flashOpacity < 0.01) isFlashing = false;
          }
        }

        ctx.strokeStyle = condition === 'thunderstorm' ? 'rgba(180, 230, 255, 0.65)' : 'rgba(160, 220, 255, 0.5)';
        ctx.lineWidth = 1.2;
        ctx.beginPath();

        for (let i = 0; i < particles.length; i++) {
          const p = particles[i];
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p.x + p.slant, p.y + p.length);

          p.y += p.speed;
          p.x += p.slant;

          if (p.y > height) {
            p.y = -p.length;
            p.x = Math.random() * width;
          }
        }
        ctx.stroke();
      }

      // --- 2. SNOW / WINTER ---
      else if (condition === 'snow') {
        for (let i = 0; i < particles.length; i++) {
          const p = particles[i];
          p.swing += p.swingSpeed;
          p.y += p.speed;
          p.x += Math.sin(p.swing) * p.swingRadius;

          if (p.y > height + 5) {
            p.y = -5;
            p.x = Math.random() * width;
          }
          if (p.x > width) p.x = 0;
          if (p.x < 0) p.x = width;

          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(240, 248, 255, ${p.opacity})`;
          ctx.shadowBlur = 4;
          ctx.shadowColor = 'rgba(255, 255, 255, 0.5)';
          ctx.fill();
        }
        ctx.shadowBlur = 0;
      }

      // --- 3. SUMMER / HEATWAVE / SUNNY ---
      else if (condition === 'heatwave' || condition === 'sunny') {
        heatTime += 0.03;

        // Draw shimmering heat waves across the canvas
        if (condition === 'heatwave') {
          ctx.strokeStyle = 'rgba(255, 180, 50, 0.08)';
          ctx.lineWidth = 1.5;
          for (let y = height * 0.4; y < height; y += 30) {
            ctx.beginPath();
            for (let x = 0; x < width; x += 10) {
              const offsetY = Math.sin(x * 0.02 + heatTime * 2 + y * 0.01) * 4;
              if (x === 0) ctx.moveTo(x, y + offsetY);
              else ctx.lineTo(x, y + offsetY);
            }
            ctx.stroke();
          }
        }

        // Floating solar dust particles
        for (let i = 0; i < particles.length; i++) {
          const p = particles[i];
          p.swing += p.swingSpeed;
          p.y -= p.speed;
          p.x += Math.cos(p.swing) * 0.6;

          if (p.y < 0) {
            p.y = height + 5;
            p.x = Math.random() * width;
          }

          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
          ctx.fillStyle = `hsla(${p.hue}, 100%, 65%, ${p.opacity})`;
          ctx.shadowBlur = 6;
          ctx.shadowColor = 'rgba(255, 200, 50, 0.6)';
          ctx.fill();
        }
        ctx.shadowBlur = 0;
      }

      // --- 4. CLEAR NIGHT / STARRY ---
      else if (condition === 'clear_night') {
        shootingStarTimer++;

        // Random Shooting Star
        if (!shootingStar && shootingStarTimer > 180 && Math.random() < 0.03) {
          shootingStar = {
            x: Math.random() * (width * 0.7),
            y: Math.random() * (height * 0.3),
            length: Math.random() * 80 + 50,
            speed: 12,
            opacity: 1
          };
          shootingStarTimer = 0;
        }

        if (shootingStar) {
          ctx.strokeStyle = `rgba(255, 255, 255, ${shootingStar.opacity})`;
          ctx.lineWidth = 1.5;
          ctx.beginPath();
          ctx.moveTo(shootingStar.x, shootingStar.y);
          ctx.lineTo(shootingStar.x + shootingStar.length, shootingStar.y + shootingStar.length * 0.6);
          ctx.stroke();

          shootingStar.x += shootingStar.speed;
          shootingStar.y += shootingStar.speed * 0.6;
          shootingStar.opacity -= 0.03;

          if (shootingStar.opacity <= 0) shootingStar = null;
        }

        // Twinkling stars
        for (let i = 0; i < particles.length; i++) {
          const p = particles[i];
          p.twinklePhase += p.twinkleSpeed;
          const currentOpacity = p.baseOpacity + Math.sin(p.twinklePhase) * 0.35;

          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(220, 240, 255, ${Math.max(0.1, currentOpacity)})`;
          ctx.shadowBlur = 3;
          ctx.shadowColor = 'rgba(180, 220, 255, 0.8)';
          ctx.fill();
        }
        ctx.shadowBlur = 0;
      }

      // --- 5. CLOUDY / OVERCAST ---
      else {
        for (let i = 0; i < particles.length; i++) {
          const p = particles[i];
          p.x += p.speed;
          if (p.x > width + p.radius) {
            p.x = -p.radius;
            p.y = Math.random() * (height * 0.6);
          }

          const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.radius);
          grad.addColorStop(0, `rgba(200, 220, 240, ${p.opacity})`);
          grad.addColorStop(1, 'rgba(200, 220, 240, 0)');

          ctx.fillStyle = grad;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, [condition]);

  // Dynamic Theme Gradients
  const getThemeBackground = () => {
    switch (condition) {
      case 'thunderstorm':
        return 'from-[#070e1c] via-[#09152b] to-[#040812]';
      case 'rainy':
        return 'from-[#0a192f] via-[#0d223f] to-[#061021]';
      case 'snow':
        return 'from-[#0d213b] via-[#142f4c] to-[#081525]';
      case 'heatwave':
        return 'from-[#2b1006] via-[#3d1a08] to-[#120602]';
      case 'sunny':
        return isNight
          ? 'from-[#081124] via-[#0d1a33] to-[#040710]'
          : 'from-[#12284c] via-[#1a3865] to-[#09162e]';
      case 'clear_night':
        return 'from-[#050814] via-[#080d22] to-[#020308]';
      case 'sunset':
        return 'from-[#381124] via-[#2a132c] to-[#0e071a]';
      default: // cloudy
        return 'from-[#111c2e] via-[#18263d] to-[#0a101b]';
    }
  };

  return (
    <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden transition-colors duration-1000">
      {/* Background Gradient */}
      <div className={`absolute inset-0 bg-gradient-to-b ${getThemeBackground()} transition-all duration-1000`} />

      {/* Atmospheric Radial Orbs */}
      {condition === 'heatwave' && (
        <>
          <div className="absolute -top-10 -right-10 w-72 h-72 bg-amber-500/25 rounded-full blur-3xl animate-pulse" />
          <div className="absolute top-20 left-10 w-60 h-60 bg-red-500/20 rounded-full blur-3xl" />
        </>
      )}

      {condition === 'sunny' && !isNight && (
        <>
          <div className="absolute top-2 right-6 w-44 h-44 bg-amber-400/20 rounded-full blur-2xl animate-pulse-slow" />
          <div className="absolute top-10 right-14 w-20 h-20 bg-yellow-200/40 rounded-full blur-xl" />
        </>
      )}

      {condition === 'snow' && (
        <>
          <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-400/15 rounded-full blur-3xl" />
          <div className="absolute bottom-20 left-0 w-72 h-72 bg-blue-300/10 rounded-full blur-3xl" />
        </>
      )}

      {condition === 'thunderstorm' && (
        <>
          <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/15 rounded-full blur-3xl" />
          <div className="absolute top-40 left-0 w-80 h-80 bg-indigo-600/15 rounded-full blur-3xl" />
        </>
      )}

      {condition === 'clear_night' && (
        <>
          {/* Glowing Moon */}
          <div className="absolute top-8 right-10 w-16 h-16 rounded-full bg-slate-100/90 shadow-[0_0_35px_rgba(255,255,255,0.6)] flex items-center justify-center opacity-90">
            <div className="w-13 h-13 rounded-full bg-[#080d22] translate-x-1.5 -translate-y-1 opacity-90" />
          </div>
          <div className="absolute top-2 right-4 w-32 h-32 bg-indigo-400/10 rounded-full blur-2xl" />
        </>
      )}

      {/* HTML5 Animation Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
    </div>
  );
}
