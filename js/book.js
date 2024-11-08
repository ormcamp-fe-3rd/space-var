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
  reservationState.setPlanet(PLANETS[index]); // 선택한 행성 정보 저장
  formState.setPlanetSelected(); // planet 선택됨
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

  return event.target.value;
}

// BIRTH
// 0000/00/00, 숫자만
function checkBirthRegex(event) {
  event.target.value = event.target.value
    .replace(/[^0-9]/g, "")
    .replace(/^(\d{0,4})(\d{0,2})(\d{0,2})$/g, "$1/$2/$3")
    .replace(/\/{1,2}$/g, "")
    .trim();

  return event.target.value;
}

// PHONE
// 000-0000-0000, 숫자만
function checkPhoneRegex(event) {
  event.target.value = event.target.value
    .replace(/[^0-9]/g, "")
    .replace(/^(\d{0,3})(\d{0,4})(\d{0,4})$/g, "$1-$2-$3")
    .replace(/\-{1,2}$/g, "")
    .trim();

  return event.target.value;
}

// EMAIL
// ...@...
function checkEmailRegex(event) {
  event.target.value = event.target.value
    .replace(/[^a-zA-Z0-9@.]/g, "") // 영문, 숫자, @, . 만 허용
    .trim();

  return event.target.value.includes("@");
}

// CARD NUMBER
// 0000-0000-0000-0000, 숫자만
function checkCardNumberRegex(event) {
  event.target.value = event.target.value
    .replace(/[^0-9]/g, "")
    .replace(/^(\d{4})(\d{4})(\d{4})(\d{4})$/g, "$1-$2-$3-$4")
    .replace(/\-{1,2}$/g, "")
    .trim();

  return event.target.value;
}

// EXPIRATION
// 00/00, 숫자만
function checkExpirationRegex(event) {
  event.target.value = event.target.value
    .replace(/[^0-9]/g, "")
    .replace(/^(\d{0,2})(\d{0,2})$/g, "$1/$2")
    .replace(/\/{1,2}$/g, "")
    .trim();

  return event.target.value;
}

// SECURITY CODE
// 0000, 숫자만
function checkSecurityRegex(event) {
  event.target.value = event.target.value.replace(/[^0-9]/g, "").slice(0, 4);

  return event.target.value;
}

