import Link from "next/link";
import { Clock, MapPin, Phone, Shield } from "lucide-react";
import { WhatsAppIcon } from "@/components/site/whatsapp-icon";
import type { SiteSettings } from "@/lib/site-config";

type Props = {
  settings: SiteSettings;
  whatsappUrl: string;
  mapsUrl: string;
};

export function SiteFooter({ settings, whatsappUrl, mapsUrl }: Props) {
  const year = new Date().getFullYear();

  return (
    <>
      <section className="final-cta">
        <div
          className="final-cta__bg"
          style={
            settings.bannerFinalCta
              ? {
                  backgroundImage: `linear-gradient(90deg,rgba(0,0,0,.96),rgba(0,0,0,.55)),url('${settings.bannerFinalCta}')`,
                }
              : undefined
          }
        />
        <div className="container final-cta__inner reveal">
          <div>
            <span className="eyebrow eyebrow--light">
              {settings.textFinalCtaEyebrow}
            </span>
            <h2>{settings.textFinalCtaTitle}</h2>
            <p>{settings.textFinalCtaSubtitle}</p>
          </div>
          <div className="final-cta__actions">
            <a
              className="btn btn--red btn--pulse"
              href={whatsappUrl}
              target="_blank"
              rel="noopener"
            >
              <WhatsAppIcon /> {settings.textFinalCtaButton}
            </a>
            <a className="btn btn--ghost-light" href={`tel:+${settings.phone}`}>
              <Phone className="icon" /> {settings.phoneDisplay}
            </a>
          </div>
        </div>
      </section>

      <footer className="site-footer">
        <div className="container footer-grid">
          <div className="footer-brand">
            <img
              src="/images/logo-almeida.png"
              alt={settings.siteName}
              width={413}
              height={116}
              loading="lazy"
            />
            <p>{settings.textFooterAbout}</p>
            <div className="footer-badge">
              <Shield className="icon" /> Desde 1989 cuidando de veículos e
              pessoas
            </div>
          </div>
          <div>
            <h3>Navegação</h3>
            <Link href="/">Início</Link>
            <Link href="/sobre">Sobre nós</Link>
            <Link href="/servicos">Serviços</Link>
            <Link href="/blog">Blog</Link>
            <Link href="/contato">Contato</Link>
          </div>
          <div>
            <h3>Serviços</h3>
            <Link href="/servicos/auto-eletrica">Auto elétrica</Link>
            <Link href="/servicos/mecanica-geral">Mecânica geral</Link>
            <Link href="/servicos/diagnostico-automotivo">Diagnóstico automotivo</Link>
            <Link href="/servicos/injecao-eletronica">Injeção eletrônica</Link>
            <Link href="/servicos/remap-reprogramacao-ecu">Conhecer Remap e ECU</Link>
            <Link href="/servicos#cambio">Câmbio automático</Link>
            <Link href="/servicos#seguranca">Airbag e ABS</Link>
          </div>
          <div className="footer-contact">
            <h3>Atendimento</h3>
            <a href={`tel:+${settings.phone}`}>
              <Phone className="icon" /> {settings.phoneDisplay}
            </a>
            <span>
              <Clock className="icon" /> {settings.hours}
            </span>
            <a href={mapsUrl} target="_blank" rel="noopener">
              <MapPin className="icon" /> {settings.address}
            </a>
          </div>
        </div>
        <div className="container footer-bottom">
          <span>
            © {year} {settings.siteName}. Todos os direitos reservados.
          </span>
          <span>Site otimizado para desktop e dispositivos móveis.</span>
        </div>
      </footer>

      <a
        className="whatsapp-float"
        href={whatsappUrl}
        target="_blank"
        rel="noopener"
        aria-label={`Falar com ${settings.siteName} pelo WhatsApp`}
      >
        <WhatsAppIcon />
        <span>WhatsApp</span>
      </a>

      <div className="mobile-conversion-bar" aria-label="Ações rápidas">
        <a href={`tel:+${settings.phone}`}>
          <Phone className="icon" />
          <span>Ligar</span>
        </a>
        <a
          className="mobile-conversion-bar__primary"
          href={whatsappUrl}
          target="_blank"
          rel="noopener"
        >
          <WhatsAppIcon />
          <span>Agendar</span>
        </a>
        <a href={mapsUrl} target="_blank" rel="noopener">
          <MapPin className="icon" />
          <span>Como chegar</span>
        </a>
      </div>
    </>
  );
}
