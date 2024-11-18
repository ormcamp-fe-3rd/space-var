// 각 좌석 버튼 클릭 시
// 선택한 좌석 안내하는 섹션 나타남
function showSelectedSeatSection() {
  const selectedSeatSection = document.querySelector(".selected-seat");

  selectedSeatSection.classList.add("open");
  if (!selectedSeatSection.style.maxHeight) {
    selectedSeatSection.style.maxHeight =
      selectedSeatSection.scrollHeight + "px";
  }
}

// 선택한 좌석 안내 텍스트 업데이트
function updateSelectedSeatSectionText(event) {
  const selectedSeatText = document.querySelector(
    ".selected-seat-wrap .selected-seat-text"
  );

  selectedSeatText.textContent = "Selected seat : " + event.target.innerText;
}

// 선택한 좌석 버튼 스타일 변경
function updateSelectedSeatBtnStyle(event) {
  const seatsBtns = document.querySelectorAll(".seat-wrap .seat-list .btn");

  seatsBtns.forEach((seatBtn) => {
    seatBtn.classList.remove("on");
  });

  event.target.classList.add("on");
}

function handleSeatsBtnClick(event) {
  showSelectedSeatSection();
  updateSelectedSeatSectionText(event);
  updateSelectedSeatBtnStyle(event);
  localStorage.setItem("seat", event.target.innerText);
}

// 이벤트 리스너 등록
const seatsBtns = document.querySelectorAll(".seat-wrap .seat-list .btn");

seatsBtns.forEach((seatBtn) => {
  seatBtn.addEventListener("click", handleSeatsBtnClick);
});

// 초기화 버튼 클릭 시
// 버튼 스타일 처음으로 초기화
function resetSeatsBtnsStyle() {
  const seatsBtns = document.querySelectorAll(".seat-wrap .seat-list .btn");

  seatsBtns.forEach((seatBtn) => {
    seatBtn.classList.remove("on");
  });
}

// 선택 좌석 안내 텍스트 초기화
function resetSelectedSeatsSectionText() {
  const selectedSeatText = document.querySelector(
    ".selected-seat-wrap .selected-seat-text"
  );

  selectedSeatText.innerText = "Please select a seat.";
}

function handleResetBtnClick() {
  resetSeatsBtnsStyle();
  resetSelectedSeatsSectionText();
}

// 이벤트 리스너 등록
const resetBtn = document.querySelector(".selected-seat-wrap .btn-reset");

resetBtn.addEventListener("click", handleResetBtnClick);

// NEXT 버튼 누를 시
// 선택한 좌석이 없을 시 다음 페이지로 넘어가지 않게 방지
function handleNextBtnClick(event) {
  if (!Array.from(seatsBtns).some((btn) => btn.classList.contains("on"))) {
    event.preventDefault();
    alert("Please select a seat.");
  }
}

// 이벤트 리스너 등록
const nextBtn = document.querySelector(".selected-seat-wrap .btn-next");

nextBtn.addEventListener("click", handleNextBtnClick);
