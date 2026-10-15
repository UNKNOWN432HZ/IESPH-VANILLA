/**
 * IESP Huanta - Módulo de Admisión
 * Control interactivo del modal de preinscripción y validaciones de formulario
 */
(function () {
    'use strict';

    window.openPreinscripcionModal = function (carrera = '') {
        const modal = document.getElementById('modal-preinscripcion');
        if (!modal) return;

        modal.classList.remove('hidden');
        modal.classList.add('flex');

        if (carrera) {
            const selectCarrera = modal.querySelector('select[name="carrera"]');
            if (selectCarrera) {
                selectCarrera.value = carrera;
            }
        }

        // Bloquear scroll de la página de fondo
        document.body.style.overflow = 'hidden';
    };

    window.closePreinscripcionModal = function () {
        const modal = document.getElementById('modal-preinscripcion');
        if (!modal) return;

        modal.classList.add('hidden');
        modal.classList.remove('flex');
        document.body.style.overflow = '';
    };

    // Cerrar modal con tecla Escape
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') {
            window.closePreinscripcionModal();
        }
    });
})();
