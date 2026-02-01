# Cómo abrir y ejecutar el proyecto

## 1. Abrir el proyecto en Cursor

**Importante:** abre la carpeta donde está el código, no la carpeta de Cursor.

- En Cursor: **File → Open Folder** (o **Archivo → Abrir carpeta**).
- Navega y selecciona esta carpeta:
  ```
  C:\Users\hp\OneDrive\Desktop\Museum-Style Historical Archive Website
  ```
- Debe ser la carpeta que contiene `package.json`, `src`, `public`, etc.

Si abres otra carpeta (por ejemplo la de Cursor en `.cursor\projects\...`), no verás el código y el proyecto no funcionará.

---

## 2. Ejecutar el proyecto (servidor de desarrollo)

1. Abre la **terminal** en Cursor (Terminal → New Terminal).
2. Comprueba que estés en la raíz del proyecto (deberías ver `package.json` si haces `dir` o `ls`).
3. Si no estás en la raíz, ve a ella:
   ```bash
   cd "C:\Users\hp\OneDrive\Desktop\Museum-Style Historical Archive Website"
   ```
4. Instala dependencias (solo la primera vez o si borraste `node_modules`):
   ```bash
   npm install
   ```
5. Arranca el servidor:
   ```bash
   npm run dev
   ```
6. Cuando aparezca **Ready** o **Local: http://localhost:3000**, abre el navegador en:
   **http://localhost:3000**

---

## 3. Si sigue sin abrirse

- **OneDrive:** el proyecto está en OneDrive. Si los archivos están “solo en la nube” (no descargados), haz clic derecho en la carpeta del proyecto → “Always keep on this device” para que se descargue todo.
- **Puerto 3000 en uso:** si otro programa usa el puerto 3000, cierra esa app o ejecuta en otro puerto:
  ```bash
  npm run dev -- -p 3001
  ```
  Luego abre **http://localhost:3001**
- **Borrar caché y reinstalar:** en la raíz del proyecto:
  ```bash
  rmdir /s /q .next
  npm install
  npm run dev
  ```
