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
});
