# Arquitectura de Componentes, Auditoría y Registro de Depuración
**Portal Institucional IESP Huanta**

---

## 1. Resumen Ejecutivo de la Arquitectura

El portal web del **IESP Huanta** utiliza una arquitectura modular basada en **Vanilla HTML5, Tailwind CSS y JavaScript Moderno**, diseñada para ofrecer la máxima velocidad de carga, mantenibilidad y fidelidad visual con el portal oficial.

El sistema opera bajo un modelo híbrido:
1. **Entorno de Desarrollo (`dev` / Live Server / Node `server.js`)**:
   Los componentes se declaran de manera modular mediante etiquetas `<div data-include="components/nombre.html"></div>` y se resuelven asíncronamente con el cargador modular de `js/app.js`.
2. **Entorno de Producción (`build` / `dist/`)**:
   El compilador automatizado (`scripts/build.js`) analiza las páginas, **inyecta en línea todos los componentes HTML estáticamente**, unifica todos los estilos en `dist/css/bundle.min.css` (74.9 KB) y todos los scripts en `dist/js/bundle.min.js` (9.8 KB), e hiper-minifica el código final. Esto elimina tiempos de espera por peticiones de red adicionales y garantiza una carga instantánea con First Contentful Paint (FCP) de nivel profesional.

---

## 2. Catálogo de Componentes Activos (`components/`)

Los siguientes 11 componentes componen el núcleo modular de la aplicación:

| Componente | Ruta | Responsabilidad y Contenido |
| :--- | :--- | :--- |
| **Navbar** | `components/navbar.html` | Barra superior de contactos, cabecera institucional *sticky*, mega menú desplegable desktop de 6 niveles, menú *drawer* móvil y logo oficial con enlace seguro a `/index.html`. |
| **Hero Slider** | `components/hero.html` | Carrusel principal estilo ITFirm con 2 diapositivas institucionales, navegación por flechas, puntos interactivos y 5 cajas flotantes destacadas de carreras. |
| **Nosotros** | `components/nosotros.html` | Reseña institucional del IES Huanta, insignia flotante animada de "39 Años Licenciado", y disparador del modal de video oficial. |
| **Estadísticas** | `components/estadisticas.html` | Franja de impacto con 4 indicadores numéricos animados por JavaScript (`counter-val`). |
| **Servicios** | `components/servicios.html` | Exposición de laboratorios especializados, biblioteca física/virtual (+500 libros) y red telemática con enlaces a subpáginas. |
| **Misión y Visión** | `components/mision-vision.html` | Pestañas interactivas sincronizadas con `window.switchTab` para Misión, Visión y Valores Institucionales. |
| **Carreras** | `components/carreras.html` | Catálogo de los 5 programas de estudios licenciados con identificadores estandarizados (`carrera-web`, `carrera-enfermeria`, `carrera-meca`, `carrera-alimentos`, `carrera-agro`). |
| **Galería** | `components/galeria.html` | Cuadrícula fotográfica de alta resolución del campus central, con visor *Lightbox* interactivo y soporte para tecla `Escape`. |
| **Testimonios** | `components/testimonios.html` | Opiniones y experiencias de éxito de egresados y alumnos de las diversas carreras técnicas. |
| **Noticias** | `components/noticias.html` | Tarjetas de comunicados oficiales y notas de prensa con fechas, autores y enlaces a convocatorias. |
| **Footer** | `components/footer.html` | Pie de página corporativo con enlaces institucionales, redes sociales, derechos reservados y botón flotante de subida (*scroll-to-top*). |

---

## 3. Registro Forense de Archivos Eliminados

Durante la fase de auditoría y depuración, se identificaron y eliminaron varios archivos en el directorio `components/` y `scripts/`. A continuación se documenta el motivo técnico de cada remoción:

```
┌──────────────────────────────────────┬───────────┬────────────────────────────────────────────────────────┐
│ Archivo Eliminado                    │ Peso Git  │ Causa Técnica de la Eliminación                        │
├──────────────────────────────────────┼───────────┼────────────────────────────────────────────────────────┤
│ components/banner.html               │ 0 bytes   │ Archivo vacío (marcador de posición sin código).       │
│ components/slider.html               │ 0 bytes   │ Archivo vacío. Toda la lógica se integró en hero.html. │
│ components/card-carrera.html         │ 199 bytes │ Fragmento HTML corrupto e incompleto de borrador.      │
│ components/card-noticia.html         │ 0 bytes   │ Archivo vacío sin estructura.                          │
│ components/card-evento.html          │ 0 bytes   │ Archivo vacío sin estructura.                          │
│ components/formulario-contacto.html  │ 0 bytes   │ Archivo vacío. El formulario está en contacto.html.    │
│ components/estadisticas copy.html    │ 395 bytes │ Copia de respaldo duplicada con nombre no estándar.    │
│ scripts/parse_nav.js                 │ ~1.2 KB   │ Script temporal de extracción inicial de navegación.   │
└──────────────────────────────────────┴───────────┴────────────────────────────────────────────────────────┘
```

