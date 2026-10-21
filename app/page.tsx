import Image from "next/image";
import { ArrowUpRight, FileText, Globe, Mail, MapPin, MessageCircle, Send, type LucideIcon } from "lucide-react";
import { links, resolveHref } from "@/data/links";
import styles from "./page.module.css";

const icons: Record<string, LucideIcon> = { send: Send, file: FileText, globe: Globe, pin: MapPin };

// Everything except mailto: opens in a new tab (main site, PDF, WhatsApp, Maps), so Instagram's in-app browser keeps this page.
const newTab = (href: string) => (href.startsWith("mailto:") ? {} : { target: "_blank", rel: "noopener noreferrer" });

export default function LinksPage() {
  const { contact, brand } = links;
  const ctaHref = resolveHref(contact.whatsapp || links.ctaFallbackHref);

  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <img className={styles.logo} src="/brand/logo-principal.svg" alt={brand.name} width={248} height={46} />
        <p className={styles.eyebrow}>{links.eyebrow}</p>
      </header>

      <section className={styles.featured}>
        <p className={styles.featuredEyebrow}>{links.featured.eyebrow}</p>
        <h1 className={styles.featuredTitle}>{links.featured.title}</h1>
      </section>

      <div className={styles.photo}>
        <Image className={styles.photoImg} src={links.heroImage} alt={links.heroImageAlt} fill priority sizes="342px" />
        <img className={styles.sticker} src="/brand/sticker-sello.svg" alt="" width={76} height={76} />
      </div>

      <nav className={styles.links} aria-label={`Enlaces de ${brand.name}`}>
        <a className={styles.cta} href={ctaHref} {...newTab(ctaHref)}>
          <MessageCircle size={20} strokeWidth={1.75} aria-hidden />
          <span>{contact.whatsapp ? links.ctaWhatsappLabel : links.ctaFallbackLabel}</span>
        </a>
        {links.items.map((item) => {
          const Icon = icons[item.icon];
          const href = resolveHref(item.href);
          return (
            <a key={item.label} className={styles.link} href={href} {...newTab(href)}>
              <span className={`${styles.chip} ${styles[item.accent]}`}>
                <Icon size={20} strokeWidth={1.75} aria-hidden />
              </span>
              <span className={styles.linkLabel}>
                {item.label}
                {item.tag && <span className={styles.tag}>{item.tag}</span>}
              </span>
              <ArrowUpRight className={styles.arrow} size={18} strokeWidth={1.75} aria-hidden />
            </a>
          );
        })}
      </nav>

      <address className={styles.contact}>
        <a className={styles.contactRow} href={`mailto:${contact.email}`}>
          <Mail size={18} strokeWidth={1.75} aria-hidden />
          <span>{contact.email}</span>
        </a>
        <p className={styles.contactRow}>
          <MapPin size={18} strokeWidth={1.75} aria-hidden />
          <span>{contact.shortAddress}</span>
        </p>
      </address>

      <footer className={styles.footer}>
        <img src="/brand/monograma.svg" alt="" width={34} height={26} />
        <p className={styles.eyebrow}>{brand.craft}</p>
        <div className={styles.legal}>
          <p>{links.legal.copyright}</p>
          <a className={styles.credit} href={links.legal.creditHref} {...newTab(links.legal.creditHref)}>
            {links.legal.creditLabel}
          </a>
        </div>
      </footer>
    </main>
  );
}
