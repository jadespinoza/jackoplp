// --- MANEJO DEL MODO OSCURO / CLARO ---
const themeBtn = document.getElementById('theme-btn');
const icon = themeBtn.querySelector('i');
const body = document.body;

// Cargar preferencia guardada
if (localStorage.getItem('theme') === 'light') {
    body.classList.add('light-mode');
    icon.classList.replace('fa-moon', 'fa-sun');
}

themeBtn.addEventListener('click', () => {
    body.classList.toggle('light-mode');
    
    if(body.classList.contains('light-mode')) {
        icon.classList.replace('fa-moon', 'fa-sun');
        localStorage.setItem('theme', 'light');
    } else {
        icon.classList.replace('fa-sun', 'fa-moon');
        localStorage.setItem('theme', 'dark');
    }
});

// --- LÓGICA DEL SELECTOR DE VERSIONES PLP ---
function irAVersion() {
    const selector = document.getElementById('plp-version-selector');
    const rutaDestino = selector.value;
    
    if (rutaDestino) {
        // Abre la versión seleccionada en una pestaña nueva
        window.open(rutaDestino, '_blank');
    } else {
        alert("Por favor selecciona una versión válida.");
    }
}