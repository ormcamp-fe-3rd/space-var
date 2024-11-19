import { FINAL_SECTION_INDEX, TOTAL_SECTION_COUNT } from "./const/index.js";

function createSectionState() {
  let index = 0;

  function getCurrentIndex() {
    return index;
  }

  function decreaseIndex(number) {
    index -= number;
    return index;
  }

  function increaseIndex(number) {
    index += number;
    return index;
  }

  function resetIndex() {
    index = 0;
  }

  return {
    getCurrentIndex,
    decreaseIndex,
    increaseIndex,
    resetIndex,
  };
}

let currentSectionState = createSectionState();

function checkScrollSection(deltaY) {
  let currentSectionIndex = currentSectionState.getCurrentIndex();

  if (deltaY > 50 && currentSectionIndex < FINAL_SECTION_INDEX) {
    // 아래로 스크롤(deltaY가 50보다 클 때)하고, 현재 섹션이 마지막 섹션이 아닐 때
    //  다음 섹션으로 이동
    currentSectionIndex = currentSectionState.increaseIndex(1);
  } else if (deltaY < -50 && currentSectionIndex > 0) {
    // 위로 스크롤(deltaY가 -50보다 작을 때)하고, 현재 섹션이 첫 번째 섹션이 아닐 때
    //  이전 섹션으로 이동
    currentSectionIndex = currentSectionState.decreaseIndex(1);
  }

  currentSectionIndex = currentSectionState.getCurrentIndex();
}

function updateScrollFillStyle() {
  let currentSectionIndex = currentSectionState.getCurrentIndex();
  const scrollFill = document.querySelector(".scroll-fill");

  const progress = (currentSectionIndex / TOTAL_SECTION_COUNT) * 100;
  scrollFill.style.height = 100 - progress + "%";
}

function switchActiveVideoContents() {
  let currentSectionIndex = currentSectionState.getCurrentIndex();

  console.log(currentSectionIndex);
  const videos = document.querySelectorAll(".video");
  const texts = document.querySelectorAll(".video-text");

  videos.forEach((video, index) => {
    video.classList.toggle("active", index === currentSectionIndex);
  });
  texts.forEach((text, index) =>
    text.classList.toggle("active", index === currentSectionIndex)
  );
}

function toggleFooterOnFinalSection() {
  let currentSectionIndex = currentSectionState.getCurrentIndex();
  const footer = document.querySelector(".footer");

  // 마지막 섹션일 때 푸터 나타나도록
  if (currentSectionIndex === FINAL_SECTION_INDEX) {
    footer.classList.add("active");
  } else {
    footer.classList.remove("active");
  }
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
    toggleFooterOnFinalSection();
    switchActiveVideoContents();
  }, 80); // 80ms 간격으로 스크롤 처리 // 스크롤이 0.08초 동안 멈췄을 때 비디오와 텍스트를 업데이트 하기
}

// 이벤트 리스너 등록
window.addEventListener("wheel", (event) => handleWheel(event));

function resetScroll() {
  currentSectionState.resetIndex();
  updateScrollFillStyle();
  toggleFooterOnFinalSection();
  switchActiveVideoContents();
}

// 이벤트 리스너 등록
window.addEventListener("load", resetScroll); // 페이지 로드 시 초기화
window.addEventListener("popstate", resetScroll); // 뒤로 가기/앞으로 가기 시 초기화
