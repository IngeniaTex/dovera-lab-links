/**
 * All content of the link-in-bio page. Taken from dovera-lab-web (data/site.ts → brand, contact, linkInBio).
 * This repo only contains this page, so links to the main site are absolute (built from `mainSite`).
 * Fields left as "" are hidden by the page.
 */
export const links = {
  // Public URL of this page (canonical, Open Graph). Temporary Vercel URL; change it when the final domain is added.
  pageUrl: "https://dovera-lab-links.vercel.app",
  // Main website; relative hrefs below ("/#servicios") are resolved against it.
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
    shortAddress: "Av. José Vasconcelos 325, Mérida",
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
    { label: "Servicios y precios", href: "/#servicios", icon: "grid", accent: "orange" },
    { label: "Escaneo intraoral", href: "/servicios/escaneo-intraoral", icon: "scan", accent: "lime", tag: "A domicilio" },
    {
      label: "Cómo llegar",
      href: "https://www.google.com/maps/search/?api=1&query=Dovera+Lab+Plaza+2710+Av.+Jos%C3%A9+Vasconcelos+325+M%C3%A9rida",
      icon: "pin",
      accent: "gray",
    },
  ],
};

/** Resolves "/path" against the main site; mailto:, tel: and absolute URLs are returned unchanged. */
export const resolveHref = (href: string) => (href.startsWith("/") ? `${links.mainSite}${href}` : href);
