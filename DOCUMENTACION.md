# Documentación del proyecto — Guinea Equatorial Archivos

Archivo digital de fotografías históricas de Guinea Ecuatorial durante el periodo colonial español (1778–1968).

---

## Índice

1. [Descripción general](#descripción-general)
2. [Tecnologías](#tecnologías)
3. [Estructura del proyecto](#estructura-del-proyecto)
4. [Configuración y ejecución](#configuración-y-ejecución)
5. [Firebase](#firebase)
6. [Panel de administración](#panel-de-administración)
7. [Rutas del sitio público](#rutas-del-sitio-público)
8. [Internacionalización (i18n)](#internacionalización-i18n)
9. [Despliegue](#despliegue)

---

## Descripción general

Sitio web tipo museo que muestra:

- **Galería de fotos** históricas con título, año, ubicación, descripción y biografía breve
- **Biografías** por categorías: Cultura, Música, Personas Históricas, Política
- **Panel de administración** para gestionar fotos, biografías y ajustes del sitio
- **Soporte bilingüe** (español y francés)

---

## Tecnologías

| Tecnología        | Uso                              |
|-------------------|-----------------------------------|
| Next.js 15        | Framework React con App Router    |
| React 18          | Interfaz de usuario               |
| TypeScript        | Tipado estático                   |
| Tailwind CSS v4   | Estilos                           |
| Firebase          | Backend: Firestore, Storage, Auth |
| Radix UI          | Componentes accesibles            |

---

## Estructura del proyecto

```
src/
├── app/
│   ├── admin/              # Panel de administración
│   │   ├── layout.tsx      # Layout con auth
│   │   ├── login/          # Login con Firebase Auth
│   │   ├── page.tsx        # Dashboard
│   │   ├── photos/         # CRUD fotos
│   │   ├── biographies/    # CRUD biografías
│   │   └── settings/       # Ajustes del sitio
│   ├── gallery/            # Galería de fotos
│   ├── photo/[id]/         # Detalle de foto
│   ├── biografias/         # Listado biografías
│   │   └── [category]/[id] # Detalle biografía
│   ├── about/              # Página Acerca de
│   ├── components/         # Componentes compartidos
│   └── providers.tsx       # Contextos (locale, theme, settings)
├── context/                # SiteSettingsContext (Firestore)
├── hooks/                  # useContent (photos, biographies)
├── lib/                    # firebase.ts (config)
├── i18n/                   # Traducciones es/fr
└── data/                   # Datos estáticos (fallback)
```

---

## Configuración y ejecución

### Requisitos

- Node.js >= 18
- Cuenta Firebase

### Instalación

```bash
npm install
```

### Variables de entorno

Crear `.env.local` a partir de `.env.local.example`:

```
NEXT_PUBLIC_FIREBASE_API_KEY=...
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=...
NEXT_PUBLIC_FIREBASE_PROJECT_ID=...
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=...
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=...
NEXT_PUBLIC_FIREBASE_APP_ID=...
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=...
```

### Scripts

| Comando         | Descripción                    |
|-----------------|--------------------------------|
| `npm run dev`   | Servidor de desarrollo         |
| `npm run build` | Build de producción            |
| `npm run start` | Servidor de producción         |
| `npm run lint`  | Ejecutar ESLint                |

---

## Firebase

### Servicios usados

- **Firestore**: Fotos, biografías, ajustes del sitio
- **Storage**: Imágenes subidas (carpetas `photos/` y `biographies/`)
- **Authentication**: Login del admin (email/contraseña)

### Colecciones Firestore

| Colección    | Uso                                                                 |
|-------------|----------------------------------------------------------------------|
| `photos`    | Galería: title, year, location, description, source, imageUrl, category, bio |
| `biographies` | Biografías: category, name, imageUrl, year, description, works    |
| `settings/global` | Configuración: siteName, description, maintenanceMode, theme.primaryColor |

### Reglas

Desplegar reglas:

```bash
firebase login
firebase deploy --only firestore:rules,storage
```

---

## Panel de administración

### Acceso

- URL: `/admin`
- Login: Firebase Auth (crear usuarios en Firebase Console → Authentication)

### Secciones

#### Photos (`/admin/photos`)
- Añadir, editar y borrar fotos
- **Imagen**: URL, subida local o enlace de Google Drive
- **Campos**: título, año, ubicación, descripción, categoría, biografía breve, fuente
- **Categorías**: Música, Política, Cultura, Personas Históricas, Otro

#### Biographies (`/admin/biographies`)
- Añadir, editar y borrar biografías
- **Imagen**: URL, subida local o Google Drive
- **Campos**: categoría (select), nombre, año, descripción/biografía
- **Categorías**: Cultura, Música, Personas Históricas, Política

#### Settings (`/admin/settings`)
- Nombre del sitio
- Descripción
- Modo mantenimiento
- Color primario (tema)

### Sincronización

El contenido del admin se sincroniza en tiempo real con el sitio público vía Firestore (`onSnapshot`).

---

## Rutas del sitio público

| Ruta                    | Descripción                         |
|-------------------------|-------------------------------------|
| `/`                     | Página principal                    |
| `/gallery`              | Galería de fotos                    |
| `/photo/[id]`           | Detalle de una foto                 |
| `/biografias`           | Listado de biografías por categoría |
| `/biografias/[category]`| Biografías de una categoría         |
| `/biografias/[category]/[id]` | Detalle de biografía          |
| `/about`                | Acerca de                           |
| `/admin`                | Panel de administración             |

---

## Internacionalización (i18n)

- Idiomas: español (es) y francés (fr)
- Archivos: `src/i18n/locales/es.json`, `fr.json`, `photos.es.json`, `photos.fr.json`
- Cambio de idioma: selector en la navegación
- Idioma guardado en `localStorage`

---

## Despliegue

### Vercel

El proyecto incluye `vercel.json`. En Vercel configurar las variables de entorno de Firebase.

### Build

```bash
npm run build
```

### Firebase Hosting (opcional)

```bash
firebase deploy --only hosting
```

---

## Repositorio

**GitHub:** https://github.com/Carlos-tech-eg/equatorial-guinea-archive
