const buttons = document.querySelectorAll('.button');
const background = document.querySelector('.background');

let width = 0;
let height = 0;
let r = 0;
setSize();

function setSize() {
    width = window.innerWidth;
    height = window.innerHeight;
    r = Math.sqrt(width * width + height * height);
}

window.addEventListener('resize', setSize);

buttons.forEach(button => {
    button.addEventListener('click', function(e) {
        buttons.forEach(btn => btn.classList.remove('current'));
        this.classList.add('current');

        const circle = document.createElement('div');
        circle.setAttribute('id', 'circle');
        background.appendChild(circle);
        
        // 초기 스타일 설정
        circle.style.position = 'absolute';
        circle.style.backgroundColor = getComputedStyle(this).backgroundColor;
        circle.style.width = '0';
        circle.style.height = '0';
        circle.style.borderRadius = '50%';
        circle.style.left = `${e.pageX}px`;
        circle.style.top = `${e.pageY}px`;
        circle.style.marginLeft = '0';
        circle.style.marginTop = '0';
        circle.style.pointerEvents = 'none';

        // 애니메이션
        requestAnimationFrame(() => {
            circle.style.transition = 'width 0.6s ease-in-out, height 0.6s ease-in-out, margin-left 0.6s ease-in-out, margin-top 0.6s ease-in-out';
            circle.style.width = `${r * 2}px`;
            circle.style.height = `${r * 2}px`;
            circle.style.marginLeft = `-${r}px`;
            circle.style.marginTop = `-${r}px`;
        });

        circle.addEventListener('transitionend', () => {
            background.style.backgroundColor = getComputedStyle(circle).backgroundColor;
            circle.remove();
        });
    });
});
