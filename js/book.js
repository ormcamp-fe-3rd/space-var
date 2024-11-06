const carousel = document.querySelector(".carouel-animation");
const carousel_Button = document.querySelectorAll(".carouel-animation button");
const prevButton = document.querySelector(".carouel-prevbtn");
const nextButton = document.querySelector(".carouel-nextbtn");
let carouselIndex = 0;
let hiddent_Count = 2;

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

// customer
const inputs = bookForm.querySelectorAll(".input");

const certificationBtns = bookForm.querySelectorAll(".certification-btn");

const accidentRulesCheckbox = bookForm.querySelector("#accident-rules");
const personalInfoCheckbox = bookForm.querySelector("#personal-info");

const lastCheckbox = bookForm.querySelector("#check-all");

const submitFormBtn = bookForm.querySelector(".submit-btn");

// 정규표현식
const message = [
  "이름 입력란을 확인해주세요",
  "생일 입력란을 확인해주세요",
  "전화번호 입력란을 확인해주세요",
  "이메일 입력란을 확인해주세요",
  "카드번호 입력란을 확인해주세요",
  "카드 유효기간 입력란을 확인해주세요",
  "보안코드 입력란을 확인해주세요",
];

let isFormValid = false;
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

function checkFormValidation(event) {
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

function handleFormInput(event) {
  checkFormValidation(event);
  submitBtnStyleToggle();
}

inputs.forEach((input) => {
  input.addEventListener("input", handleFormInput);
});

function handleSubmitBtnClick(event) {
  checkFormValidation(event);
  submitBtnStyleToggle();
}

submitFormBtn.addEventListener("click", (event) => handleSubmitBtnClick(event));
