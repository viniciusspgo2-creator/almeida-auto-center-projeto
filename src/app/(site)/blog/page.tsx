import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight, CalendarDays, Clock3, UserRound } from "lucide-react";
import { db } from "@/lib/db";
import { getSettings, siteUrl } from "@/lib/settings";
import { breadcrumbSchema, buildMetadata, webPageSchema } from "@/lib/seo";
import { JsonLd } from "@/components/site/json-ld";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSettings();
  return buildMetadata({
    settings,
    baseUrl: siteUrl(settings),
    title: "Blog | Dicas e conteúdo automotivo",
    description:
      "Artigos e dicas técnicas do Almeida Auto Center: diagnóstico, manutenção preventiva, injeção eletrônica, câmbio automático e muito mais.",
    path: "/blog",
  });
}

function formatDate(date: Date) {
  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(date);
}

function readingTime(content: string) {
  const words = content.trim().split(/\s+/).length;
  return Math.max(1, Math.round(words / 200));
}

/** Build-safe: never throws — banco vazio/instável renderiza lista vazia */
async function loadPublishedPosts() {
  try {
    return await db.blogPost.findMany({
      where: { published: true },
      orderBy: { publishedAt: "desc" },
    });
  } catch {
    return [];
  }
}

export default async function BlogPage() {
  const settings = await getSettings();
  const base = siteUrl(settings);
  const posts = await loadPublishedPosts();
  const [featured, ...rest] = posts;

  return (
    <>
      <JsonLd
        data={[
          webPageSchema(
            settings,
            base,
            "/blog",
            "Blog Almeida Auto Center",
            "Dicas e conteúdo técnico automotivo do Almeida Auto Center."
          ),
          breadcrumbSchema(base, [
            { name: "Início", path: "/" },
            { name: "Blog", path: "/blog" },
          ]),
          {
            "@context": "https://schema.org",
            "@type": "Blog",
            name: `Blog ${settings.siteName}`,
            url: `${base}/blog`,
            inLanguage: "pt-BR",
            publisher: { "@id": `${base}/#localbusiness` },
            blogPost: posts.slice(0, 10).map((p) => ({
              "@type": "BlogPosting",
              headline: p.title,
              url: `${base}/blog/${p.slug}`,
              datePublished: (p.publishedAt ?? p.updatedAt).toISOString(),
            })),
          },
        ]}
      />

      <section className="page-hero page-hero--services">
        <div className="page-hero__bg" />
        <div className="page-hero__overlay" />
        <div className="container page-hero__content reveal reveal--visible">
          <span className="eyebrow eyebrow--light">Blog</span>
          <h1>Conteúdo técnico para cuidar melhor do seu veículo.</h1>
          <p>
            Dicas, orientações e explicações da nossa equipe para você
            entender melhor o seu carro e evitar problemas.
          </p>
        </div>
      </section>

      <section className="section section--light blog-section">
        <div className="container">
          {posts.length === 0 ? (
            <div className="blog-empty">
              <h2>Em breve, novos artigos.</h2>
              <p>
                Nossa equipe está preparando conteúdo técnico de qualidade
                para você. Enquanto isso, fale conosco e agende uma avaliação.
              </p>
              <Link className="btn btn--red" href="/contato">
                Falar com a equipe <ArrowRight className="icon" />
              </Link>
            </div>
          ) : (
            <div className="blog-grid">
              {featured ? (
                <Link
                  href={`/blog/${featured.slug}`}
                  className="blog-card blog-card--featured reveal"
                >
                  <div className="blog-card__media">
                    <img
                      src={featured.coverImage || "/images/hero-oficina.webp"}
                      alt={featured.title}
                      width={1200}
                      height={675}
                      loading="eager"
                    />
                    <span className="blog-card__tag">Destaque</span>
                  </div>
                  <div className="blog-card__body">
                    <div className="blog-card__meta">
                      <span>
                        <CalendarDays className="icon" />
                        {formatDate(featured.publishedAt ?? featured.updatedAt)}
                      </span>
                      <span>
                        <Clock3 className="icon" />
                        {readingTime(featured.content)} min de leitura
                      </span>
                    </div>
                    <h2>{featured.title}</h2>
                    {featured.excerpt ? <p>{featured.excerpt}</p> : null}
                    <span className="blog-card__more">
                      Ler artigo completo <ArrowRight className="icon" />
                    </span>
                  </div>
                </Link>
              ) : null}

              {rest.map((post) => (
                <Link
                  key={post.id}
                  href={`/blog/${post.slug}`}
                  className="blog-card reveal"
                >
                  <div className="blog-card__media">
                    <img
                      src={post.coverImage || "/images/mecanica-motor.webp"}
                      alt={post.title}
                      width={1200}
                      height={675}
                      loading="lazy"
                    />
                  </div>
                  <div className="blog-card__body">
                    <div className="blog-card__meta">
                      <span>
                        <CalendarDays className="icon" />
                        {formatDate(post.publishedAt ?? post.updatedAt)}
                      </span>
                      <span>
                        <UserRound className="icon" />
                        {post.author || "Equipe"}
                      </span>
                    </div>
                    <h2>{post.title}</h2>
                    {post.excerpt ? <p>{post.excerpt}</p> : null}
                    <span className="blog-card__more">
                      Ler artigo completo <ArrowRight className="icon" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
