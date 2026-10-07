export const dynamic = "force-dynamic";

import Link from "next/link";
import type { Metadata } from "next";
import {
  ArrowRight,
  Check,
  Clock,
  Phone,
  ScanLine,
  Settings,
  Shield,
} from "lucide-react";
import { getSettings, siteUrl } from "@/lib/settings";
import { whatsappUrl } from "@/lib/site-config";
import { buildMetadata, faqSchema, webPageSchema } from "@/lib/seo";
import { Counter } from "@/components/site/motion";
import { FaqAccordion } from "@/components/site/faq-accordion";
import { WhatsAppIcon } from "@/components/site/whatsapp-icon";
import { JsonLd } from "@/components/site/json-ld";

const HOME_FAQS = [
  {
    question: "Quando devo levar o carro para um diagnóstico?",
    answer:
      "Sempre que houver luz no painel, ruídos, perda de potência, aumento de consumo, dificuldade na partida, comportamento irregular ou antes de viagens e compras de veículos usados.",
  },
  {
    question: "Vocês fazem diagnóstico antes de trocar peças?",
    answer:
      "Sim. Nossa prioridade é identificar a origem da falha por meio de análise, scanner e testes, reduzindo substituições desnecessárias.",
  },
  {
    question: "Quanto tempo leva uma avaliação?",
    answer:
      "O prazo depende do sintoma e do sistema envolvido. Após o primeiro contato, orientamos sobre a melhor forma de receber o veículo e estimamos o tempo de análise.",
  },
  {
    question: "Atendem câmbio automático, Airbag e ABS?",
    answer:
      "Sim. Trabalhamos com diagnóstico e reparos em câmbio automático e sistemas de segurança, além de elétrica, mecânica geral e injeção eletrônica.",
  },
  {
    question: "Como agendar um atendimento?",
    answer:
      "Você pode chamar diretamente pelo WhatsApp ou ligar para nossa equipe. Informe o modelo, ano do veículo e o sintoma percebido para agilizar a orientação.",
  },
];

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSettings();
  return buildMetadata({
    settings,
    baseUrl: siteUrl(settings),
    title: settings.seoHomeTitle,
    description: settings.seoHomeDescription,
    path: "/",
    keywords: settings.seoHomeKeywords,
  });
}

