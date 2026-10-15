/**
 * IESP Huanta - Módulo de Noticias & Comunicados
 * Filtrado dinámico de publicaciones y comunicados oficiales
 */
(function () {
    'use strict';

    window.filterNews = function (category, buttonElement) {
        const articles = document.querySelectorAll('article[data-category]');
        if (!articles.length) return;

        articles.forEach(article => {
            const artCat = article.getAttribute('data-category');
            if (category === 'all' || artCat === category) {
                article.style.display = '';
            } else {
                article.style.display = 'none';
            }
        });

        if (buttonElement && buttonElement.parentElement) {
            buttonElement.parentElement.querySelectorAll('button').forEach(btn => {
                btn.classList.remove('bg-gradient-brand', 'text-white', 'shadow-brand');
                btn.classList.add('bg-slate-100', 'text-slate-700');
            });
            buttonElement.classList.remove('bg-slate-100', 'text-slate-700');
            buttonElement.classList.add('bg-gradient-brand', 'text-white', 'shadow-brand');
        }
    };
})();
