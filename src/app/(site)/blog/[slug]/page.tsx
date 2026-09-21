import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowLeft, CalendarDays, UserRound } from "lucide-react";
import { db } from "@/lib/db";
import { getSettings, siteUrl } from "@/lib/settings";
import {
  blogPostingSchema,
  breadcrumbSchema,
  buildMetadata,
} from "@/lib/seo";
import { JsonLd } from "@/components/site/json-ld";
import { WhatsAppIcon } from "@/components/site/whatsapp-icon";
import { whatsappUrl } from "@/lib/site-config";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ slug: string }> };

async function getPost(slug: string) {
  try {
    return await db.blogPost.findFirst({
      where: { slug, published: true },
    });
  } catch {
    return null;
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const settings = await getSettings();
  const post = await getPost(slug);
  if (!post) {
    return buildMetadata({
      settings,
      baseUrl: siteUrl(settings),
      title: "Artigo não encontrado",
      description: "O artigo solicitado não foi encontrado.",
      path: `/blog/${slug}`,
      robots: "noindex,nofollow",
    });
  }
  return buildMetadata({
    settings,
    baseUrl: siteUrl(settings),
    title: post.metaTitle || post.title,
    description: post.metaDescription || post.excerpt || post.title,
    path: `/blog/${post.slug}`,
    ogImage: post.coverImage || undefined,
  });
}

function formatDate(date: Date) {
  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(date);
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();

  const settings = await getSettings();
  const base = siteUrl(settings);

  return (
    <>
      <JsonLd
        data={[
          blogPostingSchema(settings, base, post),
          breadcrumbSchema(base, [
            { name: "Início", path: "/" },
            { name: "Blog", path: "/blog" },
            { name: post.title, path: `/blog/${post.slug}` },
          ]),
        ]}
      />

      <section className="page-hero blog-post-hero">
        <div className="page-hero__bg" />
        <div className="page-hero__overlay" />
        <div className="container page-hero__content reveal reveal--visible">
          <span className="eyebrow eyebrow--light">Blog</span>
          <h1>{post.title}</h1>
          <div className="blog-post-hero__meta">
            <span>
              <CalendarDays className="icon" />
              {formatDate(post.publishedAt ?? post.updatedAt)}
            </span>
            <span>
              <UserRound className="icon" />
              {post.author || "Equipe Almeida Auto Center"}
            </span>
          </div>
        </div>
      </section>

      <section className="section section--light blog-post-section">
        <div className="container blog-post-container">
          {post.coverImage ? (
            <figure className="blog-post-cover">
              <img
                src={post.coverImage}
                alt={post.title}
                width={1200}
                height={675}
                fetchPriority="high"
              />
            </figure>
          ) : null}

          {post.excerpt ? (
            <p className="blog-post-lead">{post.excerpt}</p>
          ) : null}

          <article className="blog-post-content">
            {post.content.split("\n").map((paragraph, i) => {
              const trimmed = paragraph.trim();
              if (!trimmed) return null;
              if (trimmed.startsWith("## ")) {
                return <h2 key={i}>{trimmed.slice(3)}</h2>;
              }
              if (trimmed.startsWith("### ")) {
                return <h3 key={i}>{trimmed.slice(4)}</h3>;
              }
              if (trimmed.startsWith("- ") || trimmed.startsWith("* ")) {
                return (
                  <li key={i} className="blog-post-li">
                    {trimmed.slice(2)}
                  </li>
                );
              }
              return <p key={i}>{trimmed}</p>;
            })}
          </article>

          {post.tags ? (
            <div className="blog-post-tags">
              {post.tags
                .split(",")
                .map((t) => t.trim())
                .filter(Boolean)
                .map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
            </div>
          ) : null}

          <aside className="blog-post-cta">
            <h2>Precisa de um diagnóstico de verdade?</h2>
            <p>
              Nossa equipe analisa seu veículo com tecnologia e explica tudo
              antes de qualquer reparo.
            </p>
            <a
              className="btn btn--red btn--pulse"
              href={whatsappUrl(settings)}
              target="_blank"
              rel="noopener"
            >
              <WhatsAppIcon /> Agendar avaliação
            </a>
          </aside>

          <Link className="blog-post-back" href="/blog">
            <ArrowLeft className="icon" /> Voltar para todos os artigos
          </Link>
        </div>
      </section>
    </>
  );
}
