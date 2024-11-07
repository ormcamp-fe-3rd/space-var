// 캐러셀과 버튼 요소 선택
const $carousel = document.querySelector('.carousel');
const $nextButton = document.querySelector('.next-button');
const $prevButton = document.querySelector('.prev-button');

// 슬라이드 항목의 개수
const $carouselItems = document.querySelectorAll('.cell');
const CAROUSEL_LENGTH = $carouselItems.length;

// 현재 슬라이드의 인덱스
let currentIndex = 0; // 0부터 시작

// 슬라이드 이동 함수
const moveCarousel = () => {
  // 슬라이드가 끝에 도달하면 첫 번째 슬라이드로 이동
  if (currentIndex === CAROUSEL_LENGTH) {
    $carousel.style.transition = 'none'; // 전환 애니메이션 제거
    $carousel.style.transform = `translateX(0)`;
    currentIndex = 0;
    setTimeout(() => {
      $carousel.style.transition = 'transform 0.5s ease-in-out'; // 전환 애니메이션 복구
    }, 50); // 잠시 후 애니메이션을 다시 활성화
  } else {
    $carousel.style.transform = `translateX(${-200 * currentIndex}px)`; // 370px은 각 슬라이드의 너비
  }

  // 모든 슬라이드에서 active 클래스 제거
  $carouselItems.forEach(item => {
    item.classList.remove('active');
  });

  // 현재 슬라이드에 active 클래스 추가
  $carouselItems[currentIndex].classList.add('active');
};

// 다음 버튼 클릭 시 동작
const nextEvent = () => {
  currentIndex++;
  if (currentIndex === CAROUSEL_LENGTH) {
    currentIndex = 0; // 마지막 슬라이드에 도달하면 첫 번째로 돌아감
  }
  moveCarousel();
};

// 이전 버튼 클릭 시 동작
const prevEvent = () => {
  currentIndex--;
  if (currentIndex < 0) {
    currentIndex = CAROUSEL_LENGTH - 1; // 첫 번째 슬라이드에서 이전을 클릭하면 마지막 슬라이드로 돌아감
  }
  moveCarousel();
};

// 버튼 클릭 시 이벤트 처리
$nextButton.addEventListener("click", nextEvent);
$prevButton.addEventListener("click", prevEvent);
