export const dynamic = "force-dynamic";

import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight, Check, Clock, ScanLine, Settings, Shield } from "lucide-react";
import { getSettings, siteUrl } from "@/lib/settings";
import { whatsappUrl } from "@/lib/site-config";
import {
  breadcrumbSchema,
  buildMetadata,
  serviceSchema,
  webPageSchema,
} from "@/lib/seo";
import { WhatsAppIcon } from "@/components/site/whatsapp-icon";
import { JsonLd } from "@/components/site/json-ld";

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSettings();
  return buildMetadata({
    settings,
    baseUrl: siteUrl(settings),
    title: settings.seoServicosTitle,
    description: settings.seoServicosDescription,
    path: "/servicos",
  });
}

export default async function ServicosPage() {
  const settings = await getSettings();
  const base = siteUrl(settings);
  const wa = (msg: string) => whatsappUrl(settings, msg);

  const services = [
    {
      id: "diagnostico",
      num: "01",
      img: "/images/diagnostico-eletronico.webp",
      alt: "Scanner e diagnóstico eletrônico",
      icon: <ScanLine className="icon" />,
      title: "Scanner e diagnóstico",
      text: "Leitura de módulos, análise de parâmetros, testes e investigação técnica para encontrar a origem real da falha.",
      items: [
        "Luz de injeção e alertas no painel",
        "Perda de potência e consumo elevado",
        "Falhas intermitentes",
        "Eletrônica embarcada",
      ],
      cta: "Olá! Quero agendar um diagnóstico por scanner.",
    },
    {
      id: "mecanica",
      num: "02",
      img: "/images/mecanica-motor.webp",
      alt: "Mecânica geral e elétrica automotiva",
      icon: <Settings className="icon" />,
      title: "Mecânica e elétrica",
      text: "Manutenção preventiva e corretiva dos sistemas essenciais para desempenho, confiabilidade e segurança.",
      items: [
        "Motor, freios e suspensão",
        "Bateria, alternador e partida",
        "Correia dentada e troca de óleo",
        "Check-up preventivo",
      ],
      cta: "Olá! Quero agendar um serviço de mecânica ou elétrica.",
    },
    {
      id: "cambio",
      num: "03",
      img: "/images/eletronica-embarcada.webp",
      alt: "Diagnóstico de câmbio automático",
      icon: <Settings className="icon" />,
      title: "Câmbio automático",
      text: "Diagnóstico e reparo para trancos, atrasos, patinação, falhas eletrônicas e comportamento irregular.",
      items: [
        "Leitura de falhas do módulo",
        "Testes de funcionamento",
        "Manutenção e reparo técnico",
        "Orientação preventiva",
      ],
      cta: "Olá! Preciso avaliar o câmbio automático do meu veículo.",
    },
    {
      id: "seguranca",
      num: "04",
      img: "/images/scanner-avancado.webp",
      alt: "Diagnóstico de Airbag e ABS",
      icon: <Shield className="icon" />,
      title: "Airbag e ABS",
      text: "Análise especializada dos sistemas de segurança para identificar códigos, sensores e falhas de comunicação.",
      items: [
        "Luz de Airbag acesa",
        "Falhas de ABS e sensores",
        "Diagnóstico de módulos",
        "Reparo seguro e confiável",
      ],
      cta: "Olá! Meu veículo apresenta falha de Airbag ou ABS.",
    },
    {
      id: "injecao",
      num: "05",
      img: "/images/reparo-motor.webp",
      alt: "Injeção eletrônica automotiva",
      icon: <ScanLine className="icon" />,
      title: "Injeção eletrônica",
      text: "Diagnóstico de sensores, atuadores, alimentação e controle do motor para recuperar desempenho e eficiência.",
      items: [
        "Análise de parâmetros",
        "Testes de componentes",
        "Correção de falhas de funcionamento",
        "Ajuste de desempenho",
      ],
      cta: "Olá! Quero avaliar a injeção eletrônica do meu carro.",
    },
    {
      id: "preventiva",
      num: "06",
      img: "/images/elevador-oficina.webp",
      alt: "Manutenção preventiva automotiva",
      icon: <Check className="icon" />,
      title: "Manutenção preventiva",
      text: "Revisões programadas para reduzir riscos, prevenir gastos maiores e manter o veículo confiável no dia a dia.",
      items: [
        "Inspeção dos principais sistemas",
        "Troca de fluidos e filtros",
        "Verificação de freios e suspensão",
        "Orientação por prioridade",
      ],
      cta: "Olá! Quero agendar uma manutenção preventiva.",
    },
  ];

  const tags = [
    "Mecânica",
    "Elétrica",
    "Airbag",
    "ABS",
    "Injeção eletrônica",
    "Ar-condicionado",
    "Eletrônica embarcada",
    "Câmbio automático",
    "Troca de óleo",
    "Troca de bateria",
    "Manutenção preventiva",
    "Correia dentada",
    "Check-up elétrico",
  ];

  return (
    <>
      <JsonLd
        data={[
          webPageSchema(
            settings,
            base,
            "/servicos",
            settings.seoServicosTitle,
            settings.seoServicosDescription
          ),
          breadcrumbSchema(base, [
            { name: "Início", path: "/" },
            { name: "Serviços", path: "/servicos" },
          ]),
          serviceSchema(
            settings,
            base,
            services.map((s) => ({ name: s.title, description: s.text }))
          ),
        ]}
      />

      <section className="page-hero page-hero--services">
        <div
          className="page-hero__bg"
          style={
            settings.bannerServicos
              ? { backgroundImage: `url('${settings.bannerServicos}')` }
              : undefined
          }
        />
        <div className="page-hero__overlay" />
        <div className="container page-hero__content reveal reveal--visible">
          <span className="eyebrow eyebrow--light">Serviços especializados</span>
          <h1>Seu veículo completo. Uma equipe para cuidar de tudo.</h1>
          <p>
            Diagnóstico, manutenção e reparo com tecnologia, experiência e
            explicações claras.
          </p>
          <div className="page-hero__actions">
            <a
              className="btn btn--red btn--pulse"
              href={wa("Olá! Quero agendar um serviço no Almeida Auto Center.")}
              target="_blank"
              rel="noopener"
            >
              <WhatsAppIcon /> Solicitar atendimento
            </a>
            <Link className="btn btn--ghost-light" href="#principais-servicos">
              Ver serviços <ArrowRight className="icon" />
            </Link>
          </div>
        </div>
      </section>

      <section
        className="service-intro section section--light"
        id="principais-servicos"
      >
        <div className="container service-intro__grid">
          <div className="section-copy reveal">
            <span className="eyebrow">
              Qualidade e honestidade em cada serviço
            </span>
            <h2>Somos referência em cuidado automotivo completo.</h2>
            <p className="lead">
              Contamos com uma equipe altamente qualificada para identificar a
              solução ideal, orientar com transparência e executar o reparo
              com atenção aos detalhes.
            </p>
            <div className="schedule-card">
              <Clock className="icon" />
              <div>
                <strong>Atendimento</strong>
                <span>{settings.hours}</span>
              </div>
            </div>
          </div>
          <div className="service-tag-cloud reveal">
            {tags.map((tag) => (
              <span key={tag}>
                <Check className="icon" /> {tag}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--dark service-detail-section">
        <div className="container service-detail-grid">
          {services.map((service) => (
            <article
              key={service.id}
              className="service-detail-card reveal"
              id={service.id}
            >
              <div className="service-detail-card__media">
                <img src={service.img} alt={service.alt} loading="lazy" />
                <span>{service.num}</span>
              </div>
              <div className="service-detail-card__body">
                <div className="service-detail-card__icon">{service.icon}</div>
                <h2>{service.title}</h2>
                <p>{service.text}</p>
                <ul>
                  {service.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
                <a
                  href={wa(service.cta)}
                  target="_blank"
                  rel="noopener"
                  aria-label={`Agendar ${service.title} pelo WhatsApp`}
                >
                  Agendar este serviço <ArrowRight className="icon" />
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section section--soft service-quality">
        <div className="container split-layout">
          <div className="service-quality__image reveal">
            <img
              src="/images/especialista.webp"
              alt="Equipe especializada Almeida Auto Center"
              loading="lazy"
            />
            <div className="service-quality__badge">
              <strong>Equipe especializada</strong>
              <span>atendimento técnico e humano</span>
            </div>
          </div>
          <div className="section-copy reveal">
            <span className="eyebrow">Somos referência na região</span>
            <h2>Um atendimento que respeita seu tempo e sua decisão.</h2>
            <p className="lead">
              Antes de executar, investigamos. Antes de substituir, testamos.
              Antes de você autorizar, explicamos.
            </p>
            <div className="feature-list">
              <div>
                <Check className="icon" />
                <span>
                  <strong>Diagnóstico orientado por evidências</strong>
                  Menos tentativa, mais precisão.
                </span>
              </div>
              <div>
                <Check className="icon" />
                <span>
                  <strong>Prioridades bem definidas</strong>
                  Você entende o que é urgente e o que pode ser programado.
                </span>
              </div>
              <div>
                <Check className="icon" />
                <span>
                  <strong>Comunicação transparente</strong>
                  Informações claras durante o atendimento.
                </span>
              </div>
            </div>
            <Link className="btn btn--red" href="/contato">
              Solicitar atendimento <ArrowRight className="icon" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
