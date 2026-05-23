const themeBtn = document.getElementById('theme-btn');
const themeIcon = themeBtn.querySelector('i');
const body = document.body;

// 1. Función para cambiar el icono
const updateIcon = () => {
    if (body.classList.contains('light-mode')) {
        themeIcon.classList.replace('fa-moon', 'fa-sun');
    } else {
        themeIcon.classList.replace('fa-sun', 'fa-moon');
    }
};

// 2. Detectar preferencia del sistema al cargar
const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)');

const loadTheme = () => {
    const savedTheme = localStorage.getItem('theme');
    
    if (savedTheme === 'light') {
        body.classList.add('light-mode');
    } else if (savedTheme === 'dark') {
        body.classList.remove('light-mode');
    } else {
        // Si no hay nada guardado, usar lo del sistema
        if (!systemPrefersDark.matches) {
            body.classList.add('light-mode');
        }
    }
    updateIcon();
};

// 3. Evento de click manual
themeBtn.addEventListener('click', () => {
    body.classList.toggle('light-mode');
    
    // Guardar elección del usuario
    if (body.classList.contains('light-mode')) {
        localStorage.setItem('theme', 'light');
    } else {
        localStorage.setItem('theme', 'dark');
    }
    updateIcon();
});

// Escuchar cambios en el sistema en tiempo real
systemPrefersDark.addEventListener('change', e => {
    if (!localStorage.getItem('theme')) { // Solo si el usuario no ha elegido manualmente
        if (e.matches) body.classList.remove('light-mode');
        else body.classList.add('light-mode');
        updateIcon();
    }
});

// Ejecutar al cargar la página
loadTheme();