const carousel = document.querySelector(".carouel-animation");
const carouselBtn = document.querySelectorAll(".carouel-animation button");
const prevBtn = document.querySelector(".carouel-prevbtn");
const nextBtn = document.querySelector(".carouel-nextbtn");
let carouselIndex = 0;
let hiddenIndex = 2;

const planetArray = [
  {
    name: "Mercurius",
    price: "100",
  },
  {
    name: "Venus",
    price: "200",
  },
  {
    name: "Mars",
    price: "300",
  },
  {
    name: "Jupiter",
    price: "400",
  },
  {
    name: "Pluto",
    price: "500",
  },
  {
    name: "Uranus",
    price: "600",
  },
  {
    name: "Neptune",
    price: "700",
  },
  {
    name: "Saturn",
    price: "800",
  },
];

let reservationInfo = {};

prevBtn.addEventListener("click", () => {
  if (carouselIndex === 0) return;
  carouselIndex -= 1;
  checkBtnOpacity(prevBtn, nextBtn, carouselIndex, hiddenIndex);
  checkTransform(carousel, carouselIndex, hiddenIndex);
});

nextBtn.addEventListener("click", () => {
  if (carouselIndex === hiddenIndex) return;
  carouselIndex += 1;
  checkBtnOpacity(prevBtn, nextBtn, carouselIndex, hiddenIndex);
  checkTransform(carousel, carouselIndex, hiddenIndex);
});

function checkBtnOpacity(prevButton, nextButton, index, hiddenIndex) {
  prevButton.style.opacity = index === 0 ? "50%" : "100%";
  nextButton.style.opacity = index === hiddenIndex ? "50%" : "100%";
}

function checkTransform(carousel, index, hiddenIndex) {
  const movement = index === hiddenIndex ? 190 : 150;
  carousel.style.transform = `translateX(-${movement * index}px)`;
}

carouselBtn.forEach((button, index) => {
  button.addEventListener("click", () => {
    const sideBackground = document.querySelector(".side");
    const planetPrice = document.querySelector(".planet-price");
    const totalPrice = document.querySelector(".total-price");
    const selectBtn = button.querySelector("img");
    const name = planetArray[index].name;
    const price = planetArray[index].price;
    const localHost = window.location.origin;

    totalPrice.textContent = `Total $ ${price * 2}`;
    planetPrice.innerHTML = `${name}<br> $${price}(price) + $${price}(deposit)`;
    sideBackground.style.backgroundImage = `url("${localHost}/assets/images/book/planet/surface/${name}.svg")`;
    selectBtn.classList.add("sizeup-animation");

    reservationInfo.planet = {
      name: name,
      price: price * 2,
    };

    carouselBtn.forEach((otherBtn, otherIndex) => {
      if (otherIndex !== index) {
        otherBtn.querySelector("img").classList.remove("sizeup-animation");
      }
    });
  });
});

// book-form
const bookForm = document.querySelector(".book-form");

// 1. form validation
// 1) planet
let isPlanetSelected = false;

function checkPlanetSeleceted() {
  const planetInfoElement = document.querySelector(".planet-price");
  const planetInfoElementContent = planetInfoElement.textContent;

  if (planetInfoElementContent === "Select your journey") {
    isPlanetSelected = false;
  } else {
    isPlanetSelected = true;
  }
}

// 2-1) input
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

function updateInputBorder(event, valid) {
  const input = event.target;
  const inputContainer = input.closest(".info-container");

  if (!valid) {
    inputContainer.classList.remove("border");
    inputContainer.classList.add("required");
  } else {
    inputContainer.classList.remove("required");
    inputContainer.classList.add("border");
  }
}

function checkInputValidation(event) {
  let id = event.target.id;
  switch (id) {
    case "name":
      isNameValid = checkNameRegex(event).length > 0;
      updateInputBorder(event, isNameValid);
      break;

    case "birth":
      isBirthValid = checkBirthRegex(event).length === 10;
      updateInputBorder(event, isBirthValid);
      break;

    case "phone":
      isPhoneValid = checkPhoneRegex(event).length === 13;
      updateInputBorder(event, isPhoneValid);
      break;

    case "email":
      isEmailValid = checkEmailRegex(event);
      updateInputBorder(event, isEmailValid);
      break;

    case "card-number":
      isCardNumberValid = checkCardNumberRegex(event).length === 19;
      updateInputBorder(event, isCardNumberValid);
      break;
    case "expiration":
      isExpirationValid = checkExpirationRegex(event).length === 5;
      updateInputBorder(event, isExpirationValid);
      break;

    case "security-code":
      isSecurityValid = checkSecurityRegex(event).length === 4;
      updateInputBorder(event, isSecurityValid);
      break;
  }

  isInputsValid =
    isNameValid &&
    isBirthValid &&
    isPhoneValid &&
    isEmailValid &&
    isCardNumberValid &&
    isExpirationValid &&
    isSecurityValid;
}

