let currentIndex = 0;
const planets = document.querySelectorAll('.planet');
const totalPlanets = planets.length;

// "prev" 버튼 클릭시 이동
document.querySelector('.prev').addEventListener('click', () => {
    moveCarousel('prev');
});

// "next" 버튼 클릭시 이동
document.querySelector('.next').addEventListener('click', () => {
    moveCarousel('next');
});

// 캐러셀 이동 함수
function moveCarousel(direction) {
    if (direction === 'next') {
        currentIndex = (currentIndex + 1) % totalPlanets; // 마지막 이미지에서 돌아오면 처음으로
    } else if (direction === 'prev') {
        currentIndex = (currentIndex - 1 + totalPlanets) % totalPlanets; // 처음 이미지에서 돌아오면 마지막으로
    }

    // 이동 후 크기 변경
    updatePlanetScale();
}

// 행성 크기 업데이트
function updatePlanetScale() {
    // 모든 행성의 'scale-up' 클래스 제거
    planets.forEach((planet) => {
        planet.classList.remove('scale-up');
    });

    // 현재 선택된 행성에 'scale-up' 클래스 추가
    planets[currentIndex].classList.add('scale-up');
}





