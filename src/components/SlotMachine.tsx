'use client';

import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';

type Prize = '58獎金' | '168獎金' | '馬逼簽名' | '666獎金';

interface PrizeConfig {
  name: Prize;
  probability: number;
  emoji: string;
  color: string;
}

interface PrizeHistory {
  prize: Prize;
  timestamp: Date;
  id: number;
}

interface Confetti {
  id: number;
  left: number;
  color: string;
  delay: number;
  duration: number;
}

const prizes: PrizeConfig[] = [
  { name: '58獎金', probability: 0.80, emoji: '💰', color: '#fbbf24' },
  { name: '168獎金', probability: 0.10, emoji: '💎', color: '#60a5fa' },
  { name: '馬逼簽名', probability: 0.08, emoji: '✍️', color: '#a78bfa' },
  { name: '666獎金', probability: 0.02, emoji: '🎰', color: '#f87171' },
];

export default function SlotMachine() {
  const [spinning, setSpinning] = useState(false);
  const [result, setResult] = useState<Prize | null>(null);
  const [displayPrizes, setDisplayPrizes] = useState<Prize[]>([]);
  const [showResult, setShowResult] = useState(false);
  const [spinCount, setSpinCount] = useState(0);
  const [mounted, setMounted] = useState(false);
  const [hapticFeedback, setHapticFeedback] = useState(false);
  const [confettiParticles, setConfettiParticles] = useState<Confetti[]>([]);
  const [glassTint, setGlassTint] = useState<'light' | 'dark' | 'winning'>('light');
  const [history, setHistory] = useState<PrizeHistory[]>([]);
  const [showHistory, setShowHistory] = useState(false);
  const slotRefs = [useRef<HTMLDivElement>(null), useRef<HTMLDivElement>(null), useRef<HTMLDivElement>(null)];

  // Initialize display prizes
  useEffect(() => {
    setDisplayPrizes([prizes[0].name, prizes[1].name, prizes[2].name]);
    setMounted(true);
  }, []);

  const createConfetti = (prize: Prize) => {
    const config = prizes.find(p => p.name === prize);
    const confettiCount = prize === '666獎金' ? 50 : prize === '馬逼簽名' ? 40 : prize === '168獎金' ? 30 : 20;

    const newConfetti: Confetti[] = Array.from({ length: confettiCount }, (_, i) => ({
      id: Date.now() + i,
      left: Math.random() * 100,
      color: config?.color || '#fbbf24',
      delay: Math.random() * 0.3,
      duration: 2 + Math.random() * 1,
    }));

    setConfettiParticles(newConfetti);
    setTimeout(() => setConfettiParticles([]), 3000);
  };

  const selectPrize = (): Prize => {
    const random = Math.random();
    let cumulative = 0;

    for (const prize of prizes) {
      cumulative += prize.probability;
      if (random <= cumulative) {
        return prize.name;
      }
    }

    return prizes[0].name;
  };

  const spin = async () => {
    if (spinning) return;

    // Haptic feedback simulation
    setHapticFeedback(true);
    setTimeout(() => setHapticFeedback(false), 100);

    setSpinning(true);
    setShowResult(false);
    setResult(null);
    setSpinCount(prev => prev + 1);
    setGlassTint('dark');

    const finalPrize = selectPrize();

    // Animate each slot with blur effect
    slotRefs.forEach((ref) => {
      if (ref.current) {
        ref.current.style.animation = 'none';
        void ref.current.offsetHeight;
        ref.current.style.animation = `spin 0.08s linear infinite`;
      }
    });

    // Randomize display during spin
    const spinInterval = setInterval(() => {
      setDisplayPrizes([
        prizes[Math.floor(Math.random() * prizes.length)].name,
        prizes[Math.floor(Math.random() * prizes.length)].name,
        prizes[Math.floor(Math.random() * prizes.length)].name,
      ]);
    }, 80);

    // Stop slots one by one with dramatic timing
    await new Promise(resolve => setTimeout(resolve, 2000));
    setDisplayPrizes([finalPrize, prizes[Math.floor(Math.random() * prizes.length)].name, prizes[Math.floor(Math.random() * prizes.length)].name]);
    if (slotRefs[0].current) {
      slotRefs[0].current.style.animation = 'slotStop 0.3s ease-out';
      setTimeout(() => {
        if (slotRefs[0].current) slotRefs[0].current.style.animation = 'none';
      }, 300);
    }

    await new Promise(resolve => setTimeout(resolve, 600));
    setDisplayPrizes([finalPrize, finalPrize, prizes[Math.floor(Math.random() * prizes.length)].name]);
    if (slotRefs[1].current) {
      slotRefs[1].current.style.animation = 'slotStop 0.3s ease-out';
      setTimeout(() => {
        if (slotRefs[1].current) slotRefs[1].current.style.animation = 'none';
      }, 300);
    }

    await new Promise(resolve => setTimeout(resolve, 600));
    setDisplayPrizes([finalPrize, finalPrize, finalPrize]);
    if (slotRefs[2].current) {
      slotRefs[2].current.style.animation = 'slotStop 0.3s ease-out';
      setTimeout(() => {
        if (slotRefs[2].current) slotRefs[2].current.style.animation = 'none';
      }, 300);
    }

    clearInterval(spinInterval);

    setTimeout(() => {
      setResult(finalPrize);
      setShowResult(true);
      setSpinning(false);
      setGlassTint('winning');

      // Add to history
      setHistory(prev => [{
        prize: finalPrize,
        timestamp: new Date(),
        id: Date.now(),
      }, ...prev].slice(0, 10)); // Keep only last 10

      // Create confetti
      createConfetti(finalPrize);

      // Haptic feedback for win
      setHapticFeedback(true);
      setTimeout(() => setHapticFeedback(false), 200);

      // Return to light tint after celebration
      setTimeout(() => setGlassTint('light'), 2000);
    }, 400);
  };

  const getPrizeConfig = (prizeName: Prize) => {
    return prizes.find(p => p.name === prizeName) || prizes[0];
  };

  const getGlassStyle = () => {
    switch (glassTint) {
      case 'dark':
        return 'bg-white/5 border-white/10';
      case 'winning':
        return 'bg-white/20 border-white/30';
      default:
        return 'bg-white/10 border-white/20';
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      {/* Sparkle Background */}
      {mounted && (
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          {[...Array(30)].map((_, i) => {
            const isRed = i % 2 === 0;
            return (
              <div
                key={i}
                className={isRed ? "sparkle-red" : "sparkle-black"}
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 5}s`,
                  animationDuration: `${4 + Math.random() * 3}s`,
                }}
              />
            );
          })}
        </div>
      )}

      {/* Confetti */}
      {confettiParticles.map((confetti) => (
        <div
          key={confetti.id}
          className="confetti"
          style={{
            left: `${confetti.left}%`,
            backgroundColor: confetti.color,
            animationDelay: `${confetti.delay}s`,
            animationDuration: `${confetti.duration}s`,
          }}
        />
      ))}

      {/* Glass Container with haptic feedback */}
      <div className={`glass-container relative overflow-hidden rounded-[32px] shadow-2xl backdrop-blur-2xl ${getGlassStyle()} border transition-all duration-500 ${hapticFeedback ? 'haptic-shake' : ''} ${spinning ? 'haptic-pulse' : ''}`}>
        {/* Light reflection effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent pointer-events-none transition-opacity duration-500"></div>
        <div className={`absolute inset-0 bg-gradient-to-tl from-red-500/10 via-transparent to-transparent pointer-events-none transition-opacity duration-500 ${glassTint === 'winning' ? 'opacity-100' : 'opacity-50'}`}></div>

        {/* Header */}
        <div className="relative py-8 px-6 text-center backdrop-blur-xl bg-gradient-to-br from-red-500/30 via-red-600/20 to-red-700/30 border-b border-white/20 transition-all duration-500">
          <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent"></div>
          <h1 className="text-4xl font-bold text-white mb-2 relative z-10 drop-shadow-lg tracking-tight">🎰 幸運抽獎</h1>
          <p className="text-white/90 text-sm relative z-10 font-medium">試試你的運氣！</p>
        </div>

        {/* Slot Display */}
        <div className="py-8 px-6 relative">
          {/* Spinning indicator lights */}
          {spinning && (
            <div className="absolute top-4 left-1/2 -translate-x-1/2 flex gap-2 z-20">
              <div className="w-2.5 h-2.5 bg-red-500 rounded-full animate-ping shadow-lg shadow-red-500/50"></div>
              <div className="w-2.5 h-2.5 bg-white rounded-full animate-ping delay-75 shadow-lg shadow-white/50"></div>
              <div className="w-2.5 h-2.5 bg-red-500 rounded-full animate-ping delay-150 shadow-lg shadow-red-500/50"></div>
            </div>
          )}

          {/* Glass slot container */}
          <div className="glass-panel rounded-3xl p-6 mb-6 backdrop-blur-xl bg-black/20 border border-white/10 shadow-xl relative overflow-hidden transition-all duration-500">
            {/* Inner glass reflection */}
            <div className="absolute inset-0 bg-gradient-to-b from-white/5 via-transparent to-transparent pointer-events-none"></div>

            <div className="flex justify-center gap-3">
              {displayPrizes.map((prize, index) => {
                const config = getPrizeConfig(prize);
                return (
                  <div
                    key={index}
                    ref={slotRefs[index]}
                    className={`glass-slot w-24 h-32 backdrop-blur-xl rounded-2xl border ${
                      spinning
                        ? 'border-white/40 bg-white/15 shadow-lg shadow-white/20'
                        : 'border-white/20 bg-white/5'
                    } flex flex-col items-center justify-center shadow-lg relative overflow-hidden transition-all duration-300`}
                  >
                    {/* Slot glass effect */}
                    <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent pointer-events-none"></div>
                    {spinning && (
                      <div className="absolute inset-0 bg-gradient-to-b from-white/20 to-transparent animate-pulse"></div>
                    )}
                    <div className={`text-4xl mb-2 transition-all duration-300 ${spinning ? 'blur-sm scale-110' : ''} drop-shadow-lg`}>
                      {config.emoji}
                    </div>
                    <div className={`text-white font-bold text-sm text-center px-1 break-words transition-all duration-300 ${spinning ? 'blur-sm' : ''} drop-shadow-md`}>
                      {prize}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Result Display */}
          {showResult && result && (
            <div className="mb-6 animate-[bounce_0.6s_ease-in-out]">
              <div className="glass-result backdrop-blur-2xl bg-gradient-to-br from-white/30 via-white/20 to-white/10 rounded-2xl p-5 text-center shadow-2xl border border-white/30 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer"></div>
                <div className="absolute inset-0 bg-gradient-to-br from-red-500/10 to-transparent"></div>
                <p className="text-lg font-bold text-white mb-1 relative z-10 drop-shadow-lg">🎉 恭喜獲得 🎉</p>
                <p className="text-3xl font-black text-white relative z-10 drop-shadow-xl">{result}</p>
              </div>
            </div>
          )}

          {/* Spin Button */}
          <Button
            onClick={spin}
            disabled={spinning}
            className="glass-button w-full h-16 text-2xl font-bold backdrop-blur-xl bg-gradient-to-br from-red-500/60 via-red-600/50 to-red-700/60 hover:from-red-500/70 hover:via-red-600/60 hover:to-red-700/70 text-white rounded-2xl shadow-xl border border-white/30 disabled:opacity-50 disabled:cursor-not-allowed transform transition-all active:scale-95 hover:shadow-2xl hover:shadow-red-500/30 relative overflow-hidden group"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent pointer-events-none"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
            <span className="relative z-10 drop-shadow-lg font-semibold">{spinning ? '抽獎中...' : '開始抽獎'}</span>
          </Button>

          {/* Spin counter and History toggle */}
          <div className="flex justify-between items-center mt-4">
            {spinCount > 0 && (
              <div className="text-white/80 text-sm font-medium drop-shadow-md">
                已抽獎 {spinCount} 次
              </div>
            )}
            {history.length > 0 && (
              <button
                onClick={() => setShowHistory(!showHistory)}
                className="text-white/80 text-sm font-medium drop-shadow-md hover:text-white transition-colors backdrop-blur-sm bg-white/10 px-3 py-1 rounded-lg border border-white/20"
              >
                {showHistory ? '隱藏紀錄' : '查看紀錄'}
              </button>
            )}
          </div>
        </div>

        {/* Prize History Panel */}
        {showHistory && history.length > 0 && (
          <div className="px-6 pb-6">
            <div className="glass-panel backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-4 max-h-64 overflow-y-auto">
              <h3 className="text-white font-bold mb-3 text-center drop-shadow-md">抽獎紀錄</h3>
              <div className="space-y-2">
                {history.map((item, index) => {
                  const config = getPrizeConfig(item.prize);
                  return (
                    <div
                      key={item.id}
                      className="glass-history-card backdrop-blur-lg bg-white/10 border border-white/20 rounded-xl p-3 flex items-center gap-3 hover:bg-white/15 transition-all duration-300"
                      style={{ animationDelay: `${index * 0.05}s` }}
                    >
                      <div className="text-2xl">{config.emoji}</div>
                      <div className="flex-1">
                        <div className="text-white font-semibold text-sm drop-shadow-md">{item.prize}</div>
                        <div className="text-white/60 text-xs">
                          {item.timestamp.toLocaleTimeString('zh-TW', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                        </div>
                      </div>
                      <div className="text-white/40 text-xs">#{history.length - index}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        .glass-container {
          box-shadow:
            0 8px 32px 0 rgba(0, 0, 0, 0.37),
            inset 0 1px 1px 0 rgba(255, 255, 255, 0.15);
        }

        .glass-panel {
          box-shadow:
            inset 0 2px 4px 0 rgba(0, 0, 0, 0.2),
            0 4px 12px 0 rgba(0, 0, 0, 0.3);
        }

        .glass-slot {
          box-shadow:
            inset 0 1px 2px 0 rgba(255, 255, 255, 0.1),
            0 4px 12px 0 rgba(0, 0, 0, 0.2);
        }

        .glass-result {
          box-shadow:
            0 8px 32px 0 rgba(255, 255, 255, 0.1),
            inset 0 1px 2px 0 rgba(255, 255, 255, 0.2);
        }

        .glass-button {
          box-shadow:
            0 8px 24px 0 rgba(239, 68, 68, 0.3),
            inset 0 1px 1px 0 rgba(255, 255, 255, 0.2);
        }

        .glass-button:hover {
          box-shadow:
            0 12px 32px 0 rgba(239, 68, 68, 0.4),
            inset 0 1px 1px 0 rgba(255, 255, 255, 0.3);
        }

        .glass-history-card {
          animation: slideInFromLeft 0.3s ease-out;
          box-shadow:
            inset 0 1px 1px 0 rgba(255, 255, 255, 0.1),
            0 2px 8px 0 rgba(0, 0, 0, 0.15);
        }

        .confetti {
          position: fixed;
          width: 10px;
          height: 10px;
          top: 50%;
          pointer-events: none;
          opacity: 0;
          animation: confettiFall linear forwards;
          border-radius: 50%;
          z-index: 100;
        }

        @keyframes confettiFall {
          0% {
            transform: translateY(0) translateX(0) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(100vh) translateX(calc((var(--random, 0.5) - 0.5) * 300px)) rotate(720deg);
            opacity: 0;
          }
        }

        @keyframes slideInFromLeft {
          0% {
            transform: translateX(-20px);
            opacity: 0;
          }
          100% {
            transform: translateX(0);
            opacity: 1;
          }
        }

        @keyframes haptic-shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-2px); }
          75% { transform: translateX(2px); }
        }

        .haptic-shake {
          animation: haptic-shake 0.1s ease-in-out;
        }

        .haptic-pulse {
          animation: haptic-pulse 0.5s ease-in-out infinite;
        }

        @keyframes haptic-pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.002); }
        }

        .sparkle-red, .sparkle-black {
          position: absolute;
          width: 8px;
          height: 8px;
          animation: sparkleFloat linear infinite;
          pointer-events: none;
        }

        .sparkle-red::before {
          content: '✦';
          position: absolute;
          left: -6px;
          top: -6px;
          font-size: 16px;
          color: #ef4444;
          text-shadow: 0 0 10px #ef4444, 0 0 20px #dc2626, 0 0 30px #b91c1c;
          animation: sparkleRotate 3s linear infinite, sparkleGlow 1.5s ease-in-out infinite alternate;
        }

        .sparkle-black::before {
          content: '✦';
          position: absolute;
          left: -5px;
          top: -5px;
          font-size: 14px;
          color: #1f1f1f;
          text-shadow: 0 0 8px #ffffff, 0 0 15px #ef4444, 0 0 25px #000000;
          animation: sparkleRotate 4s linear infinite reverse, sparkleGlow 2s ease-in-out infinite alternate;
        }

        @keyframes sparkleFloat {
          0% {
            transform: translateY(100vh) translateX(0) scale(0);
            opacity: 0;
          }
          5% {
            opacity: 1;
          }
          95% {
            opacity: 0.8;
          }
          100% {
            transform: translateY(-50px) translateX(calc((var(--random) - 0.5) * 200px)) scale(0);
            opacity: 0;
          }
        }

        @keyframes sparkleRotate {
          0% {
            transform: rotate(0deg) scale(1);
          }
          50% {
            transform: rotate(180deg) scale(1.3);
          }
          100% {
            transform: rotate(360deg) scale(1);
          }
        }

        @keyframes sparkleGlow {
          0% {
            opacity: 0.4;
            filter: brightness(0.8);
          }
          100% {
            opacity: 1;
            filter: brightness(1.8);
          }
        }

        @keyframes spin {
          0%, 100% { transform: translateY(0) scale(1); }
          50% { transform: translateY(-8px) scale(1.05); }
        }

        @keyframes slotStop {
          0% { transform: scale(1); }
          50% { transform: scale(1.2); }
          100% { transform: scale(1); }
        }

        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
      `}</style>
    </div>
  );
}
