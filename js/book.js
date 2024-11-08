const carousel = document.querySelector(".carouel-animation"); // 캐러셀 애니메이션
const carouselBtn = document.querySelectorAll(".carouel-animation button");  // 캐러셀의 각각의 행성 
const prevBtn = document.querySelector(".carouel-prevbtn");    // 캐러셀 이동의 이전버튼
const nextBtn = document.querySelector(".carouel-nextbtn");    // 캐러셀 이동의 다음버튼
const hiddenIndex = 2;   // 캐러셀내 현재 화면에서 숨겨저 있는 행성들의 갯수
let carouselIndex = 0; // 현재 캐러셀 위치의 상태

const planetArray = [  // 각각의 행성들의 정보
  {
    name: "Mercurius", // 행성 이름
    price: "100",      // 행성의 가격 ( deposit은 price 의 2배로 지정 )
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
    name: "Pluto",
    price: "700",
  },
  {
    name: "Pluto",
    price: "800",
  },
];
const showcarouselCount = planetArray.length - hiddenIndex; // 페이지내에서 보여지고있는 행성들의 갯수

let reservationInfo = {};

// 캐러셀의 이전 버튼 클릭시 발생
// index 값 낮춰 현재 캐러셀 위치 이동 후 버튼의 opacity 및 캐러셀 이동 체크
prevBtn.addEventListener("click", () => { 
  if (carouselIndex === 0) return;
  carouselIndex -= 1;
  checkBtnOpacity(prevBtn, nextBtn, carouselIndex, hiddenIndex);
  checkTransform(carousel, carouselIndex);
});

// 캐러셀의 다음 버튼 클릭시 발생
// index 값 추가해 캐러셀 위치 이동 후 버튼 opacity 및 캐러셀 이동 체크
nextBtn.addEventListener("click", () => {
  if (carouselIndex === hiddenIndex) return;
  carouselIndex += 1;
  checkBtnOpacity(prevBtn, nextBtn, carouselIndex, hiddenIndex);
  checkTransform(carousel, carouselIndex);
});

// 버튼의 불투명도 (활성화/비활성화) 체크 함수
// index == 0 이면 처음 위치 (50%) / index == hiddenIndex 이면 마지막 위치 (100%)
function checkBtnOpacity(prevButton, nextButton, index, hiddenIndex) {
  prevButton.style.opacity = index === 0 ? "50%" : "100%";
  nextButton.style.opacity = index === hiddenIndex ? "50%" : "100%";
}

// 캐러셀 이동 애니메이션 체크 함수
// saturn 은 크기가 달라서 translateX을 늘림
function checkTransform(carousel, index) {
  const saturnIndex = planetArray.findIndex(planet => planet.name === "Saturn") - showcarouselCount + 1;
  const movement = index === saturnIndex ? 190 : 150;
  carousel.style.transform = `translateX(-${movement * index}px)`;
}

// 캐러셀 내 각 행성버튼들에 대한 클릭시 발생
// 사용자가 선택한 버튼 클릭시 선택한 행성 사이즈 조절 및 정보 출력
carouselBtn.forEach((button, index) => {
  button.addEventListener("click", () => {
    const sideBackground = document.querySelector(".side");      // side 이미지 
    const planetPrice = document.querySelector(".planet-price"); // 행성의 가격
    const totalPrice = document.querySelector(".total-price");   // 최종 가격
    const selectBtn = button.querySelector("img");               // 사용자가 선택한 버튼의 이미지
    const name = planetArray[index].name;                        // 사용자가 선택한 행성의 이름
    const price = planetArray[index].price;                      // 사용자가 선택한 행성의 가격
    const localHost = window.location.origin;                    // 현재 localHost 값 (side 이미지 변경시 상대주소가 적용이 안되서 직접지정 ) 

    totalPrice.textContent = `Total $ ${price * 2}`;
    planetPrice.innerHTML = `${name}<br> $${price}(price) + $${price}(deposit)`;
    selectBtn.classList.add("sizeup-animation");
    
    // side 이미지 변경시 0.5초 동안 불투명도를 0% ~ 100% 조정해 transition 구현
    sideBackground.style.opacity = "0%";
    setTimeout( () => {
      sideBackground.style.backgroundImage = `url("${localHost}/assets/images/book/planet/surface/${name}.svg")`;
      sideBackground.style.opacity = "100%";
    }, 300);

    reservationInfo.planet = {
      name: name,
      price: price * 2,
    };

    // 선택한 버튼이 아닌 나머지 버튼 클릭시 발생
    // 나머지 버튼들의 남아있는 사이즈 조절 이벤트 초기화
    carouselBtn.forEach((otherBtn, otherIndex) => {
      otherIndex !== index && otherBtn.querySelector("img").classList.remove("sizeup-animation");
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
