// 페이지 내 모든 비디오와 텍스트 요소들을 선택
const videos = document.querySelectorAll(".video"); // 모든 비디오 요소들을 선택
const texts = document.querySelectorAll(".video-text"); // 모든 비디오에 해당하는 텍스트 요소들을 선택

// 비디오 인디케이터, 스크롤 바, 푸터, 버튼 컨테이너, 상단 왼쪽 이미지 요소를 선택
const indicator = document.getElementById("videoIndicator"); // 비디오 인디케이터(현재 비디오 번호 표시) 선택
const scrollFill = document.getElementById("scrollFill"); // 스크롤 바 채우는 부분 선택
const footer = document.getElementById("footer"); // 푸터 선택
const buttonContainer = document.getElementById("buttonContainer"); // 버튼 컨테이너 선택
const topLeftImage = document.getElementById("topLeftImage"); // 상단 왼쪽 이미지 요소 선택

// 현재 비디오를 추적하는 변수 (기본값은 첫 번째 비디오인 0)
let currentVideo = 0;

// 페이지 로드 시 또는 뒤로 가기 할 때 비디오 상태를 초기화하는 함수
function initializeState() {
  // 초기 상태에서 첫 번째 비디오가 활성화되어야 하므로
  currentVideo = 0; // 첫 번째 비디오로 초기화

  // 초기 상태에서 인디케이터와 버튼을 갱신
  updateIndicator(); // 인디케이터 업데이트
  updateVideosAndTexts(); // 비디오와 텍스트를 활성화 상태로 업데이트
}

// 인디케이터(현재 비디오 번호)를 업데이트하는 함수
function updateIndicator() {
  // 인디케이터 텍스트를 현재 비디오 번호로 설정 (1부터 시작)
  indicator.textContent = currentVideo + 1;

  // 스크롤 바의 높이를 설정 (현재 비디오 위치에 맞게 비율로 계산)
  scrollFill.style.height = ((videos.length - currentVideo - 1) / (videos.length - 1)) * 100 + "%";

  // 푸터의 'active' 클래스를 현재 비디오가 2번일 때만 추가 (특정 비디오일 때 푸터 스타일 변경)
  footer.classList.toggle("active", currentVideo === 2);
}

// 버튼과 이미지를 현재 비디오에 따라 보여주거나 숨기는 함수
function toggleButtonAndImage() {
  if (currentVideo === 0) { // 첫 번째 비디오일 때
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
let wheelTimeout; // 휠 이벤트 처리 시간을 제어할 변수
window.addEventListener("wheel", (event) => {
  event.preventDefault(); // 기본 스크롤 동작을 방지하여 페이지가 스크롤되지 않도록 처리

  // 휠 이벤트가 너무 자주 발생하지 않도록 처리 (짧은 시간 안에 여러 번 스크롤을 방지)
  clearTimeout(wheelTimeout);
  wheelTimeout = setTimeout(() => handleScroll(event.deltaY), 100); // 100ms 간격으로 스크롤 처리
});

// 터치 시작 시의 Y 좌표를 저장
let touchStartY = 0;
window.addEventListener("touchstart", (event) => {
  touchStartY = event.touches[0].clientY; // 터치 시작 위치 저장
});

// 터치 이동 시의 Y 좌표를 기준으로 스크롤 처리
window.addEventListener("touchmove", (event) => {
  const touchEndY = event.touches[0].clientY; // 터치 종료 위치 계산
  const deltaY = touchStartY - touchEndY; // 터치 이동량 계산
  handleScroll(deltaY); // 계산된 이동량으로 스크롤 처리
});

// 스크롤 처리 함수 (마우스 휠 또는 터치 이동에 의해 호출)
function handleScroll(deltaY) {
  // deltaY가 50 이상이면 다음 비디오로 이동
  if (deltaY > 50 && currentVideo < videos.length - 1) {
    currentVideo++; // 현재 비디오가 마지막 비디오가 아니면 다음 비디오로 이동
  } 
  // deltaY가 -50 이하이면 이전 비디오로 이동
  else if (deltaY < -50 && currentVideo > 0) {
    currentVideo--; // 현재 비디오가 첫 번째 비디오가 아니면 이전 비디오로 이동
  }
  // 비디오와 텍스트를 갱신
  updateVideosAndTexts();
}

// 비디오와 텍스트를 업데이트하는 함수
function updateVideosAndTexts() {
  // 인디케이터, 버튼, 이미지 갱신
  updateIndicator();
  toggleButtonAndImage();
  
  // 비디오와 텍스트에 "active" 클래스 추가 (현재 비디오에 해당하는 비디오와 텍스트만 활성화)
  videos.forEach((video, index) => video.classList.toggle("active", index === currentVideo));
  texts.forEach((text, index) => text.classList.toggle("active", index === currentVideo));
}

// 페이지가 로드될 때나 뒤로 가기 할 때마다 상태 초기화
window.addEventListener('load', initializeState); // 페이지 로드 시 초기화
window.addEventListener('popstate', () => { // 뒤로 가기/앞으로 가기 시 상태 초기화
  initializeState();
});
