import { PLANETS, HIDDEN_PLANET_COUNT } from "./const/index.js";

import FormData from "/src/book/models/FormData.js";
import FormValidation from "/src/book/models/FormValidation.js";

const formData = new FormData();
const formValidation = new FormValidation();

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
  formValidation.setPlanetSelected(); // planet 선택됨
  updateSubmitBtnStyle();
}

// 이벤트 리스너 등록
const planetBtns = document.querySelectorAll(".carouel-animation button");

planetBtns.forEach((planetBtn, index) => {
  planetBtn.addEventListener("click", () =>
    handlePlanetBtnClick(planetBtn, index)
  );
});

// 폼 검증
// 1. 입력란 검증(inputs)

// 각 입력란 마다 작성 시에 check~Regex 함수를 통해
// 각각의 값을 해당되는 양식으로 자동으로 바꾸어주고 그 값을 반환함.

// NAME
// 영어, 한글, 공백만 사용 가능
function checkNameRegex(event) {
  event.target.value = event.target.value.replace(
    /[^ㄱ-ㅎㅏ-ㅣ가-힣a-zA-Z ]/g,
    ""
  );

  return event.target.value.length > 0;
}

// BIRTH
// 0000/00/00, 숫자만
function checkBirthRegex(event) {
  event.target.value = event.target.value
    .replace(/[^0-9]/g, "")
    .replace(/^(\d{0,4})(\d{0,2})(\d{0,2})$/g, "$1/$2/$3")
    .replace(/\/{1,2}$/g, "")
    .trim();

  // 년도 및 월 확인
  const [year, month, date] = event.target.value.split("/").map(Number);

  const currentYear = new Date().getFullYear();
  const lastDay = new Date(new Date().getFullYear(), month, 0).getDate();

  // 성인만 예약가능 (최대 100살 - 건강 고려)
  if (
    year > currentYear - 20 ||
    year < currentYear - 100 ||
    month < 1 ||
    month > 12 ||
    date > lastDay ||
    date < 1
  ) {
    return false;
  }

  return event.target.value.length === 10;
}

// PHONE
// 000-0000-0000, 숫자만
function checkPhoneRegex(event) {
  event.target.value = event.target.value
    .replace(/[^0-9]/g, "")
    .replace(/^(\d{0,3})(\d{0,4})(\d{0,4})$/g, "$1-$2-$3")
    .replace(/\-{1,2}$/g, "")
    .trim();

  return event.target.value.length === 13;
}

// EMAIL
// ...@...
function checkEmailRegex(event) {
  event.target.value = event.target.value
    .replace(/[^a-zA-Z0-9@._-]/g, "")
    .trim();

  const emailRegex = /^.+@.+$/;
  return emailRegex.test(event.target.value);
}

// CARD NUMBER
// 0000-0000-0000-0000, 숫자만
function checkCardNumberRegex(event) {
  event.target.value = event.target.value
    .replace(/[^0-9]/g, "")
    .replace(/^(\d{4})(\d{4})(\d{4})(\d{4})$/g, "$1-$2-$3-$4")
    .replace(/\-{1,2}$/g, "")
    .trim();

  return event.target.value.length === 19;
}

// EXPIRATION
// 00/00, 숫자만
function checkExpirationRegex(event) {
  event.target.value = event.target.value
    .replace(/[^0-9]/g, "")
    .replace(/^(\d{2})(\d{2})$/g, "$1/$2")
    .replace(/\/{1,2}$/g, "")
    .trim();

  // 년도 및 월 확인
  const currentYear = new Date().getFullYear() % 100;
  const currentMonth = new Date().getMonth() + 1;

  const [month, year] = event.target.value.split("/").map(Number);

  if (
    month > 12 ||
    month < 1 ||
    year < currentYear ||
    (year === currentYear && month < currentMonth) ||
    event.target.value.length < 5
  ) {
    return false;
  }

  return true;
}

// SECURITY CODE
// 0000, 숫자만
function checkSecurityRegex(event) {
  event.target.value = event.target.value.replace(/[^0-9]/g, "").slice(0, 4);

  return event.target.value.length === 4;
}