### Detalle de cada caso:

1. **`banner.html` y `slider.html`**:
   * Ambos eran archivos en blanco creados durante el andamiaje inicial del repositorio. 
   * La funcionalidad del Slider principal se programó por completo con estética ITFirm en `components/hero.html`.
   * Los banners interiores de las 11 subpáginas (`pages/*.html`) se ubicaron de manera contextual en cada documento para incluir títulos, descripciones y fondos fotográficos específicos de cada carrera o servicio (vital para SEO semántico).
2. **`card-carrera.html`**:
   * Contenía código HTML truncado con etiquetas rotas y texto incompleto:
     ```html
     <!-- Contenido original descartado -->
     <div class="card-carrera">
         <img src="../assets/images/dpw.jpg" alt="ación Web</h3>
         <p>Forma profesionales capaces...</p>
         # Más información </a>
     </div>
     ```
   * Fue descartado porque `components/carreras.html` ya implementaba de forma nativa las 5 tarjetas completas con Tailwind CSS, iconos Font Awesome, etiquetas de turno y créditos académicos.
3. **`card-noticia.html`, `card-evento.html` y `formulario-contacto.html`**:
   * Archivos de 0 bytes que generaban ruido en el árbol de trabajo. Sus funcionalidades ya residen en sus respectivos módulos de sección (`components/noticias.html`, `components/eventos.html` y `components/contacto.html`).
4. **`estadisticas copy.html`**:
   * Archivo duplicado producto de un guardado manual de respaldo, sin clases modernas ni compatibilidad con el sistema de contadores animados.

---

## 4. Análisis de Reconsideración y Escalabilidad Futura

¿Vale la pena recuperar o recrear alguno de estos componentes en el futuro?

### A. Tarjetas Atómicas (`card-noticia.html`, `card-evento.html`, `card-carrera.html`)
* **Estado Actual**: **No necesarias en la fase actual (Web Estática de Alto Rendimiento)**.
  * En una web estática, anidar peticiones `fetch()` para cada tarjeta individual provoca "peticiones en cascada", aumentando la latencia y afectando el First Contentful Paint.
* **Cuándo reconsiderarlas (Fase Dinámica / CMS)**:
  * Si en una fase posterior el instituto decide conectar el portal a una **API REST de WordPress**, una base de datos o un archivo de datos centralizado `data/noticias.json`.
  * En ese caso, la tarjeta atómica servirá como plantilla de renderizado para un bucle JavaScript:
    ```javascript
    // Ejemplo de arquitectura futura para tarjetas dinámicas
    fetch('/api/noticias.json')
      .then(res => res.json())
      .then(noticias => {
          const container = document.getElementById('noticias-grid');
          container.innerHTML = noticias.map(n => renderNewsCard(n)).join('');
      });
    ```

### B. Banner Universal (`banner.html`)
* **Estado Actual**: **Desaconsejado**.
  * Mantener el banner en el HTML de cada subpágina permite que los motores de búsqueda (Google, Bing) indexen un encabezado `<h1>` semántico diferente en cada página, con su propia meta descripción y *background* contextualizado (ej. imagen de hospital para enfermería, campus para nosotros, taller mecánico para mecatrónica).
* **Cuándo reconsiderarlo**:
  * Si se migra a un generador de sitios estáticos (SSG) como Astro, Vite o Next.js, donde un componente `<PageHeader title={title} breadcrumbs={crumbs} />` pueda recibir propiedades en tiempo de compilación.

---

## 5. Guía de Estándares para Nuevos Componentes

Si en el futuro se desea añadir nuevos componentes en `components/`:

1. **Ubicación y Nombre**:
   * Usar nombres en minúsculas separados por guiones (`kebab-case`), por ejemplo: `components/convenios.html`, `components/preguntas-frecuentes.html`.
2. **Encapsulamiento y Raíz Semántica**:
   * Cada componente debe tener una etiqueta semántica raíz con un ID único:
     ```html
     <section id="convenios" class="py-16 bg-white">
         ...
     </section>
     ```
3. **Cero Conflictos de Enlaces**:
   * Los enlaces a páginas secundarias deben usar rutas absolutas desde la raíz: `href="/pages/carreras.html"`.
   * El logo institucional siempre debe enlazar a `/index.html`.
4. **Paridad con el Empaquetador (`scripts/build.js`)**:
   * Todos los componentes incluidos con `data-include="components/nombre.html"` serán automáticamente detectados e inyectados en la versión de producción `dist/` al ejecutar `npm run build`.
