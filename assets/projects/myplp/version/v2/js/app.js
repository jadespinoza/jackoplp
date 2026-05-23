const toggle = document.getElementById("themeToggle");
const body = document.body;

// tema automático
if (window.matchMedia('(prefers-color-scheme: light)').matches) {
    body.classList.add("light");
}

// persistencia
if (localStorage.getItem("theme")) {
    body.classList.toggle("light", localStorage.getItem("theme") === "light");
}

toggle.onclick = () => {
    body.classList.toggle("light");
    localStorage.setItem("theme", body.classList.contains("light") ? "light" : "dark");
};

// scroll reveal
const reveals = document.querySelectorAll(".reveal");

window.addEventListener("scroll", () => {
    reveals.forEach(el => {
        const top = el.getBoundingClientRect().top;
        if (top < window.innerHeight - 100) {
            el.classList.add("active");
        }
    });
});