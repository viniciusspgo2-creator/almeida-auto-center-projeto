export const dynamic = "force-dynamic";

import type { Metadata } from "next";
import { ArrowRight, Clock, MapPin, Phone } from "lucide-react";
import { getSettings, siteUrl } from "@/lib/settings";
import { mapsUrl, whatsappUrl } from "@/lib/site-config";
import {
  breadcrumbSchema,
  buildMetadata,
  webPageSchema,
} from "@/lib/seo";
import { WhatsAppIcon } from "@/components/site/whatsapp-icon";
import { WhatsAppForm } from "@/components/site/whatsapp-form";
import { JsonLd } from "@/components/site/json-ld";

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSettings();
  return buildMetadata({
    settings,
    baseUrl: siteUrl(settings),
    title: settings.seoContatoTitle,
    description: settings.seoContatoDescription,
    path: "/contato",
  });
}

export default async function ContatoPage() {
  const settings = await getSettings();
  const base = siteUrl(settings);
  const gmaps = mapsUrl(settings);

  return (
    <>
      <JsonLd
        data={[
          webPageSchema(
            settings,
            base,
            "/contato",
            settings.seoContatoTitle,
            settings.seoContatoDescription
          ),
          breadcrumbSchema(base, [
            { name: "Início", path: "/" },
            { name: "Contato", path: "/contato" },
          ]),
          {
            "@context": "https://schema.org",
            "@type": "ContactPage",
            name: settings.seoContatoTitle,
            url: `${base}/contato`,
            inLanguage: "pt-BR",
            mainEntity: {
              "@type": "AutoRepair",
              "@id": `${base}/#localbusiness`,
              telephone: `+${settings.phone}`,
              contactPoint: {
                "@type": "ContactPoint",
                contactType: "reservations",
                telephone: `+${settings.phone}`,
                areaServed: "BR",
                availableLanguage: "Portuguese",
              },
            },
          },
        ]}
      />

      <section className="page-hero page-hero--contact">
        <div
          className="page-hero__bg"
          style={
            settings.bannerContato
              ? { backgroundImage: `url('${settings.bannerContato}')` }
              : undefined
          }
        />
        <div className="page-hero__overlay" />
        <div className="container page-hero__content reveal reveal--visible">
          <span className="eyebrow eyebrow--light">Fale conosco</span>
          <h1>Vamos conversar sobre o seu veículo.</h1>
          <p>
            Conte o que está acontecendo. Nossa equipe orienta o próximo passo
            e ajuda você a agendar a melhor avaliação.
          </p>
        </div>
      </section>

      <section className="section section--light contact-section">
        <div className="container contact-grid">
          <div className="contact-info reveal">
            <span className="eyebrow">Atendimento direto</span>
            <h2>Escolha a forma mais rápida para falar com a equipe.</h2>
            <p>
              Para agilizar, tenha em mãos o modelo, ano e uma descrição do
              sintoma percebido.
            </p>
            <div className="contact-cards">
              <a
                className="contact-card contact-card--primary"
                href={whatsappUrl(settings)}
                target="_blank"
                rel="noopener"
              >
                <span>
                  <WhatsAppIcon />
                </span>
                <div>
                  <small>WhatsApp</small>
                  <strong>{settings.phoneDisplay}</strong>
                  <em>Enviar mensagem agora</em>
                </div>
                <ArrowRight className="icon" />
              </a>
              <a className="contact-card" href={`tel:+${settings.phone}`}>
                <span>
                  <Phone className="icon" />
                </span>
                <div>
                  <small>Telefone</small>
                  <strong>{settings.phoneDisplay}</strong>
                  <em>Ligar para a oficina</em>
                </div>
                <ArrowRight className="icon" />
              </a>
              <a className="contact-card" href={gmaps} target="_blank" rel="noopener">
                <span>
                  <MapPin className="icon" />
                </span>
                <div>
                  <small>Nosso endereço</small>
                  <strong>{settings.address}</strong>
                  <em>Abrir rota no mapa</em>
                </div>
                <ArrowRight className="icon" />
              </a>
              <div className="contact-card">
                <span>
                  <Clock className="icon" />
                </span>
                <div>
                  <small>Horário</small>
                  <strong>Segunda a sexta</strong>
                  <em>07:30 às 18:00</em>
                </div>
              </div>
            </div>
          </div>
          <div className="booking-card reveal">
            <div className="booking-card__head">
              <span className="eyebrow">Pré-agendamento</span>
              <h2>Envie os dados pelo WhatsApp.</h2>
              <p>
                Preencha os campos e abriremos uma mensagem pronta para nossa
                equipe.
              </p>
            </div>
            <WhatsAppForm phone={settings.phone} />
          </div>
        </div>
      </section>

      <section className="map-section">
        <div className="map-section__info reveal">
          <span className="eyebrow">Localização</span>
          <h2>
            Estamos em Bady Bassitt, com acesso fácil para toda a região.
          </h2>
          <p>{settings.address}</p>
          <a className="btn btn--dark" href={gmaps} target="_blank" rel="noopener">
            Traçar rota <ArrowRight className="icon" />
          </a>
        </div>
        <iframe
          title="Mapa do Almeida Auto Center"
          src={`https://www.google.com/maps?q=${encodeURIComponent(settings.address)}&output=embed`}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </section>

      <section className="section section--soft contact-faq">
        <div className="container">
          <header className="section-heading reveal">
            <div>
              <span className="eyebrow">Antes de vir</span>
              <h2>Informações para agilizar seu atendimento.</h2>
            </div>
            <p>
              Alguns detalhes ajudam nossa equipe a orientar você com mais
              precisão já no primeiro contato.
            </p>
          </header>
          <div className="info-card-grid">
            <article className="reveal">
              <b>01</b>
              <h3>Informe o sintoma</h3>
              <p>
                Conte quando a falha acontece, quais luzes acendem e se houve
                mudança no desempenho.
              </p>
            </article>
            <article className="reveal">
              <b>02</b>
              <h3>Leve o histórico</h3>
              <p>
                Se possível, informe serviços recentes, peças substituídas e
                quando o problema começou.
              </p>
            </article>
            <article className="reveal">
              <b>03</b>
              <h3>Agende antes</h3>
              <p>
                O agendamento ajuda a organizar a recepção e reservar o tempo
                técnico adequado para a análise.
              </p>
            </article>
          </div>
        </div>
      </section>
    </>
  );
}
