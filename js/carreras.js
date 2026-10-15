/**
 * IESP Huanta - Módulo de Carreras Profesionales
 * Filtrado interactivo de especialidades y detalle de competencias
 */
(function () {
    'use strict';

    window.filterPrograms = function (category, buttonElement) {
        const cards = document.querySelectorAll('.program-card, .career-card-item');
        if (!cards.length) return;

        cards.forEach(card => {
            const cardCat = card.getAttribute('data-category');
            if (category === 'all' || cardCat === category) {
                card.style.display = '';
            } else {
                card.style.display = 'none';
            }
        });

        // Actualizar botones de filtro de forma resiliente
        const btn = buttonElement || (typeof window !== 'undefined' && window.event ? window.event.currentTarget : null);
        const allButtons = document.querySelectorAll('.filter-btn');
        if (allButtons.length) {
            allButtons.forEach(b => {
                b.classList.remove('bg-purple-600', 'bg-gradient-brand', 'text-white', 'shadow-brand', 'active');
                b.classList.add('bg-slate-100', 'text-slate-700');
            });
        }
        if (btn) {
            btn.classList.remove('bg-slate-100', 'text-slate-700');
            btn.classList.add('bg-purple-600', 'text-white', 'shadow-brand', 'active');
        }
    };

    // Alias para compatibilidad total
    window.filterCareers = window.filterPrograms;
})();
