import { getSettings, siteUrl } from "@/lib/settings";
import { whatsappUrl, mapsUrl } from "@/lib/site-config";
import { SiteHeader } from "@/components/site/site-header";
import { SiteFooter } from "@/components/site/site-footer";
import { RevealEngine } from "@/components/site/motion";
import { VisitTracker } from "@/components/site/visit-tracker";
import { Analytics } from "@/components/site/analytics";
import { JsonLd } from "@/components/site/json-ld";
import { localBusinessSchema, websiteSchema } from "@/lib/seo";

export default async function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const settings = await getSettings();
  const base = siteUrl(settings);

  return (
    <div className="site-shell">
      <Analytics ga4Id={settings.ga4Id} gtmId={settings.gtmId} />
      <JsonLd
        data={[
          localBusinessSchema(settings, base),
          websiteSchema(settings, base),
        ]}
      />
      <VisitTracker />
      <a className="skip-link" href="#conteudo">
        Ir para o conteúdo
      </a>
      <SiteHeader settings={settings} whatsappUrl={whatsappUrl(settings)} />
      <main id="conteudo" className="site-main">
        {children}
      </main>
      <SiteFooter
        settings={settings}
        whatsappUrl={whatsappUrl(settings, settings.whatsappFloatingMessage)}
        mapsUrl={mapsUrl(settings)}
      />
      <RevealEngine />
    </div>
  );
}
