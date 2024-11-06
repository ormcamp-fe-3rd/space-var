const carousel = document.querySelector('.carouel-animation');
const carousel_Button = document.querySelectorAll(".carouel-animation button")
const prevButton = document.querySelector('.carouel-prevbtn')
const nextButton = document.querySelector('.carouel-nextbtn')
let carouselIndex = 0;
let hiddent_Count = 2;

prevButton.addEventListener('click', () => {

    if (carouselIndex === 0) return;

    carouselIndex -= 1;
    carousel.style.transform = `translateX(-${150 * carouselIndex}px)`;
    nextButton.style.opacity = `100%`;

    if (carouselIndex === 0) {
        prevButton.style.opacity = `50%`;
    }
});
nextButton.addEventListener('click', () => {
    if (carouselIndex === hiddent_Count) return;

    carouselIndex += 1;
    carousel.style.transform = `translateX(-${150 * carouselIndex}px)`;
    prevButton.style.opacity = `100%`;

    if (carouselIndex === hiddent_Count) {
        nextButton.style.opacity = `50%`;
    }
});

carousel_Button.forEach((selected_Button, index) => {
    selected_Button.addEventListener("click", () => {
        const selected_Img = selected_Button.querySelector("img");
        selected_Img.classList.add("sizeup-animation");

        carousel_Button.forEach((other_Button, otherIndex) => {
            const other_Img = other_Button.querySelector("img");
            if (otherIndex !== index) {
                other_Img.classList.remove("sizeup-animation");;
        }
      });
    });
  });