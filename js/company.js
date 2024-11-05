$(".planet").click(function() {
    $('.container').attr("planet-center", this.id);
    if (this.id == "solar1") centerSolar1();
    if (this.id == "solar2") centerSolar2();
    if (this.id == "solar4") centerSolar4();
    if (this.id == "solar5") centerSolar5();
    if (this.id == "solar6") centerSolar6();
    
});

function centerSolar1() {
    var tl = new TimelineMax()
    .to('#solar1', 1, {xPercent: 0, z: 1}, 0)
    .to('#solar2', 1, {xPercent: 70, z: -400}, 0)
    .to('#solar4', 1, {xPercent: 140, z: -800}, 0)
    .to('#solar5', 1, {xPercent: -140, z: -800}, 0)
    .to('#solar6', 1, {xPercent: -70, z: -400}, 0)
}
function centerSolar2() {
    var tl = new TimelineMax()
    .to('#solar2', 1, {xPercent: 0, z: 1}, 0)
    .to('#solar4', 1, {xPercent: 70, z: -400}, 0)
    .to('#solar5', 1, {xPercent: 140, z: -800}, 0)
    .to('#solar6', 1, {xPercent: -140, z: -800}, 0)
    .to('#solar1', 1, {xPercent: -70, z: -400}, 0)
}
function centerSolar4() {
    var tl = new TimelineMax()
    .to('#solar4', 1, {xPercent: 0, z: 1}, 0)
    .to('#solar5', 1, {xPercent: 70, z: -400}, 0)
    .to('#solar6', 1, {xPercent: 140, z: -800}, 0)
    .to('#solar1', 1, {xPercent: -140, z: -800}, 0)
    .to('#solar2', 1, {xPercent: -70, z: -400}, 0)
}
function centerSolar5() {
    var tl = new TimelineMax()
    .to('#solar5', 1, {xPercent: 0, z: 1}, 0)
    .to('#solar6', 1, {xPercent: 70, z: -400}, 0)
    .to('#solar1', 1, {xPercent: 140, z: -800}, 0)
    .to('#solar2', 1, {xPercent: -140, z: -800}, 0)
    .to('#solar4', 1, {xPercent: -70, z: -400}, 0)
}
function centerSolar6() {
    var tl = new TimelineMax()
    .to('#solar4', 1, {xPercent: 0, z: 1}, 0)
    .to('#solar5', 1, {xPercent: 70, z: -400}, 0)
    .to('#solar6', 1, {xPercent: 140, z: -800}, 0)
    .to('#solar1', 1, {xPercent: -140, z: -800}, 0)
    .to('#solar2', 1, {xPercent: -70, z: -400}, 0)
}

(function() {
    centerSolar4();
})
