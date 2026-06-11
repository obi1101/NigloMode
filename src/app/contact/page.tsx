"use client";
import { useState } from "react";

const lucioles = [
  { top: "12%", left: "7%",  r: 3 }, { top: "30%", left: "87%", r: 2 },
  { top: "60%", left: "4%",  r: 2 }, { top: "74%", left: "91%", r: 3 },
  { top: "20%", left: "67%", r: 2 }, { top: "46%", left: "94%", r: 2 },
  { top: "83%", left: "19%", r: 2 }, { top: "7%",  left: "46%", r: 3 },
];

const sujets = ["Question générale", "Signaler un problème", "Proposer une idée", "Demande de partenariat", "Presse", "Autre"];

export default function ContactPage() {
  const [nom, setNom]     = useState("");
  const [email, setEmail] = useState("");
  const [sujet, setSujet] = useState("");
  const [msg, setMsg]     = useState("");
  const [sent, setSent]   = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSent(true);
  }

  return (
    <main>
      {/* ═══ HERO ═══ */}
      <section
        style={{ background: "linear-gradient(160deg, #060e08 0%, #1E3524 50%, #0a1508 100%)" }}
        className="relative text-white overflow-hidden px-6 py-20 text-center"
      >
        {lucioles.map((l, i) => (
          <div key={i} className="absolute rounded-full pointer-events-none"
            style={{ top: l.top, left: l.left, width: l.r * 2, height: l.r * 2, backgroundColor: "#D8B56A", boxShadow: `0 0 ${l.r * 3}px ${l.r * 2}px rgba(216,181,106,0.45)`, opacity: 0.65 }} />
        ))}
        <div className="relative z-10">
          <span style={{ fontSize: 52 }}>✉️</span>
          <h1 className="text-3xl font-extrabold mt-4" style={{ color: "#D8B56A", letterSpacing: 2 }}>NOUS CONTACTER</h1>
          <p className="mt-3 text-sm max-w-md mx-auto" style={{ color: "rgba(245,239,216,0.65)" }}>
            Une question, une idée, un signalement ? On lit tous les messages.
          </p>
        </div>
        <div className="absolute bottom-5 z-10 flex items-center gap-3 px-5 py-3 rounded-2xl"
          style={{ left: "50%", transform: "translateX(-50%)", backgroundColor: "rgba(6,14,8,0.45)", border: "1px solid rgba(216,181,106,0.45)", backdropFilter: "blur(4px)", whiteSpace: "nowrap" }}>
          <span style={{ fontSize: 20 }}>🦔</span>
          <p className="text-sm italic font-medium" style={{ color: "#F5EFD8" }}>
            Dicton du Niglo : &ldquo;Un message bien posé vaut mieux qu&apos;un long monologue.&rdquo;
          </p>
        </div>
      </section>

      {/* ═══ FORMULAIRE ═══ */}
      <section style={{ backgroundColor: "#F5EFD8" }} className="py-14 px-4">
        <div className="max-w-2xl mx-auto">
          {sent ? (
            <div className="rounded-3xl p-10 text-center" style={{ backgroundColor: "#EDE4C4", border: "1px solid #C4B898" }}>
              <span style={{ fontSize: 52 }}>✅</span>
              <h2 className="text-xl font-extrabold mt-4 mb-2" style={{ color: "#1E3524" }}>Message envoyé !</h2>
              <p className="text-sm" style={{ color: "#4F6B47" }}>On revient vers toi dès que possible. Merci pour ton message.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit}
              className="rounded-3xl p-8 flex flex-col gap-5"
              style={{ backgroundColor: "#EDE4C4", border: "1px solid #C4B898" }}>
              <h2 className="text-lg font-extrabold mb-1" style={{ color: "#1E3524" }}>Envoyer un message</h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-semibold mb-1.5" style={{ color: "#4F6B47" }}>Ton prénom / pseudo</label>
                  <input type="text" value={nom} onChange={e => setNom(e.target.value)} required
                    className="w-full px-4 py-3 rounded-xl text-sm outline-none"
                    style={{ backgroundColor: "#F5EFD8", border: "1px solid #C4B898", color: "#1E3524" }}
                    placeholder="Niglo du Terrier" />
                </div>
                <div>
                  <label className="block text-xs font-semibold mb-1.5" style={{ color: "#4F6B47" }}>Adresse e-mail</label>
                  <input type="email" value={email} onChange={e => setEmail(e.target.value)} required
                    className="w-full px-4 py-3 rounded-xl text-sm outline-none"
                    style={{ backgroundColor: "#F5EFD8", border: "1px solid #C4B898", color: "#1E3524" }}
                    placeholder="niglo@terrier.fr" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold mb-1.5" style={{ color: "#4F6B47" }}>Sujet</label>
                <select value={sujet} onChange={e => setSujet(e.target.value)} required
                  className="w-full px-4 py-3 rounded-xl text-sm outline-none"
                  style={{ backgroundColor: "#F5EFD8", border: "1px solid #C4B898", color: sujet ? "#1E3524" : "#9ca3af" }}>
                  <option value="">Choisir un sujet…</option>
                  {sujets.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold mb-1.5" style={{ color: "#4F6B47" }}>Message</label>
                <textarea value={msg} onChange={e => setMsg(e.target.value)} required rows={5}
                  className="w-full px-4 py-3 rounded-xl text-sm outline-none resize-none"
                  style={{ backgroundColor: "#F5EFD8", border: "1px solid #C4B898", color: "#1E3524" }}
                  placeholder="Ton message…" />
              </div>

              <button type="submit"
                className="w-full py-3 rounded-xl font-bold text-sm transition-opacity hover:opacity-85"
                style={{ backgroundColor: "#1E3524", color: "#D8B56A" }}>
                Envoyer le message ✉️
              </button>
            </form>
          )}
        </div>
      </section>
    </main>
  );
}
