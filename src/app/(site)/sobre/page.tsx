export const dynamic = "force-dynamic";

import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight, Check, Settings, Shield, Star } from "lucide-react";
import { getSettings, siteUrl } from "@/lib/settings";
import { whatsappUrl } from "@/lib/site-config";
import { breadcrumbSchema, buildMetadata, webPageSchema } from "@/lib/seo";
import { WhatsAppIcon } from "@/components/site/whatsapp-icon";
import { JsonLd } from "@/components/site/json-ld";

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSettings();
  return buildMetadata({
    settings,
    baseUrl: siteUrl(settings),
    title: settings.seoSobreTitle,
    description: settings.seoSobreDescription,
    path: "/sobre",
  });
}

export default async function SobrePage() {
  const settings = await getSettings();
  const base = siteUrl(settings);
  const wa = whatsappUrl(
    settings,
    "Olá! Gostaria de conhecer melhor os serviços do Almeida Auto Center."
  );

  return (
    <>
      <JsonLd
        data={[
          webPageSchema(
            settings,
            base,
            "/sobre",
            settings.seoSobreTitle,
            settings.seoSobreDescription
          ),
          breadcrumbSchema(base, [
            { name: "Início", path: "/" },
            { name: "Sobre nós", path: "/sobre" },
          ]),
          {
            "@context": "https://schema.org",
            "@type": "Person",
            name: "Sr. Almeida",
            jobTitle: "Fundador",
            worksFor: { "@id": `${base}/#localbusiness` },
            description:
              "Fundador do Almeida Auto Center, começou a trabalhar na área automotiva aos 11 anos e construiu uma referência em diagnóstico em Bady Bassitt desde 1989.",
          },
        ]}
      />

      <section className="page-hero page-hero--about">
        <div
          className="page-hero__bg"
          style={
            settings.bannerSobre
              ? { backgroundImage: `url('${settings.bannerSobre}')` }
              : undefined
          }
        />
        <div className="page-hero__overlay" />
        <div className="container page-hero__content reveal reveal--visible">
          <span className="eyebrow eyebrow--light">Sobre nós</span>
          <h1>Uma história construída com trabalho, confiança e evolução.</h1>
          <p>
            Desde 1989, cuidamos de veículos com conhecimento técnico,
            transparência e respeito por cada cliente.
          </p>
          <div className="breadcrumb">
            <Link href="/">Início</Link>
            <span>/</span>
            <strong>Sobre nós</strong>
          </div>
        </div>
      </section>

      <section className="section section--light story-section">
        <div className="container split-layout">
          <div className="story-media reveal">
            <img
              src="/images/especialista-wide.webp"
              alt="Profissional do Almeida Auto Center na oficina"
              width={2048}
              height={1152}
            />
            <div className="story-year">
              <strong>1989</strong>
              <span>o início de uma trajetória</span>
            </div>
          </div>
          <div className="section-copy reveal">
            <span className="eyebrow">
              Comprometidos com qualidade e confiança
            </span>
            <h2>Experiência que acompanha a evolução do automóvel.</h2>
            <p className="lead">
              Fundada pelo Sr. Almeida, que começou a trabalhar na área aos 11
              anos, a oficina cresceu acompanhando as transformações do setor
              automotivo e se tornou referência em Bady Bassitt e região.
            </p>
            <p>
              O Almeida Auto Center foi pioneiro na utilização de diagnósticos
              com scanner para aumentar a precisão, reduzir tentativas e
              oferecer reparos mais eficientes. Hoje, ao lado dos filhos
              Gabriel e Guilherme, a empresa mantém os valores que sustentaram
              sua trajetória: confiança, transparência, atendimento
              humanizado e busca constante por evolução técnica.
            </p>
            <p>
              Mais do que uma oficina, construímos relações duradouras. Cada
              veículo é atendido com responsabilidade, e cada cliente recebe
              explicações claras para tomar decisões com segurança.
            </p>
            <a className="btn btn--red" href={wa} target="_blank" rel="noopener">
              Falar com a equipe <ArrowRight className="icon" />
            </a>
          </div>
        </div>
      </section>

      <section className="section section--dark timeline-section">
        <div className="container">
          <header className="section-heading section-heading--light reveal">
            <div>
              <span className="eyebrow eyebrow--light">Nossa evolução</span>
              <h2>Tradição no atendimento. Tecnologia no diagnóstico.</h2>
            </div>
            <p>
              Uma trajetória marcada pela capacidade de aprender, investir e
              entregar cada vez mais precisão.
            </p>
          </header>
          <div className="timeline-grid">
            <article className="timeline-card reveal">
              <span>1989</span>
              <h3>Fundação</h3>
              <p>
                O Almeida Auto Center inicia sua história com foco em
                confiança, trabalho sério e atendimento próximo.
              </p>
            </article>
            <article className="timeline-card reveal">
              <span>Anos 2000</span>
              <h3>Evolução tecnológica</h3>
              <p>
                A oficina amplia a atuação e adota recursos de scanner e
                diagnóstico eletrônico para acompanhar veículos mais modernos.
              </p>
            </article>
            <article className="timeline-card reveal">
              <span>Hoje</span>
              <h3>Segunda geração</h3>
              <p>
                Gabriel e Guilherme seguem ao lado do fundador, integrando
                experiência, tecnologia e gestão de qualidade.
              </p>
            </article>
            <article className="timeline-card timeline-card--accent reveal">
              <span>Próximo passo</span>
              <h3>Melhoria contínua</h3>
              <p>
                Capacitação, processos e equipamentos atualizados para
                atender sistemas automotivos cada vez mais complexos.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className="section section--soft values-section">
        <div className="container">
          <header className="section-heading reveal">
            <div>
              <span className="eyebrow">O que nos orienta</span>
              <h2>Valores presentes em cada atendimento.</h2>
            </div>
            <p>
              Não basta reparar um veículo. É preciso cuidar da segurança, do
              tempo e da confiança de quem nos procura.
            </p>
          </header>
          <div className="value-grid">
            <article className="value-card reveal">
              <div>
                <Shield className="icon" />
              </div>
              <h3>Profissionalismo e comprometimento</h3>
              <p>
                Atendemos cada veículo com máxima atenção, organização e
                responsabilidade técnica.
              </p>
            </article>
            <article className="value-card reveal">
              <div>
                <Check className="icon" />
              </div>
              <h3>Práticas sustentáveis</h3>
              <p>
                Aplicamos procedimentos conscientes, descarte responsável e
                uso criterioso de materiais.
              </p>
            </article>
            <article className="value-card reveal">
              <div>
                <Settings className="icon" />
              </div>
              <h3>Segurança e qualidade</h3>
              <p>
                Executamos reparos confiáveis e verificamos o funcionamento
                dos sistemas antes da entrega.
              </p>
            </article>
            <article className="value-card reveal">
              <div>
                <Star className="icon" />
              </div>
              <h3>Foco no cliente</h3>
              <p>
                Comunicação transparente, atendimento ágil e respeito às
                necessidades de cada pessoa.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className="section section--light process-detail">
        <div className="container">
          <div className="process-detail__media reveal">
            <img
              src="/images/manutencao-premium.webp"
              alt="Equipe realizando serviço automotivo"
              width={2048}
              height={1536}
              loading="lazy"
            />
            <img
              src="/images/scanner-avancado.webp"
              alt="Diagnóstico técnico em veículo"
              width={2048}
              height={1536}
              loading="lazy"
            />
          </div>
          <div className="process-detail__content reveal">
            <span className="eyebrow">Nosso processo</span>
            <h2>Compromisso com qualidade e eficiência.</h2>
            <div className="process-steps-vertical">
              <article>
                <b>01</b>
                <div>
                  <h3>Diagnóstico preciso</h3>
                  <p>
                    Avaliamos cada sistema do veículo para identificar
                    problemas com rapidez e segurança.
                  </p>
                </div>
              </article>
              <article>
                <b>02</b>
                <div>
                  <h3>Reparo especializado</h3>
                  <p>
                    Profissionais capacitados executam o serviço com
                    procedimento, precisão e cuidado.
                  </p>
                </div>
              </article>
              <article>
                <b>03</b>
                <div>
                  <h3>Entrega confiável</h3>
                  <p>
                    Seu carro volta para você conferido, funcional e pronto
                    para rodar.
                  </p>
                </div>
              </article>
            </div>
          </div>
        </div>
      </section>

      <section className="section section--soft video-section">
        <div className="container video-layout">
          <div className="section-copy reveal">
            <span className="eyebrow">Veja de perto</span>
            <h2>Uma oficina preparada para cuidar do seu veículo.</h2>
            <p className="lead">
              Conheça um pouco da nossa estrutura, da equipe e da atenção
              aplicada em cada serviço.
            </p>
            <Link className="btn btn--dark" href="/servicos">
              Conhecer os serviços <ArrowRight className="icon" />
            </Link>
          </div>
          <div className="video-frame reveal">
            <iframe
              src={`https://player.vimeo.com/video/${settings.vimeoId}?title=0&byline=0&portrait=0`}
              title="Vídeo Almeida Auto Center"
              allow="autoplay; fullscreen; picture-in-picture"
              loading="lazy"
              allowFullScreen
            />
            <span className="video-frame__glow" />
          </div>
        </div>
      </section>
    </>
  );
}
