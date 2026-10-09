import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState, type ReactNode } from "react";
import gate from "@/assets/gate.jpg";
import palace from "@/assets/palace-garden.jpg";
import pergola from "@/assets/pergola.jpg";
import roses from "@/assets/roses.png";
import { Birds, Butterflies, Petals, Sparkles } from "@/components/garden/Ambient";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Undangan Pernikahan Arya & Kirana — Taman Istana" },
      { name: "description", content: "Undangan pernikahan Arya & Kirana di taman kerajaan yang megah. Detail acara, kisah cinta, galeri, dan RSVP." },
      { property: "og:title", content: "Undangan Pernikahan Arya & Kirana" },
      { property: "og:description", content: "Masuki gerbang istana dan rayakan hari bahagia kami di taman kerajaan." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const WEDDING = new Date("2026-12-12T09:00:00+07:00");

function useScrollY() {
  const [y, setY] = useState(0);
  useEffect(() => {
    let raf = 0;
    const on = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => setY(window.scrollY));
    };
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  return y;
}

function Cover({ onOpen, opening }: { onOpen: () => void; opening: boolean }) {
  return (
    <div
      className={`fixed inset-0 z-50 overflow-hidden bg-navy transition-opacity duration-[1600ms] ${opening ? "pointer-events-none opacity-0 delay-700" : ""}`}
    >
      <img
        src={gate}
        alt="Gerbang istana"
        className={`absolute inset-0 h-full w-full object-cover transition-transform duration-[2200ms] ${opening ? "scale-150" : ""}`}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-navy/90 via-navy/20 to-navy/40" />
      <Sparkles />
      <div className="relative flex h-full flex-col items-center justify-end gap-4 pb-16 text-center text-ivory animate-rise">
        <p className="tracking-[0.4em] text-xs uppercase text-gold">The Wedding of</p>
        <h1 className="font-script text-6xl md:text-8xl text-gold-gradient">Arya & Kirana</h1>
        <p className="font-display italic">Kepada Yth. Bapak/Ibu/Saudara/i</p>
        <button
          onClick={onOpen}
          className="mt-2 rounded-full bg-gold-gradient px-8 py-3 font-display text-lg text-navy shadow-royal transition hover:scale-105"
        >
          Buka Gerbang Istana
        </button>
      </div>
    </div>
  );
}

function Corner({ className = "" }: { className?: string }) {
  return (
    <div aria-hidden className={`pointer-events-none absolute w-40 md:w-72 ${className}`}>
      <img src={roses} alt="" loading="lazy" width={1024} height={1024} className="w-full animate-sway drop-shadow-xl" />
    </div>
  );
}

function Section({ children, bg, id }: { children: ReactNode; bg?: string; id?: string }) {
  return (
    <section id={id} className="relative overflow-hidden px-5 py-24 md:py-32">
      {bg && (
        <>
          <img src={bg} alt="" aria-hidden loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
          <div className="absolute inset-0 bg-background/75 backdrop-blur-[2px]" />
        </>
      )}
      <Corner className="-left-6 -top-6" />
      <Corner className="-right-6 -top-6 -scale-x-100" />
      <div className="relative mx-auto max-w-5xl">{children}</div>
    </section>
  );
}

function Title({ kicker, children }: { kicker: string; children: ReactNode }) {
  return (
    <div className="mb-12 text-center">
      <p className="text-xs uppercase tracking-[0.35em] text-burgundy">{kicker}</p>
      <h2 className="mt-2 text-4xl md:text-6xl text-navy">{children}</h2>
      <div className="mx-auto mt-4 h-px w-40 bg-gold-gradient" />
    </div>
  );
}

function Card({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`royal-frame rounded-t-[999px] rounded-b-lg bg-card p-8 pt-14 text-center shadow-royal backdrop-blur ${className}`}>{children}</div>;
}

function Countdown() {
  const [now, setNow] = useState<number | null>(null);
  useEffect(() => {
    setNow(Date.now());
    const t = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(t);
  }, []);
  const d = Math.max(0, WEDDING.getTime() - (now ?? WEDDING.getTime()));
  const parts = [
    ["Hari", Math.floor(d / 864e5)],
    ["Jam", Math.floor(d / 36e5) % 24],
    ["Menit", Math.floor(d / 6e4) % 60],
    ["Detik", Math.floor(d / 1e3) % 60],
  ] as const;
  return (
    <div className="grid grid-cols-4 gap-3">
      {parts.map(([l, v]) => (
        <div key={l} className="royal-frame rounded-lg bg-navy py-4 text-ivory">
          <div className="font-display text-3xl md:text-5xl text-gold-gradient">{now === null ? "--" : v}</div>
          <div className="text-xs uppercase tracking-widest">{l}</div>
        </div>
      ))}
    </div>
  );
}

function Rsvp() {
  const [sent, setSent] = useState<string | null>(null);
  if (sent) return <p className="font-display text-2xl text-burgundy">Terima kasih, {sent}! Konfirmasi Anda telah kami terima.</p>;
  return (
    <form
      className="grid gap-4 text-left"
      onSubmit={(e) => {
        e.preventDefault();
        setSent(String(new FormData(e.currentTarget).get("nama") || "Tamu"));
      }}
    >
      <input name="nama" required placeholder="Nama lengkap" className="rounded-md border border-input bg-ivory px-4 py-3 outline-none focus:ring-2 focus:ring-ring" />
      <select name="hadir" className="rounded-md border border-input bg-ivory px-4 py-3">
        <option>Saya akan hadir</option>
        <option>Maaf, tidak dapat hadir</option>
      </select>
      <textarea name="ucapan" rows={3} placeholder="Ucapan & doa" className="rounded-md border border-input bg-ivory px-4 py-3" />
      <button className="rounded-full bg-primary py-3 font-display text-lg text-primary-foreground shadow-royal transition hover:opacity-90">Kirim Konfirmasi</button>
    </form>
  );
}

function Index() {
  const [stage, setStage] = useState<"cover" | "opening" | "open">("cover");
  const y = useScrollY();
  const open = () => {
    setStage("opening");
    setTimeout(() => setStage("open"), 2400);
  };

  return (
    <main className={stage === "cover" ? "h-screen overflow-hidden" : ""}>
      {stage !== "open" && <Cover onOpen={open} opening={stage === "opening"} />}
      {stage !== "cover" && (
        <>
          <Petals />
          <Butterflies />
        </>
      )}

      {/* Hero: layered royal garden */}
      <header className="relative h-[100svh] min-h-[640px] overflow-hidden">
        <img
          src={palace}
          alt="Istana kerajaan dengan taman dan air mancur"
          width={1920}
          height={1088}
          className="absolute inset-0 h-[115%] w-full object-cover"
          style={{ transform: `translateY(${y * 0.35}px) scale(1.05)` }}
        />
        <div className="absolute inset-0 bg-veil" />
        <Birds />
        <Sparkles count={20} />
        <div aria-hidden className="absolute -bottom-10 -left-10 w-56 md:w-[26rem]" style={{ transform: `translateY(${-y * 0.2}px) scaleY(-1)` }}>
          <img src={roses} alt="" className="w-full animate-sway" />
        </div>
        <div aria-hidden className="absolute -bottom-10 -right-10 w-56 md:w-[26rem]" style={{ transform: `translateY(${-y * 0.2}px) scale(-1,-1)` }}>
          <img src={roses} alt="" className="w-full animate-sway" />
        </div>
        <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center text-ivory" style={{ transform: `translateY(${y * 0.15}px)` }}>
          <p className="text-xs uppercase tracking-[0.5em] text-gold">Selamat datang di taman kerajaan</p>
          <h1 className="font-script text-7xl md:text-9xl text-gold-gradient drop-shadow-2xl">Arya & Kirana</h1>
          <p className="mt-4 font-display text-2xl italic">Sabtu, 12 Desember 2026</p>
        </div>
      </header>

      <Section>
        <Title kicker="Mempelai">Dua Hati, Satu Istana</Title>
        <div className="grid gap-10 md:grid-cols-2">
          {[
            ["Arya Mahendra", "Putra dari Bpk. Hadi & Ibu Ratna"],
            ["Kirana Ayudia", "Putri dari Bpk. Surya & Ibu Laksmi"],
          ].map(([n, p]) => (
            <Card key={n}>
              <div className="mx-auto mb-6 size-40 overflow-hidden rounded-full royal-frame">
                <img src={palace} alt="" loading="lazy" className="h-full w-full object-cover" />
              </div>
              <h3 className="font-script text-5xl text-burgundy">{n}</h3>
              <p className="mt-2 text-muted-foreground">{p}</p>
            </Card>
          ))}
        </div>
      </Section>

      <Section bg={pergola}>
        <Title kicker="Kisah Cinta">Perjalanan di Lorong Taman</Title>
        <ol className="relative mx-auto max-w-2xl border-l-2 border-gold pl-8">
          {[
            ["2019", "Pertemuan pertama", "Bertemu di sebuah pameran seni, berawal dari obrolan tentang lukisan taman."],
            ["2022", "Menjalin kasih", "Hari-hari indah dilalui bersama, saling menguatkan dalam setiap langkah."],
            ["2025", "Lamaran", "Di bawah pergola bunga, sebuah janji untuk selamanya diucapkan."],
          ].map(([yr, t, d]) => (
            <li key={yr} className="mb-10">
              <span className="absolute -left-[9px] mt-2 size-4 rounded-full bg-burgundy ring-4 ring-gold/40" />
              <p className="font-display text-gold-gradient text-2xl">{yr}</p>
              <h3 className="text-2xl text-navy">{t}</h3>
              <p className="text-muted-foreground">{d}</p>
            </li>
          ))}
        </ol>
      </Section>

      <Section>
        <Title kicker="Detail Acara">Perayaan di Taman Istana</Title>
        <div className="grid gap-10 md:grid-cols-2">
          {[
            ["Akad Nikah", "09.00 – 10.00 WIB"],
            ["Resepsi", "11.00 – 14.00 WIB"],
          ].map(([t, w]) => (
            <Card key={t}>
              <h3 className="text-4xl text-burgundy">{t}</h3>
              <p className="mt-3 font-display text-xl text-navy">Sabtu, 12 Desember 2026</p>
              <p className="text-muted-foreground">{w}</p>
              <p className="mt-3">Taman Istana Bunga, Jl. Mawar No. 1, Bandung</p>
              <a href="https://maps.google.com" target="_blank" rel="noreferrer" className="mt-6 inline-block rounded-full bg-secondary px-6 py-2 text-secondary-foreground">Lihat Peta</a>
            </Card>
          ))}
        </div>
      </Section>

      <Section bg={palace}>
        <Title kicker="Galeri">Kenangan di Taman</Title>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
          {[palace, pergola, gate, pergola, palace, gate].map((src, i) => (
            <div key={i} className={`royal-frame overflow-hidden rounded-t-[999px] shadow-royal ${i % 3 === 1 ? "md:translate-y-8" : ""}`}>
              <img src={src} alt={`Galeri ${i + 1}`} loading="lazy" className="aspect-[3/4] w-full object-cover transition duration-700 hover:scale-110" />
            </div>
          ))}
        </div>
      </Section>

      <Section>
        <Title kicker="Menuju Hari Bahagia">Hitung Mundur</Title>
        <div className="mx-auto max-w-2xl">
          <Countdown />
          <Card className="mt-14">
            <h3 className="mb-6 text-4xl text-navy">Konfirmasi Kehadiran</h3>
            <Rsvp />
          </Card>
        </div>
      </Section>

      <footer className="relative h-[90svh] overflow-hidden">
        <img src={pergola} alt="Taman istana saat senja" loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-navy/85 via-navy/30 to-background" />
        <Sparkles count={24} />
        <Corner className="-bottom-8 -left-8 -scale-y-100" />
        <Corner className="-bottom-8 -right-8 -scale-100" />
        <div className="relative flex h-full flex-col items-center justify-end pb-24 text-center text-ivory">
          <p className="max-w-md font-display text-xl italic">Merupakan kehormatan bagi kami apabila Anda berkenan hadir dan memberikan doa restu.</p>
          <p className="mt-6 font-script text-6xl text-gold-gradient">Arya & Kirana</p>
        </div>
      </footer>
    </main>
  );
}
