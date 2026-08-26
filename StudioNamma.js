// --- 1. DARK / LIGHT MODE LOGIC ---
const body = document.body;
const drk = document.querySelector("#dark-toggle");

function toggleMode() {
    if (body.classList.contains("light")) {
        body.classList.replace("light", "dark");
        drk.textContent = 'LIGHT MODE';
    }
    else {
        body.classList.replace("dark", "light");
        drk.textContent = 'DARK MODE';
    }
}
drk.addEventListener('click', toggleMode);

//------------------------------------------------
//MENU PAGE
let menu = document.querySelector(".menu");
let menu_link = document.querySelector("#menu_link");

menu_link.addEventListener("click", () => {

    menu.classList.toggle("active");

    if (menu.classList.contains("active")) {
        menu_link.textContent = "CLOSE";
    } else {
        menu_link.textContent = "MENU";
    }
});

//---------------------------------------------------------
// --- MOUSE TRACKING WITH OFFSET DISTANCE ---
const headSection = document.querySelector(".head");
const videoBox = document.querySelector(".video-box");
const video = videoBox ? videoBox.querySelector("video") : null;

let mouseX = 0;
let mouseY = 0;
let currentX = 0;
let currentY = 0;
let lastMouseX = 0;
let currentRotation = 0;
let targetRotation = 0;

const offsetX = 70; // Shifts video to the right of the cursor
const offsetY = 0; // Shifts video below the cursor

if (headSection && videoBox) {
    headSection.addEventListener("mouseenter", () => {
        videoBox.classList.add("active");
        if (video) video.play().catch(() => {});
    });

    headSection.addEventListener("mousemove", (e) => {
        // Add offset so it sits away from the cursor
        mouseX = e.clientX + offsetX;
        mouseY = e.clientY + offsetY;

        const movement = e.clientX - lastMouseX;
        targetRotation = movement * 2;
        targetRotation = Math.max(-15, Math.min(15, targetRotation));
        lastMouseX = e.clientX;
    });

    headSection.addEventListener("mouseleave", () => {
        videoBox.classList.remove("active");
        if (video) video.pause();
    });
}

function animate() {
    if (videoBox) {
        currentX += (mouseX - currentX) * 0.05;
        currentY += (mouseY - currentY) * 0.05;

        currentRotation += (targetRotation - currentRotation) * 0.1;
        targetRotation *= 0.9;

        videoBox.style.left = `${currentX}px`;
        videoBox.style.top = `${currentY}px`;
        videoBox.style.transform = `translate(0, 0) rotate(${currentRotation}deg)`;
    }

    requestAnimationFrame(animate);
}

animate();

let highlights = document.querySelectorAll(".highlight");

highlights.forEach((highlight) => {
    let images = highlight.querySelectorAll("img");
    if (!images.length) return;

    let idx = 0;
    let zIndex = images.length;
    let interval = null;

    highlight.addEventListener("mouseenter", () => {
        if (interval) return;
        interval = setInterval(() => {
            const current = images[idx % images.length];

            if (idx < images.length) {
                current.classList.add("show");
                current.style.zIndex = ++zIndex;
            } else {
                current.classList.remove("show");
                requestAnimationFrame(() => {
                    current.style.zIndex = ++zIndex;
                    requestAnimationFrame(() => {
                        current.classList.add("show");
                    });
                });
            }
            idx++;
        }, 300);
    });

    highlight.addEventListener("mouseleave", () => {
        clearInterval(interval);
        interval = null;
        images.forEach((img) => {
            img.classList.remove("show");
            img.style.zIndex = "";
        });
        idx = 0;
        zIndex = images.length;
    });
});