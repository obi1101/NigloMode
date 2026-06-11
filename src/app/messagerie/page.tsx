"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";

type Message = { id: number; from: string; text: string; time: string; mine: boolean };
type Conversation = { id: number; pseudo: string; initials: string; lastMsg: string; time: string; unread: number; color: string };

const initConversations: Conversation[] = [
  { id: 1, pseudo: "Marie_Forêt", initials: "MF", lastMsg: "Oui je peux passer samedi matin !", time: "10h32", unread: 2, color: "#4F6B47" },
  { id: 2, pseudo: "TerreEtBois", initials: "TB", lastMsg: "J'ai encore 3 plants de tomates à donner", time: "hier", unread: 0, color: "#6B4F34" },
  { id: 3, pseudo: "NicoRepare", initials: "NR", lastMsg: "Merci pour le coup de main !", time: "hier", unread: 0, color: "#1E3524" },
  { id: 4, pseudo: "SophieAiguille", initials: "SA", lastMsg: "On se retrouve à l'atelier ?", time: "lun.", unread: 1, color: "#8B6F47" },
  { id: 5, pseudo: "PaulCompost", initials: "PC", lastMsg: "Le bac est dispo dès demain", time: "dim.", unread: 0, color: "#4A7C59" },
];

const initMessages: Record<number, Message[]> = {
  1: [
    { id: 1, from: "Marie_Forêt", text: "Bonjour ! J'ai vu ton annonce pour emprunter une perceuse ?", time: "10h15", mine: false },
    { id: 2, from: "moi", text: "Oui ! J'en ai besoin juste pour un week-end, pour des étagères", time: "10h20", mine: true },
    { id: 3, from: "Marie_Forêt", text: "Pas de souci, je l'ai avec tous les forets. Tu passes quand ?", time: "10h28", mine: false },
    { id: 4, from: "Marie_Forêt", text: "Oui je peux passer samedi matin !", time: "10h32", mine: false },
  ],
  2: [
    { id: 1, from: "TerreEtBois", text: "Salut ! J'ai encore 3 plants de tomates à donner si t'es intéressé", time: "hier", mine: false },
  ],
  3: [
    { id: 1, from: "moi", text: "Merci encore pour l'aide avec le vélo, vraiment sympa !", time: "hier", mine: true },
    { id: 2, from: "NicoRepare", text: "Merci pour le coup de main !", time: "hier", mine: false },
  ],
  4: [
    { id: 1, from: "SophieAiguille", text: "On se retrouve à l'atelier couture ?", time: "lun.", mine: false },
  ],
  5: [
    { id: 1, from: "PaulCompost", text: "Le bac à compost est dispo dès demain si tu veux le récupérer", time: "dim.", mine: false },
    { id: 2, from: "moi", text: "Super, je passe en fin de journée !", time: "dim.", mine: true },
  ],
};

const lucioles = Array.from({ length: 10 }, (_, i) => ({
  id: i, top: `${10 + (i * 41) % 75}%`, left: `${5 + (i * 67) % 88}%`,
  size: 2 + (i % 3), opacity: 0.2 + (i % 4) * 0.08,
}));

