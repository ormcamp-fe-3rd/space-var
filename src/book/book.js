import { PLANETS, HIDDEN_PLANET_COUNT } from "./const/index.js";
import { formData } from "./models/FormData.js";
import { formInputFormatter } from "./util/FormInputFormatter.js";
import FormValidator from "./util/FormValidator.js";

const formValidator = new FormValidator();

// 행성 carousel
function createCarouselState() {
  let index = 0;

  function getCurrentIndex() {
    return index;
  }

  function decreaseIndex() {
    index -= 1;
    return index;
  }

  function increaseIndex() {
    index += 1;
    return index;
  }

  return {
    getCurrentIndex,
    decreaseIndex,
    increaseIndex,
  };
}

let currentCarouselState = createCarouselState();

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
  let currentCarouselIndex = currentCarouselState.getCurrentIndex();
  if (currentCarouselIndex === 0) return; // prev 버튼이므로 currentCarouselIndex가 0(처음)이면 더 이상 활성화 x
  currentCarouselIndex = currentCarouselState.decreaseIndex();
  updateCarouselBtnOpacity(currentCarouselIndex, HIDDEN_PLANET_COUNT);
  translateCarousel(currentCarouselIndex);
}

function handleCarouselNextBtnClick() {
  let currentCarouselIndex = currentCarouselState.getCurrentIndex();

  if (currentCarouselIndex === HIDDEN_PLANET_COUNT) return; // next 버튼이므로 currentCarouselIndex가 숨겨진 planet을 다 보여준 상태면 더 이상 활성화 x
  currentCarouselIndex = currentCarouselState.increaseIndex();
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
  planetBtn.setAttribute("aria-pressed", "true");
  planetBtnImage.classList.add("sizeup-animation");

  // 나머지 행성들 크기 다시 작아지기
  planetBtns.forEach((otherBtn, otherIndex) => {
    if (otherIndex !== index) {
      otherBtn.setAttribute("aria-pressed", "false");
      otherBtn.querySelector("img").classList.remove("sizeup-animation");
    }
  });
}

// 가격 바뀌기
function updatePrices(index) {
  const name = PLANETS[index].name;
  const price = PLANETS[index].price;

  const planetPrice = document.querySelector(".planet-price");
  const totalPrice = document.querySelector(".total-price");

  totalPrice.textContent = `Total $ ${price * 2}`;
  planetPrice.textContent = `${name} $${price}(price) + $${price}(deposit)`;
}

// 사이드 섹션의 배경 이미지 바뀌기
function updateSideBackgroundImage(index) {
  const name = PLANETS[index].name;

  const sideBackground = document.querySelector(".side");
  const localHost = window.location.origin;

  sideBackground.style.opacity = "0%";
  setTimeout(() => {
    sideBackground.style.backgroundImage = `url("${localHost}/src/book/assets/images/planet/side/${name}_side.svg")`;
    sideBackground.style.opacity = "100%";
  }, 300);
}

function handlePlanetBtnClick(planetBtn, index) {
  updatePlanetBtnSize(planetBtn, index);
  updatePrices(index);
  updateSideBackgroundImage(index);
  formData.setPlanet(PLANETS[index]); // 선택한 행성 정보 저장
  formValidator.setPlanetSelected(); // planet 선택됨
  updateSubmitBtnStyle();
}

// 이벤트 리스너 등록
const planetBtns = document.querySelectorAll(".carouel-animation button");

planetBtns.forEach((planetBtn, index) => {
  planetBtn.addEventListener("click", () =>
    handlePlanetBtnClick(planetBtn, index)
  );
});

function formatInputValues(id, value) {
  switch (id) {
    case "name":
      return formInputFormatter.formatName(value);

    case "birth":
      return formInputFormatter.formatBirth(value);

    case "phone":
      return formInputFormatter.formatPhone(value);

    case "email":
      return formInputFormatter.formatEmail(value);

    case "card-number":
      return formInputFormatter.formatCardNumber(value);

    case "expiration":
      return formInputFormatter.formatExpiration(value);

    case "security-code":
      return formInputFormatter.formatSecurityCode(value);
  }
}

