# Diseño de la web — Guinea Equatorial Archivos

Documento de diseño visual y de experiencia para el archivo digital de fotografías históricas de Guinea Ecuatorial.

---

## Índice

1. [Concepto y estética](#concepto-y-estética)
2. [Paleta de colores](#paleta-de-colores)
3. [Tipografía](#tipografía)
4. [Marcos y tratamiento de imágenes](#marcos-y-tratamiento-de-imágenes)
5. [Layout y estructura de páginas](#layout-y-estructura-de-páginas)
6. [Animaciones y transiciones](#animaciones-y-transiciones)
7. [Espaciado y contenedores](#espaciado-y-contenedores)
8. [Responsive y accesibilidad](#responsive-y-accesibilidad)

---

## Concepto y estética

- **Inspiración:** galería de museo, archivo histórico, exposición digital.
- **Sensación:** sobrio, atemporal, cuidado; las fotos son el centro.
- **Modo por defecto:** tema oscuro (modo claro disponible).
- **Acento:** dorado para etiquetas, bordes y CTAs, evocando archivo histórico.

---

## Paleta de colores

### Modo oscuro (por defecto)

| Variable / Uso        | Valor        | Descripción              |
|-----------------------|-------------|---------------------------|
| `--background`        | `#0a0a0b`   | Fondo principal           |
| `--foreground`        | `#fafaf9`   | Texto principal           |
| `--card`              | `#141416`   | Fondos de tarjetas        |
| `--muted`             | `#27272a`   | Fondos secundarios        |
| `--muted-foreground`  | `#a1a1aa`   | Texto secundario          |
| `--border`            | `#27272a`   | Bordes                    |
| `--accent`            | `#1f1f23`   | Fondos hover/activos      |
| `--accent-gold`       | `#d4a853`   | Dorado principal          |
| `--accent-gold-muted` | `#b8953e`   | Dorado hover              |
| `--archival-mat`      | `#1a1a1c`   | Passe-partout de fotos    |
| `--archival-frame-border` | `rgba(212,168,83,0.15)` | Borde marco archivo |
| `--archival-bg-subtle`| Gradiente radial dorado suave | Fondo galería/detalle |

### Modo claro

| Variable / Uso        | Valor        |
|-----------------------|-------------|
| `--background`       | `#fafaf9`   |
| `--foreground`        | `#18181b`   |
| `--card`              | `#ffffff`   |
| `--muted`             | `#f4f4f5`   |
| `--muted-foreground`  | `#71717a`   |
| `--border`            | `#e4e4e7`   |
| `--accent-gold`       | `#b45309`   |
| `--archival-mat`      | `#f5f3ef`   (tono pergamino) |

### Sombras de marcos (archivo)

- **Reposo:** `0 4px 24px rgba(0,0,0,0.4)` + borde dorado muy sutil.
- **Hover:** `0 12px 48px rgba(0,0,0,0.5)` + borde dorado más visible.

---

## Tipografía

| Uso              | Fuente                | Peso / estilo |
|------------------|------------------------|---------------|
| Títulos (h1–h6)  | Cormorant Garamond     | 300–700, light por defecto |
| Cuerpo y UI      | DM Sans                | 300–600       |
| Fallback serif   | Georgia                | —             |
| Fallback sans    | system-ui, Segoe UI    | —             |

- **Tamaño base:** 16px (`--font-size`).
- **Letter-spacing:** -0.02em en títulos, -0.01em en body.
- **Line-height:** títulos 1.1–1.4, párrafos 1.7.
- **Etiquetas / uppercase:** tracking amplio (0.15em–0.2em), a menudo en dorado.

---

## Marcos y tratamiento de imágenes

### Marco archivístico (`ArchivalImageFrame`)

- **Passe-partout (mat):** color `--archival-mat`, padding 3–4 (galería) u 4–8 (detalle).
- **Borde:** `--archival-frame-border`, `rounded-sm`.
- **Sombra:** variables `--archival-frame-shadow` y `--archival-frame-shadow-hover`.
- **Imagen:** `object-contain`, se respeta la relación de aspecto; sin recortes forzados.
- **Caption:** debajo de la imagen; fecha y ubicación en uppercase, tracking amplio; descripción opcional.

### Galería (grid de inicio `HomeHeroGrid`)

- **Grid:** 5 imágenes en layout tipo masonry:
  - Fila 1: imagen grande horizontal (2/3) + imagen alta vertical (1/3).
  - Fila 2: imagen ancha horizontal + dos apiladas (cuadrada + vertical).
- **Tamaños:** contenedor `max-w-5xl`; alturas máximas por celda (ej. 180–320px según breakpoint).
- **Efecto:** sepia ligero (~12%) que se quita en hover; zoom suave (scale 1.03) en hover.
- **Overlay:** gradiente inferior con fecha y ubicación en blanco.

### Galería de fotos (`/gallery`)

- Tarjetas con marco archivístico, caption (fecha, ubicación) y título debajo.
- Imágenes con `object-contain` y alturas máximas para no verse desproporcionadas.

### Detalle de foto (`/photo/[id]`)

- Marco archivístico variante “detail”: más padding, imagen con `max-h` en vh para no dominar la pantalla.
- Caption opcional debajo; metadata (fecha, ubicación, fuente, contexto) en columna lateral.

---

## Layout y estructura de páginas

### Navegación

- Sticky, fondo con blur; enlaces en uppercase y tracking amplio.
- Enlace activo: dorado y fondo `--accent`.
- Selector de idioma (ES/FR) y botón de tema (claro/oscuro).

### Home

1. **Hero:** periodo, título, línea dorada, intro, CTAs (Galería, Biografías).
2. **Grid de fotos:** 5 imágenes históricas (Firebase o fallback Wikimedia).
3. **Sección propósito:** título + texto en grid 4/8.
4. **Widget biografías:** categorías con enlaces.
5. **Sección contexto:** título + texto.

### Galería

- Cabecera con etiqueta, título y subtítulo.
- Grid 2 columnas (1 en móvil), contenedor con clase `gallery-container` (max-width 72rem).

### Pie de página

- Marca “Guinea Equatorial Archivos”, tagline y enlaces (Inicio, Galería, Biografías, About, Admin).

---

## Animaciones y transiciones

- **Duración típica:** 300–500 ms; 700 ms para zoom de imágenes.
- **Easing:** `ease-out` o curva personalizada `[0.25, 0.4, 0.25, 1]`.
- **Hero (home):** entrada escalonada (stagger) de periodo, título, línea, intro y botones.
- **Secciones:** aparición al entrar en viewport (`AnimateInView`: opacity + translateY).
- **Galería:** stagger en las tarjetas al hacer scroll.
- **Hover en imágenes:** zoom suave, sombra más marcada, borde dorado.
- **Scroll:** `scroll-behavior: smooth` en `html`.
- **Keyframes globales:** `fade-in-up`, `fade-in`, `scale-in` (clases `.animate-*`).

---

## Espaciado y contenedores

- **Container:** `container mx-auto px-3 sm:px-6 lg:px-10`, `max-w-[100vw]`.
- **Galería:** además `gallery-container` → `max-width: min(72rem, 100%)`.
- **Grid inicio:** `max-w-5xl` para el bloque de 5 fotos.
- **Gaps:** 3–4 (móvil), 4–5 (tablet), 5–6 (desktop); en grids más grandes 10–16.
- **Secciones:** padding vertical 8–16 (sm) y 16–24 (lg).

---

## Responsive y accesibilidad

- **Breakpoints:** Tailwind por defecto (sm 640px, md 768px, lg 1024px, xl 1280px).
- **Imágenes:** `loading="lazy"` donde proceda; `ImageWithFallback` para errores.
- **Contraste:** texto sobre fondo cumple ratios de contraste; dorado sobre oscuro revisado.
- **Focus:** estilos de `outline`/ring para teclado.
- **Áreas táctiles:** botones/enlaces con `min-h-[44px]` donde aplica.
- **Semántica:** `header`, `main`, `footer`, `nav`, `article`, `figure`/`figcaption` usados en las páginas principales.

---

## Resumen de archivos clave de diseño

| Archivo / recurso     | Contenido principal                          |
|-----------------------|----------------------------------------------|
| `src/app/globals.css` | Variables de tema, fuentes, animaciones, base |
| `ArchivalImageFrame.tsx` | Marco y caption de fotos tipo archivo    |
| `HomeHeroGrid.tsx`    | Grid de 5 fotos en home                       |
| `gallery.tsx`         | Layout y tarjetas de galería                  |
| `photo-detail.tsx`    | Layout detalle con marco y metadata          |
| `navigation.tsx`      | Barra de navegación y controles de tema/i18n |
| `footer.tsx`          | Pie de página                                |

---

*Documento de diseño — Guinea Equatorial Archivos. Actualizado según el estado actual del proyecto.*
