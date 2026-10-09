import { useMemo } from "react";

const petalColors = ["var(--burgundy)", "oklch(0.75 0.07 15)", "var(--ivory)", "var(--burgundy)"];

export function Petals({ count = 18 }: { count?: number }) {
  const petals = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        left: (i * 53) % 100,
        delay: (i * 1.7) % 14,
        dur: 11 + ((i * 7) % 9),
        size: 8 + ((i * 5) % 9),
        dx: ((i % 5) - 2) * 50,
        color: petalColors[i % petalColors.length],
      })),
    [count],
  );
  return (
    <div className="pointer-events-none fixed inset-0 z-30 overflow-hidden" aria-hidden>
      {petals.map((p, i) => (
        <span
          key={i}
          className="absolute -top-8 block"
          style={{
            left: `${p.left}%`,
            width: p.size,
            height: p.size * 0.75,
            background: p.color,
            borderRadius: "70% 0 70% 0",
            opacity: 0,
            ["--dx" as string]: `${p.dx}px`,
            animation: `petal-fall ${p.dur}s linear ${p.delay}s infinite`,
          }}
        />
      ))}
    </div>
  );
}

function Wing({ color, flip }: { color: string; flip?: boolean }) {
  return (
    <svg viewBox="0 0 20 24" className="h-6 w-5" style={{ transform: flip ? "scaleX(-1)" : undefined }}>
      <path d="M20 12 C8 -4 -2 4 4 12 C-2 20 8 26 20 12Z" fill={color} stroke="var(--gold)" strokeWidth=".8" />
    </svg>
  );
}

export function Butterflies() {
  const list = [
    { top: "18%", color: "var(--navy)", dur: 34, delay: 0 },
    { top: "42%", color: "var(--burgundy)", dur: 40, delay: 9 },
    { top: "65%", color: "var(--ivory)", dur: 30, delay: 18 },
    { top: "28%", color: "var(--gold)", dur: 46, delay: 25 },
  ];
  return (
    <div className="pointer-events-none fixed inset-0 z-30 overflow-hidden" aria-hidden>
      {list.map((b, i) => (
        <div
          key={i}
          className="absolute -left-12"
          style={{ top: b.top, animation: `fly ${b.dur}s ease-in-out ${b.delay}s infinite` }}
        >
          <div className="flex" style={{ filter: "drop-shadow(0 4px 4px oklch(0 0 0 / .25))" }}>
            <div style={{ animation: "flutter .35s ease-in-out infinite", transformOrigin: "right" }}>
              <Wing color={b.color} />
            </div>
            <div style={{ animation: "flutter .35s ease-in-out infinite", transformOrigin: "left" }}>
              <Wing color={b.color} flip />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export function Birds() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {[0, 1, 2].map((i) => (
        <svg
          key={i}
          viewBox="0 0 30 10"
          className="absolute w-6 text-navy"
          style={{ top: `${12 + i * 5}%`, left: 0, animation: `bird ${26 + i * 4}s linear ${i * 3}s infinite` }}
        >
          <path d="M0 5 Q7 0 15 6 Q23 0 30 5" fill="none" stroke="currentColor" strokeWidth="1.6">
            <animate attributeName="d" dur=".7s" repeatCount="indefinite" values="M0 5 Q7 0 15 6 Q23 0 30 5;M0 3 Q7 8 15 6 Q23 8 30 3;M0 5 Q7 0 15 6 Q23 0 30 5" />
          </path>
        </svg>
      ))}
    </div>
  );
}

export function Sparkles({ count = 14 }: { count?: number }) {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {Array.from({ length: count }, (_, i) => (
        <span
          key={i}
          className="absolute size-1.5 rounded-full bg-gold"
          style={{
            left: `${(i * 37) % 100}%`,
            top: `${(i * 61) % 100}%`,
            boxShadow: "0 0 10px 3px var(--gold)",
            animation: `sparkle ${3 + (i % 4)}s ease-in-out ${(i * 0.6) % 5}s infinite`,
          }}
        />
      ))}
    </div>
  );
}