// 2-2) certification
let timer;
let phoneVerified = false;
let emailVerfied = false;

function checkCertication(event) {
  const id = event.target.id;
  const btn = event.target;
  const isValid = id === "certification-phone" ? isPhoneValid : isEmailValid;

  phoneVerified = id === "certification-phone" ? isValid : phoneVerified;
  emailVerfied = id === "certification-email" ? isValid : emailVerfied;

  clearTimeout(timer);

  btn.textContent = "Waiting...";

  timer = setTimeout(() => {
    if (isValid) {
      btn.className = "certification-btn verified";
      btn.textContent = "VERIFIED";
    } else {
      btn.className = "certification-btn rejected";
      btn.textContent = "FAILED";
    }
  }, 1000);
}

// 3) checkbox
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
    isAccidentRulesChecked && isPersonalInfoChecked && isAllConfirmed;
}

// 4) form
let isFormValid = false;

function checkFormValidation(event) {
  checkPlanetSeleceted();
  checkInputValidation(event);
  checkCheckboxVaildation(event);

  isFormValid =
    isPlanetSelected &&
    isInputsValid &&
    isCheckValid &&
    phoneVerified &&
    emailVerfied;

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

//3. after submit
function saveReservationInfo() {
  inputs.forEach((input, i) => {
    switch (i) {
      case 0:
        reservationInfo.name = input.value;
        break;
      case 1:
        reservationInfo.birth = input.value;
        break;
      case 2:
        reservationInfo.phone = input.value;
        break;
      case 3:
        reservationInfo.email = input.value;
        break;
    }
  });
}

const ticketSection = document.querySelector(".ticket-section");
const ticketValues = document.querySelectorAll(".value");
function showTicket() {
  ticketValues.forEach((value, i) => {
    switch (i) {
      case 0:
        value.textContent = reservationInfo.planet.name;
        break;
      case 1:
        value.textContent = localStorage.getItem("seat");
        break;
      case 2:
        value.textContent = reservationInfo.name;
        break;
      case 3:
        value.textContent = reservationInfo.birth;
        break;
      case 4:
        value.textContent = reservationInfo.phone;
        break;
      case 5:
        value.textContent = reservationInfo.email;
        break;
      case 6:
        value.textContent = reservationInfo.planet.price;
        break;
    }
  });

  ticketSection.classList.add("ticket-show");
  submitFormBtn.textContent = "DONE";
}

function hideTicket() {
  ticketSection.classList.remove("ticket-show");
  submitFormBtn.textContent = "BOOK NOW";
}

function resetForm() {
  bookForm.reset();

  localStorage.removeItem("seat");

  isInputsValid = false;
  isNameValid = false;
  isBirthValid = false;
  isPhoneValid = false;
  isEmailValid = false;
  isCardNumberValid = false;
  isExpirationValid = false;
  isSecurityValid = false;

  phoneVerified = false;
  emailVerfied = false;

  isCheckValid = false;
  isAccidentRulesChecked = false;
  isPersonalInfoChecked = false;
  isAllConfirmed = false;

  isFormValid = false;
}

function finishReservation() {
  hideTicket();
  resetForm();
  window.location.href = "../pages/start.html";
}

//4. handle
const inputs = bookForm.querySelectorAll(".input");
const certificationBtns = bookForm.querySelectorAll(".certification-btn");
const checkboxes = bookForm.querySelectorAll(".checkbox-hidden");
const submitFormBtn = bookForm.querySelector(".submit-btn");
const exitBtn = document.querySelector(".exit");
let submitTimer;

function handleFormInput(event) {
  checkFormValidation(event);
  submitBtnStyleToggle();
}

function handleCertificationBtnCilick(event) {
  checkCertication(event);
  checkFormValidation(event);
  submitBtnStyleToggle();
}

function handleCheckboxClick(event) {
  checkFormValidation(event);
  submitBtnStyleToggle();
}

function handleSubmitBtnClick() {
  saveReservationInfo();

  clearTimeout(submitTimer);

  if (isFormValid) {
    submitFormBtn.textContent = "Waiting...";

    setTimeout(() => {
      showTicket();
    }, 1000);
  }
}

function handleExitBtnClick() {
  finishReservation();
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

exitBtn.addEventListener("click", handleExitBtnClick);
