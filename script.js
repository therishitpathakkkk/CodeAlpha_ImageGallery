const menuBtn = document.querySelector(".mobile-menu-btn");
const mobileMenu = document.querySelector(".mobile-menu");

const galleryGrid = document.querySelector(".gallery-grid");

const filters = document.querySelectorAll(".filter");

const lightbox = document.querySelector(".lightbox");
const lightboxImage = document.querySelector(".lightbox img");
const lightboxClose = document.querySelector(".lightbox-close");


console.log(filters)

menuBtn.addEventListener("click", () => {

    mobileMenu.classList.toggle("active");
    menuBtn.classList.toggle("active");

});

const photos = [
    {
        image: "images/image.png",
        title: "Mountain Escape",
        category: "Nature",
        layout: "featured"
    },
    {
        image: "images/image copy.png",
        title: "Golden Coast",
        category: "Travel",
        layout: "normal"
    },
    {
        image: "images/image copy 2.png",
        title: "Wild & Free",
        category: "Animals",
        layout: "normal"
    },
    {
        image: "images/image copy 3.png",
        title: "Speed & Design",
        category: "Automotive",
        layout: "wide"
    },
    {
        image: "images/image copy 4.png",
        title: "Into the Woods",
        category: "Nature",
        layout: "normal"
    },
    {
        image: "images/image copy 5.png",
        title: "Blue Paradise",
        category: "Travel",
        layout: "normal"
    }
];


function renderGallery(photoList) {

    galleryGrid.innerHTML = "";

    photoList.forEach((photo, index) => {

        const card = document.createElement("article");
        card.classList.add("gallery-card", photo.layout);

        galleryGrid.appendChild(card);


        const image = document.createElement("img");
        image.src = photo.image;
        image.alt = photo.title;

        card.appendChild(image);


        const cardContent = document.createElement("div");
        cardContent.classList.add("card-content");
        card.appendChild(cardContent);

        const info = document.createElement("div");
        cardContent.appendChild(info);


        const tag = document.createElement("span");
        tag.classList.add("tag");
        tag.textContent = photo.category;
        info.appendChild(tag);


        const title = document.createElement("h2");
        title.textContent = photo.title;
        info.appendChild(title);


        const number = document.createElement("span");
        number.classList.add("number");
        number.textContent = String(index + 1).padStart(2, "0");
        cardContent.appendChild(number);


        const expandBtn = document.createElement("button");
        expandBtn.classList.add("expand-btn");
        expandBtn.textContent = "↗";
        card.appendChild(expandBtn);


        expandBtn.addEventListener("click", () => {
            lightboxImage.src = photo.image;
            lightbox.classList.add("active");

        });




    });
};

lightboxClose.addEventListener("click", () => {
    lightbox.classList.remove("active");

});

lightbox.addEventListener("click", (event) => {
    if (event.target === lightbox) {
        lightbox.classList.remove("active");
    }
});

renderGallery(photos);



filters.forEach((filter) => {
    filter.addEventListener("click", () => {

        const category = filter.textContent.trim();

        filters.forEach(item => {
            item.classList.remove("active");
        });

        filter.classList.add("active");

        const filteredPhotos = category === "All" ? photos : photos.filter(photo => photo.category === category);

        renderGallery(filteredPhotos);

        console.log(category);
    });

});
