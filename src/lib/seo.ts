import type { Metadata } from "next";
import type { SiteSettings } from "@/lib/site-config";

type MetaInput = {
  settings: SiteSettings;
  baseUrl: string;
  title: string;
  description: string;
  path: string;
  keywords?: string;
  ogImage?: string;
  robots?: string;
};

/** Enterprise metadata builder: canonical, OG, Twitter, robots, geo tags */
export function buildMetadata(input: MetaInput): Metadata {
  const { settings, baseUrl, title, description, path } = input;
  const url = `${baseUrl}${path === "/" ? "" : path}`;
  const image = input.ogImage || settings.seoOgImage;
  const imageUrl = image.startsWith("http") ? image : `${baseUrl}${image}`;
  const robots = input.robots || settings.seoRobotsIndex;

  return {
    title,
    description,
    alternates: { canonical: url },
    robots: {
      index: robots.includes("index"),
      follow: robots.includes("follow"),
      googleBot: {
        index: robots.includes("index"),
        follow: robots.includes("follow"),
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
    authors: [{ name: settings.siteName }],
    creator: settings.siteName,
    publisher: settings.siteName,
    formatDetection: { telephone: true },
    openGraph: {
      type: "website",
      locale: "pt_BR",
      url,
      siteName: settings.siteName,
      title,
      description,
      images: [{ url: imageUrl, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl],
    },
  };
}

export function organizationSchema(settings: SiteSettings, baseUrl: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: settings.siteName,
    url: baseUrl,
    logo: `${baseUrl}/images/logo-almeida.png`,
    image: `${baseUrl}${settings.seoOgImage}`,
    telephone: `+${settings.phone}`,
    address: {
      "@type": "PostalAddress",
      streetAddress: "Av. Marginal José Marquês de Mendonça, 1135 - Jardim Primavera",
      addressLocality: "Bady Bassitt",
      addressRegion: "SP",
      addressCountry: "BR",
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: `+${settings.phone}`,
      contactType: "customer service",
      areaServed: "BR",
      availableLanguage: "Portuguese",
    },
  };
}

export function localBusinessSchema(settings: SiteSettings, baseUrl: string) {
  return {
    "@context": "https://schema.org",
    "@type": ["AutoRepair", "Organization"],
    "@id": `${baseUrl}/#localbusiness`,
    name: settings.siteName,
    telephone: `+${settings.phone}`,
    url: baseUrl,
    image: `${baseUrl}${settings.seoOgImage}`,
    priceRange: "$$",
    openingHours: "Mo-Fr 07:30-18:00",
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "07:30",
      closes: "18:00",
    },
    address: {
      "@type": "PostalAddress",
      streetAddress:
        "Av. Marginal José Marquês de Mendonça, 1135 - Jardim Primavera",
      addressLocality: "Bady Bassitt",
      addressRegion: "SP",
      postalCode: "15115-000",
      addressCountry: "BR",
    },
    areaServed: { "@type": "City", name: "Bady Bassitt" },
  };
}

export function websiteSchema(settings: SiteSettings, baseUrl: string) {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${baseUrl}/#website`,
    name: settings.siteName,
    url: baseUrl,
    inLanguage: "pt-BR",
    publisher: { "@id": `${baseUrl}/#localbusiness` },
  };
}

export function webPageSchema(
  settings: SiteSettings,
  baseUrl: string,
  path: string,
  name: string,
  description: string
) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${baseUrl}${path === "/" ? "" : path}#webpage`,
    name,
    description,
    url: `${baseUrl}${path === "/" ? "" : path}`,
    inLanguage: "pt-BR",
    isPartOf: { "@id": `${baseUrl}/#website` },
    about: { "@id": `${baseUrl}/#localbusiness` },
  };
}

export function breadcrumbSchema(
  baseUrl: string,
  items: { name: string; path: string }[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${baseUrl}${item.path === "/" ? "" : item.path}`,
    })),
  };
}

export function faqSchema(
  faqs: { question: string; answer: string }[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };
}

export function serviceSchema(
  settings: SiteSettings,
  baseUrl: string,
  services: { name: string; description: string }[]
) {
  return services.map((s) => ({
    "@context": "https://schema.org",
    "@type": "Service",
    name: s.name,
    description: s.description,
    provider: { "@id": `${baseUrl}/#localbusiness` },
    areaServed: { "@type": "City", name: "Bady Bassitt" },
    availableChannel: {
      "@type": "ServiceChannel",
      serviceUrl: `${baseUrl}/contato`,
    },
  }));
}

export function videoSchema(settings: SiteSettings, baseUrl: string) {
  return {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name: "Vídeo institucional Almeida Auto Center",
    description:
      "Conheça a estrutura, a equipe e o cuidado aplicado em cada etapa do atendimento no Almeida Auto Center.",
    thumbnailUrl: [`${baseUrl}${settings.seoOgImage}`],
    embedUrl: `https://player.vimeo.com/video/${settings.vimeoId}`,
    contentUrl: `https://vimeo.com/${settings.vimeoId}`,
    publisher: { "@id": `${baseUrl}/#localbusiness` },
    inLanguage: "pt-BR",
  };
}

export function blogPostingSchema(
  settings: SiteSettings,
  baseUrl: string,
  post: {
    slug: string;
    title: string;
    excerpt: string | null;
    coverImage: string | null;
    author: string | null;
    publishedAt: Date | null;
    updatedAt: Date;
  }
) {
  const url = `${baseUrl}/blog/${post.slug}`;
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt || "",
    image: post.coverImage ? [`${baseUrl}${post.coverImage}`] : undefined,
    datePublished: (post.publishedAt ?? post.updatedAt).toISOString(),
    dateModified: post.updatedAt.toISOString(),
    author: {
      "@type": "Person",
      name: post.author || "Equipe Almeida Auto Center",
    },
    publisher: {
      "@type": "Organization",
      name: settings.siteName,
      logo: { "@type": "ImageObject", url: `${baseUrl}/images/logo-almeida.png` },
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    inLanguage: "pt-BR",
  };
}
