// 페이지가 로드되면 opacity를 1로 변경
window.addEventListener('load', () => {
    document.body.style.opacity = '1'; // 배경의 투명도 변경

    // 버튼이 서서히 나타나도록 설정
    const buttons = document.querySelectorAll('button');
    buttons.forEach(button => {
        button.classList.add('visible'); // 버튼에 visible 클래스 추가
    });

    // 레이저 효과 추가
    document.querySelectorAll('button').forEach(button => {
        const light = button.querySelector('.light');
        const length = light.getTotalLength();

        // Initialize stroke-dash properties
        light.style.strokeDasharray = length;
        light.style.strokeDashoffset = length; // initially hidden

        button.addEventListener('mouseenter', () => {
            light.style.transition = 'stroke-dashoffset 1.5s ease-in-out'; // 속도 조정 (1.5초)
            light.style.strokeDashoffset = '0'; // show laser effect
        });

        button.addEventListener('mouseleave', () => {
            light.style.strokeDashoffset = length; // hide laser effect
        });
    });
});





  
  

