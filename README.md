# 🏛️ IESP Huanta - Portal Web Institucional

> Plataforma web oficial, moderna, interactiva y modular del **Instituto de Educación Superior Tecnológico Público Huanta** (Ayacucho, Perú). Desarrollada con estándares web modernos, arquitectura modular ligera en Vanilla JavaScript y diseño con Tailwind CSS v4.

---

## Tabla de Contenidos

1. [Descripción General](#-descripción-general)
2. [Características Principales](#-características-principales)
3. [Stack Tecnológico](#-stack-tecnológico)
4. [Estructura del Proyecto](#-estructura-del-proyecto)
5. [Requisitos Previos](#-requisitos-previos)
6. [Instalación y Puesta en Marcha](#-instalación-y-puesta-en-marcha)
7. [Scripts Disponibles](#-scripts-disponibles)
8. [Arquitectura Modular (`data-include`)](#-arquitectura-modular-data-include)
9. [Sistema de Diseño y Paleta Institucional](#-sistema-de-diseño-y-paleta-institucional)
10. [Rutas y Páginas (`pages/`)](#-rutas-y-páginas-pages)
11. [Buenas Prácticas para Colaboradores](#-buenas-prácticas-para-colaboradores)

---

## Descripción General

El **IESP Huanta** es una institución de educación superior licenciada por el MINEDU con más de 39 años formando profesionales técnicos de vanguardia en la región de Ayacucho.

Este proyecto reconstruye y moderniza la presencia digital del instituto, optimizando el rendimiento, la accesibilidad, la experiencia móvil y la modularidad del código fuente sin sobrecargar el proyecto con frameworks pesados de frontend.

---

## Características Principales

* **Carga Modular de Componentes:** Inyección asíncrona de cabecera, pie de página y secciones reutilizables mediante atributos declarativos `data-include`.
* **Hero Slider Dinámico:** Banner interactivo tipo carrusel con transiciones suaves, indicadores, navegación manual y temporizador automático.
* **Pestañas Interactivas:** Conmutador dinámico para Misión, Visión y Valores institucionales.
* **Modal de Video Institucional:** Reproductor de video accesible con control de teclado (`Esc`) y cierre por clic fuera de foco.
* **Galería con Lightbox:** Visor fotográfico interactivo para instalaciones, laboratorios y eventos.
* **Contadores Numéricos Animados:** Cifras institucionales animadas mediante `IntersectionObserver` al hacer scroll.
* **Navegación Fluida y Adaptable:** Barra superior de contacto rápido, navbar con menús desplegables para carreras y menú responsivo para dispositivos móviles.
* **Servidor HTTP Local Incluido:** Servidor nativo en Node.js que resuelve rutas estáticas con soporte para tipos MIME y seguridad ante *path traversal*.

---

## Stack Tecnológico

| Capa | Tecnología | Descripción |
| :--- | :--- | :--- |
| **Estructura** | HTML5 Semántico | Maquetación limpia, accesible y optimizada para SEO. |
| **Estilos** | Tailwind CSS v4 (`@tailwindcss/cli`) | Utilidades modernas compiladas en tiempo real. |
| **Lógica** | Vanilla JavaScript (ES6+) | Sin librerías pesadas (React, Vue, jQuery). Carga ágil y nativa. |
| **Iconografía** | Font Awesome 6.5.1 | Iconos vectoriales para navegación y elementos de interfaz. |
| **Tipografía** | Google Fonts (*Poppins* & *Nunito*) | Jerarquía visual moderna y legible. |
| **Entorno Local** | Node.js (`http`, `fs`, `path`) | Servidor web nativo ligero sin dependencias externas complejas. |

---

## Estructura del Proyecto

```text
IESPH-VANILLA/
├── assets/                  # Recursos estáticos (logos, imágenes, PDFs)
│   └── logo.png             # Logo oficial del IESP Huanta
├── components/              # Módulos y secciones HTML reutilizables
│   ├── navbar.html          # Barra de navegación principal y superior
│   ├── hero.html            # Banner principal interactivo
│   ├── nosotros.html        # Presentación institucional
│   ├── mision-vision.html   # Misión, visión y valores (pestañas)
│   ├── estadisticas.html    # Cifras clave y contadores animados
│   ├── servicios.html       # Servicios estudiantiles y bienestar
│   ├── carreras.html        # Tarjetas de programas de estudios
│   ├── galeria.html         # Galería de imágenes y lightbox
│   ├── testimonios.html     # Reseñas de estudiantes y egresados
│   ├── noticias.html        # Noticias y novedades institucionales
│   ├── eventos.html         # Cronograma de eventos y capacitaciones
│   ├── contacto.html        # Formulario de contacto y mapa
│   └── footer.html          # Pie de página institucional y créditos
├── css/                     # Hojas de estilo
│   └── styles.css           # CSS final compilado por Tailwind CSS
├── js/                      # Lógica JavaScript
│   └── app.js               # Cargador modular, sliders, modales y lógica general
├── pages/                   # Páginas secundarias independientes
│   ├── admision.html        # Proceso de admisión, vacantes y requisitos
│   ├── carreras.html        # Catálogo detallado de programas formativos
│   ├── nosotros.html        # Historia, plana directiva y organigrama
│   ├── servicios.html       # Biblioteca virtual, bolsa laboral, bolsa de empleo
│   ├── matricula.html       # Guía y cronograma de matrícula
│   ├── tramites.html        # Mesa de partes virtual y certificados
│   ├── transparencia.html   # Documentos de gestión y licenciamiento
│   ├── galeria.html         # Galería multimedia completa
│   ├── noticias.html        # Archivo completo de noticias
│   ├── eventos.html         # Calendario institucional
│   └── contacto.html        # Canales de atención presencial y virtual
├── src/
│   └── input.css            # Entrada principal de Tailwind con tokens de marca
├── index.html               # Página de inicio (Landing Page principal)
├── package.json             # Scripts de compilación y dependencias
├── server.js                # Servidor local HTTP nativo en Node.js
└── README.md                # Documentación del proyecto
```

---

## Requisitos Previos

### Opción 1: Servidor local nativo
* **Live Server** en tu IDE preferido.

### Opción 2: Servidor local nativo en Node.js
* **Node.js** (versión 18.0.0 o superior).
* **NPM** (gestor de paquetes de Node.js).


---

## Instalación y Puesta en Marcha

1. **Clonar o descargar el repositorio:**
   ```bash
   git clone https://github.com/ANONIMO432HZ/IESPH-VANILLA.git
   cd IESPH-VANILLA
   ```

2. **Instalar dependencias de desarrollo (Tailwind CSS):**
   ```bash
   npm install
   ```

3. **Compilar Tailwind CSS:**
   * En modo desarrollo (escucha continua de cambios):
     ```bash
     npm run dev
     ```
   * En modo producción (minificado para despliegue):
     ```bash
     npm run build
     ```

4. **Iniciar el servidor local:**
   En otra terminal, ejecuta:
   ```bash
   npm start
   ```
   Abre tu navegador en: [http://localhost:3000](http://localhost:3000)

> **Nota sobre CORS:** Dado que el proyecto carga módulos usando `fetch()`, no abras el archivo `index.html` directamente haciendo doble clic (`file:///`). Debes usar `npm start` o extensiones como *Live Server* en VS Code.

---

## Scripts Disponibles

En el archivo `package.json` dispones de los siguientes comandos:

| Comando | Acción |
| :--- | :--- |
| `npm start` | Inicia el servidor local de desarrollo en [http://localhost:3000](http://localhost:3000). |
| `npm run dev` | Compila Tailwind CSS hacia `css/styles.css` observando cambios en tiempo real (`--watch`). |
| `npm run build` | **Compilación completa para producción:** unifica y minifica todos los CSS en `dist/css/bundle.min.css`, todos los JS en `dist/js/bundle.min.js`, e hiper-minifica el HTML ensamblado en `dist/index.html`. |
| `npm run serve:dist` | Levanta el servidor local sirviendo directamente la versión optimizada de `dist/` en el puerto 8080. |

---

## Arquitectura Modular (`data-include`)

El núcleo de la modularidad reside en `js/app.js`. Cada archivo HTML puede declarar contenedores con el atributo `data-include`:

```html
<!-- Ejemplo en cualquier página -->
<div data-include="/components/navbar.html"></div>

<main>
    <!-- Contenido específico de la página -->
</main>

<div data-include="/components/footer.html"></div>
```

Cuando el documento carga, `app.js` realiza las peticiones asíncronas para inyectar el HTML de los componentes correspondientes y posteriormente inicializa los listeners y componentes interactivos (slider, contadores, lightbox, etc.).

---

## 🎨 Sistema de Diseño y Paleta Institucional

Definida en `src/input.css` siguiendo la identidad visual del instituto:

* **Púrpura Institucional (`--color-brand-purple`):** `#7114ef`
* **Azul Tecnológico (`--color-brand-blue`):** `#1475f7`
* **Cian Acento (`--color-brand-cyan`):** `#08d9ff`
* **Fondo Oscuro (`--color-brand-dark`):** `#0b1120`

### Utilidades clave implementadas
* `.bg-gradient-brand`: Gradiente de púrpura a azul a 135°.
* `.text-gradient-brand`: Texto con gradiente y soporte multiplataforma.
* `.shadow-brand` / `.shadow-brand-hover`: Sombras luminosas en tonos púrpuras.
* `.card-fancy-overlay`: Efecto hover con deslizamiento vertical de fondo para tarjetas de servicios.

---

## 📄 Rutas y Páginas (`pages/`)

Las páginas dentro de la carpeta `pages/` representan las secciones extendidas del portal institucional:

1. **Admisión (`pages/admision.html`):** Requisitos, fechas clave, vacantes por programa, pagos y pasos de postulación.
2. **Carreras (`pages/carreras.html`):** Detalle de los 5 programas de estudio:
   * Diseño y Programación Web
   * Enfermería Técnica
   * Mecatrónica Automotriz
   * Producción Agropecuaria
   * Industrias Alimentarias
3. **Nosotros (`pages/nosotros.html`):** Reseña histórica, organigrama, plana directiva y licenciamiento.
4. **Servicios (`pages/servicios.html`):** Centro de cómputo, biblioteca física y virtual, tópicos de salud y bienestar.
5. **Trámites (`pages/tramites.html`):** Mesa de partes virtual, solicitud de certificados, convalidaciones y formatos FUT.
6. **Transparencia (`pages/transparencia.html`):** Documentos de gestión institucional (PEI, PCI, RI, balances).

---

## 📚 Documentación Técnica Detallada

Para profundizar en el diseño del sistema, auditoría de componentes y estándares de desarrollo:

* 📖 **[Arquitectura de Componentes y Registro de Depuración](docs/componentes.md)**: Catálogo exhaustivo de componentes activos, registro forense de archivos depurados (`banner.html`, `slider.html`, `card-carrera.html`, etc.) y guía de escalabilidad futura.
* 📖 **[Centro de Documentación](docs/README.md)**: Índice general de especificaciones técnicas del proyecto.

---

*IESP Huanta - Formando profesionales técnicos líderes para el desarrollo del Perú.*
