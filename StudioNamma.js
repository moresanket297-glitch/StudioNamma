// ======================================================
// 1. SMOOTH SCROLL
// ======================================================

let targetScroll = window.scrollY;
let currentScroll = window.scrollY;

window.addEventListener("wheel", (e) => {
    e.preventDefault();

    targetScroll += e.deltaY;

    const maxScroll =
        document.documentElement.scrollHeight - window.innerHeight;

    targetScroll = Math.max(
        0,
        Math.min(targetScroll, maxScroll)
    );
}, {
    passive: false
});


function smoothScroll() {

    currentScroll +=
        (targetScroll - currentScroll) * 0.02;

    window.scrollTo(0, currentScroll);

    requestAnimationFrame(smoothScroll);
}

smoothScroll();


// ======================================================
// 2. LIVE TIME
// ======================================================

function updateTime() {

    const now = new Date();

    const time = now.toLocaleTimeString("en-GB", {
        timeZone: "Europe/Madrid",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit"
    });

    document.querySelector("#live-time").textContent = time;
}

updateTime();

setInterval(updateTime, 1000);


// ======================================================
// 3. DARK / LIGHT MODE
// ======================================================

const body = document.body;
const darkToggle = document.querySelector("#dark-toggle");


function toggleMode() {

    if (body.classList.contains("light")) {

        body.classList.replace("light", "dark");

        darkToggle.textContent = "LIGHT MODE";

    } else {

        body.classList.replace("dark", "light");

        darkToggle.textContent = "DARK MODE";
    }
}


darkToggle.addEventListener("click", toggleMode);


// ======================================================
// 4. MENU
// ======================================================

const menu = document.querySelector(".menu");
const menuLink = document.querySelector("#menu_link");


menuLink.addEventListener("click", () => {

    menu.classList.toggle("active");

    if (menu.classList.contains("active")) {

        menuLink.textContent = "CLOSE";

    } else {

        menuLink.textContent = "MENU";
    }
});


// ======================================================
// 5. HERO VIDEO
// ======================================================

const heroSection = document.querySelector(".head");
const heroVideoBox = document.querySelector(".video-box");

const heroVideo =
    heroVideoBox?.querySelector("video");


let heroMouseX = 0;
let heroMouseY = 0;

let heroCurrentX = 0;
let heroCurrentY = 0;

let lastMouseX = 0;

let currentRotation = 0;
let targetRotation = 0;


const heroOffsetX = 70;
const heroOffsetY = 0;


if (heroSection && heroVideoBox) {

    // Mouse enter
    heroSection.addEventListener("mouseenter", () => {

        heroVideoBox.classList.add("active");

        heroVideo?.play().catch(() => {});
    });


    // Mouse move
    heroSection.addEventListener("mousemove", (e) => {

        heroMouseX = e.clientX + heroOffsetX;
        heroMouseY = e.clientY + heroOffsetY;


        // Calculate mouse movement
        const movement =
            e.clientX - lastMouseX;


        targetRotation = movement * 2;


        // Rotation limit
        targetRotation =
            Math.max(
                -15,
                Math.min(15, targetRotation)
            );


        lastMouseX = e.clientX;
    });


    // Mouse leave
    heroSection.addEventListener("mouseleave", () => {

        heroVideoBox.classList.remove("active");

        heroVideo?.pause();
    });
}


// Smooth hero video movement

function animateHeroVideo() {

    if (heroVideoBox) {

        heroCurrentX +=
            (heroMouseX - heroCurrentX) * 0.08;

        heroCurrentY +=
            (heroMouseY - heroCurrentY) * 0.08;


        currentRotation +=
            (targetRotation - currentRotation) * 0.1;


        targetRotation *= 0.9;


        heroVideoBox.style.left =
            `${heroCurrentX}px`;

        heroVideoBox.style.top =
            `${heroCurrentY}px`;

        heroVideoBox.style.transform =
            `translate(0, 0) rotate(${currentRotation}deg)`;
    }


    requestAnimationFrame(animateHeroVideo);
}

