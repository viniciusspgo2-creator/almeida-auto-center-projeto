"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Clock, MapPin, Menu, Phone, X } from "lucide-react";
import { WhatsAppIcon } from "@/components/site/whatsapp-icon";
import type { SiteSettings } from "@/lib/site-config";

type Props = {
  settings: SiteSettings;
  whatsappUrl: string;
};

export function SiteHeader({ settings, whatsappUrl }: Props) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 24);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    document.body.classList.toggle("menu-open", open);
    return () => document.body.classList.remove("menu-open");
  }, [open]);

  const links = [
    { href: "/", label: "Início" },
    { href: "/sobre", label: "Sobre nós" },
    { href: "/servicos", label: "Serviços" },
    { href: "/servicos/remap-reprogramacao-ecu", label: "Performance" },
    { href: "/blog", label: "Blog" },
    { href: "/contato", label: "Contato" },
  ];

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <>
      <div className="topbar">
        <div className="container topbar__inner">
          <span>
            <Clock className="icon" /> {settings.hours}
          </span>
          <a href={`tel:+${settings.phone}`}>
            <Phone className="icon" /> {settings.phoneDisplay}
          </a>
          <span className="topbar__address">
            <MapPin className="icon" /> Bady Bassitt — SP
          </span>
        </div>
      </div>

      <header
        className={`site-header${scrolled ? " is-scrolled" : ""}`}
        data-header
      >
        <div className="container site-header__inner">
          <Link
            className="brand"
            href="/"
            aria-label={`${settings.siteName} — início`}
          >
            <img
              src="/images/logo-almeida.png"
              alt={settings.siteName}
              width={413}
              height={116}
              fetchPriority="high"
            />
          </Link>

          <nav className="desktop-nav" aria-label="Navegação principal">
            {links.map((link) => (
              <Link
                key={link.href}
                className={isActive(link.href) ? "is-active" : ""}
                href={link.href}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="header-actions">
            <a
              className="header-phone"
              href={`tel:+${settings.phone}`}
              aria-label={`Ligar para ${settings.siteName}`}
            >
              <Phone className="icon" />
            </a>
            <a
              className="btn btn--red btn--small btn--pulse"
              href={whatsappUrl}
              target="_blank"
              rel="noopener"
            >
              <WhatsAppIcon />
              <span>Agendar avaliação</span>
            </a>
            <button
              className="menu-toggle"
              type="button"
              aria-label={open ? "Fechar menu" : "Abrir menu"}
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
            >
              <span className="menu-icon-open">
                <Menu className="icon" />
              </span>
              <span className="menu-icon-close">
                <X className="icon" />
              </span>
            </button>
          </div>
        </div>

        <div className={`mobile-panel${open ? " is-open" : ""}`}>
          <nav aria-label="Navegação móvel">
            {links.map((link) => (
              <Link
                key={link.href}
                className={isActive(link.href) ? "is-active" : ""}
                href={link.href}
                onClick={() => setOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="mobile-panel__contact">
            <a href={`tel:+${settings.phone}`}>
              <Phone className="icon" /> {settings.phoneDisplay}
            </a>
            <span>
              <Clock className="icon" /> {settings.hours}
            </span>
          </div>
        </div>
      </header>
    </>
  );
}
