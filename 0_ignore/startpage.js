const button = document.querySelector('.button');
const background = document.querySelector('.background');

let width = window.innerWidth;
let height = window.innerHeight;
let r = Math.sqrt(width * width + height * height);

window.addEventListener('resize', () => {
    width = window.innerWidth;
    height = window.innerHeight;
    r = Math.sqrt(width * width + height * height);
});

button.addEventListener('click', function(e) {
    // 버튼 중앙 위치 계산
    const rect = button.getBoundingClientRect();
    const startX = rect.left + rect.width / 2; // 버튼 중앙 X 좌표
    const startY = rect.top + rect.height / 2; // 버튼 중앙 Y 좌표

    const circle = document.createElement('div');
    circle.setAttribute('id', 'circle');
    background.appendChild(circle);

    // 초기 스타일 설정
    circle.style.backgroundColor = 'black';
    circle.style.width = '0';
    circle.style.height = '0';
    circle.style.left = `${startX}px`;
    circle.style.top = `${startY}px`;
    circle.style.position = 'absolute';
    circle.style.pointerEvents = 'none';
    circle.style.borderRadius = '50%';
    circle.style.opacity = '1'; // 초기 투명도

    requestAnimationFrame(() => {
        circle.style.transition = 'width 0.6s ease-in-out, height 0.6s ease-in-out, margin-left 0.6s ease-in-out, margin-top 0.6s ease-in-out';
        circle.style.width = `${r * 2}px`;
        circle.style.height = `${r * 2}px`;
        circle.style.marginLeft = `-${r}px`;
        circle.style.marginTop = `-${r}px`;
    });

     // 애니메이션 종료 후 링크로 즉시 이동
    circle.addEventListener('transitionend', () => {
        window.location.href = button.getAttribute('data-link'); // 링크 이동
    });
    
});



















