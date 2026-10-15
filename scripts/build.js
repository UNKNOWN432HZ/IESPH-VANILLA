const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const terser = require('terser');
const htmlMinifier = require('html-minifier-terser');

const ROOT_DIR = path.resolve(__dirname, '..');
const DIST_DIR = path.join(ROOT_DIR, 'dist');
const CSS_DIR = path.join(ROOT_DIR, 'css');
const JS_DIR = path.join(ROOT_DIR, 'js');
const COMPONENTS_DIR = path.join(ROOT_DIR, 'components');
const PAGES_DIR = path.join(ROOT_DIR, 'pages');
const ASSETS_DIR = path.join(ROOT_DIR, 'assets');

// Formato legible de bytes
function formatBytes(bytes) {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return (bytes / Math.pow(k, i)).toFixed(2) + ' ' + sizes[i];
}

async function runBuild() {
    console.log('\n[BUILD] Iniciando compilación y unificación para producción...');
    const startTime = Date.now();

    // 1. Limpiar o crear carpeta dist
    if (fs.existsSync(DIST_DIR)) {
        fs.rmSync(DIST_DIR, { recursive: true, force: true });
    }
    fs.mkdirSync(DIST_DIR, { recursive: true });
    fs.mkdirSync(path.join(DIST_DIR, 'css'), { recursive: true });
    fs.mkdirSync(path.join(DIST_DIR, 'js'), { recursive: true });
    fs.mkdirSync(path.join(DIST_DIR, 'pages'), { recursive: true });

    // 2. Compilar Tailwind CSS
    console.log('📦 1/4 Compilando Tailwind CSS...');
    execSync('npx @tailwindcss/cli -i ./src/input.css -o ./css/styles.css --minify', {
        cwd: ROOT_DIR,
        stdio: 'pipe'
    });

    // 3. Unificar todos los archivos CSS en 1 solo archivo (bundle.min.css)
    console.log('🎨 2/4 Unificando y minificando todos los archivos CSS...');
    let combinedCSS = '';

    // Primero el CSS base de Tailwind
    if (fs.existsSync(path.join(CSS_DIR, 'styles.css'))) {
        combinedCSS += fs.readFileSync(path.join(CSS_DIR, 'styles.css'), 'utf-8') + '\n';
    }

    // Luego cualquier otro CSS adicional no vacío
    if (fs.existsSync(CSS_DIR)) {
        const cssFiles = fs.readdirSync(CSS_DIR);
        for (const file of cssFiles) {
            if (file.endsWith('.css') && file !== 'styles.css' && file !== 'bundle.min.css') {
                const filePath = path.join(CSS_DIR, file);
                const content = fs.readFileSync(filePath, 'utf-8').trim();
                if (content.length > 0) {
                    console.log(`   + Unificando: css/${file}`);
                    combinedCSS += `/* --- css/${file} --- */\n` + content + '\n';
                }
            }
        }
    }

    const distCSSPath = path.join(DIST_DIR, 'css', 'bundle.min.css');
    fs.writeFileSync(distCSSPath, combinedCSS.trim(), 'utf-8');
    const cssSize = fs.statSync(distCSSPath).size;

    // 4. Unificar y minificar todos los archivos JS en 1 solo archivo (bundle.min.js)
    console.log('⚡ 3/4 Unificando y minificando todos los archivos JavaScript...');
    let combinedJS = '';

    // Primero el script principal app.js
    if (fs.existsSync(path.join(JS_DIR, 'app.js'))) {
        combinedJS += fs.readFileSync(path.join(JS_DIR, 'app.js'), 'utf-8') + '\n;';
    }

    // Luego cualquier otro JS complementario no vacío
    if (fs.existsSync(JS_DIR)) {
        const jsFiles = fs.readdirSync(JS_DIR);
        for (const file of jsFiles) {
            if (file.endsWith('.js') && file !== 'app.js' && file !== 'bundle.min.js') {
                const filePath = path.join(JS_DIR, file);
                const content = fs.readFileSync(filePath, 'utf-8').trim();
                if (content.length > 0) {
                    console.log(`   + Unificando: js/${file}`);
                    combinedJS += `\n/* --- js/${file} --- */\n` + content + '\n;';
                }
            }
        }
    }

    const minifiedJS = await terser.minify(combinedJS, {
        compress: {
            drop_console: false, // permite logs institucionales
            passes: 2
        },
        mangle: true
    });

    const distJSPath = path.join(DIST_DIR, 'js', 'bundle.min.js');
    fs.writeFileSync(distJSPath, minifiedJS.code || combinedJS, 'utf-8');
    const jsSize = fs.statSync(distJSPath).size;

    // Función auxiliar para inyectar componentes data-include en el HTML estático
    function inlineComponents(htmlContent) {
        return htmlContent.replace(/<div\s+data-include="([^"]+)">\s*<\/div>/g, (match, componentPath) => {
            // Normalizar ruta
            let cleanPath = componentPath.startsWith('/') ? componentPath.slice(1) : componentPath;
            if (cleanPath.startsWith('../')) cleanPath = cleanPath.replace(/^\.\.\//, '');
            const absoluteComponentPath = path.join(ROOT_DIR, cleanPath);

            if (fs.existsSync(absoluteComponentPath)) {
                const componentHtml = fs.readFileSync(absoluteComponentPath, 'utf-8');
                return `<!-- [START: ${cleanPath}] -->\n${componentHtml}\n<!-- [END: ${cleanPath}] -->`;
            } else {
                console.warn(`   ⚠️ Advertencia: Componente no encontrado: ${cleanPath}`);
                return match;
            }
        });
    }

    // 5. Unificar y minificar archivos HTML
    console.log('📄 4/4 Ensamblando componentes e hiper-minificando HTML...');
    const htmlMinifyOptions = {
        collapseWhitespace: true,
        removeComments: true,
        removeRedundantAttributes: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true,
        useShortDoctype: true,
        minifyCSS: true,
        minifyJS: true
    };

    // Procesar index.html
    const indexPath = path.join(ROOT_DIR, 'index.html');
    let indexHtml = fs.readFileSync(indexPath, 'utf-8');
    
    // Inyectar componentes modulares directamente en el HTML de producción
    indexHtml = inlineComponents(indexHtml);

    // Reemplazar enlaces a estilos y scripts por los bundles unificados
    indexHtml = indexHtml.replace(/href=["'](\.\/|\/)?css\/styles\.css["']/g, 'href="./css/bundle.min.css"');
    indexHtml = indexHtml.replace(/src=["'](\.\/|\/)?js\/app\.js["']/g, 'src="./js/bundle.min.js"');

    const minifiedIndexHtml = await htmlMinifier.minify(indexHtml, htmlMinifyOptions);
    const distIndexPath = path.join(DIST_DIR, 'index.html');
    fs.writeFileSync(distIndexPath, minifiedIndexHtml, 'utf-8');
    const htmlSize = fs.statSync(distIndexPath).size;

    // Procesar páginas secundarias en pages/ que no estén vacías
    if (fs.existsSync(PAGES_DIR)) {
        const pages = fs.readdirSync(PAGES_DIR);
        for (const page of pages) {
            if (page.endsWith('.html')) {
                const pagePath = path.join(PAGES_DIR, page);
                let pageHtml = fs.readFileSync(pagePath, 'utf-8');
                if (pageHtml.trim().length > 0) {
                    pageHtml = inlineComponents(pageHtml);
                    pageHtml = pageHtml.replace(/href=["'](\.\.\/|\/)?css\/styles\.css["']/g, 'href="../css/bundle.min.css"');
                    pageHtml = pageHtml.replace(/src=["'](\.\.\/|\/)?js\/app\.js["']/g, 'src="../js/bundle.min.js"');
                    // Remover scripts modulares redundantes ya empaquetados en bundle.min.js
                    pageHtml = pageHtml.replace(/<script\s+src=["'][^"']*js\/(noticias|carreras|admision|contacto|galeria|navbar)\.js["']>\s*<\/script>/gi, '');
                    const minifiedPage = await htmlMinifier.minify(pageHtml, htmlMinifyOptions);
                    fs.writeFileSync(path.join(DIST_DIR, 'pages', page), minifiedPage, 'utf-8');
                    console.log(`   + Página procesada y minificada: pages/${page}`);
                }
            }
        }
    }

    // 6. Copiar assets y módulos individuales como fallback de seguridad
    if (fs.existsSync(ASSETS_DIR)) {
        fs.cpSync(ASSETS_DIR, path.join(DIST_DIR, 'assets'), { recursive: true });
    }
    if (fs.existsSync(JS_DIR)) {
        for (const file of fs.readdirSync(JS_DIR)) {
            if (file.endsWith('.js') && file !== 'bundle.min.js') {
                fs.copyFileSync(path.join(JS_DIR, file), path.join(DIST_DIR, 'js', file));
            }
        }
    }
    if (fs.existsSync(CSS_DIR)) {
        for (const file of fs.readdirSync(CSS_DIR)) {
            if (file.endsWith('.css') && file !== 'bundle.min.css') {
                fs.copyFileSync(path.join(CSS_DIR, file), path.join(DIST_DIR, 'css', file));
            }
        }
    }

    const duration = ((Date.now() - startTime) / 1000).toFixed(2);

    console.log('\n✨ [BUILD EXITOSO] Todo el proyecto fue unificado y minificado en ' + duration + 's:\n');
    console.log(`   📁 dist/css/bundle.min.css -> ${formatBytes(cssSize)} (Todos los CSS unificados y minificados)`);
    console.log(`   📁 dist/js/bundle.min.js   -> ${formatBytes(jsSize)} (Todos los JS unificados y minificados)`);
    console.log(`   📁 dist/index.html         -> ${formatBytes(htmlSize)} (HTML unificado con todos sus componentes inyectados y minificado)`);
    console.log(`   📁 dist/assets/            -> Recursos estáticos copiados`);
    console.log('\n💡 Puedes servir la versión de producción ejecutando: npm run serve:dist\n');
}

runBuild().catch(err => {
    console.error('❌ Error durante el build:', err);
    process.exit(1);
});
