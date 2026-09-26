const menuBtn = document.querySelector(".mobile-menu-btn");
const mobileMenu = document.querySelector(".mobile-menu");

const galleryGrid = document.querySelector(".gallery-grid");

const filters = document.querySelectorAll(".filter");

const lightbox = document.querySelector(".lightbox");
const lightboxImage = document.querySelector(".lightbox img");
const lightboxClose = document.querySelector(".lightbox-close");

const Imagecounter = document.querySelector(".image-count");

const lightboxNext = document.querySelector(".lightbox-next");
const lightboxPrev = document.querySelector(".lightbox-prev");


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

let currentPhotos = photos;
let currentIndex = 0;

Imagecounter.textContent = `${photos.length} Photographs`;

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
            currentIndex = index;

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

        Imagecounter.textContent = ""

        const category = filter.textContent.trim();

        filters.forEach(item => {
            item.classList.remove("active");
        });

        filter.classList.add("active");

        const filteredPhotos = category === "All" ? photos : photos.filter(photo => photo.category === category);

        currentPhotos = filteredPhotos;
        currentIndex = 0;

        renderGallery(filteredPhotos);

        let count = filteredPhotos.length;

        Imagecounter.textContent = `${count} Photographs`;
        console.log(category);
    });

});

// next-previous functionality in lightbox

lightboxNext.addEventListener("click", () => {

    if(currentIndex === currentPhotos.length - 1) {
        currentIndex = 0;
    }else {
        currentIndex ++;
    };

    lightboxImage.src = currentPhotos[currentIndex].image;

    // console.log(lightboxImage.src);
});

lightboxPrev.addEventListener("click", () => {
    
    if(currentIndex === 0) {
        currentIndex = currentPhotos.length - 1;
    } else {
        currentIndex --;
    }

    lightboxImage.src = currentPhotos[currentIndex].image;
    // console.log(lightboxImage.src)

});