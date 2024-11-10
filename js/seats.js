function showSelectedSeatSection() {
  const selectedSeatSection = document.querySelector(".selected-seat");

  selectedSeatSection.classList.add("open");
  if (!selectedSeatSection.style.maxHeight) {
    selectedSeatSection.style.maxHeight =
      selectedSeatSection.scrollHeight + "px";
  }
}

function showSelectedSeatSectionText(event) {
  const selectedSeatText = document.querySelector(
    ".selected-seat-wrap .selected-seat-text"
  );

  selectedSeatText.innerHTML =
    "Selected seat : <span>" + event.target.innerText + "</span>";
}

function updateSelectedSeatBtnStyle(event) {
  const seatsBtns = document.querySelectorAll(".seat-wrap .seat-list .btn");

  seatsBtns.forEach((seatBtn) => {
    seatBtn.classList.remove("on");
  });

  event.target.classList.add("on");
}

function handleSeatsBtnClick(event) {
  showSelectedSeatSection();
  showSelectedSeatSectionText(event);
  updateSelectedSeatBtnStyle(event);
  localStorage.setItem("seat", event.target.innerText);
}

// 이벤트 리스너 등록
const seatsBtns = document.querySelectorAll(".seat-wrap .seat-list .btn");

seatsBtns.forEach((seatBtn) => {
  seatBtn.addEventListener("click", handleSeatsBtnClick);
});

// 초기화 버튼
function resetSeatsBtnsStyle() {
  const seatsBtns = document.querySelectorAll(".seat-wrap .seat-list .btn");

  seatsBtns.forEach((seatBtn) => {
    seatBtn.classList.remove("on");
  });
}

function resetSelectedSeatsSection() {
  const selectedSeatText = document.querySelector(
    ".selected-seat-wrap .selected-seat-text"
  );

  selectedSeatText.innerText = "Please select a seat.";
}

function handleResetBtnClick() {
  resetSeatsBtnsStyle();
  resetSelectedSeatsSection();
}

// 이벤트 리스너 등록
const resetBtn = document.querySelector(".selected-seat-wrap .btn-reset");

resetBtn.addEventListener("click", handleResetBtnClick);

function handleNextBtnClick(event) {
  if (!Array.from(seatsBtns).some((btn) => btn.classList.contains("on"))) {
    event.preventDefault();
    alert("Please select a seat.");
  }
}

// 이벤트 리스너 등록
const nextBtn = document.querySelector(".selected-seat-wrap .btn-next");

nextBtn.addEventListener("click", handleNextBtnClick);
