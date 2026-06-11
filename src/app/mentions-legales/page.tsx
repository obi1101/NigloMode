export default function MentionsLegalesPage() {
  return (
    <main>
      {/* ═══ HERO ═══ */}
      <section
        style={{ background: "linear-gradient(160deg, #060e08 0%, #1E3524 50%, #0a1508 100%)" }}
        className="px-6 py-20 text-center text-white"
      >
        <span style={{ fontSize: 48 }}>📋</span>
        <h1 className="text-3xl font-extrabold mt-4" style={{ color: "#D8B56A", letterSpacing: 2 }}>MENTIONS LÉGALES</h1>
        <p className="mt-3 text-sm" style={{ color: "rgba(245,239,216,0.60)" }}>Informations légales relatives à la plateforme NIGLOMODE</p>
      </section>

      {/* ═══ CONTENU ═══ */}
      <section style={{ backgroundColor: "#F5EFD8" }} className="py-14 px-4">
        <div className="max-w-3xl mx-auto flex flex-col gap-10" style={{ color: "#1E3524" }}>

          <div>
            <h2 className="text-lg font-extrabold mb-3" style={{ color: "#1E3524" }}>1. Éditeur du site</h2>
            <div className="rounded-2xl p-6" style={{ backgroundColor: "#EDE4C4", border: "1px solid #C4B898" }}>
              <p className="text-sm leading-relaxed">
                <strong>NIGLOMODE</strong> est une plateforme communautaire indépendante dédiée à l&apos;entraide, aux savoir-faire locaux et aux circuits courts.<br /><br />
                Directeur de publication : L&apos;équipe NIGLOMODE<br />
                Contact : <a href="/contact" className="underline" style={{ color: "#4F6B47" }}>via le formulaire de contact</a>
              </p>
            </div>
          </div>

          <div>
            <h2 className="text-lg font-extrabold mb-3" style={{ color: "#1E3524" }}>2. Hébergement</h2>
            <div className="rounded-2xl p-6" style={{ backgroundColor: "#EDE4C4", border: "1px solid #C4B898" }}>
              <p className="text-sm leading-relaxed">
                Ce site est hébergé par un prestataire tiers. Les informations relatives à l&apos;hébergeur seront communiquées sur demande.
              </p>
            </div>
          </div>

          <div>
            <h2 className="text-lg font-extrabold mb-3" style={{ color: "#1E3524" }}>3. Propriété intellectuelle</h2>
            <div className="rounded-2xl p-6" style={{ backgroundColor: "#EDE4C4", border: "1px solid #C4B898" }}>
              <p className="text-sm leading-relaxed">
                L&apos;ensemble des contenus présents sur NIGLOMODE (textes, illustrations, logos, organisation de la plateforme) sont la propriété exclusive de NIGLOMODE, sauf mention contraire.<br /><br />
                Toute reproduction, représentation, modification ou exploitation de tout ou partie des contenus sans autorisation expresse est interdite.
              </p>
            </div>
          </div>

          <div>
            <h2 className="text-lg font-extrabold mb-3" style={{ color: "#1E3524" }}>4. Données personnelles</h2>
            <div className="rounded-2xl p-6" style={{ backgroundColor: "#EDE4C4", border: "1px solid #C4B898" }}>
              <p className="text-sm leading-relaxed">
                Les données collectées lors de l&apos;inscription ou de l&apos;utilisation de la plateforme sont utilisées uniquement dans le cadre du fonctionnement de la communauté NIGLOMODE.<br /><br />
                Conformément au RGPD et à la loi « Informatique et Libertés », vous disposez d&apos;un droit d&apos;accès, de rectification et de suppression de vos données. Pour exercer ces droits, contactez-nous via le formulaire de contact.
              </p>
            </div>
          </div>

          <div>
            <h2 className="text-lg font-extrabold mb-3" style={{ color: "#1E3524" }}>5. Cookies</h2>
            <div className="rounded-2xl p-6" style={{ backgroundColor: "#EDE4C4", border: "1px solid #C4B898" }}>
              <p className="text-sm leading-relaxed">
                NIGLOMODE utilise des cookies strictement nécessaires au fonctionnement de la plateforme (maintien de session, préférences). Aucun cookie publicitaire ou de traçage tiers n&apos;est utilisé.
              </p>
            </div>
          </div>

          <div>
            <h2 className="text-lg font-extrabold mb-3" style={{ color: "#1E3524" }}>6. Responsabilité</h2>
            <div className="rounded-2xl p-6" style={{ backgroundColor: "#EDE4C4", border: "1px solid #C4B898" }}>
              <p className="text-sm leading-relaxed">
                NIGLOMODE ne peut être tenu responsable des contenus publiés par les membres de la communauté. Tout contenu inapproprié peut être signalé via les outils de modération disponibles sur la plateforme.<br /><br />
                NIGLOMODE est indépendant de la boutique Niglo Ni Vis.
              </p>
            </div>
          </div>

        </div>
      </section>
    </main>
  );
}
