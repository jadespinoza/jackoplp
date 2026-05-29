// --- MANEJO DE ESTADOS (PERSISTENCIA) ---

// 1. TEMA (LocalStorage)
const themeBtn = document.getElementById('theme-btn');
const themeIcon = document.getElementById('theme-icon');
const body = document.body;

function setDark(isDark) {
    if (isDark) {
        body.classList.add('dark-mode');
        themeIcon.className = 'fas fa-moon';
        localStorage.setItem('theme', 'dark');
    } else {
        body.classList.remove('dark-mode');
        themeIcon.className = 'fas fa-sun';
        localStorage.setItem('theme', 'light');
    }
}

// Cargar preferencia guardada al iniciar
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'light') setDark(false);
else setDark(true);

themeBtn.addEventListener('click', () => {
    setDark(!body.classList.contains('dark-mode'));
});

// 2. WIDGET ENCUÉNTRAME (LocalStorage)
const widget = document.getElementById('find-widget');
const widgetIcon = document.getElementById('widget-icon');

function setWidgetCollapsed(isCollapsed) {
    if (isCollapsed) {
        widget.classList.add('collapsed');
        widgetIcon.className = 'fas fa-expand-alt';
        localStorage.setItem('widget-state', 'collapsed');
    } else {
        widget.classList.remove('collapsed');
        widgetIcon.className = 'fas fa-compress-alt';
        localStorage.setItem('widget-state', 'expanded');
    }
}

// Cargar estado guardado
const savedWidget = localStorage.getItem('widget-state');
if (savedWidget === 'expanded') setWidgetCollapsed(false);
else setWidgetCollapsed(true);

function toggleWidget() {
    setWidgetCollapsed(!widget.classList.contains('collapsed'));
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
    const val = selector.value;

    if (val === 'current') {
        img.src = 'captura.jpg';
    } else {
        img.src = `assets/projects/myplp/version/${val}/captura.jpg`;
    }
}

function verVersion() {
    const selector = document.getElementById('plp-selector');
    const val = selector.value;
    let url = (val === 'current') ? 'index.html' : `assets/projects/myplp/version/${val}/index.html`;
    window.open(url, '_blank');
}

// Expandir widget al click (si está colapsado)
widget.addEventListener('click', function(e) {
    if (this.classList.contains('collapsed') && !e.target.closest('.toggle-btn')) {
        toggleWidget();
    }
});