export default async function HomePage() {
  const settings = await getSettings();
  const base = siteUrl(settings);
  const wa = (msg: string) => whatsappUrl(settings, msg);

  const services = [
    {
      num: "01",
      icon: <Settings className="icon" />,
      title: "Elétrica automotiva",
      text: "Diagnóstico e reparo de sistemas elétricos, bateria, alternador, partida e eletrônica embarcada.",
      href: "/servicos/auto-eletrica",
    },
    {
      num: "02",
      icon: <Settings className="icon" />,
      title: "Mecânica geral",
      text: "Manutenção preventiva e corretiva para preservar desempenho, segurança e vida útil do veículo.",
      href: "/servicos/mecanica-geral",
    },
    {
      num: "03",
      icon: <ScanLine className="icon" />,
      title: "Injeção eletrônica",
      text: "Scanner avançado, testes de sensores, análise de parâmetros e correção de falhas de desempenho.",
      href: "/servicos/injecao-eletronica",
      featured: true,
    },
    {
      num: "04",
      icon: <Settings className="icon" />,
      title: "Câmbio automático",
      text: "Diagnóstico técnico, manutenção e reparo completo com procedimentos adequados ao sistema.",
      href: "/servicos#cambio",
    },
    {
      num: "05",
      icon: <Shield className="icon" />,
      title: "Airbag e ABS",
      text: "Análise de falhas e reparo dos sistemas de segurança com foco em funcionamento confiável.",
      href: "/servicos#seguranca",
    },
    {
      num: "06",
      icon: <ScanLine className="icon" />,
      title: "Scanner e diagnóstico",
      text: "Identificação rápida e precisa de falhas que muitas vezes não aparecem em uma avaliação superficial.",
      href: "/servicos/diagnostico-automotivo",
    },
  ];

  return (
    <>
      <JsonLd
        data={[
          webPageSchema(
            settings,
            base,
            "/",
            settings.seoHomeTitle,
            settings.seoHomeDescription
          ),
          faqSchema(HOME_FAQS),
        ]}
      />
      {/* LCP: preload the hero banner */}
      <link
        rel="preload"
        as="image"
        href={settings.bannerHome || "/images/hero-oficina.webp"}
       
      />

      <section className="hero-home">
        <div
          className="hero-home__media"
          aria-hidden="true"
          style={
            settings.bannerHome
              ? { backgroundImage: `url('${settings.bannerHome}')` }
              : undefined
          }
        />
        <div className="hero-home__overlay" aria-hidden="true" />
        <div className="hero-home__scan" aria-hidden="true" />
        <div className="container hero-home__content">
          <div className="hero-copy reveal reveal--visible">
            <span className="eyebrow eyebrow--light">
              <i /> Tecnologia, experiência e transparência
            </span>
            <h1>
              Auto elétrica, mecânica e diagnóstico
              <br />
              <span>em Bady Bassitt.</span>
            </h1>
            <p>
              Diagnóstico preciso. Reparo rápido. Seu carro seguro. Do sistema
              elétrico à mecânica geral, incluindo injeção eletrônica, câmbio
              automático, Airbag e ABS.
            </p>
            <div className="hero-actions">
              <a
                className="btn btn--red btn--pulse"
                href={wa("Olá! Quero agendar um diagnóstico para o meu veículo.")}
                target="_blank"
                rel="noopener"
              >
                <WhatsAppIcon /> Agendar diagnóstico
              </a>
              <Link className="btn btn--ghost-light" href="/servicos">
                Conhecer serviços <ArrowRight className="icon" />
              </Link>
            </div>
            <div className="hero-trust">
              <span>
                <Check className="icon" /> Pontualidade
              </span>
              <span>
                <Check className="icon" /> Transparência
              </span>
              <span>
                <Check className="icon" /> Diagnóstico técnico
              </span>
            </div>
          </div>
          <aside
            className="hero-diagnostic-card reveal reveal--visible"
            aria-label="Diferenciais de diagnóstico"
          >
            <div className="hero-diagnostic-card__top">
              <span className="status-dot" />
              <small>Diagnóstico avançado</small>
              <strong>Precisão em cada etapa</strong>
            </div>
            <div className="diagnostic-lines">
              <div>
                <span>Sistema elétrico</span>
                <b>ANÁLISE</b>
              </div>
              <div>
                <span>Injeção eletrônica</span>
                <b>SCANNER</b>
              </div>
              <div>
                <span>Câmbio automático</span>
                <b>TESTE</b>
              </div>
              <div>
                <span>Airbag e ABS</span>
                <b>SEGURANÇA</b>
              </div>
            </div>
            <Link href="/servicos#diagnostico">
              Como funciona <ArrowRight className="icon" />
            </Link>
          </aside>
        </div>
        <a className="hero-scroll" href="#diferenciais" aria-label="Ir para a próxima seção">
          <span />
          Role para conhecer
        </a>
      </section>

      <section className="trust-strip" id="diferenciais">
        <div className="container trust-strip__grid">
          <article className="reveal">
            <strong>
              <Counter to={35} suffix="+" />
            </strong>
            <span>anos de experiência</span>
          </article>
          <article className="reveal">
            <strong>
              <Counter to={6} />
            </strong>
            <span>áreas técnicas integradas</span>
          </article>
          <article className="reveal">
            <strong>
              <Counter to={100} suffix="%" />
            </strong>
            <span>foco em transparência</span>
          </article>
          <article className="reveal">
            <strong>
              <Counter to={1} />
            </strong>
            <span>lugar para cuidar de tudo</span>
          </article>
        </div>
      </section>

      <section className="section section--light about-preview">
        <div className="container split-layout">
          <div className="media-stack reveal">
            <div className="media-stack__main">
              <img
                src="/images/mecanica-motor.webp"
                alt="Profissional do Almeida Auto Center realizando manutenção no motor"
                width={1536}
                height={2048}
                loading="lazy"
              />
            </div>
            <div className="media-stack__accent">
              <img
                src="/images/especialista.webp"
                alt="Especialista do Almeida Auto Center"
                width={2016}
                height={1344}
                loading="lazy"
              />
            </div>
            <div className="floating-proof">
              <Shield className="icon" />
              <div>
                <strong>Desde 1989</strong>
                <span>confiança construída na prática</span>
              </div>
            </div>
          </div>
          <div className="section-copy reveal">
            <span className="eyebrow">Todos os serviços em um só lugar</span>
            <h2>Tecnologia para diagnosticar. Experiência para resolver.</h2>
            <p className="lead">
              No Almeida Auto Center, cada atendimento começa com uma análise
              cuidadosa. Nossa equipe combina experiência, scanner de precisão
              e processos técnicos para evitar trocas desnecessárias e
              encontrar a origem real do problema.
            </p>
            <div className="feature-list feature-list--two">
              <div>
                <Check className="icon" />
                <span>
                  <strong>Profissionais especializados</strong>
                  Equipe preparada para sistemas mecânicos e eletrônicos.
                </span>
              </div>
              <div>
                <Check className="icon" />
                <span>
                  <strong>Scanner de precisão</strong>
                  Leitura técnica e testes para decisões mais seguras.
                </span>
              </div>
              <div>
                <Check className="icon" />
                <span>
                  <strong>Orçamento transparente</strong>
                  Você entende o problema antes de autorizar o serviço.
                </span>
              </div>
              <div>
                <Check className="icon" />
                <span>
                  <strong>Reparo completo</strong>
                  Do diagnóstico à entrega, tudo acompanhado de perto.
                </span>
              </div>
            </div>
            <div className="section-actions">
              <Link className="btn btn--dark" href="/sobre">
                Conheça nossa história <ArrowRight className="icon" />
              </Link>
              <a className="text-link" href={`tel:+${settings.phone}`}>
                <Phone className="icon" /> Falar por telefone
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="section section--dark services-showcase">
        <div className="orb orb--one" aria-hidden="true" />
        <div className="orb orb--two" aria-hidden="true" />
        <div className="container">
          <header className="section-heading section-heading--light reveal">
            <div>
              <span className="eyebrow eyebrow--light">Nossos serviços</span>
              <h2>
                Soluções técnicas para todos os sistemas do seu veículo.
              </h2>
            </div>
            <p>
              Seu carro merece cuidado especializado. Aqui, experiência e
              tecnologia trabalham juntas para entregar diagnósticos precisos
              e reparos confiáveis.
            </p>
          </header>
          <div className="service-grid">
            {services.map((service) => (
              <article
                key={service.num}
                className={`service-card reveal${service.featured ? " service-card--featured" : ""}`}
              >
                {service.featured ? (
                  <div className="service-card__tag">Alta precisão</div>
                ) : null}
                <div className="service-card__icon">{service.icon}</div>
                <span>{service.num}</span>
                <h3>{service.title}</h3>
                <p>{service.text}</p>
                <Link href={service.href}>
                  Ver detalhes <ArrowRight className="icon" />
                </Link>
              </article>
            ))}
          </div>
          <div className="center-action reveal">
            <Link className="btn btn--red" href="/servicos">
              Ver todos os serviços <ArrowRight className="icon" />
            </Link>
          </div>
        </div>
      </section>

      <section className="section section--light performance-highlight">
        <div className="container performance-highlight__grid">
          <div className="section-copy reveal">
            <span className="eyebrow">Nova frente de performance</span>
            <h2>Remap e reprogramação de ECU em Bady Bassitt</h2>
            <p className="lead">
              Conheça a frente de performance do Almeida Auto Center, com foco
              em diesel, caminhonetes e TSI/importados. A aplicação de Remap,
              Stage 1 ou Stage 2 começa pela avaliação do veículo e pela
              definição do objetivo do projeto.
            </p>
            <div className="section-actions">
              <Link className="btn btn--dark" href="/servicos/remap-reprogramacao-ecu">
                Conhecer Remap e ECU <ArrowRight className="icon" />
              </Link>
              <Link className="text-link" href="/servicos#performance">
                Ver aplicações <ArrowRight className="icon" />
              </Link>
            </div>
          </div>
          <div className="performance-highlight__cards reveal">
            <Link href="/servicos/remap-diesel" className="performance-link-card">
              <strong>Remap diesel</strong>
              <span>Aplicações por motorização e objetivo do projeto</span>
              <ArrowRight className="icon" />
            </Link>
            <Link href="/servicos/remap-caminhonetes" className="performance-link-card">
              <strong>Remap para caminhonetes</strong>
              <span>Informe modelo, ano e motorização para avaliar</span>
              <ArrowRight className="icon" />
            </Link>
            <Link href="/servicos/remap-tsi-importados" className="performance-link-card">
              <strong>TSI e importados</strong>
              <span>Compatibilidade, requisitos e aplicação técnica</span>
              <ArrowRight className="icon" />
            </Link>
          </div>
        </div>
      </section>

      <section className="section section--light diagnostic-section" id="diagnostico">
        <div className="container split-layout split-layout--reverse">
          <div className="diagnostic-visual reveal">
            <img
              src="/images/diagnostico-eletronico.webp"
              alt="Diagnóstico eletrônico automotivo com equipamento especializado"
              width={1536}
              height={2048}
              loading="lazy"
            />
            <div className="scanner-overlay" aria-hidden="true">
              <span />
              <b>SCANNER ATIVO</b>
            </div>
            <div className="diagnostic-badge">
              <strong>Precisão</strong>
              <span>antes da substituição de peças</span>
            </div>
          </div>
          <div className="section-copy reveal">
            <span className="eyebrow">Diagnóstico que vai além do óbvio</span>
            <h2>Identificamos falhas que muitas oficinas não encontram.</h2>
            <p className="lead">
              Cada veículo passa por uma análise técnica detalhada para
              localizar a origem do problema, reduzir tentativas, evitar
              trocas desnecessárias e proteger seu investimento.
            </p>
            <div className="fault-grid">
              <span>
                <Check className="icon" /> Luz de injeção acesa
              </span>
              <span>
                <Check className="icon" /> Falhas elétricas intermitentes
              </span>
              <span>
                <Check className="icon" /> Problemas no câmbio automático
              </span>
              <span>
                <Check className="icon" /> ABS e Airbag com erro
              </span>
              <span>
                <Check className="icon" /> Perda de potência
              </span>
              <span>
                <Check className="icon" /> Consumo elevado
              </span>
            </div>
            <div className="notice-card">
              <ScanLine className="icon" />
              <div>
                <strong>Não trocamos peças por tentativa.</strong>
                <p>
                  Primeiro investigamos, testamos e explicamos. Depois,
                  apresentamos a solução recomendada.
                </p>
              </div>
            </div>
            <a
              className="btn btn--red btn--pulse"
              href={wa("Olá! Meu veículo apresenta uma falha e gostaria de agendar um diagnóstico.")}
              target="_blank"
              rel="noopener"
            >
              Quero diagnosticar meu carro <ArrowRight className="icon" />
            </a>
          </div>
        </div>
      </section>

      <section className="section section--soft process-section">
        <div className="container">
          <header className="section-heading reveal">
            <div>
              <span className="eyebrow">Nosso processo</span>
              <h2>Clareza do primeiro contato à entrega.</h2>
            </div>
            <p>
              Uma jornada simples, organizada e transparente para você saber o
              que está acontecendo com seu veículo.
            </p>
          </header>
          <div className="process-grid">
            <article className="process-card reveal">
              <b>01</b>
              <div className="process-card__icon">
                <ScanLine className="icon" />
              </div>
              <h3>Diagnóstico preciso</h3>
              <p>
                Avaliamos sintomas, histórico e sistemas para identificar a
                causa do problema.
              </p>
            </article>
            <article className="process-card reveal">
              <b>02</b>
              <div className="process-card__icon">
                <Phone className="icon" />
              </div>
              <h3>Explicação e orçamento</h3>
              <p>
                Apresentamos o diagnóstico e as alternativas com informações
                claras para sua decisão.
              </p>
            </article>
            <article className="process-card reveal">
              <b>03</b>
              <div className="process-card__icon">
                <Settings className="icon" />
              </div>
              <h3>Reparo especializado</h3>
              <p>
                Nossa equipe executa o serviço com procedimento técnico,
                organização e cuidado.
              </p>
            </article>
            <article className="process-card reveal">
              <b>04</b>
              <div className="process-card__icon">
                <Shield className="icon" />
              </div>
              <h3>Entrega confiável</h3>
              <p>
                Conferimos o funcionamento e entregamos o carro pronto para
                voltar à rotina.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section
        className="gallery-section"
        aria-label="Estrutura e serviços do Almeida Auto Center"
      >
        <div className="container gallery-section__heading reveal">
          <div>
            <span className="eyebrow eyebrow--light">Almeida por dentro</span>
            <h2>Estrutura, tecnologia e cuidado em cada detalhe.</h2>
          </div>
          <p>
            Ambiente preparado para receber seu veículo com organização e
            atenção técnica.
          </p>
        </div>
        <div className="gallery-marquee" data-marquee>
          <div className="gallery-track">
            {[0, 1].map((loop) =>
              Array.from({ length: 12 }, (_, i) => {
                const n = String(i + 1).padStart(2, "0");
                return (
                  <figure key={`${loop}-${n}`}>
                    <img
                      src={`/images/galeria-${n}.webp`}
                      alt={`Serviço e estrutura do Almeida Auto Center — foto ${n}`}
                      width={900}
                      height={1200}
                      loading={loop === 0 ? "eager" : "lazy"}
                    />
                  </figure>
                );
              })
            )}
          </div>
        </div>
      </section>

      <section className="section section--light video-section">
        <div className="container video-layout">
          <div className="section-copy reveal">
            <span className="eyebrow">Conheça nossa forma de trabalhar</span>
            <h2>Confiança também se constrói mostrando como fazemos.</h2>
            <p className="lead">
              Veja a estrutura, a equipe e o cuidado aplicado em cada etapa do
              atendimento no Almeida Auto Center.
            </p>
            <div className="mini-benefits">
              <span>
                <Shield className="icon" /> Atendimento responsável
              </span>
              <span>
                <ScanLine className="icon" /> Tecnologia de diagnóstico
              </span>
              <span>
                <Check className="icon" /> Explicação transparente
              </span>
            </div>
          </div>
          <div className="video-frame reveal">
            <iframe
              src={`https://player.vimeo.com/video/${settings.vimeoId}?title=0&byline=0&portrait=0`}
              title="Vídeo institucional Almeida Auto Center"
              allow="autoplay; fullscreen; picture-in-picture"
              loading="lazy"
              allowFullScreen
            />
            <span className="video-frame__glow" aria-hidden="true" />
          </div>
        </div>
      </section>

      <section className="section section--soft faq-section">
        <div className="container faq-layout">
          <div className="faq-intro reveal">
            <span className="eyebrow">Dúvidas frequentes</span>
            <h2>Informação clara antes mesmo de você chegar.</h2>
            <p>
              Selecionamos as dúvidas mais comuns para ajudar você a tomar uma
              decisão com tranquilidade.
            </p>
            <img
              src="/images/elevador-oficina.webp"
              alt="Veículo em elevador no Almeida Auto Center"
              width={2048}
              height={1536}
              loading="lazy"
            />
          </div>
          <div className="reveal">
            <FaqAccordion items={HOME_FAQS} />
          </div>
        </div>
      </section>
    </>
  );
}
