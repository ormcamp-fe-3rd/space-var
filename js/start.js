const videos = document.querySelectorAll(".video");
const texts = document.querySelectorAll(".video-text");
const indicator = document.getElementById("videoIndicator");
const scrollFill = document.getElementById("scrollFill");
const footer = document.getElementById("footer");
const buttonContainer = document.getElementById("buttonContainer");
const topLeftImage = document.getElementById("topLeftImage");

let currentVideo = 0;
let wheelCount = 0;

function updateIndicator() {
  indicator.textContent = currentVideo + 1;
  scrollFill.style.height =
    ((videos.length - currentVideo - 1) / (videos.length - 1)) * 100 +
    "%";
  footer.classList.toggle("active", currentVideo === 2);
  toggleButtonAndImage();
}

function toggleButtonAndImage() {
  if (currentVideo === 0) {
    buttonContainer.classList.add("show");
    topLeftImage.classList.add("show");
  } else {
    buttonContainer.classList.remove("show");
    topLeftImage.classList.remove("show");
  }
}

window.addEventListener("wheel", (event) => {
  event.preventDefault();
  wheelCount++;

  if (wheelCount >= 5) {
    handleScroll(event.deltaY);
    wheelCount = 0;
  }
});

let touchStartY = 0;
window.addEventListener("touchstart", (event) => {
  touchStartY = event.touches[0].clientY;
});

window.addEventListener("touchmove", (event) => {
  const touchEndY = event.touches[0].clientY;
  const deltaY = touchStartY - touchEndY;
  handleScroll(deltaY);
});

function handleScroll(deltaY) {
  if (deltaY > 50 && currentVideo < videos.length - 1) {
    currentVideo++;
  } else if (deltaY < -50 && currentVideo > 0) {
    currentVideo--;
  }
  updateVideosAndTexts();
}

function updateVideosAndTexts() {
  updateIndicator();
  videos.forEach((video, index) => {
    video.classList.toggle("active", index === currentVideo);
  });
  texts.forEach((text, index) => {
    text.classList.toggle("active", index === currentVideo);
  });
}

texts[currentVideo].classList.add("active");
updateIndicator();