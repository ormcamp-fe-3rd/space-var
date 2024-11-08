// 1. 페이지 내 모든 비디오와 텍스트 요소들을 선택
const videos = document.querySelectorAll(".video"); // 모든 비디오 요소들을 선택
const texts = document.querySelectorAll(".video-text"); // 비디오에 해당하는 텍스트 요소들을 선택

// 2. 비디오 인디케이터, 스크롤 바, 푸터, 버튼 컨테이너, 상단 왼쪽 이미지 요소를 선택
const indicator = document.getElementById("videoIndicator"); // 비디오 인디케이터(현재 비디오 번호 표시)
const scrollFill = document.getElementById("scrollFill"); // 스크롤 바 채우는 부분
const footer = document.getElementById("footer"); // 푸터
const buttonContainer = document.getElementById("buttonContainer"); // 버튼 컨테이너
const topLeftImage = document.getElementById("topLeftImage"); // 상단 왼쪽 이미지 요소

// 3. 현재 비디오를 추적하는 변수 (기본값은 첫 번째 비디오인 0)
let currentVideo = 0; // 첫 번째 비디오(0번)가 기본값

// 4. 페이지 로드 시 또는 뒤로 가기 할 때 비디오 상태를 초기화하는 함수
function initializeState() {
  currentVideo = 0; // 첫 번째 비디오로 초기화
  updateIndicator(); // 인디케이터 업데이트
  updateVideosAndTexts(); // 비디오와 텍스트를 활성화 상태로 업데이트
}

// 5. 인디케이터와 스크롤바를 업데이트하는 함수
function updateIndicator() {
  // 현재 비디오 번호를 인디케이터에 표시 (1부터 시작)
  indicator.textContent = currentVideo + 1;

  // 현재 비디오 위치에 맞게 스크롤 바 높이를 비율로 계산하여 설정
  scrollFill.style.height = ((videos.length - currentVideo - 1) / (videos.length - 1)) * 100 + "%";

  // 특정 비디오(2번)일 때만 푸터에 'active' 클래스 추가
  footer.classList.toggle("active", currentVideo === 2); // currentVideo가 2이면 푸터 스타일 변경
}

// 6. 비디오에 맞춰 버튼과 이미지를 보이거나 숨기는 함수
function toggleButtonAndImage() {
  if (currentVideo === 0) {
    // 첫 번째 비디오일 때 버튼과 이미지를 표시
    buttonContainer.classList.add("show");
    topLeftImage.classList.add("show");
  } else {
    // 첫 번째 비디오가 아니면 버튼과 이미지를 숨김
    buttonContainer.classList.remove("show");
    topLeftImage.classList.remove("show");
  }
}

// 7. 스크롤로 비디오를 전환하는 함수
function handleScroll(deltaY) {
  // deltaY 값이 50보다 크면 다음 비디오로 이동
  if (deltaY > 50 && currentVideo < videos.length - 1) {
    currentVideo++; // 현재 비디오가 마지막이 아니면 다음 비디오로 이동
  }
  // deltaY 값이 -50보다 작으면 이전 비디오로 이동
  else if (deltaY < -50 && currentVideo > 0) {
    currentVideo--; // 현재 비디오가 첫 번째가 아니면 이전 비디오로 이동
  }
  updateVideosAndTexts(); // 비디오와 텍스트를 갱신
}

// 8. 비디오와 텍스트를 갱신하는 함수
function updateVideosAndTexts() {
  updateIndicator(); // 인디케이터 갱신
  toggleButtonAndImage(); // 버튼과 이미지 갱신
  
  // 현재 비디오에 해당하는 비디오와 텍스트만 활성화
  videos.forEach((video, index) => video.classList.toggle("active", index === currentVideo)); // 현재 비디오에 "active" 클래스 추가
  texts.forEach((text, index) => text.classList.toggle("active", index === currentVideo)); // 현재 비디오에 해당하는 텍스트에 "active" 클래스 추가
}

// 9. 마우스 휠 이벤트 리스너 (스크롤 처리)
let wheelTimeout; // 휠 이벤트 처리 간격을 관리
window.addEventListener("wheel", (event) => {
  event.preventDefault(); // 기본 스크롤 동작 방지
  clearTimeout(wheelTimeout); // 기존 타이머 취소
  wheelTimeout = setTimeout(() => handleScroll(event.deltaY), 100); // 100ms 간격으로 스크롤 처리
});

// 페이지가 로드되거나 뒤로 가기/앞으로 가기 시 비디오 상태를 초기화
window.addEventListener('load', initializeState); // 페이지 로드 시 초기화
window.addEventListener('popstate', initializeState); // 뒤로 가기/앞으로 가기 시 초기화

//수정 