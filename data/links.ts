/**
 * All content of the link-in-bio page. Taken from dovera-lab-web (data/site.ts → brand, contact, linkInBio).
 * This repo only contains this page, so links to the main site are absolute (built from `mainSite`).
 * Fields left as "" are hidden by the page.
 */
type LinkItem = { label: string; href: string; icon: string; accent: string; tag?: string };

export const links = {
  // Public URL of this page (canonical, Open Graph). Temporary Vercel URL; change it when the final domain is added.
  pageUrl: "https://dovera-lab-links.vercel.app",
  // Main website; relative hrefs below ("/", "/#contacto") are resolved against it, except files under /docs/.
  mainSite: "https://www.doveralab.com",

  brand: {
    name: "Dôvera Lab",
    title: "Dôvera Lab | Enlaces",
    description:
      "Dôvera Lab, Mérida. Confeccionamos restauraciones libres de metal en disilicato de litio y zirconia, monolíticas y estratificadas. Carillas, coronas y puentes, encerados digitales, incrustaciones, prótesis sobre implantes, perio guides, zirconia y escaneo intraoral a domicilio.",
    // Text of the brand manual's "tecnología" sticker.
    craft: "Tecnología con maestría artesanal",
  },

  contact: {
    // The legacy site also shows info@doveradental.com; pending confirmation with the client.
    email: "info@doveralab.com",
    // Assumes 999 641 32 35 has WhatsApp. Set to "" to fall back to the main site's contact form.
    whatsapp: "https://wa.me/529996413235",
    shortAddress: "Calle 6A #325 esquina con 23, Col. Jardines de Vista Alegre",
  },

  eyebrow: "Laboratorio Dôvera · Mérida, Yucatán",
  heroImage: "/img/hero.jpg",
  heroImageAlt: "Coronas sobre implante",
  featured: {
    eyebrow: "Servicios y Soluciones",
    title: "Escaneo intraoral a domicilio",
  },
  ctaWhatsappLabel: "Escríbenos por WhatsApp",
  ctaFallbackLabel: "Escríbenos",
  ctaFallbackHref: "/#contacto",
  items: [
    { label: "Envíanos tu caso", href: "mailto:info@doveralab.com?subject=Nuevo%20caso", icon: "send", accent: "coral" },
    // PDF served by this page (public/docs/); replace the file keeping the same name to update prices.
    { label: "Servicios y precios", href: "/docs/servicios-y-precios.pdf", icon: "file", accent: "orange" },
    { label: "Visita nuestro sitio web", href: "/", icon: "globe", accent: "lime" },
    {
      label: "Cómo llegar",
      href: "https://www.google.com/maps/search/?api=1&query=Calle+6A+325+Jardines+de+Vista+Alegre+M%C3%A9rida+Yucat%C3%A1n",
      icon: "pin",
      accent: "gray",
    },
  ] as LinkItem[],
};

/**
 * Resolves "/path" against the main site. Files under /docs/ are served by this page, and mailto:, tel: and
 * absolute URLs are returned unchanged.
 */
export const resolveHref = (href: string) =>
  href.startsWith("/") && !href.startsWith("/docs/") ? `${links.mainSite}${href}` : href;