animateHeroVideo();


// ======================================================
// 6. IMAGE HIGHLIGHT ANIMATION
// ======================================================

const highlights =
    document.querySelectorAll(".highlight");


highlights.forEach((highlight) => {

    const images =
        highlight.querySelectorAll("img");


    if (!images.length) return;


    let index = 0;
    let zIndex = images.length;

    let interval = null;


    // Mouse enter
    highlight.addEventListener("mouseenter", () => {

        if (interval) return;


        interval = setInterval(() => {

            const currentImage =
                images[index % images.length];


            if (index < images.length) {

                currentImage.classList.add("show");

                currentImage.style.zIndex =
                    ++zIndex;

            } else {

                currentImage.classList.remove("show");


                requestAnimationFrame(() => {

                    currentImage.style.zIndex =
                        ++zIndex;


                    requestAnimationFrame(() => {

                        currentImage.classList.add("show");
                    });
                });
            }


            index++;

        }, 300);
    });


    // Mouse leave
    highlight.addEventListener("mouseleave", () => {

        clearInterval(interval);

        interval = null;


        images.forEach((image) => {

            image.classList.remove("show");

            image.style.zIndex = "";
        });


        index = 0;
        zIndex = images.length;
    });
});


// ======================================================
// 7. PLAYGROUND → PORTFOLIO
// ======================================================

const playground =
    document.querySelector(".head3 h1");

const portfolio =
    document.querySelector(".blue-box1");


let portfolioMouseX = 0;
let portfolioMouseY = 0;

let portfolioCurrentX = 0;
let portfolioCurrentY = 0;


// Mouse enter

playground.addEventListener("mouseenter", (e) => {

    portfolioMouseX = e.clientX + 20;
    portfolioMouseY = e.clientY - 50;


    portfolio.style.opacity = "1";
    portfolio.style.visibility = "visible";
});


// Mouse move

playground.addEventListener("mousemove", (e) => {

    portfolioMouseX = e.clientX + 30;
    portfolioMouseY = e.clientY + 20;
});


// Mouse leave

playground.addEventListener("mouseleave", () => {

    portfolio.style.opacity = "0";
    portfolio.style.visibility = "hidden";
});


// Smooth portfolio movement

function animatePortfolio() {

    portfolioCurrentX +=
        (portfolioMouseX - portfolioCurrentX) * 0.05;

    portfolioCurrentY +=
        (portfolioMouseY - portfolioCurrentY) * 0.08;


    portfolio.style.left =
        `${portfolioCurrentX}px`;

    portfolio.style.top =
        `${portfolioCurrentY}px`;


    requestAnimationFrame(animatePortfolio);
}

animatePortfolio();


// ======================================================
// 8. PROJECT VIDEO + LABEL
// ======================================================

const projects =
    document.querySelectorAll(".project");


projects.forEach((project) => {

    const label =
        project.querySelector(".project-label");

    const preview =
        project.querySelector(".project-preview");

    const video =
        preview.querySelector("video");


    let mouseX = 0;
    let mouseY = 0;

    let currentX = 0;
    let currentY = 0;


    // ------------------------------
    // Mouse enter
    // ------------------------------

    project.addEventListener("mouseenter", (e) => {

        mouseX = e.clientX;
        mouseY = e.clientY;


        // Show label
        label.style.opacity = "1";
        label.style.visibility = "visible";


        // Show video
        preview.style.opacity = "1";
        preview.style.visibility = "visible";


        // Play video
        video.play().catch(() => {});
    });


    // ------------------------------
    // Mouse move
    // ------------------------------

    project.addEventListener("mousemove", (e) => {

        mouseX = e.clientX;
        mouseY = e.clientY;
    });


    // ------------------------------
    // Mouse leave
    // ------------------------------

    project.addEventListener("mouseleave", () => {

        label.style.opacity = "0";
        label.style.visibility = "hidden";


        preview.style.opacity = "0";
        preview.style.visibility = "hidden";


        video.pause();

        video.currentTime = 0;
    });


    // ------------------------------
    // Smooth movement
    // ------------------------------

    function animateProject() {

        currentX +=
            (mouseX - currentX) * 0.08;

        currentY +=
            (mouseY - currentY) * 0.08;


        label.style.left =
            `${currentX + 30}px`;

        label.style.top =
            `${currentY + 20}px`;


        requestAnimationFrame(animateProject);
    }


    animateProject();
});


