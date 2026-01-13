const navLinks = document.querySelectorAll(".nav-links a");
const sections = document.querySelectorAll("section");
const navbar = document.querySelector(".navbar");
navLinks.forEach(link => {
    link.addEventListener("click", e => {
        e.preventDefault();
        const target = document.querySelector(link.getAttribute("href"));
        const offset = navbar.offsetHeight;
        window.scrollTo({
            top: target.offsetTop - offset,
            behavior: "smooth"
        });
    });
});
window.addEventListener("scroll", () => {
    let current = "";
    sections.forEach(section => {
        if (scrollY >= section.offsetTop - navbar.offsetHeight - 50) {
            current = section.id;
        }
    });

    navLinks.forEach(link => {
        link.classList.remove("active");
        if (link.getAttribute("href") === `#${current}`) {
            link.classList.add("active");
        }
    });
});
const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("show");
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.15 });

document.querySelectorAll(".section").forEach(el => {
    el.classList.add("hidden");
    observer.observe(el);
});
const projects = [
    {
        title: "Calculator App",
        desc: "A responsive calculator using HTML, CSS, and JavaScript.",
        link: "calculator/index.html",
        image: "calculator.jpg"
    },
    {
        title: "Login Page",
        desc: "Modern login page with clean UI and validation.",
        link: "login/index.html",
        image: "login.jpg"
    },
    {
        title: "To-Do List",
        desc: "Task management application for daily productivity.",
        link: "todo/index.html",
        image: "to do.jpg"
    }
];

const projectGrid = document.querySelector(".projects-grid");

projects.forEach(project => {
    const card = document.createElement("div");
    card.className = "project-card hidden";
    card.innerHTML = `
        <div class="project-img">
            <img src="${project.image}" alt="${project.title}">
        </div>
        <h3>${project.title}</h3>
        <p>${project.desc}</p>
        <a href="${project.link}" target="_blank" class="btn small">Open Project</a>
    `;
    projectGrid.appendChild(card);
    observer.observe(card);
});

