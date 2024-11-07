const carousel = document.querySelector(".carouel-animation");
const carousel_Button = document.querySelectorAll(".carouel-animation button");
const prevButton = document.querySelector(".carouel-prevbtn");
const nextButton = document.querySelector(".carouel-nextbtn");
let carouselIndex = 0;
let hiddentCount = 2;

const sideImg = document.querySelector(".side");
const localhostUrl = window.location.origin;

const planetPrice = document.querySelector(".planet-price");
const totalPrice = document.querySelector(".total-price");
const planetImfr = [
  {
    name: "Mercurius",
    price: "100",
    image: `/assets/images/book/planet/planet_Surface/Mercurius.svg`,
  },
  {
    name: "Venus",
    price: "200",
    image: `/assets/images/book/planet/planet_Surface/Venus.svg`,
  },
  {
    name: "Mars",
    price: "300",
    image: `/assets/images/book/planet/planet_Surface/Mars.svg`,
  },
  {
    name: "Jupiter",
    price: "400",
    image: `/assets/images/book/planet/planet_Surface/Jupiter.svg`,
  },
  {
    name: "Pluto",
    price: "500",
    image: `/assets/images/book/planet/planet_Surface/Pluto.svg`,
  },
  {
    name: "Uranus",
    price: "600",
    image: `/assets/images/book/planet/planet_Surface/Uranus.svg`,
  },
  {
    name: "Uranus",
    price: "700",
    image: `/assets/images/book/planet/planet_Surface/Neptune.svg`,
  },
  {
    name: "Saturn",
    price: "800",
    image: `/assets/images/book/planet/planet_Surface/Saturn.svg`,
  },
];
prevButton.addEventListener("click", () => {
  if (carouselIndex === 0) return;
  carouselIndex -= 1;
  nextButton.style.opacity = `100%`;

  if (carouselIndex === 0) {
    prevButton.style.opacity = `50%`;
    carousel.style.transform = `translateX(-${190 * carouselIndex}px)`;
  }
  else {
    carousel.style.transform = `translateX(-${150 * carouselIndex}px)`;
  }
});
nextButton.addEventListener("click", () => {
  if (carouselIndex === hiddentCount) return;
  carouselIndex += 1;
  prevButton.style.opacity = `100%`;

  if (carouselIndex === hiddentCount) {
    carousel.style.transform = `translateX(-${190 * carouselIndex}px)`;
    nextButton.style.opacity = `50%`;
  }
  else {
    carousel.style.transform = `translateX(-${150 * carouselIndex}px)`;
  }
});

carousel_Button.forEach((selected_Button, index) => {
  selected_Button.addEventListener("click", () => {
    const selected_Img = selected_Button.querySelector("img");
    selected_Img.classList.add("sizeup-animation");

    planetPrice.innerHTML = `${planetImfr[index].name}<br>$${planetImfr[index].price}(price) + $${planetImfr[index].price}(deposit)`;
    sideImg.style.backgroundImage = `url("${localhostUrl}${planetImfr[index].image}")`;
    totalPrice.textContent = `Total $ ${planetImfr[index].price * 2}`;

    carousel_Button.forEach((other_Button, otherIndex) => {
      const other_Img = other_Button.querySelector("img");
      if (otherIndex !== index) {
        other_Img.classList.remove("sizeup-animation");
      }
    });
  });
});

// book-form
const bookForm = document.querySelector(".book-form");

// form validation
// input
let isInputsValid = false;

let isNameValid = false;
let isBirthValid = false;
let isPhoneValid = false;
let isEmailValid = false;
let isCardNumberValid = false;
let isExpirationValid = false;
let isSecurityValid = false;

function checkNameRegex(event) {
  event.target.value = event.target.value
    .replace(/[^ㄱ-ㅎㅏ-ㅣ가-힣a-zA-Z\s]/g, "")
    .trim();

  return event.target.value;
}

function checkBirthRegex(event) {
  event.target.value = event.target.value
    .replace(/[^0-9]/g, "")
    .replace(/^(\d{0,4})(\d{0,2})(\d{0,2})$/g, "$1/$2/$3")
    .replace(/\/{1,2}$/g, "")
    .trim();

  return event.target.value;
}