// 전체 입력란 검증
// 양식에 맞도록 자동 수정되어 반환된 값의 길이 확인(다 적혔는지)
function checkInputValidation(event) {
  let id = event.target.id; // 현재 입력란의 ID 값을 이용함
  switch (id) {
    case "name":
      formValidation.setNameValid(checkNameRegex(event));
      updateInputBorder(event, formValidation.isNameValid);
      break;

    case "birth":
      formValidation.setBirthValid(checkBirthRegex(event));
      updateInputBorder(event, formValidation.isBirthValid);
      break;

    case "phone":
      formValidation.setPhoneValid(checkPhoneRegex(event));
      resetCertification(event);
      updateInputBorder(event, formValidation.isPhoneValid);
      break;

    case "email":
      formValidation.setEmailValid(checkEmailRegex(event));
      resetCertification(event);
      updateInputBorder(event, formValidation.isEmailValid);
      break;

    case "card-number":
      formValidation.setCardNumberValid(checkCardNumberRegex(event));
      updateInputBorder(event, formValidation.isCardNumberValid);
      break;

    case "expiration":
      formValidation.setExpirationValid(checkExpirationRegex(event));
      updateInputBorder(event, formValidation.isExpirationValid);
      break;

    case "security-code":
      formValidation.setSecurityValid(checkSecurityRegex(event));
      updateInputBorder(event, formValidation.isSecurityValid);
      break;
  }
}

// 입력란의 양식이 맞지 않을 시, 해당 입력란 테두리 빨간색으로 변함
// 양식에 맞을 시 다시 회색으로 돌아옴
function updateInputBorder(event, valid) {
  const input = event.target;
  const inputContainer = input.closest(".info-container"); // 입력란 컨테이너(테두리 부분)

  if (!valid) {
    inputContainer.classList.remove("border");
    inputContainer.classList.add("required");
  } else {
    inputContainer.classList.remove("required");
    inputContainer.classList.add("border");
  }
}

// 전화, 이메일 입력란 수정할 시, CERTIFICATION도 reset
function resetCertification(event) {
  const confirmBtns = bookForm.querySelectorAll(".confirm-btn");

  if (event.target.id === "phone") {
    confirmBtns[0].className = "confirm-btn not-verified";
    confirmBtns[0].textContent = "CONFIRM";
    return;
  }

  if (event.target.id === "email") {
    confirmBtns[1].className = "confirm-btn not-verified";
    confirmBtns[1].textContent = "CONFIRM";
    return;
  }
}

// 2. CERTIFICATION 버튼
let timer;

function checkCertication(event) {
  const id = event.target.id;
  const btn = event.target;

  // 실제 API 구현은 현재 힘드므로, 전화번호와, 이메일 양식이 맞으면 검증되도록 함
  // 전화번호 검증 버튼/이메일 검증 중 선택된 버튼에 따라 isValid에 값이 다르게 담김(관련 입력란 검증 값 가져옴)
  const isValid =
    id === "confirm-phone"
      ? formValidation.isPhoneValid
      : formValidation.isEmailValid;

  // 전화번호 버튼일 때 isValid의 값이 바뀌고 그 값이 들어감. 아니라면 이전 값 유지
  formValidation.setPhoneVerified(
    id === "confirm-phone" ? isValid : formValidation.isPhoneVerified
  );

  formValidation.setEmailVerified(
    id === "confirm-email" ? isValid : formValidation.isEmailVerfied
  );

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
function checkCheckboxVaildation(event) {
  let id = event.target.id;
  switch (id) {
    case "accident-rules": // 사고 관련 사항 체크박스
      formValidation.setAccidentRulesChecked(event.target.checked);
      break;

    case "personal-info": // 개인 정보 관련 체크박스
      formValidation.setPersonalInfoChecked(event.target.checked);
      break;

    case "check-all": // 모두 확인 및 결제 체크박스
      formValidation.setAllConfirmedChecked(event.target.checked);
      break;
  }
}

// 검증 때마다 버튼 스타일 결정
function updateSubmitBtnStyle() {
  if (formValidation.isFormValid) {
    submitFormBtn.classList.remove("disabled");
    submitFormBtn.classList.add("activated");
  } else {
    submitFormBtn.classList.remove("activated");
    submitFormBtn.classList.add("disabled");
  }
}

function handleFormInput(event) {
  checkInputValidation(event);
  updateSubmitBtnStyle();
}

function handleCertificationBtnCilick(event) {
  checkCertication(event);
  updateSubmitBtnStyle();
}

function handleCheckboxClick(event) {
  checkCheckboxVaildation(event);
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

  inputs.forEach((input, i) => {
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

  if (formValidation.isFormValid) {
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
  formValidation.reset(); // 폼 검증 상태도 모두 리셋
  localStorage.clear(); // seats 페이지에서 localStorage에 저장한 값 비우기
}

function handleExitBtnClick() {
  hideTicket();
  formReset();
  window.location.href = "../../pages/start/start.html";
}

// 이벤트 리스너 등록
const exitBtn = document.querySelector(".exit");
exitBtn.addEventListener("click", handleExitBtnClick);
