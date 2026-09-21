---
Task ID: 1 (single-agent, full conversion)
Agent: Z.ai Code (main)
Task: Conversão do site PHP "Almeida Auto Center" para Next.js 16 + TypeScript, com painel admin, contador de visitas, SEO Enterprise e deploy Vercel+Neon (PostgreSQL).

Work Log:
- Extraído e analisado o zip PHP (index/sobre/servicos/contato/404, config.php, style.css 38KB, main.js, 31 imagens WebP).
- Assets copiados para public/; CSS original portado para src/styles/site.css (identidade visual preservada 1:1) + extensões para blog/admin-shell/sticky-footer.
- next.config.ts: redirects 301 das URLs .php, security headers (HSTS, nosniff, frame-options, referrer-policy), cache imutável de imagens, compress.
- Prisma: models AdminUser, SiteSetting, BlogPost, PageVisit, ContactLead, Image.
- Libs: site-config (defaults do config.php), settings (cache 5s), auth (sessão HMAC + scrypt), visits (bot filter, dedupe 20min, visitor hash diário), seo (builders de metadata + 9 schemas JSON-LD).
- APIs: /api/track, /api/admin/{auth,settings,blog,stats,upload,leads}, /api/images/[id].
- Componentes site: header (menu mobile), footer (CTA final editável, whatsapp-float, barra mobile), RevealEngine, Counter, FaqAccordion, WhatsAppForm, VisitTracker, JsonLd, Analytics (GA4/GTM).
- Páginas: /, /sobre, /servicos, /contato, /blog, /blog/[slug], not-found (404), /admin.
- Painel admin: setup de senha no 1º acesso, login/logout, troca de senha; abas Visão geral (KPIs, gráfico 30 dias TZ America/Sao_Paulo, top páginas, dispositivos, origens, atividade), Site e Banners (contato, banners por página com upload, textos editáveis), SEO (canonical, OG, robots, títulos/descrições por página com medidores, GA4/GTM), Blog (CRUD + upload de capa + SEO do artigo), Atendimentos (leads), Senha.
- SEO: sitemap.xml dinâmico (com blog), robots.txt (bloqueia /admin e /api), canonicals absolutos, OG/Twitter, AutoRepair+Organization+WebSite+WebPage+Breadcrumb+FAQ+Service+BlogPosting+VideoObject+Person, E-E-A-T, geo tags, preload LCP.
- Correções de bugs encontradas em verificação: allowFullScreen, hidratação (classe js no SSR), BigInt COUNT (SQLite→JS), agrupamento diário por TZ de São Paulo, tema dark do admin (classe .dark), menu mobile (setState em effect).
- Migração Vercel+Neon: schema provider postgresql (sem alternativas), build script = prisma generate && prisma db push --accept-data-loss --skip-generate && next build, .gitignore completo, .env.example, uploads armazenados no Postgres (Bytes) servidos por /api/images/[id] com cache imutável, try/catch build-safe nas consultas de página (blog vazio renderiza estado vazio), force-dynamic nas páginas com settings.
- Postgres real no sandbox (embedded-postgres, sem root) para validar tudo em runtime; build de produção executado com sucesso na ordem exigida.

Stage Summary:
- Conversão 1:1 concluída (mesmas seções, textos, paleta preto/vermelho, logo, Vimeo, mapa, WhatsApp) com refinamentos premium (lucide-react, hovers, reveals, scrollbar, focus-visible).
- Painel /admin funcional (senha criada no 1º acesso) e contador de visitas robusto com dedupe/bots/TZ correto.
- SEO Enterprise implementado e validado via curl/browser (canonical, OG, 9+ schemas, sitemap, robots).
- Deploy-ready: build verificado de ponta a ponta com PostgreSQL; única env necessária na Vercel: DATABASE_URL (Neon, sslmode=require). Nenhum passo manual fora do deploy, além de criar o projeto no Neon e cadastrar o domínio no Search Console.