function checkInputValidation(id, value) {
  switch (id) {
    case "name":
      formValidator.validateName(value);
      break;

    case "birth":
      formValidator.validateBirth(value);
      break;

    case "phone":
      formValidator.validatePhone(value);
      resetCertification(id);
      break;

    case "email":
      formValidator.validateEmail(value);
      resetCertification(id);
      break;

    case "card-number":
      formValidator.validateCardNumber(value);
      break;

    case "expiration":
      formValidator.validateExpiration(value);
      break;

    case "security-code":
      formValidator.validateSecurityCode(value);
      break;
  }
}

// 입력란의 양식이 맞지 않을 시, 해당 입력란 테두리 빨간색으로 변함
// 양식에 맞을 시 다시 회색으로 돌아옴
function updateInputBorder(id, border) {
  let valid = false;

  switch (id) {
    case "name":
      valid = formValidator.validationState.isNameValid;
      break;

    case "birth":
      valid = formValidator.validationState.isBirthValid;
      break;

    case "phone":
      valid = formValidator.validationState.isPhoneValid;
      break;

    case "email":
      valid = formValidator.validationState.isEmailValid;
      break;

    case "card-number":
      valid = formValidator.validationState.isCardNumberValid;
      break;

    case "expiration":
      valid = formValidator.validationState.isExpirationValid;
      break;

    case "security-code":
      valid = formValidator.validationState.isSecurityValid;
      break;
  }

  if (!valid) {
    border.classList.remove("border");
    border.classList.add("required");
  } else {
    border.classList.remove("required");
    border.classList.add("border");
  }
}

// 전화, 이메일 입력란 수정할 시, CERTIFICATION도 reset
function resetCertification(id) {
  const confirmBtns = bookForm.querySelectorAll(".confirm-btn");

  if (id === "phone") {
    confirmBtns[0].className = "confirm-btn not-verified";
    confirmBtns[0].textContent = "CONFIRM";
    return;
  }

  if (id === "email") {
    confirmBtns[1].className = "confirm-btn not-verified";
    confirmBtns[1].textContent = "CONFIRM";
    return;
  }
}

// 2. CERTIFICATION 버튼
let timer;

function checkCertication(id, btn) {
  // 실제 API 구현은 현재 힘드므로, 전화번호와, 이메일 양식이 맞으면 검증되도록 함
  // 전화번호 검증 버튼/이메일 검증 중 선택된 버튼에 따라 isValid에 값이 다르게 담김(관련 입력란 검증 값 가져옴)
  const isValid =
    id === "confirm-phone"
      ? formValidator.validationState.isPhoneValid
      : formValidator.validationState.isEmailValid;

  id === "confirm-phone"
    ? formValidator.verifyPhone()
    : formValidator.verifyEmail();

  // 실제 동작처럼 보이도록 setTimeout 사용
  btn.textContent = "Waiting...";

  // isValid 여부에 따라 VERIFIED, FAILED로 버튼 스타일 바뀜
  timer = setTimeout(() => {
    if (isValid) {
      btn.className = "confirm-btn verified";
      btn.textContent = "VERIFIED";
    } else {
      btn.className = "confirm-btn rejected";
      btn.textContent = "FAILED";
    }
  }, 1000);
}

// 3. 체크 박스들 검증
function checkCheckboxVaildation(id, checked) {
  switch (id) {
    case "accident-rules": // 사고 관련 사항 체크박스
      formValidator.setAccidentRulesChecked(checked);
      break;

    case "personal-info": // 개인 정보 관련 체크박스
      formValidator.setPersonalInfoChecked(checked);
      break;

    case "check-all": // 모두 확인 및 결제 체크박스
      formValidator.setAllConfirmChecked(checked);
      break;
  }
}

// 검증 때마다 버튼 스타일 결정
function updateSubmitBtnStyle() {
  if (formValidator.isFormValid) {
    submitFormBtn.classList.remove("disabled");
    submitFormBtn.classList.add("activated");
  } else {
    submitFormBtn.classList.remove("activated");
    submitFormBtn.classList.add("disabled");
  }
}

function handleFormInput(event) {
  const id = event.target.id;
  const value = event.target.value;
  const border = event.target.closest(".info-container");

  const formattedValue = formatInputValues(id, value);
  document.getElementById(id).value = formattedValue;

  checkInputValidation(id, formattedValue);
  updateInputBorder(id, border);
  updateSubmitBtnStyle();
}