// ======================================================
// 9. SERVICES
// ======================================================

const services =
    document.querySelectorAll(".one-by-one h1");

const serviceVideoBox =
    document.querySelector(".service-video");

const serviceVideo =
    document.querySelector("#serviceVideo");

const serviceDescription =
    document.querySelector(".service-description");

const serviceText =
    document.querySelector("#serviceText");

const servicesContainer =
    document.querySelector(".services-container");

const servicesList =
    document.querySelector(".one-by-one");


services.forEach((service) => {

    // Mouse enter

    service.addEventListener("mouseenter", () => {

        // Remove active from all
        services.forEach((item) => {

            item.classList.remove("active");
        });


        // Add active to current
        service.classList.add("active");


        // Parent active
        servicesList.classList.add("has-active");


        // Current heading position
        const rect =
            service.getBoundingClientRect();


        const centerY =
            rect.top + rect.height / 2;


        // ------------------------------
        // Video position
        // ------------------------------

        const videoHeight = 300;


        serviceVideoBox.style.top =
            `${centerY - videoHeight / 2}px`;


        // ------------------------------
        // Text position
        // ------------------------------

        const textHeight =
            serviceDescription.offsetHeight;


        serviceDescription.style.top =
            `${centerY - textHeight / 2}px`;


        // ------------------------------
        // Change video
        // ------------------------------

        const videoURL =
            service.dataset.video;


        serviceVideo.src = videoURL;

        serviceVideo.currentTime = 0;

        serviceVideo.play().catch(() => {});


        // ------------------------------
        // Change text
        // ------------------------------

        serviceText.textContent =
            service.dataset.text;


        // ------------------------------
        // Show video + text
        // ------------------------------

        serviceVideoBox.style.opacity = "1";
        serviceVideoBox.style.visibility = "visible";


        serviceDescription.style.opacity = "1";
        serviceDescription.style.visibility = "visible";
    });
});


// Services mouse leave

servicesContainer.addEventListener("mouseleave", () => {

    services.forEach((item) => {

        item.classList.remove("active");
    });


    servicesList.classList.remove("has-active");


    serviceVideoBox.style.opacity = "0";
    serviceVideoBox.style.visibility = "hidden";


    serviceDescription.style.opacity = "0";
    serviceDescription.style.visibility = "hidden";


    serviceVideo.pause();
});


// ======================================================
// 10. CUSTOM CURSOR DOT
// ======================================================

const cursorDot =
    document.querySelector(".cursor-dot");


let cursorMouseX = 0;
let cursorMouseY = 0;

let cursorCurrentX = 0;
let cursorCurrentY = 0;


// Mouse position

document.addEventListener("mousemove", (e) => {

    cursorMouseX = e.clientX + 40;
    cursorMouseY = e.clientY + 40;
});


// Smooth cursor animation

function animateCursor() {

    cursorCurrentX +=
        (cursorMouseX - cursorCurrentX) * 0.18;

    cursorCurrentY +=
        (cursorMouseY - cursorCurrentY) * 0.18;


    cursorDot.style.left =
        `${cursorCurrentX}px`;

    cursorDot.style.top =
        `${cursorCurrentY}px`;


    requestAnimationFrame(animateCursor);
}

animateCursor();


// ======================================================
// 11. HIDE CURSOR DOT ON HERO
// ======================================================

const observer =
    new IntersectionObserver(
        (entries) => {

            if (entries[0].isIntersecting) {

                // Hero visible → hide dot
                cursorDot.classList.remove("show");

            } else {

                // Hero not visible → show dot
                cursorDot.classList.add("show");
            }
        },
        {
            threshold: 0.1
        }
    );


observer.observe(heroSection);