// 화면의 가로와 세로 크기를 가져옴
function getScreenDimensions() {
  const width = window.innerWidth;
  const height = window.innerHeight;
  const r = Math.sqrt(width * width + height * height); // 화면 대각선 길이 계산
  return { width, height, r };
}

function createCircle() {
  const button = document.querySelector(".button");
  const background = document.querySelector(".background");

  // 버튼의 위치를 계산
  const rect = button.getBoundingClientRect();
  const startX = rect.left + rect.width / 2;
  const startY = rect.top + rect.height / 2;

  // 새로운 div 요소를 생성하여 circle 변수에 할당
  const circle = document.createElement("div");
  circle.setAttribute("id", "circle");
  background.appendChild(circle);

  // 원의 초기 스타일 설정
  circle.style.backgroundColor = "black";
  circle.style.width = "0";
  circle.style.height = "0";
  circle.style.left = `${startX}px`;
  circle.style.top = `${startY}px`;
  circle.style.position = "absolute";
  circle.style.pointerEvents = "none";
  circle.style.borderRadius = "50%";
  circle.style.opacity = "1";
}

function startAnimation() {
  const circle = document.querySelector("#circle");
  const { r } = getScreenDimensions();

  // 애니메이션을 시작하기 전에 렌더링을 요청
  requestAnimationFrame(() => {
    circle.style.transition =
      "width 0.6s ease-in-out, height 0.6s ease-in-out, margin-left 0.6s ease-in-out, margin-top 0.6s ease-in-out";
    circle.style.width = `${r * 2}px`; // 원의 최종 크기와 위치 설정
    circle.style.height = `${r * 2}px`;
    circle.style.marginLeft = `-${r}px`;
    circle.style.marginTop = `-${r}px`;
  });
}

function handleCircleTransition() {
  // 애니메이션이 종료되면 링크로 즉시 이동하도록 설정
  circle.addEventListener("transitionend", () => {
    window.location.href = button.getAttribute("data-link");
  });
}

function handleLogoBtnClick() {
  createCircle();
  startAnimation();
  handleCircleTransition();
}

// 이벤트 리스너 등록
const button = document.querySelector(".button");

button.addEventListener("click", handleLogoBtnClick);
