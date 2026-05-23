// THEME
const toggle = document.getElementById("themeToggle");
const body = document.body;

toggle.addEventListener("click", () => {
    body.classList.toggle("light");
});

// SCROLL REVEAL
const reveals = document.querySelectorAll(".reveal");

window.addEventListener("scroll", () => {
    reveals.forEach(el => {
        const top = el.getBoundingClientRect().top;
        if (top < window.innerHeight - 50) {
            el.classList.add("active");
        }
    });
});

// CURSOR GLOW
const cursor = document.querySelector(".cursor");

document.addEventListener("mousemove", e => {
    cursor.style.top = e.clientY + "px";
    cursor.style.left = e.clientX + "px";
});