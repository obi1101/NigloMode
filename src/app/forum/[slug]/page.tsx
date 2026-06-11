import ForumCategoriePage from "./ForumCategoriePage";

const slugs = [
  "discussion-libre", "idees-suggestions", "coup-de-main-urgent",
  "bricolage-reparation", "jardin-potager", "cuisine-recettes",
  "annonces-terrier", "questions-administratives",
];

export function generateStaticParams() {
  return slugs.map((slug) => ({ slug }));
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return <ForumCategoriePage slug={slug} />;
}
