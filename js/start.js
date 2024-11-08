const videos = document.querySelectorAll(".video");
const texts = document.querySelectorAll(".video-text");

const scrollFill = document.getElementById("scroll-fill");
const footer = document.getElementById("footer");
const header = document.getElementById("header");
const logo = document.getElementById("logo");

let currentVideoIndex = 0;
function initializeState() {
  currentVideoIndex = 0;
  updateIndicator();
  updateVideosAndTexts();
}

function updateIndicator() {
  scrollFill.style.height =
    ((videos.length - currentVideoIndex - 1) / (videos.length - 1)) * 100 + "%";

  footer.classList.toggle("active", currentVideoIndex === 2); // currentVideoIndex가 2이면 푸터 스타일 변경
}

function toggleButtonAndImage() {
  if (currentVideoIndex === 0) {
    header.classList.add("show");
    logo.classList.add("show");
  } else {
    header.classList.remove("show");
    logo.classList.remove("show");
  }
}

function handleScroll(deltaY) {
  if (deltaY > 50 && currentVideoIndex < videos.length - 1) {
    currentVideoIndex++;
  } else if (deltaY < -50 && currentVideoIndex > 0) {
    currentVideoIndex--;
  }
  updateVideosAndTexts();
}

function updateVideosAndTexts() {
  updateIndicator();
  toggleButtonAndImage();

  videos.forEach((video, index) =>
    video.classList.toggle("active", index === currentVideoIndex)
  );
  texts.forEach((text, index) =>
    text.classList.toggle("active", index === currentVideoIndex)
  );
}

let wheelTimeout;
window.addEventListener("wheel", (event) => {
  event.preventDefault();
  clearTimeout(wheelTimeout); // 기존 타이머 취소
  wheelTimeout = setTimeout(() => handleScroll(event.deltaY), 100); // 100ms 간격으로 스크롤 처리
});

// 페이지가 로드되거나 뒤로 가기/앞으로 가기 시 비디오 상태를 초기화
window.addEventListener("load", initializeState); // 페이지 로드 시 초기화
window.addEventListener("popstate", initializeState); // 뒤로 가기/앞으로 가기 시 초기화
