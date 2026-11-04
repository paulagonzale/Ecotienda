# EnergiAhorro

Proyecto académico de tienda virtual de equipos eficientes.

## Requisitos
- Visual Studio Code
- Node.js y npm
- Git

## Ejecutar localmente
1. Abre esta carpeta en VS Code.
2. Abre una terminal en la carpeta del proyecto.
3. Ejecuta `npm install` para instalar Sass, declarado en `devDependencies`.
4. Compila estilos con `npx sass scss/estilos.scss css/estilos.css`.
5. Abre `index.html` con Live Server o utiliza la extensión equivalente.

## Archivos
- `index.html`, `catalogo.html`, `nosotros.html`, `contacto.html`: páginas del sitio.
- `scss/_variables.scss`: parcial con variables.
- `scss/estilos.scss`: Sass fuente.
- `css/estilos.css`: hoja CSS enlazada por las cuatro páginas.
- `js/tienda.js`: productos, filtros, buscador y carrito.

## Personalización obligatoria del equipo
- Sustituir nombres y roles de `nosotros.html`.
- Ajustar el nombre del repositorio a `ecotienda-equipoN` según el equipo.
- Cada integrante debe realizar sus propios commits reales.
- Reemplazar esta lista de roles por los aportes efectivamente realizados.

## Publicar con GitHub Pages
1. Crea un repositorio público, por ejemplo `ecotienda-equipoN`.
2. Sube el contenido de esta carpeta a la rama `main`.
3. En GitHub abre Settings → Pages.
4. En Build and deployment selecciona Deploy from a branch, rama `main` y carpeta `/ (root)`.
5. Guarda y espera la URL que GitHub Pages proporciona.
6. Crea y publica la etiqueta: `git tag ea2` y `git push origin ea2`.

## Nota sobre los datos de ahorro
Los precios de productos son demostrativos. El cálculo utiliza 30 días de uso, diferencia de potencia y una tarifa de referencia de $890,26 COP/kWh publicada por Air-e en agosto de 2026. El kit solar usa un ahorro fijo ilustrativo de 18 kWh/mes, por lo que su resultado no equivale a una cotización técnica. El formulario de contacto solo valida datos en el navegador y no envía mensajes a un servidor.
