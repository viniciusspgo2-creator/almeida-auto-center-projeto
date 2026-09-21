import Link from "next/link";
import { getSettings } from "@/lib/settings";
import { whatsappUrl } from "@/lib/site-config";
import { SiteHeader } from "@/components/site/site-header";
import { SiteFooter } from "@/components/site/site-footer";
import { RevealEngine } from "@/components/site/motion";

export const metadata = {
  title: "Página não encontrada",
  robots: { index: false, follow: false },
};

export default async function NotFound() {
  const settings = await getSettings();

  return (
    <div className="site-shell">
      <SiteHeader settings={settings} whatsappUrl={whatsappUrl(settings)} />
      <main id="conteudo" className="site-main">
        <section className="page-hero page-hero--contact">
          <div className="page-hero__bg" />
          <div className="page-hero__overlay" />
          <div className="container page-hero__content reveal reveal--visible">
            <span className="eyebrow eyebrow--light">Erro 404</span>
            <h1>Esta página saiu da rota.</h1>
            <p>
              Volte ao início ou fale com nossa equipe para encontrar a
              informação que procura.
            </p>
            <div className="page-hero__actions">
              <Link className="btn btn--red" href="/">
                Voltar ao início
              </Link>
              <Link className="btn btn--ghost-light" href="/contato">
                Falar conosco
              </Link>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter
        settings={settings}
        whatsappUrl={whatsappUrl(settings, settings.whatsappFloatingMessage)}
        mapsUrl={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(settings.address)}`}
      />
      <RevealEngine />
    </div>
  );
}
