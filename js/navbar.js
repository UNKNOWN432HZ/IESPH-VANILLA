/**
 * IESP Huanta - Módulo de Navegación & Cabecera
 * Control de menú móvil, accesibilidad de teclado y resalte de enlace activo
 */
(function () {
    'use strict';

    document.addEventListener('DOMContentLoaded', function () {
        // Cerrar menú móvil al presionar la tecla Escape
        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape') {
                const mobileMenu = document.getElementById('mobile-menu');
                if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
                    mobileMenu.classList.add('hidden');
                }
            }
        });
    });
})();
