"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

const topLinks = [
  { label: "Accueil",  href: "/" },
  { label: "Terriers", href: "/terriers" },
];

const sectionsLinks = [
  { icon: "🤲", label: "Entraide",                     href: "/entraide" },
  { icon: "🛒", label: "Circuits Courts",              href: "/circuits-courts" },
  { icon: "🌱", label: "Produire & Cultiver",           href: "/produire-cultiver" },
  { icon: "♻️", label: "Les 3R du teRRieR",             href: "/reemploi-ressources" },
  { icon: "🤝", label: "Initiatives & Projets",         href: "/initiatives-projets" },
  { icon: "🛠️", label: "Savoir-faire & Transmission",  href: "/savoir-faire-transmission" },
  { icon: "📋", label: "Ressources Administratives",    href: "/ressources-administratives" },
];

const allMobileLinks = [
  { label: "Accueil",                    href: "/" },
  { label: "Terriers",                   href: "/terriers" },
  { label: "Entraide",                   href: "/entraide" },
  { label: "Circuits Courts",            href: "/circuits-courts" },
  { label: "Produire & Cultiver",        href: "/produire-cultiver" },
  { label: "Les 3R du teRRieR",          href: "/reemploi-ressources" },
  { label: "Initiatives & Projets",      href: "/initiatives-projets" },
  { label: "Savoir-faire & Transmission",  href: "/savoir-faire-transmission" },
  { label: "Ressources Administratives",   href: "/ressources-administratives" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen]       = useState(false);
  const [sectionsOpen, setSectionsOpen] = useState(false);

  return (
    <nav style={{ backgroundColor: "#09120a" }} className="text-white shadow-lg relative z-50">
      <div className="max-w-7xl mx-auto px-4 py-2.5 flex items-center justify-between">

        {/* Logo + titre */}
        <Link href="/" className="flex items-center gap-3" onClick={() => setMenuOpen(false)}>
          <Image src="/logo.png" alt="NIGLOMODE" width={42} height={42} className="rounded-full bg-white/10 p-0.5" />
          <div className="flex flex-col leading-tight">
            <span className="font-bold text-sm tracking-widest" style={{ color: "#d4a820" }}>NIGLOMODE</span>
            <span className="text-xs tracking-wider" style={{ color: "rgba(255,255,255,0.45)", fontSize: 9 }}>COMMUNAUTÉ D&apos;ENTRAIDE</span>
          </div>
        </Link>

        {/* Liens desktop */}
        <div className="hidden lg:flex items-center gap-6 text-sm">
          {topLinks.map((s) => (
            <Link key={s.href} href={s.href} className="opacity-70 hover:opacity-100 transition-opacity">
              {s.label}
            </Link>
          ))}

          {/* Dropdown Sections */}
          <div className="relative">
            <button
              onClick={() => setSectionsOpen(!sectionsOpen)}
              className="flex items-center gap-1.5 opacity-70 hover:opacity-100 transition-opacity text-sm"
            >
              Sections
              <span style={{ fontSize: 10, opacity: 0.7, marginTop: 1 }}>{sectionsOpen ? "▲" : "▼"}</span>
            </button>
            {sectionsOpen && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setSectionsOpen(false)} />
                <div
                  className="absolute left-0 top-full mt-2 rounded-xl overflow-hidden z-50 min-w-[230px]"
                  style={{ backgroundColor: "#0d1c10", border: "1px solid rgba(216,181,106,0.20)", boxShadow: "0 8px 32px rgba(0,0,0,0.5)" }}
                >
                  {sectionsLinks.map((s) => (
                    <Link
                      key={s.href}
                      href={s.href}
                      onClick={() => setSectionsOpen(false)}
                      className="flex items-center gap-3 px-4 py-3 text-sm transition-colors hover:bg-white/5"
                      style={{ color: "rgba(255,255,255,0.75)", borderBottom: "1px solid rgba(255,255,255,0.05)" }}
                    >
                      <span style={{ fontSize: 16 }}>{s.icon}</span>
                      <span>{s.label}</span>
                    </Link>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>

        {/* Boutons desktop */}
        <div className="hidden lg:flex items-center gap-3">
          <Link
            href="/messagerie"
            className="text-sm px-4 py-1.5 rounded-full border transition-colors hover:border-white/60 flex items-center gap-1.5"
            style={{ borderColor: "rgba(255,255,255,0.20)", color: "rgba(255,255,255,0.65)" }}
          >
            💬 Messages
          </Link>
          <Link
            href="/profil"
            className="text-sm px-4 py-1.5 rounded-full border transition-colors hover:border-white/60 flex items-center gap-1.5"
            style={{ borderColor: "rgba(255,255,255,0.30)", color: "rgba(255,255,255,0.80)" }}
          >
            🦔 Mon profil
          </Link>
          <Link
            href="/inscription"
            className="text-sm px-5 py-1.5 rounded-full font-semibold transition-opacity hover:opacity-90"
            style={{ backgroundColor: "#2D6A4F", color: "white" }}
          >
            Rejoindre le terrier
          </Link>
        </div>

        {/* Burger mobile */}
        <button className="lg:hidden flex flex-col gap-1.5 p-1" onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu">
          <span className="block w-6 h-0.5 bg-white" />
          <span className="block w-6 h-0.5 bg-white" />
          <span className="block w-6 h-0.5 bg-white" />
        </button>
      </div>

      {/* Menu mobile */}
      {menuOpen && (
        <div className="lg:hidden px-4 pb-4 flex flex-col gap-3 text-sm border-t border-white/10" style={{ backgroundColor: "#09120a" }}>
          {allMobileLinks.map((s) => (
            <Link key={s.href} href={s.href} className="opacity-70 hover:opacity-100 py-1" onClick={() => setMenuOpen(false)}>
              {s.label}
            </Link>
          ))}
          <hr className="border-white/15" />
          <Link href="/messagerie" className="opacity-70" onClick={() => setMenuOpen(false)}>💬 Messages</Link>
          <Link href="/profil" className="opacity-70" onClick={() => setMenuOpen(false)}>🦔 Mon profil</Link>
          <Link
            href="/inscription"
            className="px-4 py-2 rounded-full font-semibold text-center"
            style={{ backgroundColor: "#2D6A4F", color: "white" }}
            onClick={() => setMenuOpen(false)}
          >
            Rejoindre le terrier
          </Link>
        </div>
      )}
    </nav>
  );
}
