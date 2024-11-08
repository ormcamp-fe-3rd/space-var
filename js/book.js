import ReservationState from "./states/ReservationState.js";
import FormState from "./states/FormState.js";

const reservationState = new ReservationState();
const formState = new FormState();

const PLANETS = [
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
    name: "Saturn",
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
    name: "Pluto",
    price: "800",
  },
];

const HIDDEN_PLANET_COUNT = 2;

// 행성 carousel
let currentCarouselIndex = 0; // 현재 캐러셀 상태 0 (초기값)

function updateCarouselBtnOpacity(index, HIDDEN_PLANET_COUNT) {
  const carouselPrevBtn = document.querySelector(".carousel-prevbtn");
  const carouselNextBtn = document.querySelector(".carousel-nextbtn");

  carouselPrevBtn.style.opacity = index === 0 ? "50%" : "100%";
  carouselNextBtn.style.opacity =
    index === HIDDEN_PLANET_COUNT ? "50%" : "100%";
}

function translateCarousel(currentCarouselIndex) {
  const carousel = document.querySelector(".carouel-animation");

  const translateDistance = 136;
  carousel.style.transform = `translateX(-${
    translateDistance * currentCarouselIndex
  }px)`;
}

function handleCarouselPrevBtnClick() {
  if (currentCarouselIndex === 0) return; // prev 버튼이므로 currentCarouselIndex가 0(처음)이면 더 이상 활성화 x
  currentCarouselIndex -= 1;
  updateCarouselBtnOpacity(currentCarouselIndex, HIDDEN_PLANET_COUNT);
  translateCarousel(currentCarouselIndex);
}

function handleCarouselNextBtnClick() {
  if (currentCarouselIndex === HIDDEN_PLANET_COUNT) return; // next 버튼이므로 currentCarouselIndex가 숨겨진 planet을 다 보여준 상태면 더 이상 활성화 x
  currentCarouselIndex += 1;
  updateCarouselBtnOpacity(currentCarouselIndex, HIDDEN_PLANET_COUNT);
  translateCarousel(currentCarouselIndex);
}

// 이벤트 리스너 등록
const carouselPrevBtn = document.querySelector(".carousel-prevbtn");
const carouselNextBtn = document.querySelector(".carousel-nextbtn");

carouselPrevBtn.addEventListener("click", handleCarouselPrevBtnClick);
carouselNextBtn.addEventListener("click", handleCarouselNextBtnClick);

// 각 행성 버튼 클릭하면 일어나는 이벤트들
// 행성 크기 살짝 커지기
function updatePlanetBtnSize(planetBtn, index) {
  const planetBtns = document.querySelectorAll(".carouel-animation button");

  const planetBtnImage = planetBtn.querySelector("img");
  planetBtnImage.classList.add("sizeup-animation");

  // 나머지 행성들 크기 다시 작아지기
  planetBtns.forEach((otherBtn, otherIndex) => {
    otherIndex !== index &&
      otherBtn.querySelector("img").classList.remove("sizeup-animation");
  });
}

// 가격 바뀌기
function updatePrices(index) {
  const name = PLANETS[index].name;
  const price = PLANETS[index].price;

  const planetPrice = document.querySelector(".planet-price");
  const totalPrice = document.querySelector(".total-price");

  totalPrice.textContent = `Total $ ${price * 2}`;
  planetPrice.innerHTML = `${name}<br> $${price}(price) + $${price}(deposit)`;
}

// 사이드 섹션의 배경 이미지 바뀌기
function updateSideBackgroundImage(index) {
  const name = PLANETS[index].name;

  const sideBackground = document.querySelector(".side");
  const localHost = window.location.origin;

  sideBackground.style.opacity = "0%";
  setTimeout(() => {
    sideBackground.style.backgroundImage = `url("${localHost}/assets/images/book/planet/side/${name}_side.svg")`;
    sideBackground.style.opacity = "100%";
  }, 300);
}

function handlePlanetBtnClick(planetBtn, index) {
  updatePlanetBtnSize(planetBtn, index);
  updatePrices(index);
  updateSideBackgroundImage(index);
}

// 이벤트 리스너 등록
const planetBtns = document.querySelectorAll(".carouel-animation button");

planetBtns.forEach((planetBtn, index) => {
  planetBtn.addEventListener("click", () =>
    handlePlanetBtnClick(planetBtn, index)
  );
});

// book-form
const bookForm = document.querySelector(".book-form");

// 폼 검증
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

function updateInputValidStates() {
  let inputValidStates = {};

  return inputValidStates;
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
  // inputs.forEach((input, i) => {
  //   switch (i) {
  //     case 0:
  //       reservationInfo.name = input.value;
  //       break;
  //     case 1:
  //       reservationInfo.birth = input.value;
  //       break;
  //     case 2:
  //       reservationInfo.phone = input.value;
  //       break;
  //     case 3:
  //       reservationInfo.email = input.value;
  //       break;
  //   }
  // });
}

const ticketSection = document.querySelector(".ticket-section");
const ticketValues = document.querySelectorAll(".value");
function showTicket() {
  ticketValues.forEach((value, i) => {
    // switch (i) {
    //   case 0:
    //     value.textContent = reservationInfo.planet.name;
    //     break;
    //   case 1:
    //     value.textContent = localStorage.getItem("seat");
    //     break;
    //   case 2:
    //     value.textContent = reservationInfo.name;
    //     break;
    //   case 3:
    //     value.textContent = reservationInfo.birth;
    //     break;
    //   case 4:
    //     value.textContent = reservationInfo.phone;
    //     break;
    //   case 5:
    //     value.textContent = reservationInfo.email;
    //     break;
    //   case 6:
    //     value.textContent = reservationInfo.planet.price;
    //     break;
    // }
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
