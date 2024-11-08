const totalPage = document.querySelector(".total");
const seatsBtn = document.querySelectorAll(".seat-wrap .seat-list .btn");
const seatsBtn2 = document.querySelector(".seat-wrap .seat-list .btn");
const selectTxt = document.querySelector(".total-wrap .total-txt");
const resetBtn = document.querySelector(".total-wrap .btn-reset");
const primaryBtn = document.querySelector(".total-wrap .btn-primary");

for (let i = 0; i < seatsBtn.length; i++) {
  seatsBtn[i].addEventListener("click", function () {
    totalPage.classList.add("open");
    if (!totalPage.style.maxHeight) {
      totalPage.style.maxHeight = totalPage.scrollHeight + "px";
    }

    console.log(totalPage.scrollHeight);

    selectTxt.innerHTML =
      "Selected seat : <span>" + seatsBtn[i].innerText + "</span>";
    localStorage.setItem("seat", seatsBtn[i].innerText);

    for (let j = 0; j < seatsBtn.length; j++) {
      seatsBtn[j].classList.remove("on");
    }
    seatsBtn[i].classList.add("on");
  });

  resetBtn.addEventListener("click", function (e) {
    seatsBtn[i].classList.remove("on");
    selectTxt.innerText = "Please select a seat.";
  });
}

primaryBtn.addEventListener("click", function (e) {
  if (!Array.from(seatsBtn).some((btn) => btn.classList.contains("on"))) {
    e.preventDefault();
    alert("Please select a seat.");
  }
});
