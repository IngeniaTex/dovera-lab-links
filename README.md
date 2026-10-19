# Dôvera Lab — Link in bio

Página de enlaces para el perfil de Instagram [@dovera.lab](https://www.instagram.com/dovera.lab/): una sola pantalla
móvil con el escaneo a domicilio destacado, el botón de WhatsApp, los enlaces principales y los datos de contacto.

Separada del sitio principal (`dovera-lab-web`) para vivir en su propio repositorio y dominio.

- **Stack:** Next.js 15 (App Router), React 19, TypeScript 5, CSS Modules, `lucide-react`
- **Hosting:** Vercel, como proyecto Next.js
- **Diseño:** manual de identidad de Dôvera (paleta, logotipo, sticker del sello). Usa DM Mono en lugar de
  Apercu Mono Pro, que requiere licencia.

## Estructura

```
app/
  layout.tsx        fuente, metadatos y Open Graph
  page.tsx          la página
  page.module.css   estilos (paleta --dv-* del manual)
  globals.css       reset mínimo y fondo negro
  icon.svg          favicon (monograma DÔ)
data/links.ts       todo el contenido: textos, enlaces, correo, WhatsApp
public/brand/       logo principal, monograma y sticker del sello (vectores del manual)
public/img/hero.jpg foto del banner
```

## Editar el contenido

Todo está en `data/links.ts`:

- **`pageUrl`:** dirección pública de esta página, usada en la URL canónica y en la imagen para compartir. Hoy es
  la URL temporal de Vercel; cámbiala cuando se conecte el dominio final.
- **`mainSite`:** dominio del sitio principal. Los enlaces que empiezan con `/` (por ejemplo `/#servicios`) se
  convierten en `https://www.doveralab.com/#servicios`.
- **`contact.whatsapp`:** si se deja vacío, el botón lima dice "Escríbenos" y lleva al formulario del sitio principal.
- **`items`:** los botones. Cada uno tiene `label`, `href`, `icon` (`send`, `grid`, `scan`, `pin`), `accent`
  (`coral`, `orange`, `lime`, `gray`) y una etiqueta opcional `tag`.

La ruta `/links` redirige a `/` (308), por si alguien llega con la dirección anterior. La regla está en
`next.config.mjs`.

### Pendiente de confirmar con el cliente

- **Correo oficial:** se usa info@doveralab.com; el sitio anterior también mostraba info@doveradental.com.
- **WhatsApp:** se asume que 999 641 32 35 tiene WhatsApp.

## Scripts

```bash
npm install
npm run dev     # http://localhost:3000
npm run build
npm run start   # sirve el build de producción
npm run lint
```

No uses `npm run build` con `npm run dev` corriendo, porque comparten `.next`. Detén dev, compila, borra `.next`
y vuelve a levantar dev.

No usa variables de entorno.

## Hosting (Vercel)

- **Despliegue:** proyecto Next.js en Vercel conectado a `IngeniaTex/dovera-lab-links`. Cada merge a `main` publica
  producción y cada PR genera un preview. No necesita configuración extra: Vercel detecta Next.js.
- **Imágenes:** `next/image` usa la optimización de Vercel (AVIF/WebP).
- **Redirección:** `/links` → `/` está en `next.config.mjs`.
- **Dominio:** por ahora la URL temporal https://dovera-lab-links.vercel.app. Cuando se elija el dominio final, agrégalo en Vercel → Settings →
  Domains y actualiza `pageUrl` en `data/links.ts`.
