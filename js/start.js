// 페이지 내 모든 비디오와 텍스트 요소들을 선택
const videos = document.querySelectorAll(".video");
const texts = document.querySelectorAll(".video-text");
// 비디오 인디케이터, 스크롤 바, 푸터, 버튼 컨테이너, 상단 왼쪽 이미지 요소를 선택
const indicator = document.getElementById("videoIndicator");
const scrollFill = document.getElementById("scrollFill");
const footer = document.getElementById("footer");
const buttonContainer = document.getElementById("buttonContainer");
const topLeftImage = document.getElementById("topLeftImage");

// 현재 비디오를 추적하는 변수
let currentVideo = 0;
// 휠 스크롤의 횟수를 추적하는 변수
let wheelCount = 0;

// 인디케이터(현재 비디오 번호)를 업데이트하는 함수
function updateIndicator() {
  // 인디케이터 텍스트를 현재 비디오 번호로 설정 (1부터 시작)
  indicator.textContent = currentVideo + 1;
  // 스크롤 바의 높이를 설정 (현재 비디오 위치에 맞게)
  scrollFill.style.height =
    ((videos.length - currentVideo - 1) / (videos.length - 1)) * 100 +
    "%";
  // 푸터의 'active' 클래스를 현재 비디오가 2번일 때만 추가
  footer.classList.toggle("active", currentVideo === 2);
  // 버튼과 상단 왼쪽 이미지를 현재 비디오에 따라 토글
  toggleButtonAndImage();
}

// 버튼과 이미지를 현재 비디오에 따라 보여주거나 숨기는 함수
function toggleButtonAndImage() {
  if (currentVideo === 0) {
    // 첫 번째 비디오일 때는 버튼과 이미지 표시
    buttonContainer.classList.add("show");
    topLeftImage.classList.add("show");
  } else {
    // 첫 번째 비디오가 아니면 버튼과 이미지 숨김
    buttonContainer.classList.remove("show");
    topLeftImage.classList.remove("show");
  }
}

// 마우스 휠 이벤트 리스너 (스크롤)
window.addEventListener("wheel", (event) => {
  event.preventDefault(); // 기본 스크롤 동작을 방지
  wheelCount++; // 휠 횟수 증가

  // 휠을 5번 이상 돌렸을 때만 처리
  if (wheelCount >= 5) {
    // 스크롤 방향에 따라 비디오를 변경
    handleScroll(event.deltaY);
    wheelCount = 0; // 휠 횟수 초기화
  }
});

// 터치 시작 시의 Y 좌표를 저장
let touchStartY = 0;
window.addEventListener("touchstart", (event) => {
  touchStartY = event.touches[0].clientY;
});

// 터치 이동 시의 Y 좌표를 기준으로 스크롤 처리
window.addEventListener("touchmove", (event) => {
  const touchEndY = event.touches[0].clientY;
  const deltaY = touchStartY - touchEndY; // 터치 이동량 계산
  handleScroll(deltaY); // 계산된 이동량으로 스크롤 처리
});

// 스크롤 처리 함수 (마우스 휠 또는 터치 이동에 의해 호출)
function handleScroll(deltaY) {
  // deltaY가 50 이상이면 다음 비디오로 이동
  if (deltaY > 50 && currentVideo < videos.length - 1) {
    currentVideo++;
  } 
  // deltaY가 -50 이하이면 이전 비디오로 이동
  else if (deltaY < -50 && currentVideo > 0) {
    currentVideo--;
  }
  // 비디오와 텍스트를 갱신
  updateVideosAndTexts();
}

// 비디오와 텍스트를 업데이트하는 함수
function updateVideosAndTexts() {
  // 인디케이터, 비디오, 텍스트 업데이트
  updateIndicator();
  videos.forEach((video, index) => {
    // 현재 비디오에 "active" 클래스 추가
    video.classList.toggle("active", index === currentVideo);
  });
  texts.forEach((text, index) => {
    // 현재 텍스트에 "active" 클래스 추가
    text.classList.toggle("active", index === currentVideo);
  });
}

// 초기 상태에서 첫 번째 비디오 텍스트에 "active" 클래스 추가
texts[currentVideo].classList.add("active");
// 초기 상태에서 인디케이터 업데이트
updateIndicator();

