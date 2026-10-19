# Dôvera Lab — Link in bio

Página de enlaces para el perfil de Instagram [@dovera.lab](https://www.instagram.com/dovera.lab/): una sola pantalla
móvil con el escaneo a domicilio destacado, el botón de WhatsApp, los enlaces principales y los datos de contacto.

Separada del sitio principal (`dovera-lab-web`) para vivir en su propio repositorio y dominio.

- **Stack:** Next.js 15 (App Router, exportación estática), React 19, TypeScript 5, CSS Modules, `lucide-react`
- **Hosting:** Cloudflare Workers (static assets), por ahora en `*.workers.dev`
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

- **`pageUrl`:** dominio final de esta página. Cámbialo antes de publicar, porque se usa en los metadatos y en la
  imagen para compartir.
- **`mainSite`:** dominio del sitio principal. Los enlaces que empiezan con `/` (por ejemplo `/#servicios`) se
  convierten en `https://www.doveralab.com/#servicios`.
- **`contact.whatsapp`:** si se deja vacío, el botón lima dice "Escríbenos" y lleva al formulario del sitio principal.
- **`items`:** los botones. Cada uno tiene `label`, `href`, `icon` (`send`, `grid`, `scan`, `pin`), `accent`
  (`coral`, `orange`, `lime`, `gray`) y una etiqueta opcional `tag`.

La ruta `/links` redirige a `/` (301), por si alguien llega con la dirección anterior. La regla está en
`public/_redirects`.

### Pendiente de confirmar con el cliente

- **Correo oficial:** se usa info@doveralab.com; el sitio anterior también mostraba info@doveradental.com.
- **WhatsApp:** se asume que 999 641 32 35 tiene WhatsApp.

## Scripts

Requiere **Node 22+** (Wrangler). Con nvm: `nvm use`, que lee `.nvmrc`.

```bash
npm install
npm run dev       # desarrollo con Next, http://localhost:3000
npm run build     # exportación estática a ./out
npm run start     # sirve ./out con wrangler dev, http://localhost:8787 (igual que producción)
npm run preview   # build + wrangler dev
npm run deploy    # build + wrangler deploy (normalmente lo hace Cloudflare al hacer merge a main)
npm run lint
```

No uses `npm run build` con `npm run dev` corriendo, porque comparten `.next`. Detén dev, compila, borra `.next`
y vuelve a levantar dev.

No usa variables de entorno.

## Hosting (Cloudflare Workers)

- **Configuración:** `next.config.mjs` usa `output: "export"` e `images: { unoptimized: true }`. `wrangler.jsonc` sirve
  `./out` como assets estáticos, con estas opciones:
  - `auto-trailing-slash`: `/index.html` lleva a `/`.
  - `404-page`: las rutas que no existen responden 404 con `out/404.html`.
  - `observability`: activa los logs del Worker.
- **Encabezados y redirecciones:** `public/_headers` pone caché inmutable de un año en `/_next/static/*`.
  `public/_redirects` tiene la redirección de `/links`.
- **Despliegue:** Cloudflare Workers Builds conectado a `IngeniaTex/dovera-lab-links`. Cada merge a `main` compila
  (`npm run build`) y publica (`npx wrangler deploy`). El nombre del Worker en el dashboard debe ser
  `dovera-lab-links`, igual que `name` en `wrangler.jsonc`.
- **Dominio:** por ahora solo `*.workers.dev`. Para usar `links.doveralab.com` primero hay que mover el DNS de
  doveralab.com de Wix a Cloudflare (conservando los registros de Wix y el correo de GoDaddy). Luego se agrega
  `"routes": [{ "pattern": "links.doveralab.com", "custom_domain": true }]` en `wrangler.jsonc` y se actualiza
  `pageUrl` en `data/links.ts`.

### Restricciones de la exportación estática

Al ser exportación estática, no se puede usar nada que necesite servidor en tiempo de ejecución:

- API routes
- `middleware`
- `headers()` / `cookies()`
- ISR o `revalidate`
- server actions
- `redirects()` / `rewrites()` en `next.config.mjs`: usa `public/_redirects` y `public/_headers` en su lugar

Las imágenes de `next/image` se sirven sin optimizar.
