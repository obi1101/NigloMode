export default function PreviewFonds() {
  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <h1 className="text-3xl font-bold text-center mb-2 text-yellow-400">Aperçu des fonds visuels — Entraide</h1>
      <p className="text-center text-gray-300 mb-10 text-sm">
        Image : <em>deux hérissons NIGLOMODE Entraide</em> — fond sombre + filigrane crème à 45%
      </p>

      {/* Banque de Talents — navy + filigrane entraide 37% */}
      <section className="mb-8">
        <h2 className="text-xl font-bold mb-4 text-center text-yellow-300">🎓 Banque de Talents — navy + filigrane hérissons 37%</h2>
        <div className="relative rounded-2xl overflow-hidden bg-[#1A2562]">
          <div
            className="absolute inset-0 bg-center bg-no-repeat bg-contain"
            style={{
              backgroundImage: "url('/entraide-fond.png')",
              backgroundSize: "400px",
              opacity: 0.37,
            }}
          />
          <div className="relative z-10 p-10 text-center">
            <h3 className="text-2xl font-bold mb-2">🎓 Banque de Talents</h3>
            <p className="text-gray-200 mb-6 max-w-xl mx-auto">Des membres prêts à partager leurs compétences avec le terrier. Couture, informatique, jardinage, cuisine…</p>
            <div className="grid grid-cols-3 gap-4 max-w-2xl mx-auto">
              {["Marie — Couture", "Paul — Informatique", "Léa — Jardinage"].map((t) => (
                <div key={t} className="bg-white/10 rounded-xl p-4 text-sm">
                  <div className="w-10 h-10 bg-yellow-400 rounded-full mx-auto mb-2" />
                  {t}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Section crème — logo officiel filigrane 37% */}
      <section className="mb-8">
        <h2 className="text-xl font-bold mb-4 text-center text-yellow-300">Section crème — logo officiel NIGLOMODE filigrane 37%</h2>
        <div className="relative rounded-2xl overflow-hidden bg-[#f0ede4]">
          <div
            className="absolute inset-0 bg-center bg-no-repeat bg-contain"
            style={{
              backgroundImage: "url('/logo.png')",
              backgroundSize: "400px",
              opacity: 0.37,
            }}
          />
          <div className="relative z-10 p-8 text-center text-gray-700">
            <h3 className="text-xl font-bold mb-2">🛠 Coup de main</h3>
            <p className="text-sm text-gray-500 mb-4">Bricolage, jardinage, informatique, couture…</p>
            <div className="grid grid-cols-2 gap-3 max-w-md mx-auto text-sm">
              <div className="bg-white rounded-lg p-3 shadow-sm">
                <div className="font-semibold">Réparation vélo</div>
                <div className="text-gray-400 text-xs mt-1">Jean-Pierre • Limoges</div>
              </div>
              <div className="bg-white rounded-lg p-3 shadow-sm">
                <div className="font-semibold">Aide jardinage</div>
                <div className="text-gray-400 text-xs mt-1">Sophie • Bordeaux</div>
              </div>
              <div className="bg-white rounded-lg p-3 shadow-sm">
                <div className="font-semibold">Dépannage PC</div>
                <div className="text-gray-400 text-xs mt-1">Marco • Lyon</div>
              </div>
              <div className="bg-white rounded-lg p-3 shadow-sm">
                <div className="font-semibold">Couture retouche</div>
                <div className="text-gray-400 text-xs mt-1">Fatima • Toulouse</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Vue combinée verticale simulant la vraie page */}
      <section className="mb-4">
        <h2 className="text-xl font-bold mb-4 text-center text-yellow-300">Vue combinée — simulation page Entraide</h2>

        {/* Hero */}
        <div
          className="relative rounded-t-2xl overflow-hidden"
          style={{
            backgroundImage: "url('/entraide-bg.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="absolute inset-0 bg-[#141c50]/62" />
          <div className="relative z-10 p-10 text-center">
            <h3 className="text-3xl font-bold">🤝 Entraide</h3>
            <p className="text-gray-200 mt-2">Ensemble, on va plus loin</p>
          </div>
        </div>

        {/* Onglets crème */}
        <div className="relative overflow-hidden bg-[#f0ede4]">
          <div
            className="absolute inset-0 bg-center bg-no-repeat bg-contain"
            style={{
              backgroundImage: "url('/logo.png')",
              backgroundSize: "400px",
              opacity: 0.37,
            }}
          />
          <div className="relative z-10 p-6 text-gray-700 text-center">
            <div className="flex gap-2 justify-center flex-wrap mb-4">
              {["🆘 Besoin d'aide", "🛠 Coup de main", "🎓 Compétences", "🔄 Échanges"].map((tab) => (
                <span key={tab} className="bg-white px-3 py-1 rounded-full text-sm shadow-sm border border-gray-200">{tab}</span>
              ))}
            </div>
            <div className="grid grid-cols-2 gap-3 max-w-md mx-auto text-sm">
              <div className="bg-white rounded-lg p-3 shadow-sm">Fiche annonce 1</div>
              <div className="bg-white rounded-lg p-3 shadow-sm">Fiche annonce 2</div>
            </div>
          </div>
        </div>

        {/* Banque de Talents */}
        <div className="relative rounded-b-2xl overflow-hidden bg-[#1A2562]">
          <div
            className="absolute inset-0 bg-center bg-no-repeat bg-contain"
            style={{
              backgroundImage: "url('/entraide-fond.png')",
              backgroundSize: "400px",
              opacity: 0.37,
            }}
          />
          <div className="relative z-10 p-8 text-center">
            <h3 className="text-xl font-bold mb-2">🎓 Banque de Talents</h3>
            <p className="text-gray-300 text-sm mb-4">Des membres prêts à partager leurs compétences</p>
            <div className="grid grid-cols-3 gap-3 max-w-lg mx-auto">
              {["Marie — Couture", "Paul — Informatique", "Léa — Jardinage"].map((t) => (
                <div key={t} className="bg-white/10 rounded-xl p-3 text-sm">
                  <div className="w-8 h-8 bg-yellow-400 rounded-full mx-auto mb-2" />
                  {t}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="text-center text-yellow-400 font-bold text-lg mt-8">C'est bon pour toi ? On applique sur la vraie page ?</div>
    </div>
  );
}
