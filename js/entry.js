// .button 클래스의 첫 번째 요소를 선택하여 button 변수에 할당
const button = document.querySelector(".button");

// .background 클래스의 첫 번째 요소를 선택하여 background 변수에 할당
const background = document.querySelector(".background");

// 화면의 가로와 세로 크기를 가져옵니다.
let width = window.innerWidth;
let height = window.innerHeight;
// 화면 대각선 길이를 계산 (화면의 크기 기반으로 원의 최대 크기 결정)
let r = Math.sqrt(width * width + height * height);

// 화면 크기가 변경될 때마다 호출되어 화면 대각선 길이를 재계산
window.addEventListener("resize", () => {
  width = window.innerWidth;
  height = window.innerHeight;
  r = Math.sqrt(width * width + height * height);
});

// 버튼이 클릭되면 실행되는 이벤트 리스너
button.addEventListener("click", function (e) {
  // 버튼의 위치를 계산 (버튼이 화면상 어디에 위치하는지)
  const rect = button.getBoundingClientRect();
  // 버튼의 중앙 X 좌표 계산
  const startX = rect.left + rect.width / 2;
  // 버튼의 중앙 Y 좌표 계산
  const startY = rect.top + rect.height / 2;

  // 새로운 div 요소를 생성하여 circle 변수에 할당
  const circle = document.createElement("div");
  // 이 div 요소에 id="circle" 속성 추가
  circle.setAttribute("id", "circle");
  // 생성한 circle을 배경에 추가
  background.appendChild(circle);

  // 원의 초기 스타일 설정
  circle.style.backgroundColor = "black"; // 원의 색상 (검정색)
  circle.style.width = "0"; // 원의 초기 크기 (너비: 0)
  circle.style.height = "0"; // 원의 초기 크기 (높이: 0)
  circle.style.left = `${startX}px`; // 원의 왼쪽 위치 (버튼 중앙 X 위치)
  circle.style.top = `${startY}px`; // 원의 상단 위치 (버튼 중앙 Y 위치)
  circle.style.position = "absolute"; // 원의 위치를 절대 위치로 설정 (배경 내에서 이동)
  circle.style.pointerEvents = "none"; // 원이 화면에서 클릭을 차단하지 않도록 설정
  circle.style.borderRadius = "50%"; // 원을 만들기 위해 둥근 모서리 설정
  circle.style.opacity = "1"; // 원의 투명도 (처음에는 불투명)

  // 애니메이션을 시작하기 전에 렌더링을 요청
  requestAnimationFrame(() => {
    // 원이 확장되도록 애니메이션 설정
    circle.style.transition =
      "width 0.6s ease-in-out, height 0.6s ease-in-out, margin-left 0.6s ease-in-out, margin-top 0.6s ease-in-out";
    // 원의 최종 크기와 위치 설정
    circle.style.width = `${r * 2}px`; // 원의 너비 (화면 대각선 길이의 2배)
    circle.style.height = `${r * 2}px`; // 원의 높이 (화면 대각선 길이의 2배)
    circle.style.marginLeft = `-${r}px`; // 원이 중앙에서 확장되도록 왼쪽으로 이동
    circle.style.marginTop = `-${r}px`; // 원이 중앙에서 확장되도록 위로 이동
  });

  // 애니메이션이 종료되면 링크로 즉시 이동하도록 설정
  circle.addEventListener("transitionend", () => {
    // 버튼에 있는 data-link 속성의 값을 가져와서 해당 링크로 이동
    window.location.href = button.getAttribute("data-link");
  });
});
