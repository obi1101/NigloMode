"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function ConnexionPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [mdp, setMdp] = useState("");
  const [sent, setSent] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSent(true);
    setTimeout(() => router.push("/profil"), 1200);
  }

  const lucioles = [
    { top: "10%", left: "8%", r: 3 }, { top: "28%", left: "88%", r: 2 },
    { top: "58%", left: "4%", r: 2 }, { top: "72%", left: "92%", r: 3 },
    { top: "18%", left: "68%", r: 2 }, { top: "44%", left: "95%", r: 2 },
    { top: "80%", left: "18%", r: 2 }, { top: "6%",  left: "48%", r: 3 },
  ];

  return (
    <main
      style={{ background: "linear-gradient(160deg, #060e08 0%, #1E3524 50%, #0a1508 100%)", minHeight: "100vh" }}
      className="relative flex items-center justify-center px-4 py-20"
    >
      {lucioles.map((l, i) => (
        <div key={i} className="absolute rounded-full pointer-events-none"
          style={{ top: l.top, left: l.left, width: l.r * 2, height: l.r * 2, backgroundColor: "#D8B56A", boxShadow: `0 0 ${l.r * 3}px ${l.r * 2}px rgba(216,181,106,0.45)`, opacity: 0.6 }} />
      ))}

      <div className="relative z-10 w-full max-w-md">
        <div className="text-center mb-8">
          <span style={{ fontSize: 52 }}>🦔</span>
          <h1 className="text-3xl font-extrabold mt-3" style={{ color: "#D8B56A", letterSpacing: 2 }}>CONNEXION</h1>
          <p className="mt-2 text-sm" style={{ color: "rgba(245,239,216,0.60)" }}>Retrouve ton Terrier</p>
        </div>

        <form onSubmit={handleSubmit}
          className="rounded-3xl p-8 flex flex-col gap-5"
          style={{ backgroundColor: "rgba(0,0,0,0.35)", border: "1px solid rgba(216,181,106,0.25)" }}>

          <div>
            <label className="block text-xs font-semibold mb-1.5" style={{ color: "rgba(245,239,216,0.7)" }}>Adresse e-mail</label>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} required
              className="w-full px-4 py-3 rounded-xl text-sm outline-none"
              style={{ backgroundColor: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.15)", color: "#F5EFD8" }}
              placeholder="niglo@terrier.fr" />
          </div>

          <div>
            <label className="block text-xs font-semibold mb-1.5" style={{ color: "rgba(245,239,216,0.7)" }}>Mot de passe</label>
            <input type="password" value={mdp} onChange={e => setMdp(e.target.value)} required
              className="w-full px-4 py-3 rounded-xl text-sm outline-none"
              style={{ backgroundColor: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.15)", color: "#F5EFD8" }}
              placeholder="••••••••" />
            <p className="text-xs mt-1.5 text-right">
              <Link href="#" className="underline" style={{ color: "rgba(216,181,106,0.65)" }}>Mot de passe oublié ?</Link>
            </p>
          </div>

          <button type="submit"
            className="w-full py-3 rounded-xl font-bold text-sm mt-1 transition-opacity hover:opacity-85"
            style={{ backgroundColor: sent ? "#4F6B47" : "#D8B56A", color: "#1E3524" }}>
            {sent ? "✓ Connexion en cours…" : "Se connecter"}
          </button>
        </form>

        <p className="text-center text-sm mt-6" style={{ color: "rgba(245,239,216,0.50)" }}>
          Pas encore membre ?{" "}
          <Link href="/inscription" className="font-bold underline" style={{ color: "#D8B56A" }}>Créer un compte</Link>
        </p>
      </div>
    </main>
  );
}
