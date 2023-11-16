window.addEventListener("scroll", () => {
  const Y = window.scrollY;
  console.log(Y);
  Y >= 1200
    ? document.querySelector(".c1").classList.add("active1")
    : document.querySelector(".c1").classList.remove("active1");
});
window.addEventListener("scroll", () => {
  const Y = window.scrollY;
  console.log(Y);
  Y >= 1350
    ? document.querySelector(".c2").classList.add("active2")
    : document.querySelector(".c2").classList.remove("active2");
});
window.addEventListener("scroll", () => {
  const Y = window.scrollY;
  console.log(Y);
  Y >= 1500
    ? document.querySelector(".c3").classList.add("active1")
    : document.querySelector(".c3").classList.remove("active1");
});
window.addEventListener("scroll", () => {
  const Y = window.scrollY;
  console.log(Y);
  Y >= 1700
    ? document.querySelector(".c4").classList.add("active2")
    : document.querySelector(".c4").classList.remove("active2");
});
