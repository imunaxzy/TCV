/* =====================================================
   CV DIGITAL V3
   IMAM FATKHUROJI
===================================================== */


/* =====================================================
   LOADING SCREEN
===================================================== */

const loader =
    document.getElementById("loader");

const loaderProgress =
    document.getElementById("loaderProgress");


let progress = 0;


const progressTimer =
    setInterval(() => {

        progress += 2;

        loaderProgress.style.width =
            progress + "%";


        if (progress >= 100) {

            clearInterval(progressTimer);


            setTimeout(() => {

                loader.classList.add("hide");

            }, 250);

        }

    }, 20);



/* =====================================================
   MOBILE NAVIGATION
===================================================== */

const mobileMenu =
    document.getElementById("mobileMenu");

const sidebar =
    document.querySelector(".sidebar");

const navLinks =
    document.querySelectorAll(".nav-link");


mobileMenu.addEventListener(
    "click",
    () => {

        sidebar.classList.toggle("open");

    }
);


navLinks.forEach(
    (link) => {

        link.addEventListener(
            "click",
            () => {

                sidebar.classList.remove(
                    "open"
                );

            }
        );

    }
);



/* =====================================================
   ACTIVE NAVIGATION
===================================================== */

const sections =
    document.querySelectorAll(
        "section[id]"
    );


const navObserver =
    new IntersectionObserver(
        (entries) => {

            entries.forEach(
                (entry) => {

                    if (
                        entry.isIntersecting
                    ) {

                        navLinks.forEach(
                            (link) => {

                                const linkTarget =
                                    link.getAttribute(
                                        "href"
                                    );

                                link.classList.toggle(
                                    "active",
                                    linkTarget ===
                                    "#" +
                                    entry.target.id
                                );

                            }
                        );

                    }

                }
            );

        },

        {
            rootMargin:
                "-35% 0px -55% 0px"
        }
    );


sections.forEach(
    (section) => {

        navObserver.observe(
            section
        );

    }
);



/* =====================================================
   SCROLL REVEAL
===================================================== */

const revealElements =
    document.querySelectorAll(
        ".reveal"
    );


const revealObserver =
    new IntersectionObserver(
        (entries, observer) => {

            entries.forEach(
                (entry) => {

                    if (
                        entry.isIntersecting
                    ) {

                        entry.target.classList.add(
                            "show"
                        );


                        observer.unobserve(
                            entry.target
                        );

                    }

                }
            );

        },

        {
            threshold: 0.12
        }
    );


revealElements.forEach(
    (element) => {

        revealObserver.observe(
            element
        );

    }
);



/* =====================================================
   MOUSE GLOW
===================================================== */

const mouseGlow =
    document.getElementById(
        "mouseGlow"
    );


window.addEventListener(
    "mousemove",
    (event) => {

        mouseGlow.style.left =
            event.clientX + "px";

        mouseGlow.style.top =
            event.clientY + "px";

    }
);



/* =====================================================
   PROFILE PHOTO
===================================================== */

const profileImage =
    document.getElementById(
        "profileImage"
    );

const photoPlaceholder =
    document.getElementById(
        "photoPlaceholder"
    );


/*
    Kalau profile.jpg tidak ditemukan,
    tampilkan placeholder IF.
*/

profileImage.addEventListener(
    "error",
    () => {

        profileImage.style.display =
            "none";

        photoPlaceholder.style.display =
            "grid";

    }
);


profileImage.addEventListener(
    "load",
    () => {

        profileImage.style.display =
            "block";

        photoPlaceholder.style.display =
            "none";

    }
);



/* =====================================================
   OWNER PHOTO UI
===================================================== */

const changePhotoButton =
    document.getElementById(
        "changePhotoButton"
    );


const photoInput =
    document.getElementById(
        "photoInput"
    );


/*
    Tombol CHANGE PHOTO sengaja
    disembunyikan secara default.

    Untuk website online sungguhan,
    tombol hanya boleh ditampilkan
    setelah authentication owner
    berhasil diverifikasi oleh backend.
*/


function enableOwnerPhotoEditor() {

    changePhotoButton.classList.remove(
        "hidden"
    );

}



/*
    Ketika tombol ditekan,
    buka file picker perangkat.
*/

changePhotoButton.addEventListener(
    "click",
    () => {

        photoInput.click();

    }
);



/*
    Ketika user memilih gambar,
    tampilkan preview.
*/

photoInput.addEventListener(
    "change",
    (event) => {

        const file =
            event.target.files[0];


        if (
            !file ||
            !file.type.startsWith(
                "image/"
            )
        ) {

            return;

        }


        const reader =
            new FileReader();


        reader.onload =
            (event) => {

                profileImage.src =
                    event.target.result;

                profileImage.style.display =
                    "block";

                photoPlaceholder.style.display =
                    "none";

            };


        reader.readAsDataURL(
            file
        );

    }
);


/*
    PENTING:

    Jangan memanggil:

    enableOwnerPhotoEditor();

    pada website publik sebelum
    authentication/backend tersedia.

    JavaScript client-side saja bukan
    sistem keamanan yang sebenarnya.
*/