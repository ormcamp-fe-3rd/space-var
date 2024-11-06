const carousel = document.querySelector('.carouel-animation');
const carousel_Button = document.querySelectorAll(".carouel-animation button")
const prevButton = document.querySelector('.carouel-prevbtn')
const nextButton = document.querySelector('.carouel-nextbtn')
let carouselIndex = 0;
let hiddent_Count = 2;

const side_Img = document.querySelector('.side');
const localhostUrl = window.location.origin;

const planet_Price = document.querySelector('.planet-price')
const total_Price = document.querySelector('.total-price');
const planet_Imfr = [ {name : 'Mercurius', price : '100', image : `/assets/images/book/planet/Mercurius.svg`} 
                     ,{name : 'Venus',     price : '200', image : `/assets/images/book/planet/Venus.svg`} 
                     ,{name : 'Mars',      price : '300', image : `/assets/images/book/planet/Mars.svg`} 
                     ,{name : 'Jupiter',   price : '400', image : `/assets/images/book/planet/Jupiter.svg`} 
                     ,{name : 'Pluto',     price : '500', image : `/assets/images/book/planet/Pluto.svg`} 
                     ,{name : 'Saturn',    price : '600', image : `/assets/images/book/planet/Saturn.svg`} 
                     ,{name : 'Uranus',    price : '700', image : `/assets/images/book/planet/Uranus.svg`} 
                     ,{name : 'Neptune',   price : '800', image : `/assets/images/book/planet/Neptune.svg`}    
                    ]
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

        planet_Price.innerHTML = `<strong>${planet_Imfr[index].name}</strong><br>$${planet_Imfr[index].price}(price) + $${planet_Imfr[index].price}(deposit)`;
        side_Img.style.backgroundImage = `url("${localhostUrl}${planet_Imfr[index].image}")`
        total_Price.textContent = `Total $ ${planet_Imfr[index].price * 2}`


        carousel_Button.forEach((other_Button, otherIndex) => {
            const other_Img = other_Button.querySelector("img");
            if (otherIndex !== index) {
                other_Img.classList.remove("sizeup-animation");;
        }
      });
    });
  });