// 전체 입력란 검증
// 양식에 맞도록 자동 수정되어 반환된 값의 길이 확인(다 적혔는지)
function checkInputValidation(event) {
  let id = event.target.id; // 현재 입력란의 ID 값을 이용함
  switch (id) {
    case "name":
      formState.setNameValid(checkNameRegex(event).length > 0); // 한 글자라도 적히면 됨
      updateInputBorder(event, formState.isNameValid);
      break;

    case "birth":
      formState.setBirthValid(checkBirthRegex(event).length === 10); // 슬래시 포함 10자
      updateInputBorder(event, formState.isBirthValid);
      break;

    case "phone":
      formState.setPhoneValid(checkPhoneRegex(event).length === 13); // 하이픈 포함 13자
      updateInputBorder(event, formState.isPhoneValid);
      break;

    case "email":
      formState.setEmailValid(checkEmailRegex(event)); // 이메일은 길이 제한이 없음. (양식 맞는지 판별만 하고 boolean 값 반환)
      updateInputBorder(event, formState.isEmailValid);
      break;

    case "card-number":
      formState.setCardNumberValid(checkCardNumberRegex(event).length === 19); // 하이픈 포함 19자
      updateInputBorder(event, formState.isCardNumberValid);
      break;

    case "expiration":
      formState.setExpirationValid(checkExpirationRegex(event).length === 5); // 슬래시 포함 5자
      updateInputBorder(event, formState.isExpirationValid);
      break;

    case "security-code":
      formState.setSecurityValid(checkSecurityRegex(event).length === 4); // 4글자
      updateInputBorder(event, formState.isSecurityValid);
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

// 2. CERTIFICATION 버튼
let timer;

function checkCertication(event) {
  const id = event.target.id;
  const btn = event.target;

  // 실제 API 구현은 현재 힘드므로, 전화번호와, 이메일 양식이 맞으면 검증되도록 함
  // 전화번호 검증 버튼/이메일 검증 중 선택된 버튼에 따라 isValid에 값이 다르게 담김(관련 입력란 검증 값 가져옴)
  const isValid =
    id === "certification-phone"
      ? formState.isPhoneValid
      : formState.isEmailValid;

  // 전화번호 버튼일 때 isValid의 값이 바뀌고 그 값이 들어감. 아니라면 이전 값 유지
  formState.setPhoneVerified(
    id === "certification-phone" ? isValid : formState.isPhoneVerified
  );

  formState.setEmailVerified(
    id === "certification-email" ? isValid : formState.isEmailVerfied
  );

  // 실제 동작처럼 보이도록 setTimeout 사용
  // 누를 때마다 타이머 삭제 후 새로 타이머 생성
  clearTimeout(timer);

  btn.textContent = "Waiting...";

  // isValid 여부에 따라 VERIFIED, FAILED로 버튼 스타일 바뀜
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

// 3. 체크 박스들 검증
function checkCheckboxVaildation(event) {
  let id = event.target.id;
  switch (id) {
    case "accident-rules": // 사고 관련 사항 체크박스
      formState.setAccidentRulesChecked(event.target.checked);
      break;

    case "personal-info": // 개인 정보 관련 체크박스
      formState.setPersonalInfoChecked(event.target.checked);
      break;

    case "check-all": // 모두 확인 및 결제 체크박스
      formState.setAllConfirmedChecked(event.target.checked);
      break;
  }
}

// 검증 때마다 버튼 스타일 결정
function updateSubmitBtnStyle() {
  if (formState.isFormValid) {
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
const certificationBtns = bookForm.querySelectorAll(".certification-btn");
const checkboxes = bookForm.querySelectorAll(".checkbox-hidden");

inputs.forEach((input) => {
  input.addEventListener("input", handleFormInput);
});

certificationBtns.forEach((certificationBtn) => {
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
    switch (i) {
      case 0:
        reservationState.setName(input.value);
        break;
      case 1:
        reservationState.setBirth(input.value);
        break;
      case 2:
        reservationState.setPhone(input.value);
        break;
      case 3:
        reservationState.setEmail(input.value);
        break;
    }
  });
}

// 티켓의 각 정보란을 순회하며 저장한 정보들을 출력함
function showReservationState() {
  const ticketSection = document.querySelector(".ticket-section");
  const ticketValues = ticketSection.querySelectorAll(".value");

  ticketValues.forEach((value, i) => {
    switch (i) {
      case 0:
        value.textContent = reservationState.planet.name;
        break;
      case 1:
        value.textContent = localStorage.getItem("seat"); // seat 페이지에서 localStorage에 저장한 내용 가져옴
        break;
      case 2:
        value.textContent = reservationState.name;
        break;
      case 3:
        value.textContent = reservationState.birth;
        break;
      case 4:
        value.textContent = reservationState.phone;
        break;
      case 5:
        value.textContent = reservationState.email;
        break;
      case 6:
        value.textContent = reservationState.planet.price;
        break;
    }
  });
}

// display: none이었던 티켓 섹션을 보이도록 하기
// 실제 제출하는 것과 같이 보이도록 setTimeout 함수 사용
let submitTimer;
function showTicket() {
  clearTimeout(submitTimer);

  if (formState.isFormValid) {
    submitFormBtn.textContent = "Waiting...";

    setTimeout(() => {
      const ticketSection = document.querySelector(".ticket-section");

      ticketSection.classList.add("ticket-show");
      submitFormBtn.textContent = "DONE";
    }, 1000);
  }
}

function handleSubmitBtnClick() {
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
  formState.reset(); // 폼 검증 상태도 모두 리셋
  localStorage.clear(); // seats 페이지에서 localStorage에 저장한 값 비우기
}

function handleExitBtnClick() {
  hideTicket();
  formReset();
  window.location.href = "../pages/start.html";
}

// 이벤트 리스너 등록
const exitBtn = document.querySelector(".exit");
exitBtn.addEventListener("click", handleExitBtnClick);
