// menu
const menuBtn = document.querySelector(".mobile-menu-btn");
const mobileMenu = document.querySelector(".mobile-menu");

// gallery
const galleryGrid = document.querySelector(".gallery-grid");
const filterContainer = document.querySelector(".filters");
const imageCounter = document.querySelector(".image-count");

// lightbox
const lightbox = document.querySelector(".lightbox");
const lightboxImage = document.querySelector(".lightbox img");
const lightboxClose = document.querySelector(".lightbox-close");
const lightboxNext = document.querySelector(".lightbox-next");
const lightboxPrev = document.querySelector(".lightbox-prev");

// explore
const exploreBtn = document.querySelector(".more-btn");

// add photo
const addPhotoBtn = document.querySelector(".add-photo-btn");
const mobileAddPhotoBtn = document.querySelector(".mobile-add-photo-btn");

const addPhotoModal = document.querySelector(".add-photo-modal");
const addPhotoClose = document.querySelector(".add-photo-close");

const categoryOptions = document.querySelector(".category-options");

const newCategoryBtn = document.querySelector(".new-category-btn");
const newCategoryForm = document.querySelector(".new-category-form");
const newCategoryInput = document.querySelector(".new-category-input");
const createCategoryBtn = document.querySelector(".create-category-btn");

const choosePhotosBtn = document.querySelector(".choose-photos-btn");
const photoInput = document.querySelector(".photo-input");


// photos data
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


// state
let currentPhotos = photos;
let currentIndex = 0;
let selectedCategory = "";


// mobile menu
menuBtn.addEventListener("click", () => {
    mobileMenu.classList.toggle("active");
    menuBtn.classList.toggle("active");
});


// get categories
function getCategories() {
    return [...new Set(
        photos.map(photo => photo.category)
    )];
}


// update counter
function updateCounter(photoList) {
    imageCounter.textContent =
        `${photoList.length} Photographs`;
}


// render filters
function renderFilters(activeCategory = "All") {

    filterContainer.innerHTML = "";

    const allButton = document.createElement("button");

    allButton.classList.add("filter");

    if (activeCategory === "All") {
        allButton.classList.add("active");
    }

    allButton.textContent = "All";

    filterContainer.appendChild(allButton);


    const categories = getCategories();

    categories.forEach(category => {

        const filter = document.createElement("button");

        filter.classList.add("filter");

        if (category === activeCategory) {
            filter.classList.add("active");
        }

        filter.textContent = category;

        filterContainer.appendChild(filter);
    });


    const filters = filterContainer.querySelectorAll(".filter");


    filters.forEach(filter => {

        filter.addEventListener("click", () => {

            const category = filter.textContent.trim();

            filters.forEach(item => {
                item.classList.remove("active");
            });

            filter.classList.add("active");


            if (category === "All") {

                currentPhotos = photos;

            } else {

                currentPhotos = photos.filter(
                    photo => photo.category === category
                );
            }


            currentIndex = 0;

            renderGallery(currentPhotos);

            updateCounter(currentPhotos);
        });
    });
}


// render gallery
function renderGallery(photoList) {

    galleryGrid.innerHTML = "";

    photoList.forEach((photo, index) => {

        const card = document.createElement("article");

        card.classList.add(
            "gallery-card",
            photo.layout
        );

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

        number.textContent =
            String(index + 1).padStart(2, "0");

        cardContent.appendChild(number);


        const expandBtn = document.createElement("button");

        expandBtn.classList.add("expand-btn");

        expandBtn.textContent = "↗";

        card.appendChild(expandBtn);


        // lightbox open
        expandBtn.addEventListener("click", () => {

            currentPhotos = photoList;

            currentIndex = index;

            openLightbox();
        });
    });
}


// open lightbox
function openLightbox() {

    if (!currentPhotos.length) {
        return;
    }

    lightboxImage.src =
        currentPhotos[currentIndex].image;

    lightboxImage.alt =
        currentPhotos[currentIndex].title;

    lightbox.classList.add("active");
}


// close lightbox
function closeLightbox() {
    lightbox.classList.remove("active");
}


lightboxClose.addEventListener("click", () => {
    closeLightbox();
});


lightbox.addEventListener("click", event => {

    if (event.target === lightbox) {
        closeLightbox();
    }
});


// next image
function showNextImage() {

    if (!currentPhotos.length) {
        return;
    }

    if (currentIndex === currentPhotos.length - 1) {

        currentIndex = 0;

    } else {

        currentIndex++;
    }


    lightboxImage.src =
        currentPhotos[currentIndex].image;

    lightboxImage.alt =
        currentPhotos[currentIndex].title;
}


// previous image
function showPreviousImage() {

    if (!currentPhotos.length) {
        return;
    }

    if (currentIndex === 0) {

        currentIndex = currentPhotos.length - 1;

    } else {

        currentIndex--;
    }


    lightboxImage.src =
        currentPhotos[currentIndex].image;

    lightboxImage.alt =
        currentPhotos[currentIndex].title;
}


lightboxNext.addEventListener("click", () => {
    showNextImage();
});


lightboxPrev.addEventListener("click", () => {
    showPreviousImage();
});


