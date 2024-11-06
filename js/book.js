const carousel = document.querySelector(".carouel-animation");
const carousel_Button = document.querySelectorAll(".carouel-animation button");
const prevButton = document.querySelector(".carouel-prevbtn");
const nextButton = document.querySelector(".carouel-nextbtn");
let carouselIndex = 0;
let hiddent_Count = 2;

const side_Img = document.querySelector(".side");
const localhostUrl = window.location.origin;

const planet_Price = document.querySelector(".planet-price");
const total_Price = document.querySelector(".total-price");
const planet_Imfr = [
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
    name: "Saturn",
    price: "600",
    image: `/assets/images/book/planet/planet_Surface/Saturn.svg`,
  },
  {
    name: "Uranus",
    price: "700",
    image: `/assets/images/book/planet/planet_Surface/Uranus.svg`,
  },
  {
    name: "Neptune",
    price: "800",
    image: `/assets/images/book/planet/planet_Surface/Neptune.svg`,
  },
];
prevButton.addEventListener("click", () => {
  if (carouselIndex === 0) return;
  carouselIndex -= 1;
  carousel.style.transform = `translateX(-${150 * carouselIndex}px)`;
  nextButton.style.opacity = `100%`;

  if (carouselIndex === 0) {
    prevButton.style.opacity = `50%`;
  }
});
nextButton.addEventListener("click", () => {
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

    planet_Price.innerHTML = `${planet_Imfr[index].name}<br>$${planet_Imfr[index].price}(price) + $${planet_Imfr[index].price}(deposit)`;
    side_Img.style.backgroundImage = `url("${localhostUrl}${planet_Imfr[index].image}")`;
    total_Price.textContent = `Total $ ${planet_Imfr[index].price * 2}`;

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

// 1. form validation
// 1) input
let isInputsValid = false;

let isNameValid = false;
let isBirthValid = false;
let isPhoneValid = false;
let isEmailValid = false;
let isCardNumberValid = false;
let isExpirationValid = false;
let isSecurityValid = false;

function checkNameRegex(event) {
  event.target.value = event.target.value.replace(
    /[^ㄱ-ㅎㅏ-ㅣ가-힣a-zA-Z ]/g,
    ""
  );

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

  isInputsValid =
    isNameValid &&
    isBirthValid &&
    isPhoneValid &&
    isEmailValid &&
    isCardNumberValid &&
    isExpirationValid &&
    isSecurityValid
      ? true
      : false;
}

// 2) checkbox
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

  isCheckValid =
    isAccidentRulesChecked && isPersonalInfoChecked && isAllConfirmed
      ? true
      : false;
}

// 3) form
let isFormValid = false;

function checkFormValidation(event) {
  checkInputValidation(event);
  checkCheckboxVaildation(event);

  isFormValid = isInputsValid && isCheckValid ? true : false;

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

//2. certification
function checkCertication(event) {
  let id = event.target.id;
  let isValid = false;
  let waitingTimer, resultTimer;

  clearTimeout(waitingTimer);
  clearTimeout(resultTimer);

  waitingTimer = setTimeout(() => {
    event.target.textContent = "Waiting...";
  }, 0);

  isValid = id ? "phone" : isPhoneValid ? "email" : isEmailValid;

  resultTimer = setTimeout(() => {
    if (isValid) {
      event.target.classList.remove("not-verified");
      event.target.classList.remove("rejected");
      event.target.classList.add("verified");
      event.target.textContent = "VERIFIED";
    } else {
      event.target.classList.remove("not-verified");
      event.target.classList.remove("verified");
      event.target.classList.add("rejected");
      event.target.textContent = "FAILED";
    }
  }, 1000);
}

//3. after submit

//4. handle
const inputs = bookForm.querySelectorAll(".input");
const certificationBtns = bookForm.querySelectorAll(".certification-btn");
const checkboxes = bookForm.querySelectorAll(".checkbox-hidden");
const submitFormBtn = bookForm.querySelector(".submit-btn");

function handleFormInput(event) {
  checkFormValidation(event);
  submitBtnStyleToggle();
}

function handleCertificationBtnCilick(event) {
  checkCertication(event);
}

function handleCheckboxClick(event) {
  checkFormValidation(event);
  submitBtnStyleToggle();
}

function handleSubmitBtnClick(event) {
  // window.location.href = "../pages/start.html";
}

inputs.forEach((input) => {
  input.addEventListener("input", handleFormInput);
});

certificationBtns.forEach((certificationBtn) => {
  certificationBtn.addEventListener("click", handleCertificationBtnCilick);
});

checkboxes.forEach((checkbox) => {
  checkbox.addEventListener("click", handleCheckboxClick);
});

submitFormBtn.addEventListener("click", handleSubmitBtnClick);
