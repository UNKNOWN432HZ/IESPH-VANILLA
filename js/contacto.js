/**
 * IESP Huanta - Módulo de Contacto & Mesa de Partes
 * Validación de formularios, manejo de envío y retroalimentación al usuario
 */
(function () {
    'use strict';

    window.handleContactSubmit = function (param) {
        let form = param;
        if (param && param.preventDefault) {
            param.preventDefault();
            form = param.target || param.currentTarget;
        }
        if (!form || !(form instanceof HTMLElement)) {
            form = document.getElementById('contact-form') || document.getElementById('contacto-form') || document.querySelector('form');
        }
        if (!form) return false;

        const btn = form.querySelector('button[type="submit"]');
        const originalText = btn ? btn.innerHTML : '';

        if (btn) {
            btn.disabled = true;
            btn.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin"></i> Enviando...';
        }

        setTimeout(() => {
            alert('¡Gracias por comunicarte con el IESP Huanta! Hemos recibido tu solicitud y un asesor académico se pondrá en contacto contigo.');
            form.reset();
            if (btn) {
                btn.disabled = false;
                btn.innerHTML = originalText;
            }
        }, 800);
        return false;
    };
})();
