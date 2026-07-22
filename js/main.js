// --- MANEJO DE ESTADOS (PERSISTENCIA) ---

// 1. TEMA (LocalStorage)
const themeBtn = document.getElementById('theme-btn');
const themeIcon = document.getElementById('theme-icon');
const body = document.body;

function setDark(isDark) {
    if (isDark) {
        body.classList.add('dark-mode');
        if (themeIcon) themeIcon.className = 'fas fa-moon';
        localStorage.setItem('theme', 'dark');
    } else {
        body.classList.remove('dark-mode');
        if (themeIcon) themeIcon.className = 'fas fa-sun';
        localStorage.setItem('theme', 'light');
    }
}

// Cargar preferencia guardada al iniciar
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'light') setDark(false);
else setDark(true);

if (themeBtn) {
    themeBtn.addEventListener('click', () => {
        setDark(!body.classList.contains('dark-mode'));
    });
}

// 2. WIDGET ENCUÉNTRAME (LocalStorage)
const widget = document.getElementById('find-widget');
const widgetIcon = document.getElementById('widget-icon');

function setWidgetCollapsed(isCollapsed) {
    if (!widget) return;
    if (isCollapsed) {
        widget.classList.add('collapsed');
        if (widgetIcon) widgetIcon.className = 'fas fa-expand-alt';
        localStorage.setItem('widget-state', 'collapsed');
    } else {
        widget.classList.remove('collapsed');
        if (widgetIcon) widgetIcon.className = 'fas fa-compress-alt';
        localStorage.setItem('widget-state', 'expanded');
    }
}

// Cargar estado guardado
const savedWidget = localStorage.getItem('widget-state');
if (savedWidget === 'expanded') setWidgetCollapsed(false);
else setWidgetCollapsed(true);

function toggleWidget() {
    if (widget) {
        setWidgetCollapsed(!widget.classList.contains('collapsed'));
    }
}

// 3. SCROLL CINEMATOGRÁFICO (REVEAL)
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('active');
    });
}, { threshold: 0.1 });

document.querySelectorAll('.section-reveal, .reveal').forEach(el => observer.observe(el));

// 4. LÓGICA PLP PREVIEW
function updatePLPPreview() {
    const selector = document.getElementById('plp-selector');
    const img = document.getElementById('plp-preview');
    if (!selector || !img) return;
    const val = selector.value;

    if (val === 'current') {
        img.src = 'captura.jpg';
    } else {
        img.src = `assets/projects/myplp/version/${val}/captura.jpg`;
    }
}

function verVersion() {
    const selector = document.getElementById('plp-selector');
    if (!selector) return;
    const val = selector.value;
    let url = (val === 'current') ? 'index.html' : `assets/projects/myplp/version/${val}/index.html`;
    window.open(url, '_blank');
}

// 5. DESCARGA DE IMAGE2DOC
function downloadApp(platform) {
    let message = `Iniciando la descarga de Image2Doc para ${platform}...`;
    showToast(message, 'fa-cloud-download-alt');
}

function showToast(message, iconClass = 'fa-info-circle') {
    let toast = document.getElementById('toast-notification');
    if (!toast) {
        toast = document.createElement('div');
        toast.id = 'toast-notification';
        toast.className = 'toast-notification';
        document.body.appendChild(toast);
    }
    toast.innerHTML = `<i class="fas ${iconClass}"></i> <span>${message}</span>`;
    toast.classList.add('show');
    
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3500);
}

// 6. SCROLL HORIZONTAL & TOP TRACK SYNC
function scrollHorizontal(containerId, distance) {
    const container = document.getElementById(containerId);
    if (container) {
        container.scrollBy({ left: distance, behavior: 'smooth' });
    }
}

function updateScrollThumb(containerId, thumbId) {
    const container = document.getElementById(containerId);
    const thumb = document.getElementById(thumbId);
    if (!container || !thumb) return;
    
    const scrollWidth = container.scrollWidth;
    const clientWidth = container.clientWidth;
    const scrollLeft = container.scrollLeft;
    
    if (scrollWidth <= clientWidth) {
        thumb.style.width = '100%';
        thumb.style.transform = 'translateX(0)';
        return;
    }
    
    const ratio = clientWidth / scrollWidth;
    const thumbWidthPercent = Math.max(ratio * 100, 15); // ancho mínimo del 15%
    const maxScrollLeft = scrollWidth - clientWidth;
    const scrollPercent = maxScrollLeft > 0 ? (scrollLeft / maxScrollLeft) : 0;
    const maxTranslatePercent = (100 - thumbWidthPercent) / thumbWidthPercent * 100;
    
    thumb.style.width = thumbWidthPercent + '%';
    thumb.style.transform = `translateX(${scrollPercent * maxTranslatePercent}%)`;
}

function scrollToTrackPosition(containerId, trackElement, event) {
    const container = document.getElementById(containerId);
    if (!container) return;
    const rect = trackElement.getBoundingClientRect();
    const clickX = event.clientX - rect.left;
    const percentage = Math.max(0, Math.min(1, clickX / rect.width));
    const targetScroll = percentage * (container.scrollWidth - container.clientWidth);
    container.scrollTo({ left: targetScroll, behavior: 'smooth' });
}

// NAVEGACIÓN AL HACER CLICK EN CUALQUIER PARTE DE LA TARJETA
function navigateCard(url, event) {
    // Si se hace clic en un selector <select> o sus opciones, no redirigir
    if (event && (event.target.tagName === 'SELECT' || event.target.tagName === 'OPTION')) {
        return;
    }
    window.location.href = url;
}

// Inicializar barras al cargar la página y al redimensionar
document.addEventListener('DOMContentLoaded', () => {
    updateScrollThumb('prog-scroll', 'prog-scroll-thumb');
    updateScrollThumb('remod-scroll', 'remod-scroll-thumb');
});

window.addEventListener('resize', () => {
    updateScrollThumb('prog-scroll', 'prog-scroll-thumb');
    updateScrollThumb('remod-scroll', 'remod-scroll-thumb');
});

// Expandir widget al click (si está colapsado)
if (widget) {
    widget.addEventListener('click', function(e) {
        if (this.classList.contains('collapsed') && !e.target.closest('.toggle-btn')) {
            toggleWidget();
        }
    });
}