function checkPhoneRegex(event) {
  event.target.value = event.target.value
    .replace(/[^0-9]/g, "")
    .replace(/^(\d{0,3})(\d{0,4})(\d{0,4})$/g, "$1-$2-$3")
    .replace(/\-{1,2}$/g, "")
    .trim();

  return event.target.value;
}

function checkEmailRegex(event) {
  event.target.value = event.target.value
    .replace(/[^a-zA-Z0-9@.]/g, "") // 영문, 숫자, @, . 만 허용
    .trim();

  return event.target.value.includes("@");
}

function checkCardNumberRegex(event) {
  event.target.value = event.target.value
    .replace(/[^0-9]/g, "")
    .replace(/^(\d{4})(\d{4})(\d{4})(\d{4})$/g, "$1-$2-$3-$4")
    .replace(/\-{1,2}$/g, "")
    .trim();

  return event.target.value;
}

function checkExpirationRegex(event) {
  event.target.value = event.target.value
    .replace(/[^0-9]/g, "")
    .replace(/^(\d{0,2})(\d{0,2})$/g, "$1/$2")
    .replace(/\/{1,2}$/g, "")
    .trim();

  return event.target.value;
}

function checkSecurityRegex(event) {
  event.target.value = event.target.value.replace(/[^0-9]/g, "").slice(0, 4);

  return event.target.value;
}

function checkInputValidation(event) {
  let id = event.target.id;
  switch (id) {
    case "name":
      isNameValid = checkNameRegex(event).length > 0;
      break;

    case "birth":
      isBirthValid = checkBirthRegex(event);
      break;

    case "phone":
      isPhoneValid = checkPhoneRegex(event).length === 13;
      break;

    case "email":
      isEmailValid = checkEmailRegex(event);
      break;

    case "card-number":
      isCardNumberValid = checkCardNumberRegex(event).length === 19;
      break;
    case "expiration":
      isExpirationValid = checkExpirationRegex(event).length === 5;
      break;

    case "security-code":
      isSecurityValid = checkSecurityRegex(event).length === 4;
  }
  if (
    isNameValid &&
    isBirthValid &&
    isPhoneValid &&
    isEmailValid &&
    isCardNumberValid &&
    isExpirationValid &&
    isSecurityValid
  ) {
    isInputsValid = true;
  }
}

// checkbox
let isCheckValid = false;

let isAccidentRulesChecked = false;
let isPersonalInfoChecked = false;
let isAllConfirmed = false;

function checkCheckboxVaildation(event) {
  let id = event.target.id;
  switch (id) {
    case "accident-rules":
      isAccidentRulesChecked = event.target.checked;
      break;

    case "personal-info":
      isPersonalInfoChecked = event.target.checked;
      break;

    case "check-all":
      isAllConfirmed = event.target.checked;
      break;
  }

  if (isAccidentRulesChecked && isPersonalInfoChecked && isAllConfirmed) {
    isCheckValid = true;
  }
}

// form
let isFormValid = false;

function checkFormValidation(event) {
  checkInputValidation(event);
  checkCheckboxVaildation(event);

  if (isInputsValid && isCheckValid) {
    isFormValid = true;
  }
  return isFormValid;
}

function submitBtnStyleToggle() {
  if (isFormValid) {
    submitFormBtn.classList.remove("disabled");
    submitFormBtn.classList.add("activated");
  } else {
    submitFormBtn.classList.remove("activated");
    submitFormBtn.classList.add("disabled");
  }
}

// apply
const inputs = bookForm.querySelectorAll(".input");
const checkboxes = bookForm.querySelectorAll(".checkbox-hidden");
const submitFormBtn = bookForm.querySelector(".submit-btn");

function handleFormInput(event) {
  checkFormValidation(event);
  submitBtnStyleToggle();
}

function handleCheckboxClick(event) {
  checkFormValidation(event);
  submitBtnStyleToggle();
}

function handleSubmitBtnClick(event) {
  checkFormValidation(event);
  submitBtnStyleToggle();
}

inputs.forEach((input) => {
  input.addEventListener("input", handleFormInput);
});

checkboxes.forEach((checkbox) => {
  checkbox.addEventListener("click", handleCheckboxClick);
});

submitFormBtn.addEventListener("click", handleSubmitBtnClick);
