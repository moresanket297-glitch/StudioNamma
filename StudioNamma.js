let targetScroll = window.scrollY;
let currentScroll = window.scrollY;

window.addEventListener("wheel", (e) => {
    e.preventDefault();
    // Mouse wheel ki movement
    targetScroll += e.deltaY;

    // Page ki limit
    const maxScroll =
        document.documentElement.scrollHeight - window.innerHeight;
    // Scroll ko page ke andar hi rakho
    targetScroll = Math.max(0, Math.min(targetScroll, maxScroll));

}, { passive: false });


function smoothScroll() {
    // Current position slowly target ki taraf jayegi
    currentScroll += (targetScroll - currentScroll) * 0.02;

    window.scrollTo(0, currentScroll);

    requestAnimationFrame(smoothScroll);
}
smoothScroll();


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
        currentX += (mouseX - currentX) * 0.08;
        currentY += (mouseY - currentY) * 0.08;

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

// ----------------------------------------------------------
const playground = document.querySelector(".head3 h1");
const portfolio = document.querySelector(".blue-box1");

let mouseeX = 0;
let mouseeY = 0;

let currenttX = 0;
let currenttY = 0;

playground.addEventListener("mouseenter", (e) => {
    mouseeX = e.clientX + 20;
    mouseeY = e.clientY - 50;

    portfolio.style.opacity = "1";
    portfolio.style.visibility = "visible";
});

playground.addEventListener("mousemove", (e) => {
    mouseeX = e.clientX + 30;
    mouseeY = e.clientY + 20;
});

playground.addEventListener("mouseleave", () => {
    portfolio.style.opacity = "0";
    portfolio.style.visibility = "hidden";
});

function animatePortfolio() {
    // Smooth movement
    currenttX += (mouseeX - currenttX) * 0.05;
    currenttY += (mouseeY - currenttY) * 0.08;

    portfolio.style.left = `${currenttX}px`;
    portfolio.style.top = `${currenttY}px`;

    requestAnimationFrame(animatePortfolio);
}
animatePortfolio();

// ---------------------------------------------------

const projects = document.querySelectorAll(".project");

projects.forEach((project) => {

    const label = project.querySelector(".project-label");
    const preview = project.querySelector(".project-preview");
    const video = preview.querySelector("video");

    let mouseX = 0;
    let mouseY = 0;

    let currentX = 0;
    let currentY = 0;


    // MOUSE ENTER
    project.addEventListener("mouseenter", (e) => {

        mouseX = e.clientX;
        mouseY = e.clientY;

        // Label show
        label.style.opacity = "1";
        label.style.visibility = "visible";

        // Video show
        preview.style.opacity = "1";
        preview.style.visibility = "visible";

        // Video play
        video.play().catch(() => {});
    });


    // MOUSE MOVE
    project.addEventListener("mousemove", (e) => {

        mouseX = e.clientX;
        mouseY = e.clientY;

    });

    // MOUSE LEAVE
    project.addEventListener("mouseleave", () => {

        label.style.opacity = "0";
        label.style.visibility = "hidden";

        preview.style.opacity = "0";
        preview.style.visibility = "hidden";

        // Video stop
        video.pause();
        video.currentTime = 0;
    });
    // SMOOTH ANIMATION
    function animate() {

        currentX += (mouseX - currentX) * 0.08;
        currentY += (mouseY - currentY) * 0.08;

        label.style.left = `${currentX + 30}px`;
        label.style.top = `${currentY + 20}px`;

        requestAnimationFrame(animate);
    }
    animate();
});


// SERVICE
const services = document.querySelectorAll(".one-by-one h1");

const serviceVideo = document.querySelector("#serviceVideo");
const serviceVideoBox = document.querySelector(".service-video");

const serviceText = document.querySelector("#serviceText");


services.forEach((service) => {

    service.addEventListener("mouseenter", () => {

        // -----------------------------
        // Remove active from all
        // -----------------------------

        services.forEach((item) => {
            item.classList.remove("active");
        });


        // -----------------------------
        // Current service black
        // -----------------------------

        service.classList.add("active");


        // -----------------------------
        // Get video
        // -----------------------------

        const videoURL = service.dataset.video;

        serviceVideo.src = videoURL;

        serviceVideoBox.style.opacity = "1";

        serviceVideo.play().catch(() => {});


        // -----------------------------
        // Get right side text
        // -----------------------------

        const text = service.dataset.text;

        serviceText.textContent = text;

        serviceText.style.opacity = "1";

    });

});