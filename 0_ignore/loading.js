const button = document.querySelector('.button');
const background = document.querySelector('.background');

let width = window.innerWidth;
let height = window.innerHeight;
let r = Math.sqrt(width * width + height * height);

// 윈도우 크기 변경 시 반응
window.addEventListener('resize', () => {
    width = window.innerWidth;
    height = window.innerHeight;
    r = Math.sqrt(width * width + height * height);
});

// 버튼 클릭 이벤트 리스너
button.addEventListener('click', function() {
    // 버튼 중앙 위치 계산
    const rect = button.getBoundingClientRect();
    const startX = rect.left + rect.width / 2; // 버튼 중앙 X 좌표
    const startY = rect.top + rect.height / 2; // 버튼 중앙 Y 좌표

    const circle = document.createElement('div');
    circle.setAttribute('id', 'circle');
    background.appendChild(circle);

    // 초기 스타일 설정
    circle.style.backgroundImage = 'url("../src/image/space15.png")';
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

    // 애니메이션 종료 후 처리
    circle.addEventListener('transitionend', () => {
        circle.style.transition = 'opacity 0.6s ease-in-out';
        circle.style.opacity = '0'; // 원형 이미지 흐려지기

        // 로딩 메시지 숨기기
        loading.hide();
    });

    // 로딩 메시지 표시
    loading.show();
});

// Loading 클래스 정의
function Loading(el, message) {
    this.el = el;
    this.childEl = document.createElement('div');
    this.childEl.className = 'typing';
    this.childEl.textContent = message;

    // 스타일 설정
    this.childElStyle = {
        margin: '0 auto',
        color: 'black',
        animation: `typing 3s steps(${message.length}, end), blink .5s step-end infinite alternate`,
        whiteSpace: "nowrap",
        overflow: 'hidden',
        borderRight: '2px solid black',
        fontSize: '1.5em', // 크기 조정
    };

    // 스타일 적용
    Object.keys(this.childElStyle).forEach(key => {
        this.childEl.style[key] = this.childElStyle[key];
    });

    el.append(this.childEl);
    this.hide();
}

// 로딩 메시지 표시 및 숨기기 메서드
Loading.prototype.show = function() {
    this.el.style.display = 'grid';
};

Loading.prototype.hide = function() {
    this.el.style.display = 'none';
};

// Loading 인스턴스 생성
const loading = new Loading(
    document.querySelector('.loading'),
    'Typing Animation Loading...'
);





