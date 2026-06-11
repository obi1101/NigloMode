"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

const sectionsLinks = [
  { icon: "🤲", label: "Entraide",          href: "/entraide" },
  { icon: "🛒", label: "Circuits Courts",   href: "/circuits-courts" },
  { icon: "🌱", label: "Produire",          href: "/produire-cultiver" },
  { icon: "♻️", label: "Les 3R",            href: "/reemploi-ressources" },
  { icon: "🤝", label: "Initiatives",       href: "/initiatives-projets" },
  { icon: "🛠️", label: "Savoir-faire",      href: "/savoir-faire-transmission" },
  { icon: "📋", label: "Ressources Admin",  href: "/ressources-administratives" },
];

const allMobileLinks = [
  { label: "Accueil",   href: "/" },
  { label: "Terriers",  href: "/terriers" },
  { label: "Forum",     href: "/forum" },
  ...sectionsLinks.map((s) => ({ label: s.label, href: s.href })),
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const stored = localStorage.getItem("niglomode_profil");
    if (stored) {
      const p = JSON.parse(stored);
      setLoggedIn(!!(p.pseudo && p.ville));
    }
  }, []);

  return (
    <nav style={{ backgroundColor: "#09120a" }} className="text-white shadow-lg relative z-50">

      {/* ── Barre principale ── */}
      <div className="max-w-7xl mx-auto px-4 py-2.5 flex items-center justify-between">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-3" onClick={() => setMenuOpen(false)}>
          <Image src="/logo.png" alt="NIGLOMODE" width={42} height={42} className="rounded-full bg-white/10 p-0.5" />
          <div className="flex flex-col leading-tight">
            <span className="font-bold text-sm tracking-widest" style={{ color: "#d4a820" }}>NIGLOMODE</span>
            <span className="text-xs tracking-wider" style={{ color: "rgba(255,255,255,0.45)", fontSize: 9 }}>COMMUNAUTÉ D&apos;ENTRAIDE</span>
          </div>
        </Link>

        {/* Liens desktop principal */}
        <div className="hidden lg:flex items-center gap-6 text-sm">
          {[{ label: "Accueil", href: "/" }, { label: "Terriers", href: "/terriers" }, { label: "Forum", href: "/forum" }].map((s) => (
            <Link key={s.href} href={s.href}
              className="transition-opacity hover:opacity-100"
              style={{ opacity: pathname === s.href ? 1 : 0.65, color: pathname === s.href ? "#D8B56A" : "white" }}>
              {s.label}
            </Link>
          ))}
        </div>

        {/* Boutons auth desktop */}
        <div className="hidden lg:flex items-center gap-2">
          {loggedIn ? (
            <>
              <Link href="/messagerie"
                className="text-sm px-4 py-1.5 rounded-full border transition-colors hover:border-white/60 flex items-center gap-1.5"
                style={{ borderColor: "rgba(255,255,255,0.20)", color: "rgba(255,255,255,0.65)" }}>
                💬 Messages
              </Link>
              <Link href="/profil"
                className="text-sm px-4 py-1.5 rounded-full border transition-colors hover:border-white/60"
                style={{ borderColor: "rgba(255,255,255,0.30)", color: "rgba(255,255,255,0.85)" }}>
                🦔 Mon profil
              </Link>
            </>
          ) : (
            <>
              <Link href="/connexion"
                className="text-sm px-4 py-1.5 rounded-full border transition-colors hover:border-white/60"
                style={{ borderColor: "rgba(255,255,255,0.25)", color: "rgba(255,255,255,0.70)" }}>
                Se connecter
              </Link>
              <Link href="/inscription"
                className="text-sm px-5 py-1.5 rounded-full font-semibold transition-opacity hover:opacity-90"
                style={{ backgroundColor: "#D8B56A", color: "#1E3524" }}>
                Créer un compte
              </Link>
            </>
          )}
        </div>

        {/* Burger mobile */}
        <button className="lg:hidden flex flex-col gap-1.5 p-1" onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu">
          <span className="block w-6 h-0.5 bg-white" />
          <span className="block w-6 h-0.5 bg-white" />
          <span className="block w-6 h-0.5 bg-white" />
        </button>
      </div>

      {/* ── Barre secondaire sections (desktop) ── */}
      <div className="hidden lg:block border-t" style={{ borderColor: "rgba(216,181,106,0.12)", backgroundColor: "#0a1a0d" }}>
        <div className="max-w-7xl mx-auto px-4 flex items-center gap-1">
          {sectionsLinks.map((s) => {
            const active = pathname.startsWith(s.href);
            return (
              <Link key={s.href} href={s.href}
                className="flex items-center gap-2 px-4 py-2.5 text-sm transition-all whitespace-nowrap relative"
                style={{ color: active ? "#D8B56A" : "rgba(255,255,255,0.55)" }}>
                <span style={{ fontSize: 15 }}>{s.icon}</span>
                <span className="font-medium">{s.label}</span>
                {active && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 rounded-t-full" style={{ backgroundColor: "#D8B56A" }} />
                )}
              </Link>
            );
          })}
        </div>
      </div>

      {/* ── Barre secondaire sections (mobile — scroll horizontal) ── */}
      <div className="lg:hidden border-t overflow-x-auto" style={{ borderColor: "rgba(216,181,106,0.12)", backgroundColor: "#0a1a0d", scrollbarWidth: "none" }}>
        <div className="flex items-center gap-1 px-2 py-1" style={{ minWidth: "max-content" }}>
          {sectionsLinks.map((s) => {
            const active = pathname.startsWith(s.href);
            return (
              <Link key={s.href} href={s.href} onClick={() => setMenuOpen(false)}
                className="flex items-center gap-1.5 px-3 py-2 text-xs transition-all whitespace-nowrap relative"
                style={{ color: active ? "#D8B56A" : "rgba(255,255,255,0.55)" }}>
                <span style={{ fontSize: 13 }}>{s.icon}</span>
                <span className="font-medium">{s.label}</span>
                {active && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 rounded-t-full" style={{ backgroundColor: "#D8B56A" }} />
                )}
              </Link>
            );
          })}
        </div>
      </div>

      {/* ── Menu burger mobile ── */}
      {menuOpen && (
        <div className="lg:hidden px-4 pb-4 flex flex-col gap-3 text-sm border-t border-white/10" style={{ backgroundColor: "#09120a" }}>
          {allMobileLinks.map((s) => (
            <Link key={s.href} href={s.href} className="opacity-70 hover:opacity-100 py-1" onClick={() => setMenuOpen(false)}>
              {s.label}
            </Link>
          ))}
          <hr className="border-white/15" />
          {loggedIn ? (
            <>
              <Link href="/messagerie" className="opacity-70" onClick={() => setMenuOpen(false)}>💬 Messages</Link>
              <Link href="/profil" className="opacity-70" onClick={() => setMenuOpen(false)}>🦔 Mon profil</Link>
            </>
          ) : (
            <>
              <Link href="/connexion" className="opacity-70" onClick={() => setMenuOpen(false)}>Se connecter</Link>
              <Link href="/inscription" className="px-4 py-2 rounded-full font-semibold text-center"
                style={{ backgroundColor: "#D8B56A", color: "#1E3524" }} onClick={() => setMenuOpen(false)}>
                Créer un compte
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
}
