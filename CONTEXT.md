# CONTEXTO DEL PROYECTO: IESPH-VANILLA

> **Documento de Contexto Técnico, Datos del Sitio Original y Guía de Réplica Modular**  
> **Repositorio**: IESPH-VANILLA (HTML5, Tailwind CSS v4, JavaScript Vanilla)  
> **Referencia Oficial**: [https://iesphuanta.edu.pe/](https://iesphuanta.edu.pe/)  
> **Denominación Oficial Canónica**: **Instituto de Educación Superior Público "Huanta" (IESPH)**  
> *(Prohibido terminantemente el uso del término "Tecnológico" o la sigla "IESTP")*

---

## 1. Propósito y Enfoque de Desarrollo

Este repositorio tiene como propósito construir una réplica fiel, elegante y de alto rendimiento del portal institucional oficial del **IESPH**, respetando la estética, jerarquías, colores, tipografías y orden de secciones del sitio web original desarrollado en WordPress.

### Principios Rectores:
1. **Cero Sobreingeniería (KISS & YAGNI)**: Sin frameworks pesados (sin React, Vue o Angular), sin bundlers complejos ni configuraciones innecesarias. 
2. **Modularidad Nativa**: Arquitectura desacoplada en archivos HTML atómicos (`components/*.html`) orquestados de forma asíncrona mediante un cargador ligero en `js/app.js`.
3. **Estándares Web Modernos**: HTML5 semántico, Tailwind CSS v4 compilado mediante CLI oficial y JavaScript Vanilla (ES6+) estructurado y legible.
4. **Fidelidad Visual y Accesibilidad**: Contrastes certificados WCAG 2.1 AA, adaptación fluida para móviles y orden estructurado de encabezados (`h1` a `h4`).

---

## 2. Uso del Ecosistema MCP (Model Context Protocol)

Para asegurar la calidad, precisión y mantenimiento ágil del proyecto, se establece el siguiente protocolo de uso de herramientas MCP:

### A. Chrome DevTools MCP & Browser Automation
* **Inspección en Vivo de Estilos y Métricas**:
  * Auditoría directa del DOM, estilos computados (`getComputedStyle`), box-sizing, márgenes y paddings comparados contra el sitio en producción `https://iesphuanta.edu.pe/`.
  * Verificación de contrastes cromáticos y accesibilidad en textos y botones píldora.
* **Validación Responsiva Multi-dispositivo**:
  * Emulación y captura en resoluciones estándar: Móvil (375px y 414px), Tablet (768px y 1024px) y Escritorio (1280px, 1440px y 1920px).
* **Auditoría de Rendimiento y Core Web Vitals**:
  * Medición de Largest Contentful Paint (LCP), Cumulative Layout Shift (CLS) e Interaction to Next Paint (INP) garantizando puntuaciones superiores a 90 en Lighthouse sin el sobrepeso de scripts de WordPress.

### B. Context7 MCP
* **Documentación Oficial en Tiempo Real**:
  * Consulta directa de especificaciones actualizadas de Tailwind CSS v4 (`@theme`, directivas de gradientes, compatibilidad con `background-clip: text`).
  * Consulta de estándares de APIs nativas de JavaScript (IntersectionObserver, Web Animations API, Fetch API).

---

## 3. Datos Técnicos Extraídos de la Web Original (`https://iesphuanta.edu.pe/`)

### A. Arquitectura y Stack del Sitio en Producción
* **CMS**: WordPress
* **Tema Base**: `Itfirm` v1.3.8 (Case-Themes / ThemeForest), diseñado para empresas de tecnología, ingeniería y soluciones de software.
* **Constructor Visual**: Elementor + Elementor Header & Footer Builder.
* **Sliders / Hero**: Slider Revolution (`revslider` v6.7.15).
* **Formularios y Plugins**: Contact Form 7 v6.1.6, Case Theme Core, WooCommerce + WPC Smart Suite.

### B. Paleta Cromática Institucional (Tokens Oficiales)
Extraída de las declaraciones `:root` e `itfirm-theme-inline-css`:

```css
:root {
  /* Colores Principales */
  --primary-color: #7114EF;       /* Púrpura Institucional Huanta (RGB: 113, 20, 239) */
  --secondary-color: #1475F7;     /* Azul Tecnológico (RGB: 20, 117, 247) */
  --third-color: #08D9FF;         /* Cian de Acento y Alto Contraste (RGB: 8, 217, 255) */

  /* Superficies Oscuras */
  --surface-dark: #0F223A;        /* Barra Superior (Topbar) y Footer Institucional */
  --surface-navy: #0A1626;        /* Contenedores de fondo profundo */

  /* Superficies Claras */
  --bg-light: #F8FAFC;            /* Fondo base de secciones intermedias */
  --card-bg: #FFFFFF;             /* Tarjetas y contenedores con elevación */

  /* Tipografía y Lectura */
  --text-title: #000001;          /* Títulos principales (negro azulado profundo) */
  --text-body: #383838;           /* Párrafos y contenido de lectura regular */
  --text-muted: #666666;          /* Subtítulos y textos secundarios */

  /* Gradientes de Marca */
  --gradient-brand: linear-gradient(90deg, #7114EF 0%, #1475F7 50%, #7114EF);
  --gradient-brand-smooth: linear-gradient(135deg, #7114EF 0%, #1475F7 100%);
}
```

### C. Tipografía y Escala de Jerarquía Visual
Fuentes Google Fonts enlazadas en el sitio original:
1. **Nunito** (`weights: 300, 400, 600, 700, 800, 900`): Utilizada para títulos amigables y redondeados, botones de acción y badges institucionales.
2. **Poppins / Roboto**: Utilizadas para texto corrido, tablas de información y subtítulos (`line-height: 1.625`).

**Escala Visual para Desktop / Mobile**:
* **Hero H1 / Gran Impacto**: `42px` a `52px` (Desktop) / `32px` a `36px` (Mobile), peso `700` o `800` (Bold / Extrabold), `line-height: 1.15` a `1.2`.
* **Badge / Pre-título**: `13px` a `14px`, mayúsculas (`uppercase`), tracking amplio (`letter-spacing: 1.5px - 2px`), peso `700`, color `#7114EF`.
* **H2 (Títulos de sección)**: `32px` a `38px`, `font-weight: 700`.
* **H3 / H4 (Tarjetas y servicios)**: `18px` a `24px`, `font-weight: 600`.
* **Párrafo base (Body)**: `15px` a `16px`, `line-height: 1.625` (26px), color `#383838`.
* **Botones de acción**: Forma de píldora completa (`rounded-full`), `font-weight: 700`, texto blanco centrado con sombra suave.

### D. Iconografía
* En el sitio original se cargan bibliotecas como FontAwesome, Flaticon y Caseicon.
* En **IESPH-VANILLA** se utiliza **Font Awesome 6.5.1** vía CDN y SVGs limpios en línea para garantizar máxima ligereza y carga sin bloqueos.

---

## 4. Secuencia Estructural de Secciones de la Landing Page

Para mantener la consistencia visual, la página principal sigue estrictamente el orden del sitio original:

1. **Header & Topbar Institucional** (`components/navbar.html`):
   * Barra superior oscura con teléfonos, correo y redes.
   * Barra de navegación con logo del IESPH, menú multinivel desplegable y botón de postulación.
2. **Hero Section** (`components/hero.html`):
   * Slider / banner con pre-badge `"FORMACIÓN CON LIDERAZGO"`, título de impacto, descripción institucional y botones gemelos tipo píldora (*"Sobre Nosotros"* y *"Ver Plana Docente"* o *"Postula"*).
3. **Presentación Institucional** (`components/nosotros.html`):
   * Misión, visión y propuesta formativa (*"Comprometidos con la Excelencia en Educación — ¡Transforma tu Futuro en 3 solo Años!"*).
4. **Franja de Estadísticas** (`components/estadisticas.html`):
   * Indicadores clave (40+ años de trayectoria, 5 programas licenciados, 100% gratuidad).
5. **Servicios Destacados** (`components/servicios.html`):
   * Formación técnica de alta calidad, asesoría personalizada, experiencias en situaciones reales de trabajo.
6. **Bloque de Video / Llamado a la Acción** (`components/mision-vision.html` o banner dedicado):
   * *"Preparándote para tu Éxito - Ofrecemos las Mejores Soluciones Educativas"* con botón interactivo play de video con pulso de onda.
7. **Programas de Estudio Licenciados** (`components/carreras.html`):
   * Grid con los 5 programas oficiales:
     1. Diseño y Programación Web
     2. Enfermería Técnica
     3. Mecatrónica Automotriz
     4. Industrias de Alimentos y Bebidas
     5. Producción Agropecuaria
8. **Infraestructura y Laboratorios** (`components/galeria.html`):
   * Instalaciones, biblioteca, red telemática y talleres.
9. **Testimonios de Estudiantes y Egresados** (`components/testimonios.html`):
   * Casos de éxito y citas de egresados titulados.
10. **Acontecimientos y Noticias** (`components/noticias.html`):
    * Resultados de admisión, notas de prensa y convocatorias oficiales.
11. **Contacto y Canales de Atención** (`components/contacto.html`):
    * Formulario, ubicación del campus y enlaces directos a WhatsApp institucional.
12. **Footer Institucional** (`components/footer.html`):
    * Enlaces institucionales, accesos directos al MINEDU y enlace formal al Libro de Reclamaciones.

---

## 5. Estructura de Carpetas del Repositorio Vanilla

```text
IESPH-VANILLA/
├── assets/                  # Logotipos, imágenes y recursos multimedia
├── components/              # Fragmentos HTML modulares (Navbar, Hero, Carreras, etc.)
│   ├── navbar.html
│   ├── hero.html
│   ├── nosotros.html
│   ├── estadisticas.html
│   ├── servicios.html
│   ├── carreras.html
│   ├── galeria.html
│   ├── testimonios.html
│   ├── noticias.html
│   ├── contacto.html
│   └── footer.html
├── css/                     # Hojas de estilo y CSS compilado
│   └── styles.css           # Salida compilada de Tailwind CSS v4
├── js/                      # Lógica interactiva en Vanilla JS
│   ├── app.js               # Cargador modular asíncrono y control de componentes
│   ├── navbar.js            # Menú móvil y dropdowns accesibles
│   └── carreras.js          # Datos y filtrado de carreras
├── pages/                   # Páginas internas independientes (Admisión, Contacto, etc.)
├── scripts/                 # Scripts auxiliares de compilación y minificación
│   └── build.js
├── src/                     # Entrada de estilos de desarrollo
│   └── input.css            # Directivas Tailwind v4 y clases institucionales
├── index.html               # Página de aterrizaje principal
├── server.js                # Servidor local Node.js para desarrollo
└── package.json             # Herramientas de desarrollo (Tailwind CLI v4)
```

---

## 6. Comandos Operativos del Repositorio

* **Iniciar Servidor Local**:
  ```bash
  npm start
  # Servidor disponible en http://localhost:3000
  ```
* **Compilación de Estilos (Modo Observador / Watch)**:
  ```bash
  npm run dev
  # Compila Tailwind v4 en vivo desde src/input.css a css/styles.css
  ```
* **Compilación para Producción**:
  ```bash
  npm run build
  # Genera la versión minificada y optimizada en /dist
  ```
