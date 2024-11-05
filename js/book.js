const carousel = document.querySelector('.carouel-animation');
const carousel_Count = document.querySelectorAll(".carouel-animation button")
const prevButton = document.querySelector('.carouel-prevbtn')
const nextButton = document.querySelector('.carouel-nextbtn')
let carouselIndex = 0;
let hiddent_Count = 2;

prevButton.addEventListener('click', () => {

    if (carouselIndex === 0) return;

    carouselIndex -= 1;
    carousel.style.transform = `translateX(-${150 * carouselIndex}px)`;
    prevButton.disabled = false;

    if (carouselIndex === 0) {
        // prevButtonImg.src = '/img_folder/btn/left_Disabled.svg';
    }
});
nextButton.addEventListener('click', () => {
    if (carouselIndex === hiddent_Count) return;

    carouselIndex += 1;
    carousel.style.transform = `translateX(-${150 * carouselIndex}px)`;
    //prevButtonImg.src = '/img_folder/btn/left_Enabled.svg';

    if (carouselIndex === hiddent_Count) {
        //nextButtonImg.src = '/img_folder/btn/right_Disabled.svg';
    }
});

