/**
 * Central site configuration defaults.
 * Mirrors the original PHP `includes/config.php` values so the
 * conversion keeps 1:1 content parity. All values are editable
 * through the admin panel (stored in the SiteSetting table).
 */

export const SITE_SLUG = "Almeida Auto Center";

export type SiteSettings = {
  // Identidade / contato
  siteName: string;
  phoneDisplay: string;
  phone: string; // digits only for tel: and wa.me
  address: string;
  hours: string;
  vimeoId: string;
  whatsappDefaultMessage: string;
  whatsappFloatingMessage: string;

  // Banners (empty = default CSS banner)
  bannerHome: string;
  bannerSobre: string;
  bannerServicos: string;
  bannerContato: string;
  bannerFinalCta: string;

  // Textos editáveis
  textFinalCtaEyebrow: string;
  textFinalCtaTitle: string;
  textFinalCtaSubtitle: string;
  textFinalCtaButton: string;
  textFooterAbout: string;

  // SEO global
  seoSiteUrl: string; // canonical domain e.g. https://almeidaautocenter.com.br
  seoOgImage: string;
  seoThemeColor: string;
  seoTitleSuffix: string;
  seoRobotsIndex: string; // "index,follow" | "noindex,nofollow"

  // SEO por página
  seoHomeTitle: string;
  seoHomeDescription: string;
  seoHomeKeywords: string;
  seoSobreTitle: string;
  seoSobreDescription: string;
  seoServicosTitle: string;
  seoServicosDescription: string;
  seoContatoTitle: string;
  seoContatoDescription: string;

  // Analytics
  ga4Id: string;
  gtmId: string;
};

/** Defaults copied verbatim from the PHP site */
export const DEFAULT_SETTINGS: SiteSettings = {
  siteName: "Almeida Auto Center",
  phoneDisplay: "(17) 98170-8538",
  phone: "5517981708538",
  address:
    "Av. Marginal José Marquês de Mendonça, 1135 - Jd. Primavera, Bady Bassitt - SP",
  hours: "Segunda a sexta, das 07:30 às 18:00",
  vimeoId: "1190736620",
  whatsappDefaultMessage:
    "Olá! Gostaria de agendar uma avaliação no Almeida Auto Center.",
  whatsappFloatingMessage:
    "Olá! Quero agendar uma avaliação para o meu veículo.",

  bannerHome: "",
  bannerSobre: "",
  bannerServicos: "",
  bannerContato: "",
  bannerFinalCta: "",

  textFinalCtaEyebrow: "Seu carro merece um diagnóstico de verdade",
  textFinalCtaTitle: "Fale com quem entende a origem do problema.",
  textFinalCtaSubtitle:
    "Agende uma avaliação e receba orientação clara antes de autorizar qualquer reparo.",
  textFinalCtaButton: "Agendar pelo WhatsApp",
  textFooterAbout:
    "Diagnóstico preciso, reparos confiáveis e atendimento transparente em Bady Bassitt e região.",

  seoSiteUrl: "",
  seoOgImage: "/og-almeida.jpg",
  seoThemeColor: "#090909",
  seoTitleSuffix: SITE_SLUG,
  seoRobotsIndex: "index,follow",

  seoHomeTitle: "Almeida Auto Center | Diagnóstico Automotivo em Bady Bassitt",
  seoHomeDescription:
    "Diagnóstico preciso e reparo rápido para seu carro. Mecânica, elétrica, injeção eletrônica, câmbio automático, Airbag e ABS em Bady Bassitt-SP.",
  seoHomeKeywords:
    "oficina bady bassitt, diagnóstico automotivo, injeção eletrônica, câmbio automático, airbag, abs, mecânica, elétrica automotiva",
  seoSobreTitle: "Sobre Nós | Almeida Auto Center",
  seoSobreDescription:
    "Conheça a história do Almeida Auto Center, referência em Bady Bassitt desde 1989 em diagnóstico, mecânica, elétrica e atendimento transparente.",
  seoServicosTitle: "Serviços Automotivos | Almeida Auto Center",
  seoServicosDescription:
    "Mecânica, elétrica, injeção eletrônica, câmbio automático, Airbag, ABS, ar-condicionado, scanner e manutenção preventiva em Bady Bassitt.",
  seoContatoTitle: "Contato e Agendamento | Almeida Auto Center",
  seoContatoDescription:
    "Fale com o Almeida Auto Center em Bady Bassitt. Agende diagnóstico, mecânica, elétrica, câmbio automático, Airbag ou ABS pelo WhatsApp.",

  ga4Id: "",
  gtmId: "",
};

export const SETTINGS_KEYS = Object.keys(DEFAULT_SETTINGS) as (keyof SiteSettings)[];

export function whatsappUrl(settings: SiteSettings, message?: string): string {
  const msg = message ?? settings.whatsappDefaultMessage;
  return `https://wa.me/${settings.phone}?text=${encodeURIComponent(msg)}`;
}

export function mapsUrl(settings: SiteSettings): string {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    settings.address
  )}`;
}

export function telUrl(settings: SiteSettings): string {
  return `tel:+${settings.phone}`;
}
