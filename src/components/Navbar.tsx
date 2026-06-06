"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

const navLinks = [
  { label: "Accueil", href: "/" },
  { label: "Terriers", href: "/terriers" },
  { label: "Entraide", href: "/entraide" },
  { label: "Projets", href: "/projets" },
  { label: "Communauté", href: "/communaute" },
  { label: "À propos", href: "/a-propos" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav style={{ backgroundColor: "#09120a" }} className="text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 py-2.5 flex items-center justify-between">

        {/* Logo + titre */}
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/logo.png"
            alt="NIGLOMODE"
            width={42}
            height={42}
            className="rounded-full bg-white/10 p-0.5"
          />
          <div className="flex flex-col leading-tight">
            <span className="font-bold text-sm tracking-widest" style={{ color: "#d4a820" }}>
              NIGLOMODE
            </span>
            <span className="text-xs tracking-wider" style={{ color: "rgba(255,255,255,0.45)", fontSize: 9 }}>
              COMMUNAUTÉ D&apos;ENTRAIDE
            </span>
          </div>
        </Link>

        {/* Liens desktop */}
        <div className="hidden lg:flex items-center gap-7 text-sm">
          {navLinks.map((s) => (
            <Link
              key={s.href}
              href={s.href}
              className="opacity-70 hover:opacity-100 transition-opacity"
            >
              {s.label}
            </Link>
          ))}
        </div>

        {/* Boutons desktop */}
        <div className="hidden lg:flex items-center gap-3">
          <Link
            href="/connexion"
            className="text-sm px-4 py-1.5 rounded-full border transition-colors hover:border-white/60"
            style={{ borderColor: "rgba(255,255,255,0.30)", color: "rgba(255,255,255,0.80)" }}
          >
            Connexion
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
        <button
          className="lg:hidden flex flex-col gap-1.5 p-1"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menu"
        >
          <span className="block w-6 h-0.5 bg-white" />
          <span className="block w-6 h-0.5 bg-white" />
          <span className="block w-6 h-0.5 bg-white" />
        </button>
      </div>

      {/* Menu mobile */}
      {menuOpen && (
        <div
          className="lg:hidden px-4 pb-4 flex flex-col gap-3 text-sm border-t border-white/10"
          style={{ backgroundColor: "#09120a" }}
        >
          {navLinks.map((s) => (
            <Link
              key={s.href}
              href={s.href}
              className="opacity-70 hover:opacity-100 py-1"
              onClick={() => setMenuOpen(false)}
            >
              {s.label}
            </Link>
          ))}
          <hr className="border-white/15" />
          <Link href="/connexion" className="opacity-70">Connexion</Link>
          <Link
            href="/inscription"
            className="px-4 py-2 rounded-full font-semibold text-center"
            style={{ backgroundColor: "#2D6A4F", color: "white" }}
          >
            Rejoindre le terrier
          </Link>
        </div>
      )}
    </nav>
  );
}
