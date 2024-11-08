let currentSectionIndex = 0;

function checkScrollSection(deltaY) {
  const videos = document.querySelectorAll(".video");

  if (deltaY > 50 && currentSectionIndex < videos.length - 1) {
    // 아래로 스크롤(deltaY가 50보다 클 때)하고, 현재 섹션이 마지막 섹션이 아닐 때
    //  다음 섹션으로 이동
    currentSectionIndex++;
  } else if (deltaY < -50 && currentSectionIndex > 0) {
    // 위로 스크롤(deltaY가 -50보다 작을 때)하고, 현재 섹션이 첫 번째 섹션이 아닐 때
    //  이전 섹션으로 이동
    currentSectionIndex--;
  }
}

function updateScrollFillStyle() {
  const scrollFill = document.querySelector(".scroll-fill");
  const videos = document.querySelectorAll(".video");

  const totalSections = videos.length - 1;
  const progress = (currentSectionIndex / totalSections) * 100;
  scrollFill.style.height = 100 - progress + "%";
}

function showVideosAndTexts() {
  const videos = document.querySelectorAll(".video");
  const texts = document.querySelectorAll(".video-text");

  videos.forEach((video, index) => {
    video.classList.toggle("active", index === currentSectionIndex);
  });
  texts.forEach((text, index) =>
    text.classList.toggle("active", index === currentSectionIndex)
  );
}

function updateFooterStyle() {
  const footer = document.querySelector(".footer");

  // 마지막 섹션일 때 푸터 나타나도록
  if (currentSectionIndex === 2) footer.classList.toggle("active");
}

// 디바운싱: 연속적으로 발생하는 이벤트를 그룹화해서, 마지막 이벤트만 처리하는 기술
// 80ms 동안 추가 스크롤이 없을 때만 실제 동작을 실행
// 연속적인 스크롤 중에는 계속 타이머를 초기화하면서 실행을 미룸
// 결과적으로 스크롤이 "멈춘 시점"의 마지막 위치에서만 동작

let wheelTimeout;
function handleWheel(event) {
  clearTimeout(wheelTimeout);
  // 기존 타이머 취소
  wheelTimeout = setTimeout(() => {
    checkScrollSection(event.deltaY);
    updateScrollFillStyle();
    updateFooterStyle();
    showVideosAndTexts();
  }, 80); // 80ms 간격으로 스크롤 처리 // 스크롤이 0.08초 동안 멈췄을 때 비디오와 텍스트를 업데이트 하기
}

// 이벤트 리스너 등록
window.addEventListener("wheel", (event) => handleWheel(event));

function resetScroll() {
  currentSectionIndex = 0;
  updateScrollFillStyle();
  updateFooterStyle();
  showVideosAndTexts();
}

// 이벤트 리스너 등록
window.addEventListener("load", resetScroll); // 페이지 로드 시 초기화
window.addEventListener("popstate", resetScroll); // 뒤로 가기/앞으로 가기 시 초기화
