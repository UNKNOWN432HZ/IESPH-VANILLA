/**
 * IESP Huanta - Módulo de Galería & Lightbox
 * Control del visor de fotografías institucional con atajos de teclado
 */
(function () {
    'use strict';

    // Atajos de teclado para el visor de fotos
    document.addEventListener('keydown', function (e) {
        const modal = document.getElementById('gallery-lightbox') || document.getElementById('lightbox-modal');
        if (!modal || modal.classList.contains('hidden')) return;

        if (e.key === 'Escape') {
            if (typeof window.closeLightbox === 'function') {
                window.closeLightbox();
            }
        }
    });
})();