function handleCertificationBtnCilick(event) {
  const id = event.target.id;
  const certificationBtn = event.target;

  checkCertication(id, certificationBtn);
  updateSubmitBtnStyle();
}

function handleCheckboxClick(event) {
  const id = event.target.id;
  const checked = event.target.checked;

  checkCheckboxVaildation(id, checked);
  updateSubmitBtnStyle();
}

// 이벤트 리스너 등록
const bookForm = document.querySelector(".book-form");

const inputs = bookForm.querySelectorAll(".input");
const confirmBtns = bookForm.querySelectorAll(".confirm-btn");
const checkboxes = bookForm.querySelectorAll(".checkbox-hidden");

inputs.forEach((input) => {
  input.addEventListener("input", handleFormInput);
});

confirmBtns.forEach((certificationBtn) => {
  certificationBtn.addEventListener("click", handleCertificationBtnCilick);
});

checkboxes.forEach((checkbox) => {
  checkbox.addEventListener("click", handleCheckboxClick);
});

// BOOK NOW 버튼을 누른 후 이벤트
// input 입력란을 순회하여 예약 티켓에 보여줄 정보를 저장함(이름, 생일, 전화번호, 이메일)
function saveReservationState() {
  const inputs = bookForm.querySelectorAll(".input");

  inputs.forEach((input) => {
    let name = input.name;
    switch (name) {
      case "name":
        formData.setName(input.value);
        break;
      case "birth":
        formData.setBirth(input.value);
        break;
      case "phone":
        formData.setPhone(input.value);
        break;
      case "email":
        formData.setEmail(input.value);
        break;
    }
  });
}

// 티켓의 각 정보란을 순회하며 저장한 정보들을 출력함
function showReservationState() {
  const ticketSection = document.querySelector(".ticket-section");
  const ticketValues = ticketSection.querySelectorAll(".value");

  ticketValues.forEach((value) => {
    const id = value.id;

    switch (id) {
      case "ticket-planet":
        value.textContent = formData.planet.name;
        break;
      case "ticket-seat":
        value.textContent = localStorage.getItem("seat"); // seat 페이지에서 localStorage에 저장한 내용 가져옴
        break;
      case "ticket-name":
        value.textContent = formData.name;
        break;
      case "ticket-birth":
        value.textContent = formData.birth;
        break;
      case "ticket-phone":
        value.textContent = formData.phone;
        break;
      case "ticket-email":
        value.textContent = formData.email;
        break;
      case "ticket-price":
        value.textContent = formData.planet.price;
        break;
    }
  });
}

// display: none이었던 티켓 섹션을 보이도록 하기
// 실제 제출하는 것과 같이 보이도록 setTimeout 함수 사용
let submitTimer;
function showTicket() {
  clearTimeout(submitTimer);

  if (formValidator.isFormValid) {
    submitFormBtn.textContent = "Waiting...";

    setTimeout(() => {
      const ticketSection = document.querySelector(".ticket-section");

      ticketSection.classList.add("ticket-show");
      submitFormBtn.textContent = "DONE";
    }, 1000);
  }
}

function handleSubmitBtnClick(event) {
  event.preventDefault();
  saveReservationState();
  showReservationState();
  showTicket();
}

// 이벤트 리스너 등록
const submitFormBtn = bookForm.querySelector(".submit-btn");
submitFormBtn.addEventListener("click", handleSubmitBtnClick);

//GO TO MAIN PAGE 눌렀을 때 이벤트
// 뒤로 가기 했을 시 모두 초기화되도록 설정
function hideTicket() {
  const ticketSection = document.querySelector(".ticket-section");

  ticketSection.classList.remove("ticket-show");
  submitFormBtn.textContent = "BOOK NOW";
}

function formReset() {
  const bookForm = document.querySelector(".book-form");
  bookForm.reset(); // 폼 내용 모두 리셋
  formValidator.reset(); // 폼 검증 상태도 모두 리셋
  localStorage.clear(); // seats 페이지에서 localStorage에 저장한 값 비우기
}

function handleExitBtnClick() {
  hideTicket();
  formReset();
  window.location.href = "/src/start/start.html";
}

// 이벤트 리스너 등록
const exitBtn = document.querySelector(".exit");
exitBtn.addEventListener("click", handleExitBtnClick);