export default function MessageriePage() {
  const [conversations, setConversations] = useState<Conversation[]>(initConversations);
  const [messages, setMessages] = useState<Record<number, Message[]>>(initMessages);
  const [activeId, setActiveId] = useState<number | null>(null);
  const [input, setInput] = useState("");
  const [profil, setProfil] = useState<{ pseudo: string } | null>(null);
  const [mobileShowThread, setMobileShowThread] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const stored = localStorage.getItem("niglomode_profil");
    if (stored) setProfil(JSON.parse(stored));
    const savedConvs = localStorage.getItem("niglomode_convs");
    const savedMsgs = localStorage.getItem("niglomode_msgs");
    if (savedConvs) setConversations(JSON.parse(savedConvs));
    if (savedMsgs) setMessages(JSON.parse(savedMsgs));
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [activeId, messages]);

  const openConv = (id: number) => {
    setActiveId(id);
    setMobileShowThread(true);
    const updated = conversations.map((c) => c.id === id ? { ...c, unread: 0 } : c);
    setConversations(updated);
    localStorage.setItem("niglomode_convs", JSON.stringify(updated));
  };

  const sendMessage = () => {
    if (!input.trim() || activeId === null) return;
    const now = new Date();
    const time = `${now.getHours()}h${String(now.getMinutes()).padStart(2, "0")}`;
    const newMsg: Message = { id: Date.now(), from: "moi", text: input.trim(), time, mine: true };
    const updatedMsgs = { ...messages, [activeId]: [...(messages[activeId] || []), newMsg] };
    const updatedConvs = conversations.map((c) => c.id === activeId ? { ...c, lastMsg: input.trim(), time } : c);
    setMessages(updatedMsgs);
    setConversations(updatedConvs);
    localStorage.setItem("niglomode_msgs", JSON.stringify(updatedMsgs));
    localStorage.setItem("niglomode_convs", JSON.stringify(updatedConvs));
    setInput("");
  };

  const activeConv = conversations.find((c) => c.id === activeId);
  const activeMessages = activeId !== null ? (messages[activeId] || []) : [];
  const totalUnread = conversations.reduce((s, c) => s + c.unread, 0);

  return (
    <div style={{ background: "linear-gradient(160deg, #060e08 0%, #1E3524 50%, #0a1508 100%)", minHeight: "100vh" }} className="relative flex flex-col">
      {lucioles.map((l) => (
        <div key={l.id} className="absolute rounded-full pointer-events-none"
          style={{ top: l.top, left: l.left, width: l.size, height: l.size, backgroundColor: "#D8B56A", opacity: l.opacity, boxShadow: `0 0 ${l.size * 2}px #D8B56A` }} />
      ))}

      {/* Header */}
      <div className="relative z-10 px-4 py-5 border-b" style={{ borderColor: "rgba(196,184,152,0.15)" }}>
        <div className="max-w-5xl mx-auto flex items-center gap-3">
          {mobileShowThread && activeConv ? (
            <button onClick={() => setMobileShowThread(false)} className="lg:hidden mr-1"
              style={{ color: "rgba(245,239,216,0.6)" }}>← Retour</button>
          ) : null}
          <div>
            <p className="text-xs tracking-widest uppercase" style={{ color: "rgba(216,181,106,0.55)" }}>NIGLOMODE</p>
            <h1 className="text-lg font-extrabold" style={{ color: "#F5EFD8" }}>
              Messagerie du Terrier
              {totalUnread > 0 && (
                <span className="ml-2 text-xs px-2 py-0.5 rounded-full font-bold" style={{ backgroundColor: "#D8B56A", color: "#1E3524" }}>
                  {totalUnread}
                </span>
              )}
            </h1>
          </div>
          <div className="ml-auto flex items-center gap-3">
            <Link href="/profil" className="text-sm" style={{ color: "rgba(245,239,216,0.5)" }}>👤 {profil?.pseudo || "Mon profil"}</Link>
          </div>
        </div>
      </div>

      {/* Corps */}
      <div className="relative z-10 flex-1 max-w-5xl mx-auto w-full flex overflow-hidden" style={{ maxHeight: "calc(100vh - 120px)" }}>

        {/* Liste des conversations */}
        <div className={`${mobileShowThread ? "hidden lg:flex" : "flex"} flex-col w-full lg:w-80 flex-shrink-0 border-r overflow-y-auto`}
          style={{ borderColor: "rgba(196,184,152,0.15)" }}>
          {conversations.map((c) => (
            <button key={c.id} onClick={() => openConv(c.id)}
              className="flex items-center gap-3 px-4 py-4 text-left transition-colors border-b w-full"
              style={{
                backgroundColor: activeId === c.id ? "rgba(216,181,106,0.12)" : "transparent",
                borderColor: "rgba(196,184,152,0.10)",
              }}>
              <div className="w-11 h-11 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0"
                style={{ backgroundColor: c.color, color: "#F5EFD8" }}>
                {c.initials}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <p className="font-semibold text-sm truncate" style={{ color: "#F5EFD8" }}>{c.pseudo}</p>
                  <span className="text-xs flex-shrink-0" style={{ color: "rgba(245,239,216,0.35)" }}>{c.time}</span>
                </div>
                <p className="text-xs truncate mt-0.5" style={{ color: "rgba(245,239,216,0.45)" }}>{c.lastMsg}</p>
              </div>
              {c.unread > 0 && (
                <span className="w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0"
                  style={{ backgroundColor: "#D8B56A", color: "#1E3524" }}>{c.unread}</span>
              )}
            </button>
          ))}

          <div className="p-4 mt-auto">
            <Link href="/annuaire"
              className="block text-center text-xs py-2.5 rounded-xl transition-opacity hover:opacity-80"
              style={{ backgroundColor: "rgba(216,181,106,0.12)", color: "#D8B56A", border: "1px solid rgba(216,181,106,0.2)" }}>
              + Nouveau message via l&apos;Annuaire
            </Link>
          </div>
        </div>

        {/* Thread de messages */}
        <div className={`${mobileShowThread || activeId !== null ? "flex" : "hidden lg:flex"} flex-1 flex-col overflow-hidden`}>
          {activeConv ? (
            <>
              {/* Header thread */}
              <div className="px-5 py-3 border-b flex items-center gap-3 flex-shrink-0"
                style={{ borderColor: "rgba(196,184,152,0.15)", backgroundColor: "rgba(0,0,0,0.15)" }}>
                <div className="w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm"
                  style={{ backgroundColor: activeConv.color, color: "#F5EFD8" }}>
                  {activeConv.initials}
                </div>
                <div>
                  <p className="font-semibold text-sm" style={{ color: "#F5EFD8" }}>{activeConv.pseudo}</p>
                  <p className="text-xs" style={{ color: "rgba(245,239,216,0.4)" }}>Membre du Terrier</p>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-3">
                {activeMessages.map((msg) => (
                  <div key={msg.id} className={`flex ${msg.mine ? "justify-end" : "justify-start"}`}>
                    <div className="max-w-[72%]">
                      <div className="px-4 py-2.5 rounded-2xl text-sm"
                        style={{
                          backgroundColor: msg.mine ? "#1E3524" : "rgba(245,239,216,0.95)",
                          color: msg.mine ? "#F5EFD8" : "#1E3524",
                          border: msg.mine ? "1px solid rgba(216,181,106,0.3)" : "1px solid #C4B898",
                          borderBottomRightRadius: msg.mine ? 4 : 16,
                          borderBottomLeftRadius: msg.mine ? 16 : 4,
                        }}>
                        {msg.text}
                      </div>
                      <p className={`text-xs mt-1 ${msg.mine ? "text-right" : "text-left"}`}
                        style={{ color: "rgba(245,239,216,0.3)" }}>{msg.time}</p>
                    </div>
                  </div>
                ))}
                <div ref={bottomRef} />
              </div>

              {/* Saisie */}
              <div className="px-4 py-3 border-t flex gap-3 flex-shrink-0"
                style={{ borderColor: "rgba(196,184,152,0.15)", backgroundColor: "rgba(0,0,0,0.2)" }}>
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && (e.preventDefault(), sendMessage())}
                  placeholder="Écrire un message..."
                  className="flex-1 px-4 py-2.5 rounded-xl text-sm outline-none"
                  style={{ backgroundColor: "rgba(245,239,216,0.10)", color: "#F5EFD8", border: "1px solid rgba(196,184,152,0.2)" }}
                />
                <button onClick={sendMessage} disabled={!input.trim()}
                  className="px-4 py-2.5 rounded-xl font-semibold text-sm transition-opacity disabled:opacity-30"
                  style={{ backgroundColor: "#D8B56A", color: "#1E3524" }}>
                  Envoyer
                </button>
              </div>
            </>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center gap-3 px-8 text-center">
              <span style={{ fontSize: 48 }}>💬</span>
              <p className="font-bold text-base" style={{ color: "#F5EFD8" }}>Tes messages du Terrier</p>
              <p className="text-sm" style={{ color: "rgba(245,239,216,0.45)" }}>
                Sélectionne une conversation à gauche ou contacte un membre depuis l&apos;Annuaire.
              </p>
              <Link href="/annuaire"
                className="mt-2 px-6 py-2.5 rounded-xl text-sm font-semibold transition-opacity hover:opacity-80"
                style={{ backgroundColor: "#D8B56A", color: "#1E3524" }}>
                Voir l&apos;Annuaire →
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
