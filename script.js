document.documentElement.classList.add("js");

document.addEventListener("DOMContentLoaded", () => {
    const revealItems = document.querySelectorAll("[data-reveal]");

    if (!("IntersectionObserver" in window)) {
        revealItems.forEach((item) => item.classList.add("is-visible"));
    } else {
        const observer = new IntersectionObserver(
            (entries, obs) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("is-visible");
                        obs.unobserve(entry.target);
                    }
                });
            },
            {
                threshold: 0.2,
            }
        );

        revealItems.forEach((item) => observer.observe(item));
    }

    const memberButtons = document.querySelectorAll(".member-button");
    const memberName = document.getElementById("member-name");
    const memberRole = document.getElementById("member-role");
    const memberBio = document.getElementById("member-bio");
    const memberPhoto = document.getElementById("member-photo");
    const memberPhotoWrap = document.querySelector(".member-photo");

    if (memberButtons.length && memberName && memberRole && memberBio && memberPhoto && memberPhotoWrap) {
        const setMember = (button) => {
            memberButtons.forEach((item) => item.classList.remove("is-active"));
            button.classList.add("is-active");

            const name = button.dataset.name || "";
            const role = button.dataset.role || "";
            const bio = button.dataset.bio || "";
            const photo = button.dataset.photo || "";

            memberName.textContent = name;
            memberRole.textContent = role;
            memberBio.textContent = bio;

            if (photo) {
                memberPhoto.src = photo;
                memberPhoto.alt = `${name} - ${role}`;
                memberPhotoWrap.classList.add("has-photo");
            } else {
                memberPhoto.removeAttribute("src");
                memberPhoto.alt = "";
                memberPhotoWrap.classList.remove("has-photo");
            }
        };

        memberButtons.forEach((button) => {
            button.addEventListener("click", () => setMember(button));
        });

        const defaultButton = document.querySelector(".member-button.is-active") || memberButtons[0];
        if (defaultButton) {
            setMember(defaultButton);
        }
    }

    const galleryItems = Array.from(document.querySelectorAll("[data-gallery-item]"));
    const lightbox = document.getElementById("photo-lightbox");
    const lightboxImage = lightbox?.querySelector(".lightbox-image");
    const lightboxCaption = lightbox?.querySelector(".lightbox-caption");
    const closeButton = lightbox?.querySelector(".lightbox-close");
    const prevButton = lightbox?.querySelector(".lightbox-nav.prev");
    const nextButton = lightbox?.querySelector(".lightbox-nav.next");
    let currentIndex = -1;

    if (galleryItems.length && lightbox && lightboxImage && lightboxCaption && closeButton && prevButton && nextButton) {
        const setImage = (index) => {
            currentIndex = (index + galleryItems.length) % galleryItems.length;
            const item = galleryItems[currentIndex];
            const src = item.dataset.full || "";
            const alt = item.dataset.alt || "Galerijfoto";
            lightboxImage.src = src;
            lightboxImage.alt = alt;
            lightboxCaption.textContent = alt;
        };

        const openLightbox = (index) => {
            setImage(index);
            lightbox.classList.add("is-open");
            lightbox.setAttribute("aria-hidden", "false");
            document.body.style.overflow = "hidden";
        };

        const closeLightbox = () => {
            lightbox.classList.remove("is-open");
            lightbox.setAttribute("aria-hidden", "true");
            document.body.style.overflow = "";
        };

        galleryItems.forEach((item, index) => {
            item.addEventListener("click", () => openLightbox(index));
        });

        closeButton.addEventListener("click", closeLightbox);
        prevButton.addEventListener("click", () => setImage(currentIndex - 1));
        nextButton.addEventListener("click", () => setImage(currentIndex + 1));

        lightbox.addEventListener("click", (event) => {
            if (event.target === lightbox) {
                closeLightbox();
            }
        });

        document.addEventListener("keydown", (event) => {
            if (!lightbox.classList.contains("is-open")) {
                return;
            }

            if (event.key === "Escape") {
                closeLightbox();
            } else if (event.key === "ArrowLeft") {
                setImage(currentIndex - 1);
            } else if (event.key === "ArrowRight") {
                setImage(currentIndex + 1);
            }
        });
    }

    const nextFirstThursdayLabel = document.getElementById("next-first-thursday");
    if (nextFirstThursdayLabel) {
        const now = new Date();
        let year = now.getFullYear();
        let month = now.getMonth();

        const getFirstThursday = (targetYear, targetMonth) => {
            const firstDay = new Date(targetYear, targetMonth, 1);
            const dayOfWeek = firstDay.getDay();
            const offset = (4 - dayOfWeek + 7) % 7;
            return new Date(targetYear, targetMonth, 1 + offset);
        };

        let nextDate = getFirstThursday(year, month);
        if (now > nextDate) {
            month += 1;
            if (month > 11) {
                month = 0;
                year += 1;
            }
            nextDate = getFirstThursday(year, month);
        }

        const formatted = nextDate.toLocaleDateString("nl-NL", {
            weekday: "long",
            day: "numeric",
            month: "long",
            year: "numeric",
        });

        nextFirstThursdayLabel.textContent = `Eerstvolgende eerste donderdag: ${formatted}`;
    }
});