// keyboard
document.addEventListener("keydown", event => {

    if (!lightbox.classList.contains("active")) {
        return;
    }


    if (event.key === "ArrowRight") {
        showNextImage();
    }


    if (event.key === "ArrowLeft") {
        showPreviousImage();
    }


    if (event.key === "Escape") {
        closeLightbox();
    }
});


// swipe
let touchStartX = 0;
let touchEndX = 0;


lightbox.addEventListener("touchstart", event => {

    touchStartX =
        event.touches[0].clientX;
});


lightbox.addEventListener("touchend", event => {

    touchEndX =
        event.changedTouches[0].clientX;


    const distance =
        touchStartX - touchEndX;


    if (distance > 50) {
        showNextImage();
    }


    if (distance < -50) {
        showPreviousImage();
    }
});


// explore all
exploreBtn.addEventListener("click", () => {

    renderGallery(currentPhotos);

    galleryGrid.scrollIntoView({
        behavior: "smooth",
        block: "start"
    });
});


// render category options
function renderCategoryOptions() {

    categoryOptions.innerHTML = "";

    const categories = getCategories();


    categories.forEach(category => {

        const button = document.createElement("button");

        button.classList.add("category-option");

        button.textContent = category;

        categoryOptions.appendChild(button);


        if (category === selectedCategory) {
            button.classList.add("selected");
        }


        button.addEventListener("click", () => {

            selectCategory(category);
        });
    });
}


// select category
function selectCategory(category) {

    selectedCategory = category;


    const options =
        categoryOptions.querySelectorAll(
            ".category-option"
        );


    options.forEach(option => {

        option.classList.remove("selected");


        if (
            option.textContent.trim() === category
        ) {
            option.classList.add("selected");
        }
    });
}


// open add photo modal
function openAddPhotoModal() {

    selectedCategory = "";

    newCategoryInput.value = "";

    newCategoryForm.classList.remove("active");

    renderCategoryOptions();

    addPhotoModal.classList.add("active");
}


// close add photo modal
function closeAddPhotoModal() {

    addPhotoModal.classList.remove("active");

    newCategoryForm.classList.remove("active");

    newCategoryInput.value = "";

    selectedCategory = "";

    photoInput.value = "";
}


// desktop add photo
addPhotoBtn.addEventListener("click", () => {

    openAddPhotoModal();
});


// mobile add photo
mobileAddPhotoBtn.addEventListener("click", () => {

    mobileMenu.classList.remove("active");

    menuBtn.classList.remove("active");

    openAddPhotoModal();
});


// close button
addPhotoClose.addEventListener("click", () => {

    closeAddPhotoModal();
});


// click outside modal
addPhotoModal.addEventListener("click", event => {

    if (event.target === addPhotoModal) {
        closeAddPhotoModal();
    }
});


// create new category form
newCategoryBtn.addEventListener("click", () => {

    newCategoryForm.classList.toggle("active");

    if (newCategoryForm.classList.contains("active")) {
        newCategoryInput.focus();
    }
});


// create category
function createCategory() {

    const category =
        newCategoryInput.value.trim();


    if (!category) {
        return;
    }


    const existingCategory = getCategories().find(
        item =>
            item.toLowerCase() ===
            category.toLowerCase()
    );


    if (existingCategory) {

        selectCategory(existingCategory);

        newCategoryForm.classList.remove("active");

        newCategoryInput.value = "";

        return;
    }


    selectedCategory = category;

    renderCategoryOptions();

    selectCategory(category);

    newCategoryForm.classList.remove("active");

    newCategoryInput.value = "";
}


// create category button
createCategoryBtn.addEventListener("click", () => {

    createCategory();
});


// enter key for category
newCategoryInput.addEventListener("keydown", event => {

    if (event.key === "Enter") {

        createCategory();
    }
});


// continue button
choosePhotosBtn.addEventListener("click", () => {

    if (!selectedCategory) {

        alert("Please select or create a category.");

        return;
    }


    photoInput.click();
});


// create title from filename
function createPhotoTitle(fileName) {

    const nameWithoutExtension =
        fileName.replace(/\.[^/.]+$/, "");


    return nameWithoutExtension
        .replace(/[-_]+/g, " ")
        .replace(/\s+/g, " ")
        .trim()
        .replace(/\b\w/g, letter => letter.toUpperCase());
}


// photo upload
photoInput.addEventListener("change", event => {

    const files =
        [...event.target.files];


    if (!files.length) {
        return;
    }


    if (!selectedCategory) {

        alert("Please select a category.");

        return;
    }


    files.forEach(file => {

        const imageURL =
            URL.createObjectURL(file);


        photos.push({

            image: imageURL,

            title: createPhotoTitle(file.name),

            category: selectedCategory,

            layout: "normal"
        });
    });


    // show uploaded category
    currentPhotos = photos.filter(
        photo =>
            photo.category === selectedCategory
    );


    currentIndex = 0;


    // update filters
    renderFilters(selectedCategory);


    // update gallery
    renderGallery(currentPhotos);


    // update count
    updateCounter(currentPhotos);


    // close modal
    closeAddPhotoModal();


    // reset input
    photoInput.value = "";
});


// initial render
renderFilters();

renderGallery(photos);

updateCounter(photos);