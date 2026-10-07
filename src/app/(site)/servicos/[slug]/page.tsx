export const dynamic = "force-dynamic";

import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight, Check, Phone, ScanLine, Shield } from "lucide-react";
import { notFound } from "next/navigation";
import { getSettings, siteUrl } from "@/lib/settings";
import { whatsappUrl } from "@/lib/site-config";
import {
  breadcrumbSchema,
  buildMetadata,
  faqSchema,
  serviceSchema,
  webPageSchema,
} from "@/lib/seo";
import { SERVICE_PAGE_SLUGS, SERVICE_PAGES } from "@/lib/service-pages";
import { JsonLd } from "@/components/site/json-ld";
import { FaqAccordion } from "@/components/site/faq-accordion";
import { WhatsAppIcon } from "@/components/site/whatsapp-icon";

type RouteProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return SERVICE_PAGE_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: RouteProps): Promise<Metadata> {
  const { slug } = await params;
  const service = SERVICE_PAGES[slug];
  if (!service) return {};

  const settings = await getSettings();
  return buildMetadata({
    settings,
    baseUrl: siteUrl(settings),
    title: service.title,
    description: service.description,
    path: `/servicos/${service.slug}`,
  });
}

export default async function ServiceDetailPage({ params }: RouteProps) {
  const { slug } = await params;
  const service = SERVICE_PAGES[slug];
  if (!service) notFound();

  const settings = await getSettings();
  const base = siteUrl(settings);
  const contactUrl = whatsappUrl(settings, service.whatsappMessage);

  return (
    <>
      <JsonLd
        data={[
          webPageSchema(
            settings,
            base,
            `/servicos/${service.slug}`,
            service.title,
            service.description
          ),
          breadcrumbSchema(base, [
            { name: "Início", path: "/" },
            { name: "Serviços", path: "/servicos" },
            { name: service.h1, path: `/servicos/${service.slug}` },
          ]),
          ...serviceSchema(settings, base, [
            { name: service.h1, description: service.description },
          ]),
          faqSchema(service.faqs),
        ]}
      />

      <section className="page-hero page-hero--services service-detail-hero">
        <div
          className="page-hero__bg"
          style={{ backgroundImage: `url('${service.image}')` }}
        />
        <div className="page-hero__overlay" />
        <div className="container page-hero__content reveal reveal--visible">
          <span className="eyebrow eyebrow--light">{service.eyebrow}</span>
          <h1>{service.h1}</h1>
          <p>{service.description}</p>
          <div className="page-hero__actions">
            <a
              className="btn btn--red btn--pulse"
              href={contactUrl}
              target="_blank"
              rel="noopener"
            >
              <WhatsAppIcon /> Consultar aplicação
            </a>
            <Link className="btn btn--ghost-light" href="/servicos">
              Voltar ao catálogo <ArrowRight className="icon" />
            </Link>
          </div>
        </div>
      </section>

      <section className="section section--light service-page-intro">
        <div className="container service-page-intro__grid">
          <div className="service-page-intro__media reveal">
            <img src={service.image} alt={service.imageAlt} loading="lazy" />
            <div className="service-page-intro__badge">
              <Shield className="icon" />
              <span>Avaliação técnica em Bady Bassitt</span>
            </div>
          </div>
          <div className="section-copy reveal">
            <span className="eyebrow">Antes de autorizar, entenda</span>
            <h2>{service.introTitle}</h2>
            <p className="lead">{service.intro}</p>
            <div className="service-page-points">
              <h3>{service.pointsTitle}</h3>
              <ul>
                {service.points.map((point) => (
                  <li key={point}>
                    <Check className="icon" /> {point}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="section section--dark service-page-process">
        <div className="container service-page-process__grid">
          <div className="section-copy reveal">
            <span className="eyebrow eyebrow--light">Processo de atendimento</span>
            <h2>{service.processTitle}</h2>
            <p className="lead">
              O atendimento é definido a partir das informações do veículo e
              da avaliação realizada pela equipe.
            </p>
            <div className="service-page-process__steps">
              {service.process.map((step, index) => (
                <div key={step}>
                  <b>{String(index + 1).padStart(2, "0")}</b>
                  <span>{step}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="service-page-note reveal">
            <ScanLine className="icon" />
            <span className="eyebrow eyebrow--light">Critério técnico</span>
            <h3>{service.limitsTitle}</h3>
            <p>{service.limits}</p>
            <a
              className="btn btn--red"
              href={contactUrl}
              target="_blank"
              rel="noopener"
            >
              <WhatsAppIcon /> Consultar meu veículo
            </a>
          </div>
        </div>
      </section>

      <section className="section section--soft service-page-faq">
        <div className="container service-page-faq__grid">
          <div className="section-copy reveal">
            <span className="eyebrow">Perguntas frequentes</span>
            <h2>O que avaliar antes de solicitar o serviço.</h2>
            <p>
              Envie modelo, ano, motorização e objetivo para receber uma
              orientação inicial mais precisa.
            </p>
            <a
              className="text-link"
              href={`tel:+${settings.phone}`}
            >
              <Phone className="icon" /> {settings.phoneDisplay}
            </a>
          </div>
          <div className="reveal">
            <FaqAccordion items={service.faqs} />
          </div>
        </div>
      </section>

      <section className="section section--light service-page-related">
        <div className="container">
          <header className="section-heading reveal">
            <div>
              <span className="eyebrow">Continue a pesquisa</span>
              <h2>Serviços relacionados do Almeida Auto Center.</h2>
            </div>
            <p>
              Conheça outras páginas antes de definir o melhor caminho para o
              seu veículo.
            </p>
          </header>
          <div className="service-page-related__grid">
            {service.related.map((related) => (
              <Link key={related.href} href={related.href} className="related-service-link">
                {related.label} <ArrowRight className="icon" />
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
