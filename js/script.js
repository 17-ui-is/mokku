window.addEventListener("scroll", () => {
  const Y = window.scrollY;
  console.log(Y);
  Y >= 1200
    ? document.querySelector(".X").classList.add("active")
    : document.querySelector(".X").classList.remove("active");
});
