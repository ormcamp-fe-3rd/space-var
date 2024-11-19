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

function checkScrollSection(currentSectionIndex, deltaY) {
  console.log(currentSectionIndex);
  if (deltaY > 10 && currentSectionIndex < FINAL_SECTION_INDEX) {
    currentSectionIndex = currentSectionState.increaseIndex(1);
  } else if (deltaY < -10 && currentSectionIndex > 0) {
    currentSectionIndex = currentSectionState.decreaseIndex(1);
  }
}

function updateScrollFillStyle(currentSectionIndex) {
  const scrollFill = document.querySelector(".scroll-fill");

  const progress = (currentSectionIndex / TOTAL_SECTION_COUNT) * 100;
  scrollFill.style.height = 100 - progress + "%";
}

function switchActiveVideoContents(currentSectionIndex) {
  const videos = document.querySelectorAll(".video");
  const texts = document.querySelectorAll(".video-text");

  videos.forEach((video, index) => {
    if (index === currentSectionIndex) {
      video.classList.add("active");
      video.play();
    } else {
      video.classList.remove("active");
      video.pause();
    }
  });
  texts.forEach((text, index) =>
    text.classList.toggle("active", index === currentSectionIndex)
  );
}

function toggleFooterOnFinalSection(currentSectionIndex) {
  const footer = document.querySelector(".footer");

  // 마지막 섹션일 때 푸터 나타나도록
  if (currentSectionIndex === FINAL_SECTION_INDEX) {
    footer.classList.add("active");
  } else {
    footer.classList.remove("active");
  }
}

// setTimeout: 정해진 시간마다 실행되어 화면 갱신 타이밍과 안 맞을 수 있음
// requestAnimationFrame: 브라우저 화면 갱신 직전에 실행, 불필요한 객체 생성이 줄어 메모리 효율성 향상
let isProcessingScroll = false;
function handleWheel(event) {
  let currentSectionIndex = currentSectionState.getCurrentIndex();

  if (!isProcessingScroll) {
    requestAnimationFrame(() => {
      checkScrollSection(currentSectionIndex, event.deltaY);
      const newSectionIndex = currentSectionState.getCurrentIndex();
      updateScrollFillStyle(newSectionIndex);
      toggleFooterOnFinalSection(newSectionIndex);
      switchActiveVideoContents(newSectionIndex);
      isProcessingScroll = false;
    });
    isProcessingScroll = true;
  }
}

// 이벤트 리스너 등록
window.addEventListener("wheel", (event) => handleWheel(event));

function resetScroll() {
  currentSectionState.resetIndex();

  let currentSectionIndex = currentSectionState.getCurrentIndex();

  updateScrollFillStyle(currentSectionIndex);
  toggleFooterOnFinalSection(currentSectionIndex);
  switchActiveVideoContents(currentSectionIndex);
}

// 이벤트 리스너 등록
window.addEventListener("load", resetScroll); // 페이지 로드 시 초기화
window.addEventListener("popstate", resetScroll); // 뒤로 가기/앞으로 가기 시 초기화
